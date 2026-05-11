import { Navbar, Footer } from '@/components/layout'
import { Button } from '@/components/ui'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, scaleIn } from '@/utils/animations'

const testimonials = [
    {
        text: "Avant SYANA, j'avais 1000 idées mais 0 structure. Aujourd'hui mon offre est claire et je vends régulièrement. En moins de 2 mois j'ai trouvé mes premiers clients.",
        author: "Sophie M.",
        role: "Freelance Marketing",
        photo: "https://i.pravatar.cc/80?img=5",
        stars: 5,
        highlight: "J'ai trouvé mes premiers clients en 2 mois."
    },
    {
        text: "La méthode est incroyable. Pas de blabla, que du concret. J'ai rentabilisé l'investissement en 2 semaines. Le système de modules verrouillés m'a forcé à vraiment avancer.",
        author: "Marc D.",
        role: "Coach Sportif",
        photo: "https://i.pravatar.cc/80?img=12",
        stars: 5,
        highlight: "Rentabilisé en 2 semaines."
    },
    {
        text: "C'est l'outil qui manquait à mon business. La clarté que ça apporte est juste inestimable. Je savais enfin dans quel ordre faire les choses.",
        author: "Lea P.",
        role: "E-commerçante",
        photo: "https://i.pravatar.cc/80?img=9",
        stars: 5,
        highlight: "Je savais enfin dans quel ordre faire les choses."
    },
    {
        text: "En 3 mois j'ai posé les bases solides de mon business. Ce que j'ai accompli avec SYANA dépasse mes attentes. Je recommande à tous ceux qui veulent vraiment passer à l'action.",
        author: "Thomas B.",
        role: "Consultant indépendant",
        photo: "https://i.pravatar.cc/80?img=68",
        stars: 5,
        highlight: "3 mois pour poser des bases solides."
    },
    {
        text: "Je recommande à 100%. Le système est brillant : tu ne peux pas aller trop vite, donc tu consolides vraiment. Ce n'est pas une formation de plus, c'est un vrai système.",
        author: "Aïcha K.",
        role: "Créatrice de contenu",
        photo: "https://i.pravatar.cc/80?img=47",
        stars: 5,
        highlight: "Un vrai système, pas une formation de plus."
    },
    {
        text: "J'avais essayé plusieurs formations avant SYANA. Aucune ne m'avait donné cette clarté. Le fait de soumettre des livrables et d'avoir un retour m'a vraiment fait progresser.",
        author: "Julie R.",
        role: "Coach Bien-être",
        photo: "https://i.pravatar.cc/80?img=16",
        stars: 5,
        highlight: "Une clarté qu'aucune autre formation ne m'avait donnée."
    }
]

const stats = [
    { value: "120+", label: "Entrepreneurs accompagnés" },
    { value: "14", label: "Modules guidés" },
    { value: "4.9/5", label: "Note moyenne" }
]

const TestimonialsPage = () => {
    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary">
            <Navbar />

            {/* ── Hero ── */}
            <section className="pt-36 pb-20 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan/[0.07] rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-violet/[0.07] rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <motion.span variants={fadeUp} className="text-cyan tracking-widest uppercase text-sm font-bold mb-4 block">
                        Témoignages
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Ils ont structuré{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet-400">
                            leur business
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Des entrepreneurs comme vous qui ont arrêté de tergiverser et ont commencé à construire avec méthode.
                    </motion.p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                    className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-16 pt-12 border-t border-border-primary max-w-2xl mx-auto"
                >
                    {stats.map((s, i) => (
                        <motion.div key={i} variants={fadeUp} className="text-center">
                            <div className="text-4xl font-bold text-text-primary mb-1">{s.value}</div>
                            <div className="text-sm text-text-secondary uppercase tracking-wider">{s.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── Grille de témoignages ── */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {testimonials.map((t, i) => (
                            <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                                <div className="bg-bg-card border border-border-primary rounded-2xl p-8 h-full flex flex-col hover:border-cyan/20 transition-all duration-300 hover:-translate-y-1 group">
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-5">
                                        {Array(t.stars).fill(0).map((_, s) => (
                                            <Star key={s} size={15} className="fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>

                                    {/* Highlight quote */}
                                    <p className="text-text-primary font-semibold text-lg mb-4 leading-snug">
                                        "{t.highlight}"
                                    </p>

                                    {/* Full text */}
                                    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                                        {t.text}
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-border-primary">
                                        <img src={t.photo} alt={t.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                                        <div>
                                            <div className="text-sm font-bold text-text-primary">{t.author}</div>
                                            <div className="text-xs text-text-secondary">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-6">
                <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="max-w-4xl mx-auto relative rounded-[2.5rem] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan/80 via-violet to-fuchsia-600" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />

                    <div className="relative z-10 px-8 py-20 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Prêt à écrire votre témoignage ?
                        </h2>
                        <p className="text-white/85 text-lg mb-10 max-w-xl mx-auto">
                            Rejoignez des centaines d'entrepreneurs qui ont choisi SYANA.
                        </p>
                        <Link to="/inscription">
                            <button className="group inline-flex items-center h-14 px-10 bg-white text-gray-900 hover:bg-gray-100 rounded-full text-base font-bold shadow-2xl transition-all duration-300">
                                Commencer maintenant
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    )
}

export default TestimonialsPage
