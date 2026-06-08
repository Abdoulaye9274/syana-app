import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { Input, Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { getUserProfile, createUserDocument } from '@/services/users'
import { useState } from 'react'
import { validateEmail } from '@/utils/validation'
import { toast } from 'react-hot-toast'
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth'
import { auth } from '@/services/firebase/config'

const Login = () => {
    const navigate = useNavigate()
    const { login, loginWithGoogle } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        // Basic Validations
        if (!validateEmail(email)) {
            setError("Veuillez entrer une adresse email valide.")
            return
        }
        if (!password) {
            setError("Veuillez entrer votre mot de passe.")
            return
        }

        setIsLoading(true)

        try {
            await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
            await login(email, password)
            toast.success('Bon retour parmi nous !')
            navigate('/tableau-de-bord')
        } catch (err) {
            console.error(err)
            if (err.code === 'auth/invalid-credential') {
                setError("Email ou mot de passe incorrect.")
            } else {
                setError("Une erreur est survenue lors de la connexion.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setError('')
        setIsLoading(true)
        try {
            const credential = await loginWithGoogle()
            const user = credential.user

            // Check if user exists in database
            const profile = await getUserProfile(user.uid)
            if (!profile) {
                // New user via Google, create document
                const names = user.displayName ? user.displayName.split(' ') : ['']
                const firstName = names[0] || ''
                const lastName = names.slice(1).join(' ') || ''

                await createUserDocument(user.uid, {
                    email: user.email,
                    displayName: user.displayName || '',
                    firstName,
                    lastName
                })
            }
            navigate('/tableau-de-bord')
        } catch (err) {
            console.error(err)
            setError("Impossible de se connecter avec Google.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-bg-primary flex">
            {/* Left Column - Promo */}
            <div className="hidden lg:flex w-1/2 bg-bg-card p-12 flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-5" />
                <div className="relative z-10 max-w-lg mx-auto">
                    <div className="mb-8 pl-1">
                        <img src="/logo.png" alt="SYANA" className="h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]" />
                    </div>

                    <h2 className="text-4xl font-bold text-text-primary mb-6 leading-tight">
                        Votre succès commence ici.
                    </h2>

                    <p className="text-text-secondary text-lg mb-8">
                        Rejoignez des centaines d'entrepreneurs qui structurent leur business avec clarté et méthode.
                    </p>

                    <ul className="space-y-4">
                        {[
                            'Système guidé étape par étape',
                            'Progression mesurable et résultats concrets',
                            'Autonomie totale dans votre avancement'
                        ].map((item, index) => (
                            <li key={index} className="flex items-center text-text-primary text-lg">
                                <span className="w-2 h-2 rounded-full bg-cyan mr-4" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-bg-primary">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-text-primary mb-2">Connexion</h2>
                        <p className="text-text-secondary">
                            Accédez à votre tableau de bord SYANA
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg flex items-center gap-3 text-sm">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-800 font-semibold rounded-button border border-gray-200 hover:bg-gray-50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                        >
                            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continuer avec Google
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border-primary"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-bg-primary text-text-secondary">Ou avec un email</span>
                            </div>
                        </div>

                        <Input
                            label="Email"
                            type="email"
                            placeholder="votre@email.com"
                            value={email}
                            onChange={(e) => { setError(''); setEmail(e.target.value) }}
                            required
                        />

                        <div>
                            <Input
                                label="Mot de passe"
                                type="password"
                                showToggle
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => { setError(''); setPassword(e.target.value) }}
                                required
                            />
                            <div className="flex justify-end mt-2">
                                <Link
                                    to="/mot-de-passe-oublie"
                                    className="text-sm text-cyan hover:text-cyan/80 transition-colors"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 rounded border-border-primary bg-bg-card text-cyan focus:ring-cyan/20 cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary cursor-pointer">
                                Se souvenir de moi
                            </label>
                        </div>

                        <Button
                            className="w-full shadow-glow-cyan"
                            size="lg"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            Se connecter
                        </Button>

                        <div className="text-center">
                            <p className="text-text-secondary">
                                Pas encore de compte ?{' '}
                                <Link to="/inscription" className="text-cyan font-semibold hover:text-cyan/80 transition-colors">
                                    Créer un compte
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default Login
