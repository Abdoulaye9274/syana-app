import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { startCheckout } from '@/services/stripe'
import { toast } from 'react-hot-toast'

const PricingCard = ({ plan }) => {
    const { name, price, interval, subtitle, description, features, recommended, priceId, color } = plan
    const { user } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleCheckout = async () => {
        // Non connecté → rediriger vers inscription avec le plan en mémoire
        if (!user) {
            navigate(`/inscription?redirect=/tarifs`)
            return
        }

        if (!priceId) {
            toast.error('Ce plan n\'est pas encore disponible.')
            return
        }

        setLoading(true)
        try {
            const { url } = await startCheckout(priceId)
            // Redirection vers Stripe Checkout (page hébergée par Stripe — PCI DSS compliant)
            window.location.href = url
        } catch (err) {
            console.error('Checkout error:', err)
            toast.error('Une erreur est survenue. Veuillez réessayer.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`relative flex flex-col h-full ${recommended ? 'transform md:-translate-y-4' : ''}`}>
            {recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="cyan" className="px-4 py-1 text-sm font-bold shadow-glow-cyan uppercase tracking-wider">
                        Le plus populaire
                    </Badge>
                </div>
            )}

            <Card
                variant={recommended ? 'gradient' : 'default'}
                className={`flex flex-col h-full p-8 ${recommended ? 'border-none shadow-glow-violet' : 'border-border-primary hover:border-text-secondary'}`}
            >
                <div className="mb-6">
                    <h3 className={`text-2xl font-bold mb-1 ${recommended ? 'text-white' : 'text-text-primary'}`}>
                        {name}
                    </h3>
                    {subtitle && (
                        <p className={`text-sm font-medium mb-4 ${recommended ? 'text-white/80' : 'text-text-secondary'}`}>
                            {subtitle}
                        </p>
                    )}
                    <div className="flex items-baseline gap-1">
                        <span className={`text-4xl font-bold ${recommended ? 'text-white' : 'text-text-primary'}`}>
                            {price}€
                        </span>
                        <span className={`text-sm ${recommended ? 'text-white/80' : 'text-text-secondary'}`}>/{interval}</span>
                    </div>
                    {plan.tva && (
                        <p className={`text-xs mt-1 mb-2 ${recommended ? 'text-white/60' : 'text-text-secondary/60'}`}>
                            {plan.tva}
                        </p>
                    )}
                    <p className={`mt-4 text-sm leading-relaxed ${recommended ? 'text-white/90' : 'text-text-secondary'}`}>
                        {description}
                    </p>
                </div>

                <div className="flex-1 mb-8">
                    <ul className="space-y-4">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                                <CheckCircle2
                                    size={18}
                                    className={`shrink-0 mt-0.5 ${recommended ? 'text-white' : 'text-cyan'}`}
                                />
                                <span className={recommended ? 'text-white/90' : 'text-text-secondary'}>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`w-full mt-auto py-3 px-6 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                        recommended
                            ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30 shadow-lg'
                            : 'bg-bg-primary/50 hover:bg-bg-card-hover text-text-primary border border-border-primary hover:border-cyan/50'
                    }`}
                >
                    {loading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Chargement...
                        </>
                    ) : (
                        plan.buttonText || 'Choisir ce plan'
                    )}
                </button>

                <p className={`text-center text-xs mt-3 ${recommended ? 'text-white/50' : 'text-text-secondary/50'}`}>
                    Paiement sécurisé · Annulation à tout moment
                </p>
            </Card>
        </div>
    )
}

export default PricingCard
