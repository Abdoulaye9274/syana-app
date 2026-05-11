import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronDown, Rocket, Layers, TrendingUp, Target, Clock, Users } from 'lucide-react'
import { pricingPlans } from '@/data/pricingData'
import PricingCard from '@/components/pricing/PricingCard'
import { Navbar, Footer } from '@/components/layout'
import { Button } from '@/components/ui'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, scaleIn } from '@/utils/animations'

const features = [
    { icon: Layers, title: "Système structuré", description: "Fini la page blanche. Suivez un plan précis étape par étape." },
    { icon: Target, title: "Templates prêts", description: "Gagnez des centaines d'heures avec nos workbooks et structures Notion." },
    { icon: TrendingUp, title: "Progression visible", description: "Votre tableau de bord vous montre exactement où vous en êtes." },
    { icon: Rocket, title: "Méthode éprouvée", description: "Les stratégies qui ont fait leurs preuves, sans superflu théorique." },
    { icon: Clock, title: "À votre rythme", description: "Accès à vie. Avancez selon vos disponibilités et votre énergie." },
    { icon: Users, title: "Communauté engagée", description: "Ne soyez plus seul. Rejoignez des entrepreneurs qui partagent votre ambition." }
]

const faqs = [
    {
        q: "Est-ce adapté si je n'ai pas encore d'idée précise ?",
        a: "Absolument. Les premiers modules sont conçus pour vous aider à définir votre positionnement, trouver votre niche et valider votre idée avant de construire la suite."
    },
    {
        q: "Combien de temps dois-je y consacrer ?",
        a: "Le programme est pensé pour s'adapter à votre emploi du temps. En y consacrant 2 à 3 heures par semaine, vous verrez des progrès significatifs. L'accès est à vie, vous avancez à votre rythme."
    },
    {
        q: "Comment fonctionne la correction des livrables (plan Medium) ?",
        a: "À chaque étape clé, vous soumettez votre workbook ou template. Notre équipe l'analyse et vous envoie un feedback vidéo personnalisé pour corriger le tir avant de passer à l'étape suivante."
    },
    {
        q: "Puis-je changer de formule plus tard ?",
        a: "Oui, vous pouvez passer d'un plan Basic à Medium, ou de Medium à Premium à tout moment. Vous ne paierez que la différence au prorata."
    }
]

const FAQItem = ({ faq }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-b border-border-primary last:border-0">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-6 text-left"
            >
                <span className="font-bold text-text-primary pr-8">{faq.q}</span>
                <ChevronDown
                    className={`shrink-0 text-text-secondary transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>
            <motion.div
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
            >
                <div className="pb-6 text-text-secondary leading-relaxed">
                    {faq.a}
                </div>
            </motion.div>
        </div>
    )
}

const Pricing = () => {
    return (
        <div className="min-h-screen bg-bg-primary font-sans">
            <Navbar />

            <main className="pt-32 pb-20 overflow-hidden">
                {/* ── Hero Pricing ── */}
                <div className="relative mb-24 px-4">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan/[0.08] rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet/[0.08] rounded-full blur-[120px] pointer-events-none" />

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="text-center max-w-3xl mx-auto mb-16 relative z-10"
                    >
                        <motion.span variants={fadeUp} className="text-cyan tracking-wider uppercase text-sm font-bold mb-4 block">
                            Tarification Globale
                        </motion.span>
                        <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary mb-6">
                            Investissez dans votre{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet-400">
                                exécution
                            </span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-lg text-text-secondary">
                            Choisissez la formule qui correspond à votre ambition. Tous les plans incluent l'accès à vie aux mises à jour.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full relative z-10 items-stretch"
                    >
                        {pricingPlans.map((plan, i) => (
                            <motion.div key={plan.id} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                                <PricingCard plan={plan} />
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.6 }}
                        className="mt-12 text-center text-sm text-text-secondary"
                    >
                        <p>Paiement sécurisé par Stripe. Satisfait ou remboursé sous 14 jours.</p>
                    </motion.div>
                </div>

                {/* ── Pourquoi Syana ── */}
                <div className="py-24 bg-bg-secondary/50 border-y border-border-primary px-4 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            className="text-center mb-16"
                        >
                            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                                Pourquoi Syana ?
                            </motion.h2>
                            <motion.p variants={fadeUp} className="text-text-secondary text-lg">
                                Conçu pour arrêter de réfléchir et commencer à construire.
                            </motion.p>
                        </motion.div>

                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {features.map((feature, idx) => {
                                const Icon = feature.icon
                                return (
                                    <motion.div key={idx} variants={fadeUp}>
                                        <div className="bg-bg-card p-8 rounded-xl border border-border-primary hover:border-text-secondary transition-all duration-300 group hover:-translate-y-1 h-full">
                                            <div className="w-12 h-12 rounded-lg bg-text-secondary/10 flex items-center justify-center text-cyan mb-6 group-hover:scale-110 transition-transform">
                                                <Icon size={24} />
                                            </div>
                                            <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
                                            <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </div>
                </div>

                {/* ── FAQ ── */}
                <div className="py-24 px-4 max-w-3xl mx-auto relative z-10">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="text-center mb-12"
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl font-bold text-text-primary mb-4">
                            Questions fréquentes
                        </motion.h2>
                    </motion.div>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-bg-card rounded-2xl border border-border-primary px-6"
                    >
                        {faqs.map((faq, idx) => (
                            <FAQItem key={idx} faq={faq} />
                        ))}
                    </motion.div>
                </div>

                {/* ── CTA Final ── */}
                <div className="px-4 pb-12 relative z-10">
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="max-w-5xl mx-auto bg-gradient-to-r from-violet/20 to-cyan/20 border border-violet/30 rounded-3xl p-12 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6">
                                Prêt-e à structurer ton business ?
                            </h2>
                            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                                Arrêtez de collectionner les formations et commencez à construire un système d'exécution imparable.
                            </p>
                            <Link to="/inscription">
                                <Button size="lg" className="h-14 px-10 rounded-full shadow-glow-cyan font-bold">
                                    Rejoindre SYANA
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Pricing
