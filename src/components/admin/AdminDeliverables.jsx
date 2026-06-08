import { useState, useEffect, useRef } from 'react'
import { Card, Button, Badge, Loading } from '@/components/ui'
import {
    CheckCircle2, XCircle, ExternalLink, Clock,
    MessageSquare, UploadCloud, Loader2, FileText, Search
} from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import { getPendingDeliverables, uploadAdminCorrection, saveAdminReview } from '@/services/deliverables'
import { toast } from 'react-hot-toast'

const AdminDeliverables = () => {
    const [deliverables, setDeliverables] = useState([])
    const [loading, setLoading] = useState(true)
    const [processingId, setProcessingId] = useState(null)
    const [feedbackInputs, setFeedbackInputs] = useState({})
    const [correctionFiles, setCorrectionFiles] = useState({})
    const [searchTerm, setSearchTerm] = useState('')
    const fileInputRefs = useRef({})

    useEffect(() => {
        fetchPendingDeliverables()
    }, [])

    const fetchPendingDeliverables = async () => {
        setLoading(true)
        try {
            const delivs = await getPendingDeliverables()

            // Fetch unique user display names
            const userIds = [...new Set(delivs.map(d => d.userId))]
            const userDocs = await Promise.all(userIds.map(uid => getDoc(doc(db, 'users', uid))))
            const userMap = {}
            userDocs.forEach(snap => {
                if (snap.exists()) userMap[snap.id] = snap.data().displayName || snap.data().email
            })

            setDeliverables(delivs.map(d => ({
                ...d,
                uid: d.userId,
                userDisplayName: userMap[d.userId] || d.userId
            })))
        } catch (error) {
            console.error('Error fetching admin deliverables:', error)
        } finally {
            setLoading(false)
        }
    }

    const key = (item) => item.id + item.uid

    const handleValidation = async (item, status) => {
        const k = key(item)
        setProcessingId(k)
        try {
            const feedback = feedbackInputs[k] || ''
            const file = correctionFiles[k] || null

            let correction = null
            if (file) {
                correction = await uploadAdminCorrection(item.uid, item.id, file)
            }

            await saveAdminReview(item.uid, item.id, { status, feedback, correction })

            setDeliverables(prev => prev.filter(d => !(d.id === item.id && d.uid === item.uid)))
            setCorrectionFiles(prev => { const n = { ...prev }; delete n[k]; return n })
            setFeedbackInputs(prev => { const n = { ...prev }; delete n[k]; return n })
        } catch (error) {
            console.error('Error updating deliverable:', error)
            toast.error('Erreur lors de la validation.')
        } finally {
            setProcessingId(null)
        }
    }

    if (loading) return <Loading size="sm" />

    if (deliverables.length === 0) {
        return (
            <div className="p-8 text-center text-text-secondary bg-bg-card/30 rounded-2xl border border-border-primary">
                <CheckCircle2 className="mx-auto mb-3 text-green-500/50" size={32} />
                <p>Aucun livrable en attente.</p>
            </div>
        )
    }

    const filtered = deliverables.filter(item => {
        const term = searchTerm.toLowerCase()
        return (
            item.userDisplayName?.toLowerCase().includes(term) ||
            item.moduleId?.toLowerCase().includes(term)
        )
    })

    return (
        <div className="space-y-4">
            {/* Barre de recherche */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                <input
                    type="text"
                    placeholder="Rechercher par utilisateur ou module..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-bg-primary/50 border border-border-primary rounded-lg py-2 pl-9 pr-4 text-sm text-text-primary focus:border-cyan outline-none"
                />
            </div>

            {filtered.length === 0 && (
                <p className="text-center py-6 text-text-secondary italic text-sm">Aucun résultat pour "{searchTerm}"</p>
            )}

            {filtered.map((item) => {
                const k = key(item)
                const isProcessing = processingId === k
                const selectedFile = correctionFiles[k]

                return (
                    <Card key={k} className="p-5 border-border-primary flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="warning">En attente</Badge>
                                    <span className="text-xs text-text-secondary flex items-center gap-1">
                                        <Clock size={12} />
                                        {item.submittedAt?.toDate().toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                                <h4 className="font-bold text-text-primary">{item.userDisplayName}</h4>
                                <p className="text-sm text-text-secondary">Module : {item.moduleId}</p>
                            </div>
                            <a
                                href={item.content}
                                target="_blank"
                                rel="noreferrer"
                                title="Voir le livrable"
                                className="p-2 bg-white/5 rounded-lg text-cyan hover:bg-cyan/10 transition-colors"
                            >
                                <ExternalLink size={20} />
                            </a>
                        </div>

                        {/* Feedback */}
                        <div className="relative">
                            <MessageSquare className="absolute top-3 left-3 text-text-secondary" size={16} />
                            <textarea
                                className="w-full bg-bg-primary/50 border border-border-primary rounded-lg py-2 pl-10 pr-4 text-sm text-text-primary focus:border-cyan outline-none resize-none h-20"
                                placeholder="Feedback écrit pour l'élève..."
                                value={feedbackInputs[k] || ''}
                                onChange={(e) => setFeedbackInputs(prev => ({ ...prev, [k]: e.target.value }))}
                            />
                        </div>

                        {/* Fichier de correction */}
                        <div>
                            <p className="text-xs text-text-secondary uppercase tracking-wider font-bold mb-2">
                                Joindre une correction (optionnel)
                            </p>
                            <input
                                type="file"
                                className="hidden"
                                ref={el => fileInputRefs.current[k] = el}
                                onChange={(e) => {
                                    const file = e.target.files[0]
                                    if (file) setCorrectionFiles(prev => ({ ...prev, [k]: file }))
                                }}
                            />
                            {selectedFile ? (
                                <div className="flex items-center gap-3 p-3 bg-cyan/5 border border-cyan/20 rounded-lg">
                                    <FileText size={16} className="text-cyan shrink-0" />
                                    <span className="text-sm text-text-primary flex-1 truncate">{selectedFile.name}</span>
                                    <button
                                        onClick={() => setCorrectionFiles(prev => { const n = { ...prev }; delete n[k]; return n })}
                                        className="text-xs text-red-400 hover:text-red-300"
                                    >
                                        Retirer
                                    </button>
                                </div>
                            ) : (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="border-white/10 text-text-secondary hover:border-cyan/30 hover:text-cyan"
                                    onClick={() => fileInputRefs.current[k]?.click()}
                                >
                                    <UploadCloud size={16} className="mr-2" />
                                    Joindre un fichier corrigé
                                </Button>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button
                                variant="primary"
                                size="sm"
                                className="flex-1 bg-green-600 hover:bg-green-700 border-none"
                                onClick={() => handleValidation(item, 'approved')}
                                disabled={isProcessing}
                            >
                                {isProcessing
                                    ? <Loader2 size={16} className="animate-spin mr-2" />
                                    : <CheckCircle2 size={16} className="mr-2" />
                                }
                                Valider
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                                onClick={() => handleValidation(item, 'rejected')}
                                disabled={isProcessing}
                            >
                                {isProcessing
                                    ? <Loader2 size={16} className="animate-spin mr-2" />
                                    : <XCircle size={16} className="mr-2" />
                                }
                                À revoir
                            </Button>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default AdminDeliverables
