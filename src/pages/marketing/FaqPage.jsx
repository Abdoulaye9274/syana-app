import { Accordion } from '@/components/ui'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { HelpCircle, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/utils/animations'

const FaqPage = () => {
    const faqItems = [
        {
            title: "Qu'est-ce que SYANA précisément ?",
            content: "SYANA est un écosystème intelligent conçu pour structurer, automatiser et scaler votre business digital. Ce n'est pas qu'un outil, c'est une méthode guidée qui vous accompagne de la stratégie à l'exécution technique."
        },
        {
            title: "Comment fonctionne la période d'essai ?",
            content: "Nous offrons une période de test pour vous permettre d'explorer l'interface et les premiers modules. Aucune carte bancaire n'est requise pour commencer à structurer votre projet."
        },
        {
            title: "Puis-je changer de forfait à tout moment ?",
            content: "Oui, absolument. Vous pouvez passer à un forfait supérieur pour débloquer plus de fonctionnalités ou réduire votre abonnement selon l'évolution de vos besoins, sans engagement de longue durée."
        },
        {
            title: "Mes données sont-elles en sécurité ?",
            content: "La sécurité est notre priorité. Nous utilisons un cryptage de haut niveau et l'infrastructure robuste de Firebase (Google Cloud) pour garantir que vos données et vos stratégies restent strictement confidentielles."
        },
        {
            title: "Offrez-vous un accompagnement personnalisé ?",
            content: "En plus de la plateforme, nous proposons des options de support VIP et de coaching pour ceux qui souhaitent une accélération maximale de leur business avec un expert dédié."
        },
        {
            title: "Est-ce adapté si je débute totalement ?",
            content: "SYANA a été conçu pour être accessible. Les modules sont organisés par ordre de difficulté et de priorité stratégique pour que même un débutant puisse construire une base solide étape par étape."
        }
    ]

    return (
        <div className="min-h-screen bg-bg-primary">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
                            <HelpCircle size={16} />
                            Foire aux questions
                        </motion.div>
                        <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            Questions fréquentes
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-xl text-text-secondary">
                            Tout ce que vous devez savoir sur SYANA et comment nous pouvons transformer votre business.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                        className="mb-20"
                    >
                        <Accordion items={faqItems} />
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-bg-card to-bg-card-hover border border-border-primary rounded-3xl p-12 text-center"
                    >
                        <h2 className="text-2xl font-bold text-text-primary mb-4">Vous avez encore des questions ?</h2>
                        <p className="text-text-secondary mb-8">
                            Notre équipe est là pour vous répondre personnellement. Contactez-nous directement sur WhatsApp ou par email.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://wa.me/33745047086?text=Bonjour%20j'ai%20une%20question%20sur%20SYANA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5c] text-white px-8 py-3 rounded-button font-medium transition-all"
                            >
                                <MessageCircle size={20} />
                                Chat WhatsApp
                            </a>
                            <Link
                                to="/contact"
                                className="flex items-center gap-2 bg-bg-card hover:bg-bg-card-hover text-text-primary border border-border-primary px-8 py-3 rounded-button font-medium transition-all"
                            >
                                Page Contact
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default FaqPage
