import { Navbar, Footer } from '@/components/layout'
import { Button } from '@/components/ui'
import { ArrowRight, Play, Star, Zap, Target, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useInView as useFMInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { fadeUp, stagger, scaleIn } from '@/utils/animations'

// ── Animated counter ────────────────────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = '' }) => {
    const ref = useRef(null)
    const isInView = useFMInView(ref, { once: true, margin: '-50px' })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView) return
        let rafId
        const startTime = performance.now()
        const duration = 1500
        const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) rafId = requestAnimationFrame(animate)
        }
        rafId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafId)
    }, [isInView, target])

    return <span ref={ref}>{count}{suffix}</span>
}

// ── Line-by-line reveal headline ─────────────────────────────────────────────
const AnimatedHeadline = ({ lines }) => (
    <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-bold leading-[1.08] tracking-tight mb-8">
        {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-2">
                <motion.span
                    className={`block ${line.className || ''}`}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
                >
                    {line.text}
                </motion.span>
            </span>
        ))}
    </h1>
)

// ── Auto-scrolling testimonial marquee ───────────────────────────────────────
const CARD_W = 320
const CARD_GAP = 24

const TestimonialsMarquee = ({ items }) => {
    const doubled = [...items, ...items]
    return (
        <div className="overflow-hidden">
            <motion.div
                className="flex"
                animate={{ x: [0, -(items.length * (CARD_W + CARD_GAP))] }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
                {doubled.map((t, i) => (
                    <div
                        key={i}
                        style={{ width: CARD_W, marginRight: CARD_GAP, flexShrink: 0 }}
                        className="bg-bg-card border border-border-primary rounded-2xl p-6 hover:border-cyan/20 transition-colors"
                    >
                        <div className="flex gap-1 mb-4">
                            {Array(t.stars).fill(0).map((_, s) => (
                                <Star key={s} size={13} className="fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                        <div className="flex items-center gap-3">
                            <img src={t.photo} alt={t.author} className="w-9 h-9 rounded-full object-cover shrink-0" />
                            <div>
                                <div className="text-sm font-bold text-text-primary">{t.author}</div>
                                <div className="text-xs text-text-secondary">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

// ── Page ─────────────────────────────────────────────────────────────────────
const HomePage = () => {
    const [videoError, setVideoError] = useState(false)

    const testimonials = [
        { text: "Avant SYANA, j'avais 1000 idées mais 0 structure. Aujourd'hui mon offre est claire et je vends régulièrement.", author: "Sophie M.", role: "Freelance Marketing", photo: "https://i.pravatar.cc/80?img=5", stars: 5 },
        { text: "La méthode est incroyable. Pas de blabla, que du concret. J'ai rentabilisé l'investissement en 2 semaines.", author: "Marc D.", role: "Coach Sportif", photo: "https://i.pravatar.cc/80?img=12", stars: 5 },
        { text: "C'est l'outil qui manquait à mon business. La clarté que ça apporte est juste inestimable.", author: "Lea P.", role: "E-commerçante", photo: "https://i.pravatar.cc/80?img=9", stars: 5 },
        { text: "En 3 mois j'ai posé les bases solides de mon business. Ce que j'ai accompli dépasse mes attentes.", author: "Thomas B.", role: "Consultant indépendant", photo: "https://i.pravatar.cc/80?img=68", stars: 5 },
        { text: "Je recommande à 100%. Le système est brillant : tu ne peux pas aller trop vite, donc tu consolides vraiment.", author: "Aïcha K.", role: "Créatrice de contenu", photo: "https://i.pravatar.cc/80?img=47", stars: 5 }
    ]

    const features = [
        { icon: Layers, title: "Structure guidée", desc: "Un système pas à pas qui transforme votre vision en plan d'action concret. Fini la page blanche.", color: "text-cyan", bg: "bg-cyan/10" },
        { icon: Zap, title: "Progression séquentielle", desc: "Les modules se débloquent progressivement pour construire sur des fondations solides, pas de sauts.", color: "text-violet-400", bg: "bg-violet/10" },
        { icon: Target, title: "Résultats concrets", desc: "Chaque module se termine par un livrable réel. Pas de théorie sans pratique appliquée.", color: "text-fuchsia-400", bg: "bg-fuchsia-600/10" }
    ]

    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary selection:bg-cyan/30 overflow-x-hidden">
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative flex flex-col items-center text-center px-6 pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden" style={{ minHeight: '100svh' }}>
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    {!videoError && (
                        <video
                            className="absolute inset-0 w-full h-full object-cover opacity-[0.06]"
                            autoPlay muted loop playsInline
                            onError={() => setVideoError(true)}
                            src="/hero-video.mp4"
                        />
                    )}
                    <motion.div
                        className="absolute top-[-25%] left-[-5%] w-[75vw] h-[75vh] rounded-full bg-cyan/[0.13] blur-[130px]"
                        animate={{ x: [0, 40, -15, 0], y: [0, -35, 20, 0] }}
                        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute top-[0%] right-[-15%] w-[60vw] h-[60vh] rounded-full bg-violet/[0.14] blur-[130px]"
                        animate={{ x: [0, -30, 18, 0], y: [0, 28, -22, 0] }}
                        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                    />
                    <motion.div
                        className="absolute bottom-[-5%] left-[20%] w-[55vw] h-[45vh] rounded-full bg-fuchsia-600/[0.1] blur-[110px]"
                        animate={{ x: [0, 22, -18, 0], y: [0, -18, 22, 0] }}
                        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
                    />
                    <div className="absolute inset-0 bg-bg-primary/30" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto w-full">
                    {/* Badge SYANA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan to-violet blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 rounded-2xl" />
                            <div className="relative bg-text-secondary/10 backdrop-blur-xl border border-border-primary px-8 py-3 rounded-2xl shadow-2xl">
                                <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan via-violet to-fuchsia-400 tracking-wider">
                                    SYANA
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <AnimatedHeadline lines={[
                        { text: "Un système.", delay: 0.25 },
                        { text: "Une méthode.", delay: 0.45, className: "text-text-secondary" },
                        { text: "De la clarté.", delay: 0.65, className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan via-violet-400 to-fuchsia-400" }
                    ]} />

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Transformez votre vision en entreprise structurée.
                        <br className="hidden md:block" />
                        Un parcours guidé, progressif et mesurable.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.1 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Link to="/inscription">
                            <button className="group inline-flex items-center h-14 px-10 bg-white text-gray-900 hover:bg-gray-100 rounded-full text-base font-bold shadow-2xl shadow-white/10 transition-all duration-300">
                                Commencer maintenant
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </Link>
                        <Link to="/systeme">
                            <button className="inline-flex items-center h-14 px-10 bg-transparent text-text-primary border border-border-primary hover:border-cyan/40 hover:bg-bg-card/50 rounded-full text-base font-medium transition-all duration-300">
                                <Play className="mr-2 w-4 h-4 fill-current" />
                                Découvrir le système
                            </button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.3 }}
                        className="grid grid-cols-3 gap-4 sm:gap-12 pt-12 border-t border-border-primary max-w-lg mx-auto"
                    >
                        {[
                            { target: 14, suffix: '', label: 'modules guidés' },
                            { target: 120, suffix: '+', label: 'entrepreneurs actifs' },
                            { target: 97, suffix: '%', label: 'taux de satisfaction' }
                        ].map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-text-primary mb-1 tabular-nums">
                                    <AnimatedCounter target={s.target} suffix={s.suffix} />
                                </div>
                                <div className="text-xs md:text-sm text-text-secondary uppercase tracking-wider">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-6 h-10 rounded-full border-2 border-border-primary flex items-start justify-center pt-1.5"
                    >
                        <div className="w-1 h-2 bg-cyan rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ── FEATURES ── */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="text-center mb-20"
                    >
                        <motion.span variants={fadeUp} className="text-cyan tracking-widest uppercase text-sm font-bold mb-4 block">
                            Pourquoi SYANA
                        </motion.span>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">
                            Une approche radicalement différente
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed">
                            Pas une formation de plus. Un système d'exécution pour bâtir votre business pas à pas.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {features.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <motion.div key={i} variants={fadeUp}>
                                    <div className="bg-bg-card p-8 rounded-3xl border border-border-primary hover:border-cyan/30 transition-all duration-500 h-full group hover:-translate-y-1 cursor-default">
                                        <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className={item.color} size={26} />
                                        </div>
                                        <h3 className="text-xl font-bold text-text-primary mb-3">{item.title}</h3>
                                        <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── SYSTEM STEPS ── */}
            <section className="py-32 bg-bg-secondary/40 border-y border-border-primary relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="text-center mb-20"
                    >
                        <motion.span variants={fadeUp} className="text-violet-400 tracking-widest uppercase text-sm font-bold mb-4 block">
                            Le système
                        </motion.span>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">
                            De l'idée à la scalabilité
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-text-secondary text-xl max-w-xl mx-auto">
                            Un chemin précis, sans détours, du premier module au lancement.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                        <div className="hidden md:block absolute top-[52px] left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-cyan/30 via-violet/30 to-fuchsia-600/30" />

                        {[
                            { step: "01", title: "Modules structurés", subtitle: "14 modules de formation guidée avec livrables à chaque étape clé.", color: "text-cyan", border: "border-cyan/30", bg: "bg-cyan/5" },
                            { step: "02", title: "Progression validée", subtitle: "Feedback personnalisé sur vos livrables avant de passer à l'étape suivante.", color: "text-violet-400", border: "border-violet/30", bg: "bg-violet/5" },
                            { step: "03", title: "Business lancé", subtitle: "Offre positionnée, clients ciblés, système de vente opérationnel.", color: "text-fuchsia-400", border: "border-fuchsia-600/30", bg: "bg-fuchsia-600/5" }
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ delay: i * 0.15 }}
                                className="relative z-10 text-center md:text-left"
                            >
                                <div className={`inline-flex w-[104px] h-[104px] rounded-full ${s.bg} border-2 ${s.border} items-center justify-center mb-8 mx-auto md:mx-0`}>
                                    <span className={`text-4xl font-bold ${s.color}`}>{s.step}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-3">{s.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{s.subtitle}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <Link to="/systeme">
                            <Button variant="secondary" className="rounded-full px-8 border-border-primary hover:border-cyan/40">
                                Voir le système complet <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 mb-16">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="text-center"
                    >
                        <motion.span variants={fadeUp} className="text-fuchsia-400 tracking-widest uppercase text-sm font-bold mb-4 block">
                            Témoignages
                        </motion.span>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">
                            Ils ont structuré leur business
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-text-secondary text-xl">
                            Concrètement, qu'est-ce que ça change ?
                        </motion.p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <TestimonialsMarquee items={testimonials} />
                </motion.div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="py-24 px-6">
                <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="max-w-5xl mx-auto relative rounded-[2.5rem] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan/80 via-violet to-fuchsia-600" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
                    <motion.div
                        className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-3xl"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    />

                    <div className="relative z-10 px-8 py-24 text-center">
                        <motion.h2
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                        >
                            Prêt à structurer votre business ?
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-white/85 text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Rejoignez des centaines d'entrepreneurs qui ont choisi SYANA.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <Link to="/inscription">
                                <button className="group h-16 px-12 bg-white text-gray-900 hover:bg-gray-100 rounded-full text-lg font-bold shadow-2xl transition-all duration-300 inline-flex items-center gap-3">
                                    Commencer maintenant
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    )
}

export default HomePage
