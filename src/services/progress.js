import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    serverTimestamp
} from 'firebase/firestore'
import { db } from './firebase/config'

/**
 * Initialise la progression d'un utilisateur pour un module
 */
export const initializeModuleProgress = async (userId, moduleId, moduleOrder) => {
    try {
        const progressRef = doc(db, 'users', userId, 'progress', moduleId)

        const progressData = {
            moduleId,
            moduleOrder,
            completed: false,
            progress: 0, // Pourcentage de complétion
            lessonsCompleted: [], // IDs des leçons complétées
            deliverableSubmitted: false,
            deliverableValidated: false,
            checklistCompleted: false, // Si toutes les cases de validation sont cochées
            startedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }

        await setDoc(progressRef, progressData)
        return progressData
    } catch (error) {
        console.error('Error initializing module progress:', error)
        throw error
    }
}

/**
 * Récupère la progression d'un utilisateur pour un module
 */
export const getModuleProgress = async (userId, moduleId) => {
    try {
        const progressRef = doc(db, 'users', userId, 'progress', moduleId)
        const progressSnap = await getDoc(progressRef)

        if (progressSnap.exists()) {
            return {
                id: progressSnap.id,
                ...progressSnap.data()
            }
        }
        return null
    } catch (error) {
        console.error('Error fetching module progress:', error)
        throw error
    }
}

/**
 * Récupère toutes les progressions d'un utilisateur
 */
export const getAllUserProgress = async (userId) => {
    try {
        const progressRef = collection(db, 'users', userId, 'progress')
        const progressSnap = await getDocs(progressRef)

        const progressions = {}
        progressSnap.forEach((doc) => {
            progressions[doc.id] = {
                id: doc.id,
                ...doc.data()
            }
        })

        return progressions
    } catch (error) {
        console.error('Error fetching all progress:', error)
        throw error
    }
}

/**
 * Met à jour la progression d'une leçon
 */
export const updateLessonProgress = async (userId, moduleId, lessonId, completed = true) => {
    try {
        const progressRef = doc(db, 'users', userId, 'progress', moduleId)
        const progressSnap = await getDoc(progressRef)

        if (!progressSnap.exists()) {
            // Initialiser si n'existe pas
            await initializeModuleProgress(userId, moduleId, 1)
        }

        const currentData = progressSnap.data() || {}
        const lessonsCompleted = currentData.lessonsCompleted || []

        if (completed && !lessonsCompleted.includes(lessonId)) {
            lessonsCompleted.push(lessonId)
        } else if (!completed) {
            const index = lessonsCompleted.indexOf(lessonId)
            if (index > -1) {
                lessonsCompleted.splice(index, 1)
            }
        }

        await updateDoc(progressRef, {
            lessonsCompleted,
            updatedAt: serverTimestamp()
        })

        return lessonsCompleted
    } catch (error) {
        console.error('Error updating lesson progress:', error)
        throw error
    }
}

/**
 * Met à jour la checklist de validation d'un module
 */
export const updateValidationChecklist = async (userId, moduleId, checklistItems) => {
    try {
        const progressRef = doc(db, 'users', userId, 'progress', moduleId)
        const progressSnap = await getDoc(progressRef)

        if (!progressSnap.exists()) {
            await initializeModuleProgress(userId, moduleId, 1)
        }

        // Calculer le pourcentage de complétion de la checklist
        const totalItems = checklistItems.length
        const completedItems = checklistItems.filter(item => item.completed).length
        const checklistProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

        // Vérifier si toutes les cases sont cochées
        const checklistCompleted = completedItems === totalItems && totalItems > 0

        await updateDoc(progressRef, {
            checklistItems,
            checklistProgress,
            checklistCompleted,
            updatedAt: serverTimestamp()
        })

        return { checklistProgress, checklistCompleted }
    } catch (error) {
        console.error('Error updating validation checklist:', error)
        throw error
    }
}

/**
 * Valide un module (débloque le suivant)
 */
export const validateModule = async (userId, moduleId, moduleOrder) => {
    try {
        const progressRef = doc(db, 'users', userId, 'progress', moduleId)
        const userRef = doc(db, 'users', userId)

        // Créer ou mettre à jour le document de progression (setDoc avec merge pour éviter l'erreur si inexistant)
        await setDoc(progressRef, {
            moduleId,
            moduleOrder,
            completed: true,
            progress: 100,
            validatedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }, { merge: true })

        // Mettre à jour le currentModule de l'utilisateur pour débloquer le suivant
        const nextModule = moduleOrder + 1
        await setDoc(userRef, {
            currentModule: nextModule,
            updatedAt: serverTimestamp()
        }, { merge: true })

        return nextModule
    } catch (error) {
        console.error('Error validating module:', error)
        throw error
    }
}

/**
 * Calcule la progression globale d'un utilisateur
 */
export const calculateGlobalProgress = async (userId, totalModulesCount) => {
    try {
        let totalModules = totalModulesCount

        if (!totalModules) {
            // Fallback or dynamic fetch (but better to pass it)
            totalModules = 14
        }

        const allProgress = await getAllUserProgress(userId)

        let completedModules = 0
        let totalProgress = 0

        Object.values(allProgress).forEach((progress) => {
            if (progress.completed) {
                completedModules++
            }
            totalProgress += progress.progress || 0
        })

        const globalProgress = totalModules > 0 ? (totalProgress / totalModules) : 0

        // Mettre à jour dans le document utilisateur
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
            completedModules,
            globalProgress: Math.round(globalProgress),
            updatedAt: serverTimestamp()
        })

        return {
            completedModules,
            totalModules,
            globalProgress: Math.round(globalProgress)
        }
    } catch (error) {
        console.error('Error calculating global progress:', error)
        throw error
    }
}

/**
 * Vérifie si un module est débloqué pour un utilisateur
 */
export const isModuleUnlocked = (userProfile, moduleOrder) => {
    if (!userProfile) return false

    // Admin a accès à tout
    if (userProfile.role === 'admin') return true

    // Vérifier l'abonnement
    const hasActiveAccess = ['active', 'trialing'].includes(userProfile.subscriptionStatus)
    if (!hasActiveAccess) return false

    // Vérifier le déblocage séquentiel
    return moduleOrder <= userProfile.currentModule
}
