import { Navbar, Footer } from '@/components/layout'
import { Button, Card, Badge } from '@/components/ui'
import { Play, ArrowRight, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useInView } from '@/hooks/useInView'

/* Wrapper d'animation réutilisable */
const FadeUp = ({ children, delay = 0, className = '' }) => {
    const [ref, isInView] = useInView()
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}

const FadeIn = ({ children, delay = 0, className = '' }) => {
    const [ref, isInView] = useInView()
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isInView ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}

const HomePage = () => {
    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary selection:bg-cyan/30">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center text-center px-6">
                {/* Ambient Background Glows */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-0 center w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-cyan/10 rounded-full blur-[100px] opacity-30" />
                    <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-fuchsia-600/20 rounded-full blur-[100px] opacity-30" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                    {/* Badge SYANA */}
                    <FadeUp delay={0}>
                        <div className="flex justify-center mb-6">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan to-violet blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 rounded-2xl" />
                                <div className="relative bg-text-secondary/10 backdrop-blur-xl border border-border-primary px-8 py-3 rounded-2xl shadow-2xl">
                                    <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan via-violet to-fuchsia-400 tracking-wider">
                                        SYANA
                                    </span>
                                </div>
                            </div>
                        </div>
                    </FadeUp>

                    {/* Titre principal */}
                    <FadeUp delay={150}>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                            Un système. <br />
                            Une méthode. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                                De la clarté.
                            </span>
                        </h1>
                    </FadeUp>

                    {/* Sous-titre */}
                    <FadeUp delay={300}>
                        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                            Transformez votre vision en entreprise structurée. Un parcours guidé, progressif et mesurable.
                        </p>
                    </FadeUp>

                    {/* CTAs */}
                    <FadeUp delay={450}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link to="/inscription">
                                <Button size="lg" className="h-14 px-8 rounded-full shadow-glow-cyan text-base">
                                    Commencer
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/demo">
                                <Button variant="secondary" size="lg" className="h-14 px-8 rounded-full border-border-primary hover:bg-bg-card-hover text-base">
                                    <Play className="mr-2 w-4 h-4 fill-current" />
                                    Voir la démo
                                </Button>
                            </Link>
                        </div>
                    </FadeUp>

                    {/* Stats Grid */}
                    <FadeUp delay={600}>
                        <div className="grid grid-cols-3 gap-4 md:gap-12 pt-16 mt-8 border-t border-border-primary w-full max-w-3xl mx-auto">
                            {[
                                { val: '14', label: 'modules guidés' },
                                { val: '∞', label: 'illimité' },
                                { val: '1', label: 'objectif clair' }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-text-secondary/10 border border-border-primary backdrop-blur-sm">
                                    <span className="text-2xl md:text-3xl font-bold text-text-primary mb-1">{stat.val}</span>
                                    <span className="text-xs md:text-sm text-text-secondary uppercase tracking-wider">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* WHY SYANA SECTION */}
            <section className="py-24 bg-bg-secondary/50 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi SYANA</h2>
                            <p className="text-text-secondary">Une approche différente pour structurer votre entreprise</p>
                        </div>
                    </FadeUp>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Structure guidée", desc: "Un système pas à pas qui transforme votre vision en plan d'action concret.", icon: "⚡" },
                            { title: "Modules progressifs", desc: "Avancez à votre rythme avec des étapes verrouillées pour assurer votre progression.", icon: "📈" },
                            { title: "Résultats concrets", desc: "Plus de théorie abstraite. Uniquement du pratique et des livrables validés.", icon: "🎯" }
                        ].map((item, i) => (
                            <FadeUp key={i} delay={i * 150}>
                                <div className="bg-bg-card p-8 rounded-3xl border border-border-primary hover:border-cyan/30 transition-all duration-300 group h-full">
                                    <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-text-primary mb-3">{item.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE SYSTEM STEPS */}
            <section className="py-32 bg-bg-primary relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeUp>
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">Le système guidé</h2>
                            <p className="text-text-secondary">De l'idée à la scalabilité</p>
                        </div>
                    </FadeUp>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        <div className="hidden md:block absolute top-[60px] left-0 w-full h-0.5 bg-gradient-to-r from-cyan/20 via-violet/20 to-transparent" />

                        {[
                            { step: "01", title: "Modules structurés", subtitle: "14 modules de formation guidée" },
                            { step: "02", title: "Progression validée", subtitle: "Livrables et feedbacks" },
                            { step: "03", title: "Résultats concrets", subtitle: "Business planifié, prêt, lancé" }
                        ].map((s, i) => (
                            <FadeUp key={i} delay={i * 200}>
                                <div className="relative z-10">
                                    <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-cyan to-transparent mb-4 opacity-50">
                                        {s.step}
                                    </div>
                                    <div className="h-1 w-20 bg-cyan rounded-full mb-6" />
                                    <h3 className="text-2xl font-bold text-text-primary mb-2">{s.title}</h3>
                                    <p className="text-text-secondary">{s.subtitle}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>

                    <FadeUp delay={200}>
                        <div className="mt-20 text-center">
                            <Link to="/systeme">
                                <Button variant="secondary" className="rounded-full px-8 border-border-primary hover:border-text-secondary bg-transparent">
                                    Découvrir le système complet <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-24 bg-bg-secondary relative">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Ils ont structuré leur business</h2>
                            <p className="text-text-secondary">Concrètement, qu'est-ce que ça change ?</p>
                        </div>
                    </FadeUp>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                text: "Avant SYANA, j'avais 1000 idées mais 0 structure. Aujourd'hui, mon offre est claire et je vends régulièrement.",
                                author: "Sophie M.",
                                role: "Freelance Marketing",
                                avatar: "SM"
                            },
                            {
                                text: "La méthode est incroyable. Pas de blabla, que du concret. J'ai rentabilisé l'investissement en 2 semaines.",
                                author: "Marc D.",
                                role: "Coach Sportif",
                                avatar: "MD"
                            },
                            {
                                text: "C'est l'outil qui manquait à mon business. La clarté que ça apporte est juste inestimable.",
                                author: "Lea P.",
                                role: "E-commerçante",
                                avatar: "LP"
                            }
                        ].map((t, i) => (
                            <FadeUp key={i} delay={i * 150}>
                                <div className="bg-bg-card p-8 rounded-2xl border border-border-primary relative h-full">
                                    <Quote className="text-cyan/20 absolute top-6 right-6" size={40} />
                                    <p className="text-text-secondary text-lg leading-relaxed mb-6 italic">"{t.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                                            {t.avatar}
                                        </div>
                                        <div>
                                            <div className="font-bold text-text-primary">{t.author}</div>
                                            <div className="text-xs text-text-secondary">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 px-6 relative">
                <FadeIn>
                    <div className="max-w-5xl mx-auto relative rounded-[2.5rem] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan via-violet to-fuchsia-600 opacity-90" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                        <div className="relative z-10 px-8 py-20 text-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Prêt à structurer votre business ?
                            </h2>
                            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                                Rejoignez Syana aujourd'hui et transformez votre année.
                            </p>
                            <Link to="/inscription">
                                <Button className="bg-white text-violet-900 hover:bg-white/90 h-14 px-10 rounded-full text-lg font-bold shadow-2xl">
                                    Commencer maintenant <ArrowRight className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </section>

            <Footer />
        </div>
    )
}

export default HomePage
