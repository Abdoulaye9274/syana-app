import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import { useAuth } from '@/context/AuthContext'

const ACTIVE_STATUSES = ['active', 'trialing', 'paused']
const MAX_WAIT_MS = 15000
const POLL_INTERVAL_MS = 2000

const PaymentSuccess = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(15)
    const pollRef = useRef(null)
    const startRef = useRef(Date.now())

    // Poll Firestore jusqu'à ce que le webhook ait mis à jour subscriptionStatus
    useEffect(() => {
        if (!user) return

        const check = async () => {
            const snap = await getDoc(doc(db, 'users', user.uid))
            const status = snap.data()?.subscriptionStatus
            if (ACTIVE_STATUSES.includes(status)) {
                clearInterval(pollRef.current)
                navigate('/tableau-de-bord', { replace: true })
            } else if (Date.now() - startRef.current >= MAX_WAIT_MS) {
                // Timeout — redirige quand même après 15s
                clearInterval(pollRef.current)
                navigate('/tableau-de-bord', { replace: true })
            }
        }

        pollRef.current = setInterval(check, POLL_INTERVAL_MS)
        return () => clearInterval(pollRef.current)
    }, [user, navigate])

    // Compte à rebours affiché
    useEffect(() => {
        if (countdown <= 0) return
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
        return () => clearTimeout(timer)
    }, [countdown])

    return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
            {/* Glow background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan/[0.08] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/3 w-[400px] h-[300px] bg-violet/[0.06] rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center max-w-lg w-full"
            >
                {/* Icône succès */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    className="flex items-center justify-center mb-8"
                >
                    <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                        <CheckCircle2 size={48} className="text-green-400" />
                    </div>
                </motion.div>

                {/* Titre */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
                >
                    Paiement confirmé !
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="text-text-secondary text-lg mb-2 leading-relaxed"
                >
                    Bienvenue dans SYANA. Votre abonnement est actif et votre accès est immédiat.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="text-text-secondary/60 text-sm mb-10"
                >
                    Un email de confirmation vous a été envoyé par Stripe.
                </motion.p>

                {/* Bouton principal */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        to="/tableau-de-bord"
                        className="group inline-flex items-center justify-center h-14 px-8 bg-gradient-to-r from-cyan to-violet rounded-full text-white font-bold text-base shadow-glow-cyan hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Accéder à mon espace
                        <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {/* Countdown */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-xs text-text-secondary/40 flex items-center justify-center gap-2"
                >
                    <Loader2 size={12} className="animate-spin" />
                    Activation en cours... redirection dans {countdown}s
                </motion.p>

                {/* Info RGPD discrète */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-4 text-xs text-text-secondary/30"
                >
                    Vous pouvez gérer ou annuler votre abonnement à tout moment depuis{' '}
                    <Link to="/compte" className="underline hover:text-text-secondary/60 transition-colors">
                        votre compte
                    </Link>.
                </motion.p>
            </motion.div>
        </div>
    )
}

export default PaymentSuccess
