import { LifeBuoy, BookOpen, MessageCircle, ArrowRight } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Link } from 'react-router-dom'

const SupportPage = () => {
    const supportOptions = [
        {
            icon: <BookOpen className="text-cyan" size={32} />,
            title: "Centre d'aide",
            description: "Explorez nos guides détaillés pour maîtriser toutes les fonctionnalités de SYANA.",
            link: "#",
            action: "Voir les guides"
        },
        {
            icon: <MessageCircle className="text-purple-500" size={32} />,
            title: "Support direct",
            description: "Discutez en direct avec notre équipe technique pour résoudre vos blocages.",
            link: "https://wa.me/33745047086",
            action: "Lancer le chat",
            external: true
        },
        {
            icon: <LifeBuoy className="text-rose-500" size={32} />,
            title: "Assistance VIP",
            description: "Un accompagnement sur-mesure pour votre stratégie business.",
            link: "/contact",
            action: "Contacter un expert"
        }
    ]

    return (
        <div className="min-h-screen bg-bg-primary">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 text-cyan text-sm font-medium mb-6">
                            <LifeBuoy size={16} />
                            Centre de Support
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Comment pouvons-nous vous aider ?
                        </h1>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Notre équipe est dévouée à votre succès. Choisissez le canal qui vous convient le mieux.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {supportOptions.map((option, index) => (
                            <Card key={index} className="p-8 hover:border-cyan/30 transition-all group">
                                <div className="mb-6">{option.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-4">{option.title}</h3>
                                <p className="text-text-secondary mb-8 leading-relaxed">
                                    {option.description}
                                </p>
                                {option.external ? (
                                    <a
                                        href={option.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-cyan font-medium group-hover:gap-3 transition-all"
                                    >
                                        {option.action}
                                        <ArrowRight size={18} />
                                    </a>
                                ) : (
                                    <Link
                                        to={option.link}
                                        className="inline-flex items-center gap-2 text-cyan font-medium group-hover:gap-3 transition-all"
                                    >
                                        {option.action}
                                        <ArrowRight size={18} />
                                    </Link>
                                )}
                            </Card>
                        ))}
                    </div>

                    {/* FAQ Preview */}
                    <div className="bg-bg-card border border-white/5 rounded-3xl p-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Une question fréquente ?</h2>
                        <p className="text-text-secondary mb-8 max-w-xl mx-auto">
                            Consultez notre foire aux questions pour obtenir des réponses immédiates aux interrogations les plus courantes.
                        </p>
                        <Link to="/faq">
                            <Button variant="outline" className="px-8">
                                Aller à la FAQ
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default SupportPage
