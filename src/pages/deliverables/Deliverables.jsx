import { useState, useRef } from 'react'
import { DashboardLayout } from '@/components/layout'
import { Card, Button, Input, Badge, Loading } from '@/components/ui'
import {
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    Send,
    MessageSquare,
    UploadCloud,
    RefreshCw,
    Loader2,
    Download,
    Search
} from 'lucide-react'
import { useDeliverables } from '@/hooks/useDeliverables'
import { SkeletonDeliverableCard, SkeletonStatCard } from '@/components/ui'
import { toast } from 'react-hot-toast'

const statColorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    cyan: 'text-cyan',
    orange: 'text-orange-500'
}

const DeliverableStatCard = ({ label, value, color }) => (
    <Card className="flex flex-col justify-between h-32 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-text-primary">
            <FileText size={48} />
        </div>
        <span className="text-text-secondary font-medium text-sm">{label}</span>
        <span className={`text-4xl font-bold ${statColorClasses[color] || 'text-text-primary'}`}>{value}</span>
    </Card>
)

const Deliverables = () => {
    const {
        modules,
        deliverables,
        loading,
        submitting,
        uploading,
        stats,
        submitLink,
        uploadFile
    } = useDeliverables()

    const [inputs, setInputs] = useState({})
    const [filter, setFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const fileInputRefs = useRef({})

    const handleSubmit = async (moduleId) => {
        const url = inputs[moduleId]
        if (!url?.trim()) return

        try {
            await submitLink(moduleId, url)
            toast.success('Livrable envoyé avec succès !')
            setInputs(prev => ({ ...prev, [moduleId]: '' }))
        } catch (error) {
            toast.error('Erreur lors de l\'envoi')
        }
    }

    const handleFileUpload = async (moduleId, file) => {
        if (!file) return
        try {
            await uploadFile(moduleId, file)
            toast.success('Fichier uploadé et envoyé !')
        } catch (error) {
            toast.error("Erreur lors de l'upload")
        }
    }

    const triggerFileInput = (moduleId) => {
        if (fileInputRefs.current[moduleId]) {
            fileInputRefs.current[moduleId].click()
        }
    }

    if (loading) return (
        <DashboardLayout title="Mes livrables & feedbacks" subtitle="Suivez vos soumissions et les retours de l'équipe">
            <div className="space-y-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <SkeletonStatCard key={i} />)}
                </div>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => <SkeletonDeliverableCard key={i} />)}
                </div>
            </div>
        </DashboardLayout>
    )

    const filteredModules = modules.filter(module => {
        const d = deliverables[module.id]
        if (searchQuery && !module.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
        if (filter === 'all') return true
        if (filter === 'none') return !d
        return d?.status === filter
    })

    return (
        <DashboardLayout
            title="Mes livrables & feedbacks"
            subtitle="Suivez vos soumissions et les retours de l'équipe"
        >
            <div className="space-y-8">
                {/* 1. Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <DeliverableStatCard label="Total envoyés" value={stats.total} color="blue" />
                    <DeliverableStatCard label="Validés" value={stats.approved} color="green" />
                    <DeliverableStatCard label="En attente" value={stats.pending} color="cyan" />
                    <DeliverableStatCard label="À retravailler" value={stats.rejected} color="orange" />
                </div>

                {/* 2. Search + Filters Row */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                        <input
                            type="text"
                            placeholder="Rechercher un module..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-bg-card border border-border-primary rounded-xl py-2.5 pl-9 pr-4 text-sm text-text-primary focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all placeholder:text-text-secondary"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="font-medium text-text-primary">Filtrer par :</span>
                    <div className="flex gap-2">
                        {[
                            { id: 'all', label: 'Tous' },
                            { id: 'approved', label: 'Validés', color: 'text-green-500' },
                            { id: 'pending', label: 'En attente', color: 'text-cyan' },
                            { id: 'rejected', label: 'À retravailler', color: 'text-orange-500' },
                            { id: 'none', label: 'Non envoyés', color: 'text-text-secondary' }
                        ].map((f) => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                className={`px-4 py-2 rounded-full border transition-all ${filter === f.id
                                    ? 'bg-bg-card-hover border-border-primary text-text-primary font-bold'
                                    : 'bg-transparent border-border-primary text-text-secondary hover:border-text-secondary'
                                    }`}
                            >
                                <span className={f.color}>{f.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                </div>

                {/* 3. Deliverables List */}
                {modules.length === 0 ? (
                    <Card className="text-center py-12">
                        <AlertCircle className="mx-auto mb-4 text-text-secondary" size={48} />
                        <h3 className="text-xl font-bold text-text-primary mb-2">Aucun livrable disponible</h3>
                        <p className="text-text-secondary">
                            Les modules n'ont pas encore été chargés.
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {filteredModules.length === 0 ? (
                            <p className="text-center py-12 text-text-secondary italic">Aucun livrable ne correspond à ce filtre.</p>
                        ) : (
                            filteredModules.map(module => {
                                const deliverable = deliverables[module.id]
                                const status = deliverable?.status
                                const isRejected = status === 'rejected'
                                const isApproved = status === 'approved'
                                const isPending = status === 'pending'

                                return (
                                    <div key={module.id} className="bg-bg-card border border-border-primary rounded-2xl p-6 transition-all hover:border-cyan/30">
                                        <div className="flex flex-col gap-6">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isApproved ? 'bg-green-500/10 text-green-500' :
                                                            isRejected ? 'bg-orange-500/10 text-orange-500' :
                                                                isPending ? 'bg-cyan/10 text-cyan' :
                                                                    'bg-bg-card-hover text-text-secondary'
                                                        }`}>
                                                        {isApproved ? <CheckCircle2 size={24} /> :
                                                            isRejected ? <AlertCircle size={24} /> :
                                                                isPending ? <Clock size={24} /> :
                                                                    <FileText size={24} />}
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-text-secondary uppercase mb-1">
                                                            Module {module.order} • {module.phase}
                                                        </div>
                                                        <h3 className="text-lg font-bold text-text-primary">{module.title}</h3>
                                                        <p className="text-sm text-text-secondary mt-1">
                                                            {deliverable?.submittedAt ?
                                                                `Envoyé le ${new Date(deliverable.submittedAt?.toDate?.() || deliverable.submittedAt).toLocaleDateString()}` :
                                                                "Pas encore de soumission"
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                {status && (
                                                    <Badge variant={isApproved ? 'success' : isRejected ? 'warning' : 'info'}>
                                                        {isApproved ? 'Validé' : isRejected ? 'À retravailler' : 'En attente'}
                                                    </Badge>
                                                )}
                                            </div>

                                            {deliverable?.feedback && (
                                                <div className="bg-bg-card-hover rounded-xl p-4 border border-border-primary flex gap-3">
                                                    <MessageSquare className="text-text-secondary shrink-0 mt-1" size={18} />
                                                    <div>
                                                        <h4 className="text-sm font-bold text-text-primary mb-1">Feedback du formateur</h4>
                                                        <p className="text-sm text-text-secondary leading-relaxed">
                                                            {deliverable.feedback}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {deliverable?.correction?.url && (
                                                <div className="bg-cyan/5 border border-cyan/20 rounded-xl p-4 flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
                                                        <FileText size={20} className="text-cyan" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-bold text-text-primary mb-0.5">Correction disponible</h4>
                                                        <p className="text-xs text-text-secondary truncate">
                                                            {deliverable.correction.filename}
                                                        </p>
                                                    </div>
                                                    <a
                                                        href={deliverable.correction.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        download
                                                        className="flex items-center gap-2 px-4 py-2 bg-cyan text-black text-sm font-bold rounded-lg hover:bg-cyan/90 transition-colors shrink-0"
                                                    >
                                                        <Download size={15} />
                                                        Télécharger
                                                    </a>
                                                </div>
                                            )}

                                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                                {deliverable?.content && (
                                                    <a
                                                        href={deliverable.content}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="px-4 py-2.5 bg-bg-card-hover hover:bg-bg-secondary border border-border-primary rounded-lg text-sm text-text-primary font-medium flex items-center gap-2 transition-colors"
                                                    >
                                                        <FileText size={16} />
                                                        Voir mon travail
                                                    </a>
                                                )}

                                                {isRejected && inputs[module.id] === undefined && (
                                                    <Button
                                                        onClick={() => setInputs({ ...inputs, [module.id]: '' })}
                                                        variant="primary"
                                                        size="sm"
                                                    >
                                                        <RefreshCw size={16} className="mr-2" />
                                                        Renvoyer une version
                                                    </Button>
                                                )}
                                            </div>

                                            {(!status || (isRejected && inputs[module.id] !== undefined)) && (
                                                <div className="bg-bg-secondary rounded-xl p-6 border border-border-primary space-y-4">
                                                    <div className="flex items-center gap-2 text-text-primary font-bold text-sm mb-2">
                                                        <UploadCloud size={18} className="text-cyan" />
                                                        Soumettre votre travail
                                                    </div>

                                                    <div className="flex flex-col md:flex-row gap-4">
                                                        <div className="flex-1 space-y-2">
                                                            <label className="text-xs text-text-secondary uppercase tracking-wider font-bold">Lien direct (Notion, Drive...)</label>
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    placeholder="https://..."
                                                                    value={inputs[module.id] || ''}
                                                                    onChange={(e) => setInputs({ ...inputs, [module.id]: e.target.value })}
                                                                    className="h-11"
                                                                />
                                                                <Button
                                                                    variant="primary"
                                                                    onClick={() => handleSubmit(module.id)}
                                                                    disabled={!inputs[module.id]?.trim() || submitting === module.id || uploading === module.id}
                                                                >
                                                                    {submitting === module.id ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} />}
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        <div className="hidden md:flex flex-col items-center justify-center px-4">
                                                            <div className="w-px h-full bg-border-primary" />
                                                            <span className="text-[10px] py-1 text-text-secondary font-bold text-center">OU</span>
                                                            <div className="w-px h-full bg-border-primary" />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-xs text-text-secondary uppercase tracking-wider font-bold">Fichier (PDF, Image)</label>
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                ref={el => fileInputRefs.current[module.id] = el}
                                                                onChange={(e) => handleFileUpload(module.id, e.target.files[0])}
                                                            />
                                                            <Button
                                                                variant="secondary"
                                                                onClick={() => triggerFileInput(module.id)}
                                                                className="w-full md:w-auto h-11 flex items-center gap-3 px-6"
                                                                disabled={submitting === module.id || uploading === module.id}
                                                            >
                                                                {uploading === module.id ? (
                                                                    <Loader2 size={18} className="animate-spin text-cyan" />
                                                                ) : (
                                                                    <>
                                                                        <UploadCloud size={20} className="text-cyan" />
                                                                        <span>Fichier</span>
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Deliverables
