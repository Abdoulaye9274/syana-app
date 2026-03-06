import { useState, useEffect } from 'react'
import { useUserProgress } from './useUserProgress'
import { getModulesCount, getModuleByOrder, getModulesByIds } from '@/services/modules'
import { CheckCircle2, Clock } from 'lucide-react'

/**
 * Hook pour gérer l'activité récente de l'utilisateur
 */
export const useRecentActivity = (limitCount = 3) => {
    const { progress, loading } = useUserProgress()
    const [activities, setActivities] = useState([])
    const [activitiesLoading, setActivitiesLoading] = useState(true)

    useEffect(() => {
        const buildActivities = async () => {
            if (loading) return

            if (!progress || Object.keys(progress).length === 0) {
                setActivities([])
                setActivitiesLoading(false)
                return
            }

            try {
                // 1. Sort and slice
                const recentProgress = Object.values(progress)
                    .sort((a, b) => {
                        const timeA = a.updatedAt?.seconds || 0
                        const timeB = b.updatedAt?.seconds || 0
                        return timeB - timeA
                    })
                    .slice(0, limitCount)

                // 2. Build activity objects
                const moduleIds = recentProgress.map(p => p.moduleId || p.id)
                const modulesData = await getModulesByIds(moduleIds)
                const modulesMap = {}
                modulesData.forEach(m => { modulesMap[m.id] = m })

                const built = recentProgress.map((p) => {
                    const moduleId = p.moduleId || p.id
                    const moduleInfo = modulesMap[moduleId]
                    let title = moduleInfo?.title || `Module ${p.moduleOrder || '?'}`

                    const isCompleted = p.completed
                    return {
                        id: moduleId,
                        moduleId,
                        title,
                        description: isCompleted
                            ? 'Module terminé avec succès ✅'
                            : `${p.progress || 0}% complété`,
                        time: p.updatedAt
                            ? new Date(p.updatedAt.seconds * 1000).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
                            : "À l'instant",
                        icon: isCompleted ? CheckCircle2 : Clock,
                        color: isCompleted ? 'text-green-500' : 'text-violet',
                        bg: isCompleted ? 'bg-green-500/10' : 'bg-violet/10',
                        link: `/modules/${moduleId}`
                    }
                })

                setActivities(built)
            } catch (err) {
                console.error("Error building activities:", err)
            } finally {
                setActivitiesLoading(false)
            }
        }

        buildActivities()
    }, [progress, loading, limitCount])

    return {
        activities,
        loading: loading || activitiesLoading
    }
}
