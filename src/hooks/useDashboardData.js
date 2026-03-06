import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useUserProgress } from './useUserProgress'
import { getModulesCount, getModuleByOrder } from '@/services/modules'

/**
 * Hook centralisant toutes les données nécessaires au Dashboard
 */
export const useDashboardData = () => {
    const { user, userProfile } = useAuth()
    const { progress, loading: progressLoading } = useUserProgress()

    const [loading, setLoading] = useState(true)
    const [currentModuleData, setCurrentModuleData] = useState(null)
    const [totalModules, setTotalModules] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            if (progressLoading) return

            try {
                // 1. Get real modules count
                const count = await getModulesCount()
                setTotalModules(count)

                // 2. Fetch current module details
                const currentOrder = userProfile?.currentModule || 1
                const mod = await getModuleByOrder(currentOrder)
                setCurrentModuleData(mod)
            } catch (err) {
                console.error("Dashboard hook error:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [progressLoading, userProfile?.currentModule])

    // Memoized stats calculation
    const stats = useMemo(() => {
        if (!progress) return {
            completedModules: 0,
            globalProgress: 0,
            totalTime: 0,
            currentModuleProgress: 0
        }

        const progressValues = Object.values(progress)
        const completed = progressValues.filter(p => p.completed === true).length
        const totalProgress = progressValues.reduce((sum, p) => sum + (p.progress || 0), 0)
        const globalProgress = totalModules > 0 ? Math.round(totalProgress / totalModules) : 0
        const totalTime = progressValues.filter(p => (p.progress || 0) > 0).length * 2

        const currentOrder = userProfile?.currentModule || 1
        const currentModuleProgress = progressValues.find(p => p.moduleOrder === currentOrder)?.progress || 0

        return {
            completedModules: completed,
            globalProgress,
            totalTime,
            currentModuleProgress
        }
    }, [progress, totalModules, userProfile?.currentModule])

    return {
        loading: loading || progressLoading,
        stats,
        totalModules,
        currentModuleData,
        userProfile,
        user
    }
}
