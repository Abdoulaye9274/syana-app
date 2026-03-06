import { db } from './firebase/config'
import { doc, updateDoc, serverTimestamp, collection, query, where, getDocs, getDoc } from 'firebase/firestore'

/**
 * Service Stripe - Gestion des abonnements et webhooks
 */

/**
 * Met à jour le statut d'abonnement d'un utilisateur
 * Appelé par les webhooks Stripe
 */
export const updateSubscriptionStatus = async (customerId, subscriptionId, status, plan) => {
    try {
        // 1. Trouver l'utilisateur par customerId (stocké dans Firestore)
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('stripeCustomerId', '==', customerId))
        const snapshot = await getDocs(q)

        if (snapshot.empty) {
            console.warn(`Customer ${customerId} not found`)
            return false
        }

        const userDoc = snapshot.docs[0]
        const userId = userDoc.id

        // 2. Map Stripe status to app status
        const appStatus = mapStripeStatus(status)

        // 3. Update user subscription
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
            subscriptionId,
            subscriptionStatus: appStatus,
            plan: plan || 'basic',
            subscriptionUpdatedAt: serverTimestamp()
        })

        console.log(`✅ Subscription updated for user ${userId}: ${appStatus}`)
        return true
    } catch (error) {
        console.error('Error updating subscription:', error)
        throw error
    }
}

/**
 * Traite un événement de webhook Stripe
 */
export const handleStripeWebhook = async (event) => {
    const { type, data } = event

    try {
        switch (type) {
            // Paiement réussi
            case 'payment_intent.succeeded':
                return await handlePaymentSucceeded(data.object)

            // Paiement échoué
            case 'payment_intent.payment_failed':
                return await handlePaymentFailed(data.object)

            // Abonnement créé
            case 'customer.subscription.created':
                return await handleSubscriptionCreated(data.object)

            // Abonnement mis à jour
            case 'customer.subscription.updated':
                return await handleSubscriptionUpdated(data.object)

            // Abonnement supprimé
            case 'customer.subscription.deleted':
                return await handleSubscriptionDeleted(data.object)

            // Facture payée
            case 'invoice.paid':
                return await handleInvoicePaid(data.object)

            // Facture non payée
            case 'invoice.payment_failed':
                return await handleInvoiceFailed(data.object)

            default:
                console.log(`Event ${type} not handled`)
                return true
        }
    } catch (error) {
        console.error(`Error handling webhook ${type}:`, error)
        throw error
    }
}

/**
 * Handlers pour chaque type d'événement
 */

const handlePaymentSucceeded = async (paymentIntent) => {
    console.log('Payment succeeded:', paymentIntent.id)
    // Optionnel: logger ou créer un record
    return true
}

const handlePaymentFailed = async (paymentIntent) => {
    console.log('Payment failed:', paymentIntent.id)
    const customerId = paymentIntent.customer
    return await updateSubscriptionStatus(customerId, null, 'payment_failed', null)
}

const handleSubscriptionCreated = async (subscription) => {
    console.log('Subscription created:', subscription.id)
    const { customer, id, status, items } = subscription
    const plan = items.data[0]?.price.nickname || 'basic'

    return await updateSubscriptionStatus(customer, id, status, plan)
}

const handleSubscriptionUpdated = async (subscription) => {
    console.log('Subscription updated:', subscription.id)
    const { customer, id, status, items } = subscription
    const plan = items.data[0]?.price.nickname || 'basic'

    return await updateSubscriptionStatus(customer, id, status, plan)
}

const handleSubscriptionDeleted = async (subscription) => {
    console.log('Subscription deleted:', subscription.id)
    const { customer, id } = subscription

    return await updateSubscriptionStatus(customer, id, 'canceled', null)
}

const handleInvoicePaid = async (invoice) => {
    console.log('Invoice paid:', invoice.id)
    const customerId = invoice.customer
    const subscriptionId = invoice.subscription

    // Assurer que le statut est 'active'
    return await updateSubscriptionStatus(customerId, subscriptionId, 'active', null)
}

const handleInvoiceFailed = async (invoice) => {
    console.log('Invoice failed:', invoice.id)
    const customerId = invoice.customer

    return await updateSubscriptionStatus(customerId, null, 'unpaid', null)
}

/**
 * Map Stripe status à notre app status
 */
function mapStripeStatus(stripeStatus) {
    const statusMap = {
        'active': 'active',
        'past_due': 'unpaid',
        'unpaid': 'unpaid',
        'canceled': 'canceled',
        'trialing': 'trialing'
    }
    return statusMap[stripeStatus] || 'unknown'
}

/**
 * Crée une session checkout Stripe
 * À utiliser côté client (React) avec @stripe/react-stripe-js
 */
export const createCheckoutSession = async (userId, priceId, successUrl, cancelUrl) => {
    try {
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                priceId,
                successUrl,
                cancelUrl
            })
        })

        const { sessionId } = await response.json()
        return sessionId
    } catch (error) {
        console.error('Error creating checkout session:', error)
        throw error
    }
}

/**
 * Récupère les détails de l'abonnement pour un utilisateur
 */
export const getUserSubscription = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId)
        const userDoc = await getDoc(userRef)
        
        if (!userDoc.exists()) {
            return null
        }

        const userData = userDoc.data()
        return {
            plan: userData.plan,
            status: userData.subscriptionStatus,
            subscriptionId: userData.subscriptionId,
            updatedAt: userData.subscriptionUpdatedAt
        }
    } catch (error) {
        console.error('Error fetching subscription:', error)
        throw error
    }
}

export default {
    updateSubscriptionStatus,
    handleStripeWebhook,
    createCheckoutSession,
    getUserSubscription
}
