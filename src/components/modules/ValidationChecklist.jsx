import { useState } from 'react'
import { Card, Button } from '@/components/ui'
import { CheckCircle2, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { validateModule } from '@/services/progress'

/**
 * Bouton de validation d'un module.
 * Le bouton est actif uniquement si toutes les leçons du module ont été consultées.
 */
const ValidationChecklist = ({ moduleId, moduleOrder, totalLessons = 0, lessonsCompleted = [], onValidated }) => {
    const { user } = useAuth()
    const [validating, setValidating] = useState(false)

    const allLessonsDone = totalLessons === 0 || lessonsCompleted.length >= totalLessons
    const remaining = Math.max(0, totalLessons - lessonsCompleted.length)

    const onValidate = async () => {
        if (!user) return
        try {
            setValidating(true)
            await validateModule(user.uid, moduleId, moduleOrder)
            toast.success('Module validé ! Prochaine étape débloquée.')
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-text-primary">Valider ce module</h3>
                    <p className="text-sm text-text-secondary mt-1">
                        {allLessonsDone
                            ? 'Toutes les leçons ont été consultées. Vous pouvez valider.'
                            : `Il vous reste ${remaining} leçon${remaining > 1 ? 's' : ''} à consulter avant de pouvoir valider.`
                        }
                    </p>
                </div>
                <Button
                    onClick={onValidate}
                    disabled={!allLessonsDone || validating}
                    loading={validating}
                    className="shadow-none shrink-0"
                >
                    {allLessonsDone
                        ? <><CheckCircle2 size={16} className="mr-2" />Valider le module</>
                        : <><Lock size={16} className="mr-2" />{remaining} leçon{remaining > 1 ? 's' : ''} restante{remaining > 1 ? 's' : ''}</>
                    }
                </Button>
            </div>
        </Card>
    )
}

export default ValidationChecklist
