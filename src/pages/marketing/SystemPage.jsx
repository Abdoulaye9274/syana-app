import { Navbar, Footer } from '@/components/layout'
import { Button, Card, Badge } from '@/components/ui'
import { Check, Lock, Zap, ArrowRight, Layers, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, stagger, scaleIn } from '@/utils/animations'

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
        { phase: "Offre", color: "text-violet-400", items: ["Offre Irrésistible", "Pricing & Business Model", "Identité de Marque"] },
        { phase: "Acquisition", color: "text-fuchsia-500", items: ["Stratégie Marketing", "Tunnel de Vente", "Création de Contenu"] },
        { phase: "Vente", color: "text-rose-500", items: ["Script de Vente", "Objections & Closing", "Suivi & CRM"] },
        { phase: "Croissance", color: "text-blue-400", items: ["Délégation & Équipe", "Systématisation", "Juridique & Finance"] }
    ]

    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary">
            <Navbar />

            {/* ── Hero ── */}
            <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/[0.08] rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet/[0.08] rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <motion.span variants={fadeUp} className="text-cyan tracking-widest uppercase text-sm font-bold mb-6 block">
                        Le système SYANA
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Pas juste une formation.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet-400">
                            Un système d'exploitation.
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        La plupart des entrepreneurs échouent par manque de clarté, pas par manque de volonté.
                        Le système SYANA élimine le bruit pour ne laisser que l'essentiel.
                    </motion.p>
                </motion.div>
            </section>

            {/* ── The 3 Pillars ── */}
            <section className="py-24 bg-bg-secondary border-y border-border-primary">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {pillars.map((p, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <div className="bg-bg-card p-8 rounded-2xl border border-border-primary hover:border-cyan/30 transition-all duration-500 h-full group hover:-translate-y-1">
                                    <div className="w-12 h-12 rounded-xl bg-text-secondary/10 flex items-center justify-center text-cyan mb-6 group-hover:scale-110 transition-transform">
                                        <p.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                                    <p className="text-text-secondary leading-relaxed">{p.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Roadmap ── */}
            <section className="py-24 px-6 relative">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="text-center mb-16"
                    >
                        <motion.span variants={fadeUp} className="text-violet-400 tracking-widest uppercase text-sm font-bold mb-4 block">
                            Parcours complet
                        </motion.span>
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
                            Le parcours de transformation
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-text-secondary text-lg">
                            15 modules répartis en 5 phases critiques
                        </motion.p>
                    </motion.div>

                    <div className="space-y-8 relative">
                        <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan via-violet-400 to-transparent hidden md:block" />

                        {modules.map((phase, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{ delay: i * 0.08 }}
                                className="flex flex-col md:flex-row gap-8 relative group"
                            >
                                <div className="hidden md:flex flex-col items-center shrink-0 w-14">
                                    <div className={`w-14 h-14 rounded-full bg-bg-primary border-4 border-bg-secondary flex items-center justify-center font-bold text-lg relative z-10 ${phase.color}`}>
                                        {i + 1}
                                    </div>
                                </div>
                                <Card className="flex-1 hover:border-text-secondary transition-all duration-300">
                                    <h3 className={`text-xl font-bold mb-4 ${phase.color}`}>{phase.phase}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {phase.items.map((item, j) => (
                                            <div key={j} className="flex items-center gap-3 bg-text-secondary/5 p-3 rounded-lg border border-border-primary">
                                                <div className="w-6 h-6 rounded-full bg-text-secondary/10 flex items-center justify-center text-xs text-text-primary font-mono shrink-0">
                                                    {i * 3 + j + 1}
                                                </div>
                                                <span className="text-sm font-medium text-text-primary">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Lockstep Method ── */}
            <section className="py-24 bg-bg-secondary relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="flex-1"
                    >
                        <Badge className="mb-6 bg-violet/10 text-violet-400 border-violet/20">La Méthode "Lockstep"</Badge>
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
                                <li key={i} className="flex items-center gap-3 text-text-primary">
                                    <Check className="text-green-500 shrink-0" size={20} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/inscription">
                            <Button className="rounded-full px-8">Je veux tester la méthode</Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 bg-bg-card p-6 rounded-2xl border border-border-primary shadow-lg space-y-4 max-w-sm mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Check className="text-green-500" size={20} />
                                    <span className="font-bold text-text-primary">Module 1 : Vision</span>
                                </div>
                                <Badge className="bg-green-500/20 text-green-500 border-0 text-xs">Validé</Badge>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan/10 to-transparent border border-cyan/20 rounded-xl relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-cyan/5 z-0" />
                                <div className="relative z-10 flex items-center gap-3">
                                    <Zap className="text-cyan fill-current" size={20} />
                                    <span className="font-bold text-text-primary">Module 2 : Marché</span>
                                </div>
                                <Badge className="relative z-10 text-xs">En cours</Badge>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-text-secondary/10 border border-border-primary rounded-xl opacity-50">
                                <div className="flex items-center gap-3">
                                    <Lock className="text-text-secondary" size={20} />
                                    <span className="font-bold text-text-secondary">Module 3 : Client</span>
                                </div>
                                <Badge className="bg-text-secondary/10 text-text-secondary border-0 text-xs">Verrouillé</Badge>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-violet/20 blur-[80px] -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 text-center px-6">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
                        Arrêtez de deviner. Commencez à bâtir.
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-text-secondary text-lg mb-10">
                        Rejoignez le programme et suivez votre chemin.
                    </motion.p>
                    <motion.div variants={fadeUp}>
                        <Link to="/inscription">
                            <Button size="lg" className="h-14 px-10 rounded-full shadow-glow-cyan">
                                Rejoindre le programme <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            <Footer />
        </div>
    )
}

export default SystemPage
