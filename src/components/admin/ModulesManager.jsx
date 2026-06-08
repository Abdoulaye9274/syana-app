import { useState, useEffect } from 'react'
import { Card, Button, Input, Badge, Loading } from '@/components/ui'
import { Plus, Edit2, Trash2, Save, X, GripVertical, Video, FileText, Check, UploadCloud, Loader2 } from 'lucide-react'
import { collection, query, orderBy, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/services/firebase/config'
import { toast } from 'react-hot-toast'

const ModulesManager = () => {
    const [modules, setModules] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingModule, setEditingModule] = useState(null) // null = list mode, object = edit mode, {} = create mode

    useEffect(() => {
        fetchModules()
    }, [])

    const fetchModules = async () => {
        setLoading(true)
        try {
            const q = query(collection(db, 'modules'), orderBy('order', 'asc'))
            const snapshot = await getDocs(q)
            setModules(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        } catch (error) {
            console.error("Error fetching modules:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce module ?")) return
        try {
            await deleteDoc(doc(db, 'modules', id))
            setModules(prev => prev.filter(m => m.id !== id))
        } catch (error) {
            console.error("Error deleting module:", error)
            toast.error("Erreur lors de la suppression.")
        }
    }

    const handleSave = async (moduleData) => {
        try {
            // If new, create ID based on order or random
            const isNew = !moduleData.id
            const moduleId = moduleData.id || `module_${Date.now()}`

            const docRef = doc(db, 'modules', moduleId)
            const dataToSave = {
                ...moduleData,
                updatedAt: serverTimestamp()
            }
            if (isNew) dataToSave.createdAt = serverTimestamp()

            await setDoc(docRef, dataToSave, { merge: true })

            setEditingModule(null)
            fetchModules() // Refresh list
        } catch (error) {
            console.error("Error saving module:", error)
            toast.error("Erreur lors de la sauvegarde.")
        }
    }

    if (loading && !editingModule) return <Loading />

    // EDIT MODE
    if (editingModule) {
        return (
            <ModuleEditor
                initialData={editingModule}
                onSave={handleSave}
                onCancel={() => setEditingModule(null)}
            />
        )
    }

    // LIST MODE
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-text-primary">Gestion des Modules</h3>
                <Button onClick={() => setEditingModule({ order: modules.length + 1, lessons: [] })} variant="primary" size="sm">
                    <Plus size={16} className="mr-2" /> Nouveau Module
                </Button>
            </div>

            <div className="grid gap-4">
                {modules.map((module) => (
                    <Card key={module.id} className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center transition-all hover:border-text-secondary/40">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="bg-bg-card border border-border-primary w-12 h-12 rounded-lg flex items-center justify-center font-bold text-cyan text-xl">
                                {module.order}
                            </div>
                            <div>
                                <h4 className="font-bold text-text-primary text-lg">{module.title}</h4>
                                <div className="flex gap-2 text-sm text-text-secondary">
                                    <Badge variant="secondary">{module.phase}</Badge>
                                    <span>{module.lessons?.length || 0} leçons</span>
                                    <span>• {module.duration}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" onClick={() => setEditingModule(module)}>
                                <Edit2 size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-500 hover:bg-red-500/10" onClick={() => handleDelete(module.id)}>
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {modules.length === 0 && (
                <div className="text-center py-10 text-text-secondary border border-dashed border-border-primary rounded-xl">
                    Aucun module. Créez-en un ou utilisez le "Seeder" pour démarrer.
                </div>
            )}
        </div>
    )
}

const ModuleEditor = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(initialData)
    const [uploading, setUploading] = useState(null) // index of lesson being uploaded

    const addLesson = () => {
        setFormData(prev => ({
            ...prev,
            lessons: [...(prev.lessons || []), { title: '', type: 'video', duration: '10 min', contentUrl: '' }]
        }))
    }

    const updateLesson = (index, field, value) => {
        const newLessons = [...(formData.lessons || [])]
        newLessons[index] = { ...newLessons[index], [field]: value }
        setFormData(prev => ({ ...prev, lessons: newLessons }))
    }

    const removeLesson = (index) => {
        const newLessons = [...(formData.lessons || [])]
        newLessons.splice(index, 1)
        setFormData(prev => ({ ...prev, lessons: newLessons }))
    }

    const handleFileUpload = async (index, file) => {
        if (!file) return

        setUploading(index)
        try {
            // Path: course_content/{timestamp}_{filename}
            const storageRef = ref(storage, `course_content/${Date.now()}_${file.name}`)
            const snapshot = await uploadBytes(storageRef, file)
            const downloadURL = await getDownloadURL(snapshot.ref)

            updateLesson(index, 'contentUrl', downloadURL)
            // Auto update type if possible
            if (file.type.includes('pdf') || file.type.includes('document')) updateLesson(index, 'type', 'document')
            if (file.type.includes('video')) updateLesson(index, 'type', 'video')

        } catch (error) {
            console.error("Upload failed", error)
            toast.error("Échec de l'upload.")
        } finally {
            setUploading(null)
        }
    }

    return (
        <div className="bg-bg-card border border-border-primary rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-border-primary pb-4">
                <h3 className="text-xl font-bold text-text-primary">
                    {initialData.id ? 'Modifier le module' : 'Créer un module'}
                </h3>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={onCancel}>Annuler</Button>
                    <Button variant="primary" onClick={() => onSave(formData)}>
                        <Save size={16} className="mr-2" /> Enregistrer
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT: Module Metadata */}
                <div className="space-y-4">
                    <Input
                        label="Titre du module"
                        value={formData.title || ''}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Phase"
                            value={formData.phase || ''}
                            onChange={e => setFormData({ ...formData, phase: e.target.value })}
                            placeholder="ex: FONDATIONS"
                        />
                        <Input
                            label="Ordre"
                            type="number"
                            value={formData.order || ''}
                            onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        />
                    </div>
                    <Input
                        label="Durée estimée"
                        value={formData.duration || ''}
                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="ex: 2h 30min"
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-secondary">Description</label>
                        <textarea
                            className="bg-bg-primary border border-border-primary rounded-lg p-3 text-text-primary text-sm focus:border-cyan outline-none min-h-[100px]"
                            value={formData.description || ''}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>

                {/* RIGHT: Lessons & Content */}
                <div className="bg-bg-secondary/30 rounded-xl p-4 border border-border-primary flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-text-primary">Leçons & Contenu</h4>
                        <Button variant="secondary" size="sm" onClick={addLesson}><Plus size={14} /> Ajouter</Button>
                    </div>

                    <div className="space-y-4 overflow-y-auto flex-1 pr-2 max-h-[600px]">
                        {(formData.lessons || []).map((lesson, idx) => (
                            <div key={idx} className="bg-bg-card border border-border-primary p-4 rounded-lg flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-bold text-cyan uppercase">Leçon {idx + 1}</span>
                                    <button onClick={() => removeLesson(idx)} className="text-red-400 hover:text-red-300">
                                        <X size={14} />
                                    </button>
                                </div>

                                <Input
                                    placeholder="Titre de la leçon"
                                    value={lesson.title}
                                    onChange={e => updateLesson(idx, 'title', e.target.value)}
                                    className="h-9 text-sm"
                                />

                                <div className="flex gap-2">
                                    <select
                                        className="bg-bg-primary border border-border-primary rounded-md text-xs text-text-primary h-9 px-2 w-1/3"
                                        value={lesson.type}
                                        onChange={e => updateLesson(idx, 'type', e.target.value)}
                                    >
                                        <option value="video">Vidéo</option>
                                        <option value="document">Document (PDF/Word)</option>
                                        <option value="quiz">Quiz</option>
                                    </select>
                                    <Input
                                        placeholder="Durée"
                                        value={lesson.duration}
                                        onChange={e => updateLesson(idx, 'duration', e.target.value)}
                                        className="h-9 text-xs w-1/3"
                                    />
                                </div>

                                {/* UPLOAD AREA */}
                                <div className="border-t border-border-primary pt-3 mt-1">
                                    <label className="text-xs text-text-secondary mb-2 block">
                                        Contenu ({lesson.type === 'video' ? 'Vidéo MP4' : 'Fichier'})
                                    </label>

                                    <div className="flex gap-2 items-center">
                                        <Input
                                            placeholder="URL du fichier (ou upload)"
                                            value={lesson.contentUrl || ''}
                                            onChange={e => updateLesson(idx, 'contentUrl', e.target.value)}
                                            className="h-9 text-xs flex-1"
                                            readOnly={uploading === idx}
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                className="hidden"
                                                id={`file-${idx}`}
                                                accept={lesson.type === 'video' ? "video/*" : ".pdf,.doc,.docx"}
                                                onChange={(e) => handleFileUpload(idx, e.target.files[0])}
                                            />
                                            <label
                                                htmlFor={`file-${idx}`}
                                                className={`h-9 px-3 rounded-md flex items-center justify-center cursor-pointer transition-colors ${uploading === idx ? 'bg-bg-card cursor-not-allowed' : 'bg-cyan/10 hover:bg-cyan/20 text-cyan'}`}
                                            >
                                                {uploading === idx ? (
                                                    <Loader2 size={16} className="animate-spin" />
                                                ) : (
                                                    <UploadCloud size={18} />
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                    {lesson.contentUrl && (
                                        <p className="text-[10px] text-green-400 mt-1 flex items-center gap-1">
                                            <Check size={10} /> Fichier lié
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {(formData.lessons || []).length === 0 && (
                            <div className="text-center text-xs text-text-secondary py-4">Pas de leçons</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModulesManager
