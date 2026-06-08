import { httpsCallable } from 'firebase/functions'
import { functions } from './firebase/config'

// ── Lancer le checkout Stripe ─────────────────────────────────────────────
// Appelle la Cloud Function `createCheckoutSession` (auth vérifiée côté serveur)
// Retourne une URL Stripe vers laquelle rediriger l'utilisateur
export const startCheckout = async (priceId) => {
    const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession')
    const result = await createCheckoutSession({ priceId })
    return result.data // { url, sessionId }
}

// ── Ouvrir le portail de gestion Stripe ──────────────────────────────────
// Permet à l'utilisateur de modifier/annuler son abonnement (RGPD)
export const openBillingPortal = async () => {
    const createPortalSession = httpsCallable(functions, 'createPortalSession')
    const result = await createPortalSession()
    return result.data // { url }
}
