import { useState } from 'react'
import { Card, Button } from '@/components/ui'
import { ExternalLink, Mail } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { openBillingPortal } from '@/services/stripe'
import { toast } from 'react-hot-toast'

const BillingTab = () => {
    const { userProfile } = useAuth()
    const [loading, setLoading] = useState(false)
    const isPremium = ['active', 'trialing'].includes(userProfile?.subscriptionStatus)

    const handleManageBilling = async () => {
        setLoading(true)
        try {
            const { url } = await openBillingPortal()
            window.location.href = url
        } catch {
            toast.error('Impossible d\'ouvrir le portail de facturation. Réessayez.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <h3 className="text-xl font-bold text-text-primary mb-6">Historique de facturation</h3>

            {isPremium ? (
                <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 bg-cyan/10 rounded-full flex items-center justify-center mx-auto text-cyan">
                        <Mail size={32} />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-text-primary mb-2">Factures envoyées par email</h4>
                        <p className="text-text-secondary max-w-md mx-auto">
                            Pour simplifier la gestion, toutes vos factures sont envoyées directement par Stripe à l'adresse email : <strong className="text-text-primary">{userProfile?.email}</strong>.
                        </p>
                    </div>
                    <div className="pt-4">
                        <Button
                            variant="secondary"
                            className="border-border-primary hover:bg-bg-card-hover"
                            onClick={handleManageBilling}
                            loading={loading}
                            disabled={loading}
                        >
                            <ExternalLink size={16} className="mr-2" />
                            Gérer sur Stripe
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 text-text-secondary italic">
                    Aucun historique de facturation disponible pour le plan Gratuit.
                </div>
            )}
        </Card>
    )
}

export default BillingTab
