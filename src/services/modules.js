import {
    doc,
    getDoc,
    collection,
    query,
    where,
    orderBy,
    getDocs,
    limit,
    getCountFromServer,
    documentId
} from 'firebase/firestore'
import { db } from './firebase/config'

/**
 * Récupère tous les modules depuis Firestore, triés par ordre
 */
export const getAllModules = async () => {
    try {
        const modulesRef = collection(db, 'modules')
        const q = query(modulesRef, orderBy('order', 'asc'))
        const snap = await getDocs(q)
        return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    } catch (error) {
        console.error('Error fetching all modules:', error)
        return []
    }
}

/**
 * Récupère un module par son ID Firestore
 */
export const getModuleById = async (moduleId) => {
    try {
        const moduleRef = doc(db, 'modules', moduleId)
        const snap = await getDoc(moduleRef)
        if (snap.exists()) {
            return { id: snap.id, ...snap.data() }
        }
        return null
    } catch (error) {
        console.error('Error fetching module by ID:', error)
        return null
    }
}

/**
 * Récupère plusieurs modules par leurs IDs
 */
export const getModulesByIds = async (moduleIds) => {
    if (!moduleIds || moduleIds.length === 0) return []
    try {
        const q = query(collection(db, 'modules'), where(documentId(), 'in', moduleIds))
        const snap = await getDocs(q)
        return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    } catch (error) {
        console.error('Error fetching modules by IDs:', error)
        return []
    }
}

/**
 * Récupère le premier module avec l'ordre donné
 */
export const getModuleByOrder = async (order) => {
    try {
        const q = query(collection(db, 'modules'), where('order', '==', order), limit(1))
        const snap = await getDocs(q)
        if (!snap.empty) {
            return { id: snap.docs[0].id, ...snap.docs[0].data() }
        }
        return null
    } catch (error) {
        console.error('Error fetching module by order:', error)
        return null
    }
}

/**
 * Récupère les N prochains modules après un certain ordre
 */
export const getNextModules = async (currentOrder, count = 3) => {
    try {
        const q = query(
            collection(db, 'modules'),
            where('order', '>', currentOrder),
            orderBy('order', 'asc'),
            limit(count)
        )
        const snap = await getDocs(q)
        return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    } catch (error) {
        console.error('Error fetching next modules:', error)
        return []
    }
}

/**
 * Récupère le nombre total de modules
 */
export const getModulesCount = async () => {
    try {
        const coll = collection(db, 'modules')
        const snapshot = await getCountFromServer(coll)
        return snapshot.data().count
    } catch (error) {
        console.error('Error getting modules count:', error)
        return 0
    }
}
