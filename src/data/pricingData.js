export const pricingPlans = [
    {
        id: 'start',
        name: 'Basic',
        price: '97',
        interval: 'mois',
        subtitle: 'Autonomie',
        description: 'Pour commencer à structurer son business de manière autonome et solide.',
        features: [
            'Accès à la plateforme en illimité',
            'Les 10 modules fondamentaux de la formation',
            'Templates de gestion et de suivi de projet',
            'Quiz et exercices de fin de chaque module',
            'Ressources complémentaires à télécharger',
            'Support par email'
        ],
        buttonText: 'Commencer - Basic',
        recommended: false,
        paymentLink: 'https://buy.stripe.com/test_basic_link_placeholder',
        color: 'text-white'
    },
    {
        id: 'guided',
        name: 'Medium',
        price: '197',
        interval: 'mois',
        subtitle: 'Boost & accompagnement',
        description: 'Pour ceux qui veulent un suivi personnalisé et booster leur passage à l\'action.',
        features: [
            'Tout le contenu du Pack Basic',
            '2 sessions de coaching groupé par mois',
            'Challenge mensuel avec coaching exclusif',
            'Accès à la communauté privée des élèves',
            'Correction de vos exercices sous 48h',
            'Appels de groupe hebdomadaires',
            'Replays des sessions de coaching',
            'Accès à vie à la formation'
        ],
        buttonText: 'Choisir - Medium',
        recommended: true,
        paymentLink: 'https://buy.stripe.com/test_guided_link_placeholder',
        color: 'text-cyan'
    },
    {
        id: 'premium',
        name: 'Premium',
        price: '397',
        interval: 'mois',
        subtitle: 'Accompagnement sur-mesure',
        description: 'Pour avoir un accompagnement individuel, ultra-personnalisé avec des objectifs clairs.',
        features: [
            'Tout le contenu du Pack Medium',
            'Accès en illimité à l\'expertise de nos experts',
            '1 session de coaching individuel par mois',
            'Analyse de 100% de votre projet',
            'Correction de vos plans business',
            'Réponse en 24h par chat',
            'Accès aux nouveaux modules prioritaires',
            'Missions d\'audit de votre business',
            'Paiement en 3x possible'
        ],
        buttonText: 'Accéder au Premium',
        recommended: false,
        paymentLink: 'https://buy.stripe.com/test_premium_link_placeholder',
        color: 'text-violet'
    }
]
