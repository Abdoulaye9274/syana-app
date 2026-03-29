import { useEffect, useMemo, useState } from 'react'
import { Card, Button } from '@/components/ui'
import { CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { getModuleProgress, updateValidationChecklist, validateModule } from '@/services/progress'

/**
 * Checklist de validation d'un module.
 * - Persiste dans Firestore: users/{userId}/progress/{moduleId}.checklistItems
 * - Permet de valider le module (débloque le suivant) uniquement si tout est coché
 */
const ValidationChecklist = ({ moduleId, moduleOrder, items = [], onValidated }) => {
    const { user } = useAuth()
    const [checklistItems, setChecklistItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [validating, setValidating] = useState(false)

    const initialItems = useMemo(() => {
        const normalized = (items || [])
            .filter(Boolean)
            .map((it) => {
                if (typeof it === 'string') return { label: it, completed: false }
                return { label: it.label || '', completed: Boolean(it.completed) }
            })
            .filter((it) => it.label.trim().length > 0)

        return normalized
    }, [items])

    useEffect(() => {
        const run = async () => {
            if (!user || !moduleId) {
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const existing = await getModuleProgress(user.uid, moduleId)
                if (existing?.checklistItems?.length) {
                    setChecklistItems(existing.checklistItems)
                } else {
                    setChecklistItems(initialItems)
                }
            } catch (e) {
                console.error(e)
                setChecklistItems(initialItems)
            } finally {
                setLoading(false)
            }
        }

        run()
    }, [user?.uid, moduleId, initialItems])

    const allChecked =
        checklistItems.length > 0 && checklistItems.every((it) => Boolean(it.completed))

    const toggleItem = async (index) => {
        if (!user) return

        const next = checklistItems.map((it, i) =>
            i === index ? { ...it, completed: !it.completed } : it
        )
        setChecklistItems(next)

        try {
            setSaving(true)
            await updateValidationChecklist(user.uid, moduleId, next)
        } catch (e) {
            console.error(e)
            toast.error('Impossible de sauvegarder la checklist')
        } finally {
            setSaving(false)
        }
    }

    const onValidate = async () => {
        if (!user) return
        if (!allChecked) {
            toast.error('Coche toutes les étapes avant de valider le module')
            return
        }

        try {
            setValidating(true)
            await validateModule(user.uid, moduleId, moduleOrder)
            toast.success('Module validé. Prochaine étape débloquée.')
            if (onValidated) onValidated()
        } catch (e) {
            console.error(e)
            toast.error('Erreur lors de la validation du module')
        } finally {
            setValidating(false)
        }
    }

    return (
        <Card className="border-border-primary bg-bg-card/30">
            <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-text-primary">Validation — Version 1</h3>
                    <p className="text-sm text-text-secondary">
                        Coche chaque étape pour confirmer ta progression.
                    </p>
                </div>
                <div className="text-xs text-text-secondary">
                    {checklistItems.filter((i) => i.completed).length}/{checklistItems.length}{' '}
                    complété
                </div>
            </div>

            {loading ? (
                <div className="text-text-secondary text-sm py-6">Chargement...</div>
            ) : checklistItems.length === 0 ? (
                <div className="text-text-secondary text-sm py-6">
                    Aucune checklist n’est configurée pour ce module.
                </div>
            ) : (
                <div className="space-y-3">
                    {checklistItems.map((item, idx) => (
                        <label
                            key={`${idx}-${item.label}`}
                            className="flex items-center gap-3 bg-bg-primary/30 border border-border-primary rounded-xl px-4 py-3 cursor-pointer hover:border-text-secondary transition-colors"
                        >
                            <input
                                type="checkbox"
                                checked={Boolean(item.completed)}
                                onChange={() => toggleItem(idx)}
                                className="h-4 w-4 rounded border-border-primary bg-bg-primary text-cyan focus:ring-cyan/20"
                            />
                            <span className="text-sm text-text-primary">{item.label}</span>
                        </label>
                    ))}
                </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-4">
                <div className="text-xs text-text-secondary">
                    {saving ? 'Sauvegarde…' : allChecked ? 'Prêt à valider.' : 'Encore quelques étapes.'}
                </div>
                <Button
                    onClick={onValidate}
                    disabled={loading || checklistItems.length === 0 || validating || !allChecked}
                    loading={validating}
                    className="shadow-none"
                >
                    <CheckCircle2 size={16} className="mr-2" />
                    Valider le module
                </Button>
            </div>
        </Card>
    )
}

export default ValidationChecklist

