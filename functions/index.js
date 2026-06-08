'use strict'

const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
const db = admin.firestore()
const bucket = admin.storage().bucket()

// Stripe initialisé avec la clé secrète (jamais exposée au client)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Région EU pour conformité RGPD (données traitées en Europe)
const REGION = 'europe-west1'

// Price IDs autorisés — empêche la manipulation côté client
const VALID_PRICE_IDS = () => [
    process.env.STRIPE_PRICE_BASIC,
    process.env.STRIPE_PRICE_GUIDED,
    process.env.STRIPE_PRICE_PREMIUM,
].filter(Boolean)

// ─────────────────────────────────────────────────────────────────────────────
// 1. CREATE CHECKOUT SESSION
//    Callable Function — Firebase vérifie automatiquement le token auth
// ─────────────────────────────────────────────────────────────────────────────
exports.createCheckoutSession = functions
    .region(REGION)
    .https.onCall(async (data, context) => {
        // 1. Vérification authentification
        if (!context.auth) {
            throw new functions.https.HttpsError(
                'unauthenticated',
                'Vous devez être connecté pour souscrire un abonnement.'
            )
        }

        const { priceId } = data
        const userId = context.auth.uid
        const userEmail = context.auth.token.email

        // 2. Validation du priceId (sécurité : empêche de passer un prix arbitraire)
        if (!priceId || !VALID_PRICE_IDS().includes(priceId)) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                'Plan invalide.'
            )
        }

        const userRef = db.collection('users').doc(userId)
        const userSnap = await userRef.get()
        const userData = userSnap.data() || {}

        // 3. Récupérer ou créer le client Stripe (évite les doublons)
        let customerId = userData.stripeCustomerId

        if (!customerId) {
            const customer = await stripe.customers.create({
                email: userEmail,
                metadata: { firebaseUid: userId },
            })
            customerId = customer.id

            await userRef.update({
                stripeCustomerId: customerId,
                stripeCustomerCreatedAt: admin.firestore.FieldValue.serverTimestamp(),
            })
        }

        const appUrl = process.env.APP_URL || 'https://syana.app'

        // 4. Créer la session Checkout Stripe
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'subscription',
            success_url: `${appUrl}/paiement-succes?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/tarifs`,
            locale: 'fr',
            allow_promotion_codes: true,
            // RGPD : on ne collecte l'adresse de facturation que si nécessaire
            billing_address_collection: 'auto',
            // Pré-rempli avec l'email Firebase — moins de friction
            customer_update: { email: 'auto' },
            metadata: { firebaseUid: userId },
            subscription_data: {
                metadata: { firebaseUid: userId },
            },
        })

        functions.logger.info(`Checkout session créée: ${session.id} pour user ${userId}`)

        return { url: session.url, sessionId: session.id }
    })

