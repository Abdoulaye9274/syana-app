import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { getModuleById, getModuleByOrder } from '@/services/modules'
import { getModuleProgress, updateLessonProgress, calculateGlobalProgress } from '@/services/progress'

/**
 * Hook pour gérer les détails et la navigation d'un module
 */
export const useModuleDetail = (moduleId) => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [module, setModule] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeLessonIndex, setActiveLessonIndex] = useState(0)
    const [lessonsCompleted, setLessonsCompleted] = useState([])

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
                if (progressData) {
                    if (progressData.lessonsCompleted) {
                        setLessonsCompleted(progressData.lessonsCompleted)
                        // Si on a des leçons complétées, on se place sur la suivante ou la dernière
                        const completedCount = progressData.lessonsCompleted.length
                        setActiveLessonIndex(Math.min(completedCount, (mod.lessons?.length || 1) - 1))
                    }
                } else {
                    setLessonsCompleted([])
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

    const markLessonComplete = async (index) => {
        if (!user || !moduleId) return

        const lessonId = `lesson_${index}`
        try {
            const updatedLessons = await updateLessonProgress(user.uid, moduleId, lessonId, true)
            setLessonsCompleted(updatedLessons)
            await calculateGlobalProgress(user.uid, 14)
        } catch (error) {
            console.error("Error marking lesson complete:", error)
        }
    }

    return {
        module,
        loading,
        activeLessonIndex,
        lessonsCompleted,
        markLessonComplete,
        setLesson,
        goToNextModule,
        goToPreviousModule,
        refresh: fetchData
    }
}
