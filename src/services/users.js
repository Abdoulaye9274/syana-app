import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase/config'

/**
 * Crée un document utilisateur dans Firestore lors de l'inscription
 */
export const createUserDocument = async (userId, userData) => {
    try {
        const userRef = doc(db, 'users', userId)

        const userDoc = {
            email: userData.email,
            displayName: userData.displayName || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            role: 'user', // Par défaut
            plan: 'free', // Par défaut
            subscriptionStatus: 'free', // free, active, trialing, canceled, unpaid
            currentModule: 1, // Commence au module 1
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }

        await setDoc(userRef, userDoc)
        return userDoc
    } catch (error) {
        console.error('Error creating user document:', error)
        throw error
    }
}

/**
 * Récupère le profil utilisateur depuis Firestore
 */
export const getUserProfile = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
            return {
                id: userSnap.id,
                ...userSnap.data()
            }
        }
        return null
    } catch (error) {
        console.error('Error fetching user profile:', error)
        throw error
    }
}

/**
 * Met à jour le profil utilisateur
 */
export const updateUserProfile = async (userId, updates) => {
    try {
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
            ...updates,
            updatedAt: serverTimestamp()
        })
    } catch (error) {
        console.error('Error updating user profile:', error)
        throw error
    }
}

/**
 * Met à jour le plan et le statut d'abonnement (pour admin)
 */
export const updateUserSubscription = async (userId, plan, subscriptionStatus) => {
    try {
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
            plan,
            subscriptionStatus,
            updatedAt: serverTimestamp()
        })
    } catch (error) {
        console.error('Error updating subscription:', error)
        throw error
    }
}

/**
 * Sauvegarde la progression d'un module
 * @param {string} userId - ID de l'utilisateur
 * @param {string} moduleId - ID du module
 * @param {number} completedLessons - Nombre de leçons terminées (index)
 * @param {number} totalLessons - Nombre total de leçons
 */
export const saveModuleProgress = async (userId, moduleId, completedLessons, totalLessons) => {
    try {
        // On stocke la progression dans une sous-collection 'progress'
        // doc ID = moduleId
        const progressRef = doc(db, 'users', userId, 'progress', moduleId)

        const progressPercent = Math.round(((completedLessons + 1) / totalLessons) * 100)
        const isCompleted = progressPercent === 100

        await setDoc(progressRef, {
            moduleId,
            completedLessons, // Index de la dernière leçon vue
            progress: progressPercent,
            isCompleted,
            lastAccessed: serverTimestamp()
        }, { merge: true })

        // Si le module est terminé, on peut mettre à jour le 'currentModule' global de l'utilisateur
        // (Logique à affiner selon si on veut bloquer ou non)
        if (isCompleted) {
            const userRef = doc(db, 'users', userId)
            const userSnap = await getDoc(userRef)
            const currentModule = userSnap.data()?.currentModule || 1

            // On incrémente seulement si c'était le module en cours
            // Note: moduleId est un string UUID, il faudrait comparer avec l'ordre
            // Pour l'instant on laisse simple.
        }

    } catch (error) {
        console.error('Error saving progress:', error)
        throw error
    }
}

/**
 * Récupère la progression d'un module spécifique
 */
export const getModuleProgress = async (userId, moduleId) => {
    try {
        const progressRef = doc(db, 'users', userId, 'progress', moduleId)
        const docSnap = await getDoc(progressRef)

        if (docSnap.exists()) {
            return docSnap.data()
        }
        return null
    } catch (error) {
        console.error('Error fetching progress:', error)
        return null
    }
}
