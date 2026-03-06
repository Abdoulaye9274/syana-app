import { db } from '@/services/firebase/config'
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore'

/**
 * Submit a module review/feedback to Firestore
 * @param {Object} review - { userId, userName, moduleId, moduleName, rating ('up'|'down'), comment }
 */
export const submitModuleReview = async (review) => {
    try {
        const docRef = await addDoc(collection(db, 'reviews'), {
            ...review,
            createdAt: serverTimestamp()
        })
        return docRef.id
    } catch (error) {
        console.error('Error submitting review:', error)
        throw error
    }
}

/**
 * Fetch all module reviews (for admin use)
 */
export const getAllReviews = async () => {
    try {
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
        console.error('Error fetching reviews:', error)
        throw error
    }
}
