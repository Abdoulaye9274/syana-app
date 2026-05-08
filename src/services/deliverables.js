import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp,
    limit
} from 'firebase/firestore'
import { storage } from './firebase/config'
import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage'
import { db } from './firebase/config'
import { collectionGroup } from 'firebase/firestore'

/**
 * Upload un fichier livrable vers Firebase Storage
 * @param {string} userId - ID de l'utilisateur
 * @param {string} moduleId - ID du module
 * @param {File} file - Le fichier à uploader
 * @returns {object} { name, url, type, size }
 */
export const uploadDeliverableFile = async (userId, moduleId, file) => {
    try {
        // Path: deliverables/{userId}/{moduleId}/{filename}
        const timestamp = Date.now()
        const fileName = `${timestamp}_${file.name}`
        const filePath = `deliverables/${userId}/${moduleId}/${fileName}`

        const fileRef = ref(storage, filePath)

        // Upload le fichier
        await uploadBytes(fileRef, file)

        // Récupère l'URL de téléchargement
        const downloadURL = await getDownloadURL(fileRef)

        return {
            name: file.name,
            url: downloadURL,
            type: file.type,
            size: file.size,
            storagePath: filePath
        }
    } catch (error) {
        console.error('Error uploading file:', error)
        throw error
    }
}

/**
 * Crée ou met à jour un livrable pour un module donné
 * @param {string} userId - ID de l'utilisateur
 * @param {string} moduleId - ID du module
 * @param {object} data - { files: [...], content, type, link }
 */
export const submitDeliverable = async (userId, moduleId, data) => {
    try {
        // Structure: users/{userId}/deliverables/{moduleId}
        const docRef = doc(db, 'users', userId, 'deliverables', moduleId)

        await setDoc(docRef, {
            ...data,
            userId,
            moduleId,
            status: 'pending', // pending, approved, rejected
            submittedAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            feedback: null // Reset feedback on new submission
        }, { merge: true })

        return { success: true }
    } catch (error) {
        console.error('Error submitting deliverable:', error)
        throw error
    }
}

/**
 * Récupère le livrable d'un utilisateur pour un module
 */
export const getUserDeliverable = async (userId, moduleId) => {
    try {
        const docRef = doc(db, 'users', userId, 'deliverables', moduleId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }
        }
        return null
    } catch (error) {
        console.error('Error fetching deliverable:', error)
        return null
    }
}

/**
 * Récupère tous les livrables d'un utilisateur
 */
export const getUserDeliverablesResult = async (userId) => {
    try {
        const deliverablesRef = collection(db, 'users', userId, 'deliverables')
        const q = query(deliverablesRef, orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch (error) {
        console.error('Error fetching user deliverables:', error)
        return []
    }
}

/**
 * (Admin) Upload un fichier de correction vers Firebase Storage
 */
export const uploadAdminCorrection = async (userId, moduleId, file) => {
    try {
        const timestamp = Date.now()
        const fileName = `${timestamp}_${file.name}`
        const filePath = `corrections/${userId}/${moduleId}/${fileName}`

        const fileRef = ref(storage, filePath)
        await uploadBytes(fileRef, file)
        const downloadURL = await getDownloadURL(fileRef)

        return {
            url: downloadURL,
            filename: file.name,
            storagePath: filePath
        }
    } catch (error) {
        console.error('Error uploading admin correction:', error)
        throw error
    }
}

/**
 * (Admin) Sauvegarde la correction + statut sur le livrable d'un user
 */
export const saveAdminReview = async (userId, moduleId, { status, feedback, correction }) => {
    try {
        const docRef = doc(db, 'users', userId, 'deliverables', moduleId)
        const updateData = {
            status,
            feedback: feedback || null,
            reviewedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }
        if (correction) {
            updateData.correction = {
                url: correction.url,
                filename: correction.filename,
                uploadedAt: serverTimestamp()
            }
        }
        await updateDoc(docRef, updateData)
    } catch (error) {
        console.error('Error saving admin review:', error)
        throw error
    }
}

/**
 * (Admin) Récupère les livrables en attente de validation
 * Note: Firestore ne permet pas facilement de requêter les sous-collections de tous les utilisateurs
 * sauf avec un "Collection Group Query".
 * Pour simplifier, nous allons doubler l'écriture dans une collection racine 'all_deliverables' ou utiliser un index group.
 * ICI: On va utiliser un Collection Group Query sur 'deliverables'
 */
export const getPendingDeliverables = async () => {
    try {
        const q = query(
            collectionGroup(db, 'deliverables'),
            where('status', '==', 'pending'),
            orderBy('submittedAt', 'desc'),
            limit(50)
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch (error) {
        console.error('Error fetching pending deliverables:', error)
        return []
    }
}