// ─────────────────────────────────────────────────────────────────────────────
// 2. CREATE PORTAL SESSION
//    Permet à l'utilisateur de gérer/annuler son abonnement (RGPD : droit de retrait)
// ─────────────────────────────────────────────────────────────────────────────
exports.createPortalSession = functions
    .region(REGION)
    .https.onCall(async (data, context) => {
        if (!context.auth) {
            throw new functions.https.HttpsError(
                'unauthenticated',
                'Vous devez être connecté.'
            )
        }

        const userId = context.auth.uid
        const userSnap = await db.collection('users').doc(userId).get()
        const customerId = userSnap.data()?.stripeCustomerId

        if (!customerId) {
            throw new functions.https.HttpsError(
                'not-found',
                'Aucun abonnement actif trouvé.'
            )
        }

        const appUrl = process.env.APP_URL || 'https://syana.app'

        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${appUrl}/compte`,
        })

        functions.logger.info(`Portal session créée pour user ${userId}`)

        return { url: session.url }
    })

// ─────────────────────────────────────────────────────────────────────────────
// 3. STRIPE WEBHOOK
//    onRequest (HTTP) — Stripe envoie les events ici
//    req.rawBody est fourni automatiquement par Firebase pour la vérification de signature
// ─────────────────────────────────────────────────────────────────────────────
exports.stripeWebhook = functions
    .region(REGION)
    .https.onRequest(async (req, res) => {
        if (req.method !== 'POST') {
            return res.status(405).end()
        }

        const sig = req.headers['stripe-signature']
        let event

        // Vérification de signature — garantit que l'event vient bien de Stripe
        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            )
        } catch (err) {
            functions.logger.error('Webhook signature invalide:', err.message)
            return res.status(400).json({ error: `Webhook Error: ${err.message}` })
        }

        functions.logger.info(`Webhook reçu: ${event.type}`)

        try {
            switch (event.type) {
                case 'customer.subscription.created':
                case 'customer.subscription.updated':
                    await handleSubscriptionChange(event.data.object)
                    break

                case 'customer.subscription.deleted':
                    await handleSubscriptionDeleted(event.data.object)
                    break

                case 'invoice.paid':
                    await handleInvoicePaid(event.data.object)
                    break

                case 'invoice.payment_failed':
                    await handleInvoicePaymentFailed(event.data.object)
                    break

                default:
                    functions.logger.info(`Event non géré: ${event.type}`)
            }

            return res.json({ received: true })
        } catch (error) {
            functions.logger.error('Erreur traitement webhook:', error)
            return res.status(500).json({ error: error.message })
        }
    })

// ─────────────────────────────────────────────────────────────────────────────
// HANDLERS INTERNES
// ─────────────────────────────────────────────────────────────────────────────

async function handleSubscriptionChange(subscription) {
    const { customer, id: subscriptionId, status, items, current_period_end } = subscription
    const VALID_PLANS = ['basic', 'guided', 'premium']
    const rawPlan = items?.data[0]?.price?.nickname?.toLowerCase() || ''
    const plan = VALID_PLANS.includes(rawPlan) ? rawPlan : 'basic'

    await updateUserByCustomerId(customer, {
        subscriptionId,
        subscriptionStatus: mapStripeStatus(status),
        plan,
        subscriptionCurrentPeriodEnd: current_period_end
            ? admin.firestore.Timestamp.fromMillis(current_period_end * 1000)
            : null,
        subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

async function handleSubscriptionDeleted(subscription) {
    const { customer, id: subscriptionId } = subscription

    await updateUserByCustomerId(customer, {
        subscriptionId,
        subscriptionStatus: 'canceled',
        subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

async function handleInvoicePaid(invoice) {
    const { customer, subscription: subscriptionId } = invoice

    await updateUserByCustomerId(customer, {
        subscriptionStatus: 'active',
        subscriptionId,
        subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

async function handleInvoicePaymentFailed(invoice) {
    const { customer } = invoice

    await updateUserByCustomerId(customer, {
        subscriptionStatus: 'unpaid',
        subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

async function updateUserByCustomerId(customerId, data) {
    const snapshot = await db
        .collection('users')
        .where('stripeCustomerId', '==', customerId)
        .limit(1)
        .get()

    if (snapshot.empty) {
        functions.logger.warn(`Aucun utilisateur trouvé pour le customer Stripe: ${customerId}`)
        return
    }

    await snapshot.docs[0].ref.update(data)
    functions.logger.info(`Utilisateur mis à jour: ${snapshot.docs[0].id}`, data)
}

function mapStripeStatus(stripeStatus) {
    const map = {
        active: 'active',
        trialing: 'trialing',
        past_due: 'unpaid',
        unpaid: 'unpaid',
        canceled: 'canceled',
        incomplete: 'pending',
        incomplete_expired: 'canceled',
        paused: 'paused',
    }
    return map[stripeStatus] || 'unknown'
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. DELETE USER DATA — Droit à l'oubli RGPD
//    Supprime toutes les données personnelles d'un utilisateur sur demande
// ─────────────────────────────────────────────────────────────────────────────
exports.deleteUserData = functions
    .region(REGION)
    .https.onCall(async (data, context) => {
        if (!context.auth) {
            throw new functions.https.HttpsError('unauthenticated', 'Connexion requise.')
        }

        const userId = context.auth.uid

        try {
            const userRef = db.collection('users').doc(userId)
            const userSnap = await userRef.get()
            const userData = userSnap.data() || {}

            // 1. Annuler tous les abonnements non terminaux (active, trialing, past_due, paused)
            if (userData.stripeCustomerId) {
                const subscriptions = await stripe.subscriptions.list({
                    customer: userData.stripeCustomerId,
                    limit: 10,
                })
                const nonTerminal = ['active', 'trialing', 'past_due', 'paused']
                for (const sub of subscriptions.data) {
                    if (nonTerminal.includes(sub.status)) {
                        await stripe.subscriptions.cancel(sub.id)
                    }
                }
                // Supprimer le customer Stripe (efface CB enregistrées)
                await stripe.customers.del(userData.stripeCustomerId)
            }

            // 2. Supprimer les sous-collections Firestore
            const progressSnap = await userRef.collection('progress').get()
            const batch = db.batch()
            progressSnap.docs.forEach(doc => batch.delete(doc.ref))
            await batch.commit()

            // 3. Supprimer les livrables (sous-collection /users/{uid}/deliverables/)
            const deliverablesSnap = await userRef.collection('deliverables').get()
            const batch2 = db.batch()
            deliverablesSnap.docs.forEach(doc => batch2.delete(doc.ref))
            await batch2.commit()

            // 4. Supprimer les fichiers Firebase Storage (livrables uploadés)
            try {
                await bucket.deleteFiles({ prefix: `deliverables/${userId}/` })
            } catch (storageErr) {
                functions.logger.warn(`Storage deletion partielle pour user ${userId}:`, storageErr.message)
            }

            // 5. Supprimer le document utilisateur
            await userRef.delete()

            // 6. Supprimer le compte Firebase Auth
            await admin.auth().deleteUser(userId)

            functions.logger.info(`Données supprimées pour user ${userId} (droit à l'oubli RGPD)`)

            return { success: true }
        } catch (error) {
            functions.logger.error('Erreur suppression données utilisateur:', error)
            throw new functions.https.HttpsError('internal', 'Erreur lors de la suppression.')
        }
    })
