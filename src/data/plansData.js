export const plansData = [
    {
        id: 'basic',
        plan: 'basic',
        name: 'Basic',
        price: '97€',
        period: '/mois',
        description: 'L\'essentiel pour démarrer',
        features: [
            'Accès à la plateforme en illimité',
            'Les 10 modules fondamentaux',
            'Templates de gestion et de suivi',
            'Quiz et exercices par module',
            'Support par email'
        ],
        gradient: 'from-cyan to-blue-500',
    },
    {
        id: 'guided',
        plan: 'guided',
        name: 'Medium',
        price: '197€',
        period: '/mois',
        description: 'Avec accompagnement expert',
        features: [
            'Tout le contenu du Pack Basic',
            '2 sessions de coaching groupé/mois',
            'Correction de vos livrables sous 48h',
            'Accès à la communauté privée',
            'Replays des sessions de coaching'
        ],
        gradient: 'from-violet to-rose-500',
        popular: true
    },
    {
        id: 'premium',
        plan: 'premium',
        name: 'Premium',
        price: '397€',
        period: '/mois',
        description: 'Accompagnement sur-mesure',
        features: [
            'Tout le contenu du Pack Medium',
            '1 session de coaching individuel/mois',
            'Analyse complète de votre projet',
            'Réponse en 24h par chat',
            'Accès aux nouveaux modules en priorité'
        ],
        gradient: 'from-violet to-rose-500',
    }
]

export const getPlanById = (planId) => {
    return plansData.find(p => p.plan === planId || p.id === planId)
}
