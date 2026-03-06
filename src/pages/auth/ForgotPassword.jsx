import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Input, Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'

const ForgotPassword = () => {
    const { resetPassword } = useAuth()

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setIsLoading(true)

        try {
            await resetPassword(email)
            setSuccess('Un email de réinitialisation vous a été envoyé. Vérifiez votre boîte de réception (et vos spams).')
        } catch (err) {
            console.error(err)
            if (err.code === 'auth/user-not-found') {
                setError("Aucun compte n'est associé à cet email.")
            } else if (err.code === 'auth/invalid-email') {
                setError("L'adresse email n'est pas valide.")
            } else {
                setError("Une erreur est survenue lors de l'envoi de l'email.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-fade-in">

                <Link to="/connexion" className="inline-flex items-center text-text-secondary hover:text-text-primary transition-colors mb-8 text-sm font-medium gap-2">
                    <ArrowLeft size={16} />
                    Retour à la connexion
                </Link>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-6">
                        <img src="/logo.png" alt="SYANA" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                    </div>
                    <h2 className="text-3xl font-bold text-text-primary mb-2">Mot de passe oublié</h2>
                    <p className="text-text-secondary">
                        Saisissez votre adresse email pour réinitialiser votre mot de passe.
                    </p>
                </div>

                <div className="bg-bg-card border border-border-primary rounded-2xl p-8 shadow-xl">
                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg flex items-start gap-3 text-sm">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <p>{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg flex items-start gap-3 text-sm">
                            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                            <p>{success}</p>
                        </div>
                    )}

                    {!success && (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <Input
                                label="Email"
                                type="email"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <Button
                                className="w-full shadow-glow-cyan"
                                size="lg"
                                loading={isLoading}
                                disabled={isLoading || !email}
                            >
                                Envoyer le lien
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
