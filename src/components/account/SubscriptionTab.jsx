import { Card, Button, Badge } from '@/components/ui'
import { CreditCard, Check, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { getPlanById } from '@/data/plansData'

const SubscriptionTab = () => {
    const { userProfile } = useAuth()

    // Fallback si pas de profil ou plan inconnu
    const currentPlanId = userProfile?.plan || 'free'
    const subscriptionStatus = userProfile?.subscriptionStatus || 'free'
    const planDetails = getPlanById(currentPlanId)

    const isActive = ['active', 'trialing'].includes(subscriptionStatus)

    if (currentPlanId === 'free' || !planDetails) {
        return (
            <div className="text-center py-12 bg-bg-card border border-border-primary rounded-2xl">
                <div className="w-16 h-16 bg-bg-card-hover rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="text-yellow-500" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Aucun abonnement actif</h3>
                <p className="text-text-secondary max-w-md mx-auto mb-8">
                    Vous êtes actuellement sur le plan gratuit. Passez à la vitesse supérieure pour débloquer tous les modules.
                </p>
                <Button
                    className="bg-cyan hover:bg-cyan/90 text-black font-bold px-8 shadow-glow-cyan"
                    onClick={() => window.location.href = '/tarifs'}
                >
                    Voir les offres
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Current Plan Card */}
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${planDetails.gradient} p-8 text-white shadow-xl`}>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-medium text-white/80 uppercase tracking-wider">Formule actuelle</span>
                                {isActive ? (
                                    <Badge variant="success" className="bg-white/20 text-white border-transparent">Actif</Badge>
                                ) : (
                                    <Badge variant="warning" className="bg-yellow-500/20 text-yellow-200 border-yellow-500/30">Inactif</Badge>
                                )}
                            </div>
                            <h2 className="text-4xl font-bold mb-2">{planDetails.name}</h2>
                            <p className="text-white/80">{planDetails.description}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-bold">
                            {planDetails.price}{planDetails.period}
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-white/80 block mb-1">Membre depuis le</span>
                                <span className="text-xl font-bold">
                                    {userProfile?.createdAt ? new Date(userProfile.createdAt.seconds * 1000).toLocaleDateString('fr-FR') : '-'}
                                </span>
                            </div>
                            {/* Mock data for billing cycle since we don't have stripe data yet */}
                            <div>
                                <span className="text-sm text-white/80 block mb-1">Prochain prélèvement (Est.)</span>
                                <span className="text-xl font-bold">15 du mois</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button
                            className="bg-white text-violet hover:bg-white/90 font-semibold"
                            onClick={() => window.location.href = 'mailto:support@syana.com?subject=Changement%20de%20formule'}
                        >
                            Changer de formule
                        </Button>
                        <Button
                            variant="secondary"
                            className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
                            onClick={() => window.location.href = 'mailto:support@syana.com?subject=Besoin%20d\'aide'}
                        >
                            Contacter le support
                        </Button>
                    </div>
                </div>
            </div>

            {/* Features Info */}
            <Card>
                <h3 className="text-xl font-bold text-text-primary mb-6">Inclus dans votre plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {planDetails.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-bg-card-hover rounded-lg">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                <Check size={14} />
                            </div>
                            <span className="text-text-secondary text-sm">{feature}</span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Danger Zone */}
            <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-text-primary mb-2">Zone de danger</h3>
                <p className="text-text-secondary text-sm mb-6 max-w-2xl">
                    Souhaitez-vous annuler votre abonnement ? Cette action suspendra votre accès aux modules et au coaching à la fin de la période en cours.
                </p>
                <Button
                    variant="danger"
                    className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white"
                    onClick={() => window.location.href = 'mailto:support@syana.com?subject=Demande%20de%20résiliation'}
                >
                    Demander la résiliation
                </Button>
            </div>
        </div>
    )
}

export default SubscriptionTab
