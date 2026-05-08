export const plansData = [
    {
        id: 'start',
        role: 'basic',
        name: 'Start',
        price: '97€',
        period: '/mois',
        description: 'L\'essentiel pour démarrer',
        features: [
            'Accès aux 14 modules',
            'Support par email',
            'Accès à la communauté'
        ],
        gradient: 'from-cyan-500 to-blue-500',
        stripeLink: 'https://buy.stripe.com/test_...' // Remplacez par vos vrais liens
    },
    {
        id: 'guided',
        role: 'guided',
        name: 'Guidée',
        price: '197€',
        period: '/mois',
        description: 'Avec accompagnement expert',
        features: [
            'Tout du plan Start',
            'Coaching de groupe hebdo',
            'Feedback sur vos livrables'
        ],
        gradient: 'from-violet-600 to-rose-500',
        stripeLink: 'https://buy.stripe.com/test_...',
        popular: true
    },
    {
        id: 'premium',
        role: 'premium',
        name: 'Premium',
        price: '497€',
        period: '/mois',
        description: 'L\'expérience ultime',
        features: [
            'Tout du plan Guidée',
            'Coaching individuel (2h/mois)',
            'Audit complet de votre business'
        ],
        gradient: 'from-violet-600 to-rose-500',
        stripeLink: 'https://buy.stripe.com/test_...'
    }
]

export const getPlanById = (planId) => {
    return plansData.find(p => p.role === planId || p.id === planId)
}
