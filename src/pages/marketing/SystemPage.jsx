import { Navbar, Footer } from '@/components/layout'
import { Button, Card, Badge } from '@/components/ui'
import { Check, Lock, Unlock, ArrowRight, Layers, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const SystemPage = () => {
    const pillars = [
        {
            icon: Layers,
            title: "Structure Séquentielle",
            desc: "Fini le chaos. Chaque étape construit la suivante. Vous ne pouvez pas construire le toit sans les fondations."
        },
        {
            icon: Lock,
            title: "Focus Radical",
            desc: "Les modules futurs sont verrouillés. Cela vous force à terminer ce que vous commencez et élimine la procrastination."
        },
        {
            icon: Target,
            title: "Action Immédiate",
            desc: "Chaque module se termine par un livrable concret. Pas de théorie sans pratique. Vous avancez ou vous restez bloqué."
        }
    ]

    const modules = [
        { phase: "Fondations", color: "text-cyan", items: ["Vision & Positionnement", "Étude de Marché", "Persona & Client Idéal"] },
        { phase: "Offre", color: "text-violet", items: ["Offre Irrésistible", "Pricing & Business Model", "Identité de Marque"] },
        { phase: "Acquisition", color: "text-fuchsia-500", items: ["Stratégie Marketing", "Tunnel de Vente", "Création de Contenu"] },
        { phase: "Vente", color: "text-rose-500", items: ["Script de Vente", "Objections & Closing", "Suivi & CRM"] },
        { phase: "Croissance", color: "text-blue-500", items: ["Délégation & Équipe", "Systématisation", "Juridique & Finance"] }
    ]

    return (
        <div className="min-h-screen bg-bg-primary font-sans text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan/10 rounded-full blur-[100px] pointer-events-none" />

                <h1 className="relative z-10 text-4xl md:text-6xl font-bold mb-6">
                    Pas juste une formation. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
                        Un système d'exploitation.
                    </span>
                </h1>
                <p className="relative z-10 text-xl text-text-secondary max-w-2xl mx-auto mb-10">
                    La plupart des entrepreneurs échouent par manque de clarté, pas par manque de volonté.
                    Le système SYANA élimine le bruit pour ne laisser que l'essentiel.
                </p>
            </section>

            {/* The 3 Pillars */}
            <section className="py-20 bg-bg-secondary border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pillars.map((p, i) => (
                            <div key={i} className="bg-bg-card p-8 rounded-2xl border border-white/5 hover:border-cyan/30 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-cyan mb-6">
                                    <p.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Roadmap */}
            <section className="py-24 px-6 relative">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Le parcours de transformation</h2>
                        <p className="text-text-secondary">15 modules répartis en 5 phases critiques</p>
                    </div>

                    <div className="space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan via-violet to-transparent hidden md:block" />

                        {modules.map((phase, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-8 relative group">
                                {/* Phase Marker */}
                                <div className="hidden md:flex flex-col items-center shrink-0 w-14">
                                    <div className={`w-14 h-14 rounded-full bg-bg-primary border-4 border-bg-secondary flex items-center justify-center font-bold text-lg relative z-10 ${phase.color}`}>
                                        {i + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <Card className="flex-1 hover:border-white/20 transition-all">
                                    <h3 className={`text-xl font-bold mb-4 ${phase.color}`}>{phase.phase}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {phase.items.map((item, j) => (
                                            <div key={j} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                                <div className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center text-xs text-secondary font-mono">
                                                    {i * 3 + j + 1}
                                                </div>
                                                <span className="text-sm font-medium text-white/90">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gamification / Unlock Logic */}
            <section className="py-24 bg-bg-secondary relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <Badge className="mb-6 bg-violet/10 text-violet border-violet/20">La Méthode "Lockstep"</Badge>
                        <h2 className="text-4xl font-bold mb-6">Pourquoi nous verrouillons les modules ?</h2>
                        <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                            L'apprentissage en "buffet à volonté" ne fonctionne pas. Vous picorez, vous survolez, et vous n'appliquez rien.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Élimine le syndrome de l'objet brillant",
                                "Garantit que les fondamentaux sont acquis",
                                "Récompense l'action par la progression"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white">
                                    <Check className="text-green-500" size={20} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/inscription">
                            <Button className="shadow-none">
                                Je veux tester la méthode
                            </Button>
                        </Link>
                    </div>

                    {/* Visual Demo */}
                    <div className="flex-1 relative">
                        <div className="relative z-10 bg-bg-primary p-6 rounded-2xl border border-white/10 shadow-2xl space-y-4 max-w-sm mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Check className="text-green-500" size={20} />
                                    <span className="font-bold text-white">Module 1 : Vision</span>
                                </div>
                                <Badge status="completed" className="bg-green-500/20 text-green-500 border-0">Validé</Badge>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan/10 to-transparent border border-cyan/20 rounded-xl relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-cyan/5 z-0" />
                                <div className="relative z-10 flex items-center gap-3">
                                    <Zap className="text-cyan fill-current" size={20} />
                                    <span className="font-bold text-white">Module 2 : Marché</span>
                                </div>
                                <Badge status="in_progress" className="relative z-10">En cours</Badge>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl opacity-50">
                                <div className="flex items-center gap-3">
                                    <Lock className="text-text-secondary" size={20} />
                                    <span className="font-bold text-text-secondary">Module 3 : Client</span>
                                </div>
                                <Badge status="locked" className="bg-white/5 text-white/30 border-0">Verrouillé</Badge>
                            </div>
                        </div>

                        {/* Decor */}
                        <div className="absolute inset-0 bg-violet/20 blur-[80px] -z-10" />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center px-6">
                <h2 className="text-3xl font-bold mb-8">Arrêtez de deviner. Commencez à bâtir.</h2>
                <Link to="/inscription">
                    <Button size="lg" className="h-14 px-10 rounded-full shadow-glow-cyan">
                        Rejoindre le programme <ArrowRight className="ml-2" />
                    </Button>
                </Link>
            </section>

            <Footer />
        </div>
    )
}

export default SystemPage
