import { Navbar, Footer } from '@/components/layout'
import { Button } from '@/components/ui'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, fadeIn, stagger } from '@/utils/animations'

const WhySyana = () => {
    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 pt-40 pb-24">
                {/* Header */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-16"
                >
                    <motion.span variants={fadeUp} className="text-cyan font-bold tracking-wider uppercase text-sm mb-4 block">
                        Notre Mission
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                        L'entrepreneuriat ne devrait pas être{' '}
                        <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 italic">
                            un chaos solitaire.
                        </span>
                    </motion.h1>
                </motion.div>

                {/* Content */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="space-y-8"
                >
                    <motion.p variants={fadeUp} className="text-xl text-text-primary font-medium leading-relaxed">
                        Nous avons créé SYANA parce que nous en avions assez de voir des entrepreneurs talentueux abandonner,
                        non pas parce que leur idée était mauvaise, mais parce qu'ils étaient perdus dans l'exécution.
                    </motion.p>

                    <motion.div variants={fadeUp} className="prose prose-invert prose-lg mx-auto leading-relaxed text-text-secondary space-y-6">
                        <h3 className="text-text-primary text-2xl font-bold mt-12 mb-4">Le problème de l'information infinie</h3>
                        <p>
                            Aujourd'hui, l'information est partout. Vous pouvez trouver comment "faire un business plan"
                            ou "lancer une pub FB" en 2 secondes sur YouTube.
                        </p>
                        <p>
                            Le problème, ce n'est plus l'accès à la connaissance.{' '}
                            <strong className="text-text-primary">C'est l'ordre d'exécution.</strong>
                        </p>
                        <p>
                            Essayer de créer du contenu (Step 10) avant d'avoir validé son offre (Step 2) est la recette parfaite
                            pour l'épuisement. C'est comme essayer de peindre les murs d'une maison qui n'a pas encore de toit.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="prose prose-invert prose-lg mx-auto leading-relaxed text-text-secondary space-y-6">
                        <h3 className="text-text-primary text-2xl font-bold mt-12 mb-4">La réponse : Une structure rigide pour une créativité libre</h3>
                        <p>
                            C'est contre-intuitif, mais la contrainte crée la liberté. En vous imposant un chemin balisé,
                            un ordre précis, nous libérons votre esprit de la question angoissante :{' '}
                            <em>"Qu'est-ce que je dois faire ce matin ?"</em>.
                        </p>
                        <p>
                            La réponse est toujours simple : <strong className="text-text-primary">La prochaine étape.</strong>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Quote */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="bg-text-secondary/10 border-l-4 border-cyan p-6 my-12 rounded-r-xl"
                >
                    <p className="text-text-primary font-medium italic text-lg leading-relaxed">
                        "SYANA n'est pas là pour vous motiver. La motivation est éphémère.
                        Nous sommes là pour vous discipliner par le système. La discipline est éternelle."
                    </p>
                </motion.div>

                {/* Promises */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="space-y-4"
                >
                    <motion.h3 variants={fadeUp} className="text-text-primary text-2xl font-bold mb-6">Notre promesse</motion.h3>
                    {[
                        "Pas de bla-bla théorique.",
                        "Des outils concrets.",
                        "Une progression que vous pouvez voir et toucher."
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            className="flex items-center gap-3 text-text-secondary text-lg"
                        >
                            <span className="w-2 h-2 rounded-full bg-cyan shrink-0" />
                            {item}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Signature */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-16 pt-8 border-t border-border-primary flex items-center gap-4"
                >
                    <img src="/logo.png" alt="Syana" className="h-12 w-auto object-contain" />
                    <div>
                        <p className="font-bold text-text-primary">L'équipe Syana</p>
                        <p className="text-sm text-text-secondary">Obsédés par votre exécution.</p>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Link to="/inscription">
                        <Button size="lg" className="shadow-glow-cyan h-14 px-10 rounded-full">
                            Rejoindre le mouvement <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>

            <Footer />
        </div>
    )
}

export default WhySyana
