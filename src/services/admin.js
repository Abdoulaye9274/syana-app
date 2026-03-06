import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase/config'

/**
 * Met à jour le Conseil du Jour
 * @param {string} tipContent - Le texte du conseil
 */
export const updateTipOfTheDay = async (tipContent) => {
    try {
        const settingsRef = doc(db, 'admin', 'general')

        // On utilise setDoc avec merge pour créer si inexistant
        await setDoc(settingsRef, {
            tipOfTheDay: tipContent,
            updatedAt: serverTimestamp()
        }, { merge: true })

        return true
    } catch (error) {
        console.error('Error updating tip of the day:', error)
        throw error
    }
}

/**
 * Récupère le Conseil du Jour (Public/Authenticated)
 */
export const getTipOfTheDay = async () => {
    try {
        const settingsRef = doc(db, 'admin', 'general')
        const snap = await getDoc(settingsRef)

        if (snap.exists()) {
            return snap.data().tipOfTheDay
        }
        return "Pour créer des personas efficaces, basez-vous sur de vraies données et interviews clients plutôt que sur des suppositions." // Fallback default
    } catch (error) {
        console.error('Error fetching tip:', error)
        return null
    }
}
