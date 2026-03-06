import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getAllModules } from '@/services/modules'
import {
    submitDeliverable,
    uploadDeliverableFile,
    getUserDeliverablesResult
} from '@/services/deliverables'

/**
 * Hook pour gérer l'état et les actions des livrables
 */
export const useDeliverables = () => {
    const { user } = useAuth()
    const [modules, setModules] = useState([])
    const [deliverables, setDeliverables] = useState({})
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(null)
    const [uploading, setUploading] = useState(null)

    const fetchAllData = async () => {
        if (!user) return

        try {
            setLoading(true)
            const [modulesData, userDeliverablesList] = await Promise.all([
                getAllModules(),
                getUserDeliverablesResult(user.uid)
            ])

            // Convert list to map for easier access
            const deliverablesMap = {}
            userDeliverablesList.forEach(d => {
                deliverablesMap[d.moduleId] = d
            })

            setModules(modulesData)
            setDeliverables(deliverablesMap)
        } catch (error) {
            console.error("Error loading deliverables data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllData()
    }, [user?.uid])

    const submitLink = async (moduleId, url) => {
        if (!user || !url) return

        setSubmitting(moduleId)
        try {
            await submitDeliverable(user.uid, moduleId, {
                type: 'link',
                content: url
            })
            // Local update for better UX
            setDeliverables(prev => ({
                ...prev,
                [moduleId]: {
                    moduleId,
                    status: 'pending',
                    type: 'link',
                    content: url,
                    submittedAt: new Date()
                }
            }))
            return true
        } catch (error) {
            console.error("Submission failed:", error)
            throw error
        } finally {
            setSubmitting(null)
        }
    }

    const uploadFile = async (moduleId, file) => {
        if (!user || !file) return

        setUploading(moduleId)
        try {
            const fileData = await uploadDeliverableFile(user.uid, moduleId, file)

            await submitDeliverable(user.uid, moduleId, {
                type: 'file',
                content: fileData.url,
                filename: fileData.name,
                fileSize: fileData.size
            })

            setDeliverables(prev => ({
                ...prev,
                [moduleId]: {
                    moduleId,
                    status: 'pending',
                    type: 'file',
                    content: fileData.url,
                    filename: fileData.name,
                    submittedAt: new Date()
                }
            }))
            return true
        } catch (error) {
            console.error("Upload failed:", error)
            throw error
        } finally {
            setUploading(null)
        }
    }

    const stats = useMemo(() => {
        const list = Object.values(deliverables)
        return {
            total: list.length,
            approved: list.filter(d => d.status === 'approved').length,
            pending: list.filter(d => d.status === 'pending').length,
            rejected: list.filter(d => d.status === 'rejected').length
        }
    }, [deliverables])

    return {
        modules,
        deliverables,
        loading,
        submitting,
        uploading,
        stats,
        submitLink,
        uploadFile,
        refresh: fetchAllData
    }
}
