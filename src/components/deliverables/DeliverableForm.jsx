import { useState } from 'react'
import { Button, Input, Card } from '@/components/ui'
import { Upload, X, File, Loader2 } from 'lucide-react'
import { submitDeliverable, uploadDeliverableFile } from '@/services/deliverables'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

const DeliverableForm = ({ moduleId, moduleOrder, moduleTitle, onSuccess, onCancel }) => {
    const { user } = useAuth()
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState([])
    const [uploadingFiles, setUploadingFiles] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleFileSelect = async (e) => {
        const selectedFiles = Array.from(e.target.files)
        
        for (const file of selectedFiles) {
            if (files.length >= 5) {
                toast.error('Maximum 5 fichiers autorisés')
                break
            }
            
            if (file.size > 10 * 1024 * 1024) { // 10MB max
                toast.error(`Le fichier ${file.name} dépasse 10MB`)
                continue
            }
            
            setUploadingFiles(prev => [...prev, file.name])
            
            try {
                const uploadedFile = await uploadDeliverableFile(user.uid, moduleId, file)
                setFiles(prev => [...prev, uploadedFile])
                toast.success(`${file.name} uploadé avec succès`)
            } catch (error) {
                console.error('Error uploading file:', error)
                toast.error(`Erreur lors de l'upload de ${file.name}`)
            } finally {
                setUploadingFiles(prev => prev.filter(name => name !== file.name))
            }
        }
    }

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!title.trim() || !type.trim()) {
            toast.error('Veuillez remplir tous les champs obligatoires')
            return
        }
        
        setIsSubmitting(true)
        
        try {
            await submitDeliverable(user.uid, moduleId, {
                moduleOrder,
                title,
                type,
                content,
                files: files.map(f => f.url)
            })
            
            toast.success('Livrable soumis avec succès !')
            
            // Reset form
            setTitle('')
            setType('')
            setContent('')
            setFiles([])
            
            if (onSuccess) {
                onSuccess()
            }
        } catch (error) {
            console.error('Error submitting deliverable:', error)
            toast.error('Erreur lors de la soumission du livrable')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">
                Soumettre un livrable pour {moduleTitle}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Input
                        label="Titre du livrable *"
                        placeholder="Ex: Canvas Vision complété"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <Input
                        label="Type de livrable *"
                        placeholder="Ex: Canvas Vision, Analyse concurrentielle, Fiche Persona..."
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Description / Contenu
                    </label>
                    <textarea
                        className="w-full bg-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:outline-none focus:border-cyan resize-none"
                        rows="6"
                        placeholder="Décrivez votre livrable, vos réflexions, vos résultats..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Fichiers joints (optionnel)
                    </label>
                    <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-cyan/30 transition-colors">
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            multiple
                            onChange={handleFileSelect}
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                            disabled={files.length >= 5 || uploadingFiles.length > 0}
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center gap-2"
                        >
                            <Upload className="text-cyan" size={32} />
                            <span className="text-text-secondary text-sm">
                                Cliquez pour uploader ou glissez-déposez
                            </span>
                            <span className="text-xs text-text-secondary">
                                PDF, Word, Excel, Images (max 10MB par fichier, 5 fichiers max)
                            </span>
                        </label>
                    </div>
                    
                    {files.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-bg-primary border border-white/10 rounded-lg p-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <File className="text-cyan" size={20} />
                                        <div>
                                            <p className="text-sm text-white">{file.name}</p>
                                            <p className="text-xs text-text-secondary">
                                                {(file.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {uploadingFiles.length > 0 && (
                        <div className="mt-4 flex items-center gap-2 text-cyan text-sm">
                            <Loader2 className="animate-spin" size={16} />
                            <span>Upload en cours: {uploadingFiles.join(', ')}</span>
                        </div>
                    )}
                </div>
                
                <div className="flex gap-4">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="flex-1"
                        >
                            Annuler
                        </Button>
                    )}
                    <Button
                        type="submit"
                        disabled={isSubmitting || uploadingFiles.length > 0}
                        loading={isSubmitting}
                        className="flex-1 shadow-glow-cyan"
                    >
                        Soumettre le livrable
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default DeliverableForm
