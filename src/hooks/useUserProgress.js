import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getAllUserProgress, getModuleProgress, calculateGlobalProgress } from '@/services/progress'

/**
 * Hook pour gérer la progression d'un utilisateur
 */
export const useUserProgress = () => {
    const { user, userProfile } = useAuth()
    const [progress, setProgress] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!user || !userProfile) {
            setLoading(false)
            return
        }

        const fetchProgress = async () => {
            try {
                setLoading(true)
                const allProgress = await getAllUserProgress(user.uid)
                setProgress(allProgress)
                
                // Recalculer la progression globale
                await calculateGlobalProgress(user.uid)
            } catch (err) {
                console.error('Error fetching progress:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProgress()
    }, [user, userProfile])

    /**
     * Récupère la progression d'un module spécifique
     */
    const getModuleProgressData = async (moduleId) => {
        if (!user) return null
        
        try {
            return await getModuleProgress(user.uid, moduleId)
        } catch (err) {
            console.error('Error fetching module progress:', err)
            return null
        }
    }

    /**
     * Recalcule la progression globale
     */
    const refreshGlobalProgress = async () => {
        if (!user) return
        
        try {
            await calculateGlobalProgress(user.uid)
            // Recharger toutes les progressions
            const allProgress = await getAllUserProgress(user.uid)
            setProgress(allProgress)
        } catch (err) {
            console.error('Error refreshing progress:', err)
        }
    }

    return {
        progress,
        loading,
        error,
        getModuleProgressData,
        refreshGlobalProgress
    }
}
