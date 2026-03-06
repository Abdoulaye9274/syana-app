import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { getModuleById, getModuleByOrder } from '@/services/modules'
import { getModuleProgress } from '@/services/progress'

/**
 * Hook pour gérer les détails et la navigation d'un module
 */
export const useModuleDetail = (moduleId) => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [module, setModule] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeLessonIndex, setActiveLessonIndex] = useState(0)

    const fetchData = useCallback(async () => {
        if (!moduleId) return
        try {
            setLoading(true)
            const mod = await getModuleById(moduleId)
            if (!mod) {
                setModule(null)
                return
            }
            setModule(mod)

            if (user) {
                const progressData = await getModuleProgress(user.uid, moduleId)
                if (progressData && progressData.lessonsCompleted) {
                    // Si on a des leçons complétées, on se place sur la suivante ou la dernière
                    const completedCount = progressData.lessonsCompleted.length
                    setActiveLessonIndex(Math.min(completedCount, (mod.lessons?.length || 1) - 1))
                }
            }
        } catch (error) {
            console.error("Error loading module detail:", error)
        } finally {
            setLoading(false)
        }
    }, [moduleId, user?.uid])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const goToNextModule = async () => {
        if (!module) return
        const nextMod = await getModuleByOrder(module.order + 1)
        if (nextMod) {
            navigate(`/modules/${nextMod.id}`)
        } else {
            navigate('/modules')
        }
    }

    const goToPreviousModule = async () => {
        if (!module || module.order <= 1) return
        const prevMod = await getModuleByOrder(module.order - 1)
        if (prevMod) {
            navigate(`/modules/${prevMod.id}`)
        } else {
            navigate('/modules')
        }
    }

    const setLesson = (index) => {
        if (module?.lessons && index >= 0 && index < module.lessons.length) {
            setActiveLessonIndex(index)
        }
    }

    return {
        module,
        loading,
        activeLessonIndex,
        setLesson,
        goToNextModule,
        goToPreviousModule,
        refresh: fetchData
    }
}
