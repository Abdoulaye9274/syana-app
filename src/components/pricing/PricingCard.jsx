import { CheckCircle2 } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'

const PricingCard = ({ plan }) => {
    const { name, price, interval, subtitle, description, features, recommended, paymentLink, color } = plan

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

                <a
                    href={paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-auto"
                >
                    {recommended ? (
                        <button className="w-full py-3 px-6 rounded-lg font-bold text-white bg-white/20 hover:bg-white/30 transition-all border border-white/30 shadow-lg">
                            {plan.buttonText || 'Choisir ce plan'}
                        </button>
                    ) : (
                        <Button
                            variant="secondary"
                            className="w-full justify-center group bg-bg-primary/50"
                        >
                            {plan.buttonText || 'Choisir ce plan'}
                        </Button>
                    )}
                </a>
            </Card>
        </div>
    )
}

export default PricingCard
