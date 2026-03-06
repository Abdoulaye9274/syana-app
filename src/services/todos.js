import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore'
import { db } from '@/services/firebase/config'

/**
 * Hook personnalisé pour gérer la To-Do List en temps réel
 */
export const subscribeToTodos = (userId, callback) => {
    if (!userId) return () => { }

    const q = query(
        collection(db, 'users', userId, 'todos'),
        orderBy('createdAt', 'desc')
    )

    return onSnapshot(q, (snapshot) => {
        const todos = snapshot.docs.map(doc => {
            const data = doc.data()
            return {
                id: doc.id,
                ...data,
                // Handle cases where createdAt might be null briefly on local update
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date()
            }
        })
        callback(todos)
    }, (error) => {
        console.error("Todo subscription error:", error)
        callback([]) // Return empty list on error
    })
}

export const addTodo = async (userId, text) => {
    try {
        await addDoc(collection(db, 'users', userId, 'todos'), {
            text,
            completed: false,
            createdAt: serverTimestamp()
        })
    } catch (error) {
        console.error('Error adding todo:', error)
        throw error
    }
}

export const toggleTodo = async (userId, todoId, currentStatus) => {
    try {
        const todoRef = doc(db, 'users', userId, 'todos', todoId)
        await updateDoc(todoRef, {
            completed: !currentStatus
        })
    } catch (error) {
        console.error('Error toggling todo:', error)
        throw error
    }
}

export const deleteTodo = async (userId, todoId) => {
    try {
        const todoRef = doc(db, 'users', userId, 'todos', todoId)
        await deleteDoc(todoRef)
    } catch (error) {
        console.error('Error deleting todo:', error)
        throw error
    }
}
