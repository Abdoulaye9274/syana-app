import { useEffect, useState } from 'react'
import { getAllReviews } from '@/services/reviews'
import { ThumbsUp, ThumbsDown, MessageSquare, RefreshCw } from 'lucide-react'
import { Loading } from '@/components/ui'

const AdminReviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchReviews = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await getAllReviews()
            setReviews(data)
        } catch (e) {
            console.error(e)
            setError('Impossible de charger les avis.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    const positiveCount = reviews.filter(r => r.rating === 'up').length
    const negativeCount = reviews.filter(r => r.rating === 'down').length
    const score = reviews.length > 0 ? Math.round((positiveCount / reviews.length) * 100) : null

    if (loading) return (
        <div className="flex justify-center py-12">
            <Loading size="md" />
        </div>
    )

    if (error) return (
        <div className="text-red-400 text-sm py-8 text-center">{error}</div>
    )

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-bg-card border border-border-primary rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-text-primary">{reviews.length}</div>
                    <div className="text-xs text-text-secondary mt-1">Avis total</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 flex items-center justify-center gap-1">
                        <ThumbsUp size={20} /> {positiveCount}
                    </div>
                    <div className="text-xs text-text-secondary mt-1">Positifs</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-red-400 flex items-center justify-center gap-1">
                        <ThumbsDown size={20} /> {negativeCount}
                    </div>
                    <div className="text-xs text-text-secondary mt-1">À améliorer</div>
                </div>
            </div>

            {score !== null && (
                <div className="text-center text-sm text-text-secondary">
                    Score de satisfaction : <span className={`font-bold text-lg ${score >= 70 ? 'text-green-400' : score >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>{score}%</span>
                </div>
            )}

            {/* Header + Refresh */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">Avis des apprenants</h3>
                <button
                    onClick={fetchReviews}
                    className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                    <RefreshCw size={14} /> Rafraîchir
                </button>
            </div>

            {/* Review list */}
            {reviews.length === 0 ? (
                <div className="text-text-secondary text-sm text-center py-8 bg-bg-secondary/30 rounded-xl">
                    Aucun avis reçu pour l'instant.
                </div>
            ) : (
                <div className="space-y-3">
                    {reviews.map(review => (
                        <div
                            key={review.id}
                            className={`bg-bg-card border rounded-xl p-5 ${review.rating === 'up' ? 'border-green-500/20' : 'border-red-500/20'}`}
                        >
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                    <p className="text-sm font-semibold text-text-primary">{review.userName || 'Anonyme'}</p>
                                    <p className="text-xs text-text-secondary">{review.moduleName || review.moduleId}</p>
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${review.rating === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {review.rating === 'up' ? <ThumbsUp size={13} /> : <ThumbsDown size={13} />}
                                    {review.rating === 'up' ? 'Positif' : 'À améliorer'}
                                </div>
                            </div>
                            {review.comment && (
                                <div className="bg-bg-secondary/30 rounded-lg p-3 text-sm text-text-secondary leading-relaxed flex gap-2">
                                    <MessageSquare size={14} className="text-text-secondary shrink-0 mt-0.5" />
                                    {review.comment}
                                </div>
                            )}
                            {review.createdAt?.toDate && (
                                <p className="text-xs text-text-secondary/50 mt-2 text-right">
                                    {review.createdAt.toDate().toLocaleDateString('fr-FR', {
                                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminReviews
