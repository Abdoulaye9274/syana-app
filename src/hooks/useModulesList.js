import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getAllModules } from '@/services/modules'
import { getAllUserProgress } from '@/services/progress'

/**
 * Hook pour gérer la liste des modules avec logique d'accès (verrouillage)
 */
export const useModulesList = () => {
    const { user, userProfile } = useAuth()
    const [modules, setModules] = useState([])
    const [userProgress, setUserProgress] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [modulesData, progressData] = await Promise.all([
                    getAllModules(),
                    user ? getAllUserProgress(user.uid) : Promise.resolve({})
                ])
                setModules(modulesData)
                setUserProgress(progressData)
            } catch (err) {
                console.error("Error fetching modules list:", err)
                setError("Impossible de charger les modules.")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user?.uid])

    const processedModules = useMemo(() => {
        const currentModuleOrder = userProfile?.currentModule || 1
        const hasActiveAccess = ['active', 'trialing'].includes(userProfile?.subscriptionStatus) || userProfile?.role === 'admin'
        const isAdmin = userProfile?.role === 'admin'

        return modules.map(module => {
            let isLocked = !hasActiveAccess
            if (hasActiveAccess) {
                isLocked = module.order > currentModuleOrder
            }
            if (isAdmin) isLocked = false

            const moduleProgress = userProgress[module.id]
            return {
                ...module,
                locked: isLocked,
                progress: moduleProgress?.progress || 0,
                isCompleted: moduleProgress?.completed || false,
                lessonsCount: module.lessons ? module.lessons.length : 0
            }
        })
    }, [modules, userProgress, userProfile])

    return {
        modules: processedModules,
        loading,
        error
    }
}
