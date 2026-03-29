import { Navbar, Footer } from '@/components/layout'
import { Button } from '@/components/ui'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const WhySyana = () => {
    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 pt-40 pb-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-cyan font-bold tracking-wider uppercase text-sm mb-4 block">Notre Mission</span>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                        L'entrepreneuriat ne devrait pas être <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 italic">un chaos solitaire.</span>
                    </h1>
                </div>

                {/* Content Body */}
                <div className="prose prose-invert prose-lg mx-auto leading-relaxed text-text-secondary">
                    <p className="text-xl text-text-primary font-medium mb-8">
                        Nous avons créé SYANA parce que nous en avions assez de voir des entrepreneurs talentueux abandonner, non pas parce que leur idée était mauvaise, mais parce qu'ils étaient perdus dans l'exécution.
                    </p>

                    <h3 className="text-text-primary mt-12 mb-4">Le problème de l'information infinie</h3>
                    <p>
                        Aujourd'hui, l'information est partout. Vous pouvez trouver comment "faire un business plan" ou "lancer une pub FB" en 2 secondes sur YouTube.
                    </p>
                    <p>
                        Le problème, ce n'est plus l'accès à la connaissance. <strong className="text-text-primary">C'est l'ordre d'exécution.</strong>
                    </p>
                    <p>
                        Essayer de créer du contenu (Step 10) avant d'avoir validé son offre (Step 2) est la recette parfaite pour l'épuisement. C'est comme essayer de peindre les murs d'une maison qui n'a pas encore de toit.
                    </p>

                    <h3 className="text-text-primary mt-12 mb-4">La réponse : Une structure rigide pour une créativité libre</h3>
                    <p>
                        C'est contre-intuitif, mais la contrainte crée la liberté. En vous imposant un chemin balisé, un ordre précis, nous libérons votre esprit de la question angoissante : <em>"Qu'est-ce que je dois faire ce matin ?"</em>.
                    </p>
                    <p>
                        La réponse est toujours simple : <strong>La prochaine étape.</strong>
                    </p>

                    <div className="bg-text-secondary/10 border-l-4 border-cyan p-6 my-10 rounded-r-lg not-prose">
                        <p className="text-text-primary font-medium italic m-0">
                            "SYANA n'est pas là pour vous motiver. La motivation est éphémère. Nous sommes là pour vous discipliner par le système. La discipline est éternelle."
                        </p>
                    </div>

                    <h3 className="text-text-primary mt-8 mb-4">Notre promesse</h3>
                    <ul className="list-disc pl-6 space-y-2 marker:text-cyan">
                        <li>Pas de bla-bla théorique.</li>
                        <li>Des outils concrets.</li>
                        <li>Une progression que vous pouvez voir et toucher.</li>
                    </ul>
                </div>

                {/* Signature */}
                <div className="mt-16 pt-8 border-t border-border-primary flex items-center gap-4">
                    <div className="flex items-center justify-center">
                        <img src="/logo.png" alt="Syana" className="h-12 w-auto object-contain" />
                    </div>
                    <div>
                        <p className="font-bold text-text-primary">L'équipe Syana</p>
                        <p className="text-sm text-text-secondary">Obsédés par votre exécution.</p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link to="/inscription">
                        <Button size="lg" className="shadow-glow-cyan h-14 px-8 rounded-full">
                            Rejoindre le mouvement <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default WhySyana
