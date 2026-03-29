import { useState } from 'react'
import { ThumbsUp, ThumbsDown, X } from 'lucide-react'
import { Button } from '@/components/ui'
import { submitModuleReview } from '@/services/reviews'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

/**
 * Modal asking for feedback after a module is validated.
 * @param {boolean} isOpen - whether the modal is visible
 * @param {Function} onClose - callback to close the modal
 * @param {string} moduleId - the Firestore doc ID of the module
 * @param {string} moduleName - the display name of the module
 */
const ReviewModal = ({ isOpen, onClose, moduleId, moduleName }) => {
    const { user, userProfile } = useAuth()
    const [rating, setRating] = useState(null) // 'up' | 'down' | null
    const [comment, setComment] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async () => {
        if (!rating) {
            toast.error('Merci de donner un avis (👍 ou 👎)')
            return
        }
        if (!user) {
            toast.error('Vous devez être connecté pour donner un avis')
            return
        }

        try {
            setSubmitting(true)
            await submitModuleReview({
                userId: user.uid,
                userName: userProfile?.displayName || user.email,
                moduleId,
                moduleName,
                rating,
                comment: comment.trim()
            })
            setSubmitted(true)
        } catch (e) {
            console.error(e)
            toast.error('Erreur lors de l\'envoi de votre avis')
        } finally {
            setSubmitting(false)
        }
    }

    const handleClose = () => {
        setRating(null)
        setComment('')
        setSubmitted(false)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-bg-card border border-border-primary rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
                >
                    <X size={20} />
                </button>

                {submitted ? (
                    /* Thank you screen */
                    <div className="text-center py-4">
                        <div className="text-5xl mb-4">🎉</div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">Merci pour votre avis !</h3>
                        <p className="text-text-secondary text-sm mb-6">
                            Votre retour nous aide à améliorer la formation.
                        </p>
                        <Button onClick={handleClose} className="w-full">Continuer</Button>
                    </div>
                ) : (
                    /* Feedback form */
                    <>
                        <div className="text-center mb-8">
                            <div className="text-3xl mb-3">💬</div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">
                                Ce cours vous permet-il de progresser ?
                            </h3>
                            {moduleName && (
                                <p className="text-text-secondary text-sm">
                                    Module : <span className="text-text-primary font-medium">{moduleName}</span>
                                </p>
                            )}
                        </div>

                        {/* Thumbs rating */}
                        <div className="flex justify-center gap-6 mb-8">
                            <button
                                onClick={() => setRating('up')}
                                className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all ${rating === 'up'
                                        ? 'border-green-500 bg-green-500/10 text-green-400 scale-105'
                                        : 'border-border-primary bg-bg-card-hover text-text-secondary hover:border-border-primary'
                                    }`}
                            >
                                <ThumbsUp size={28} />
                                <span className="text-sm font-medium">Oui !</span>
                            </button>
                            <button
                                onClick={() => setRating('down')}
                                className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all ${rating === 'down'
                                        ? 'border-red-500 bg-red-500/10 text-red-500 scale-105'
                                        : 'border-border-primary bg-bg-card-hover text-text-secondary hover:border-border-primary'
                                    }`}
                            >
                                <ThumbsDown size={28} />
                                <span className="text-sm font-medium">À améliorer</span>
                            </button>
                        </div>

                        {/* Optional comment */}
                        <div className="mb-6">
                            <label className="text-sm text-text-primary font-medium block mb-2">
                                Un commentaire ? <span className="text-text-secondary font-normal">(optionnel)</span>
                            </label>
                            <textarea
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder="Dites-nous ce qui pourrait être amélioré…"
                                rows={3}
                                className="w-full bg-bg-primary border border-border-primary rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 outline-none resize-none transition-colors"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleClose}
                                className="flex-1 py-3 rounded-lg border border-border-primary text-text-secondary hover:text-text-primary hover:border-text-secondary text-sm font-medium transition-colors"
                            >
                                Passer
                            </button>
                            <Button
                                onClick={handleSubmit}
                                loading={submitting}
                                disabled={submitting || !rating}
                                className="flex-1"
                            >
                                Envoyer mon avis
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ReviewModal
