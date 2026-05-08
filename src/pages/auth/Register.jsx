import { Link, useNavigate } from 'react-router-dom'
import { Input, Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { createUserDocument, getUserProfile } from '@/services/users'
import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { validateEmail, validatePassword, validateRequired } from '@/utils/validation'
import { toast } from 'react-hot-toast'

const Register = () => {
    const navigate = useNavigate()
    const { signup, updateUser, loginWithGoogle } = useAuth()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')

        // Validations
        if (!validateRequired(firstName) || !validateRequired(lastName)) {
            setError("Le prénom et le nom sont requis.")
            return
        }
        if (!validateEmail(email)) {
            setError("L'adresse email n'est pas valide.")
            return
        }
        if (!validatePassword(password)) {
            setError("Le mot de passe doit faire au moins 8 caractères.")
            return
        }

        setIsLoading(true)

        try {
            // 1. Create Auth User
            const userCredential = await signup(email, password)
            const user = userCredential.user

            // 2. Update Profile Name
            await updateUser(`${firstName} ${lastName}`)

            // 3. Create User Document in Firestore
            await createUserDocument(user.uid, {
                email,
                displayName: `${firstName} ${lastName}`,
                firstName,
                lastName
            })

            toast.success('Bienvenue chez SYANA ! 🚀')
            navigate('/tableau-de-bord')
        } catch (err) {
            console.error(err)
            if (err.code === 'auth/email-already-in-use') {
                setError("Cet email est déjà utilisé.")
            } else if (err.code === 'auth/weak-password') {
                setError("Le mot de passe doit faire au moins 8 caractères.")
            } else {
                setError("Une erreur est survenue lors de l'inscription.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleRegister = async () => {
        setError('')
        setIsLoading(true)
        try {
            const credential = await loginWithGoogle()
            const user = credential.user

            const profile = await getUserProfile(user.uid)
            if (!profile) {
                const names = user.displayName ? user.displayName.split(' ') : ['']
                const fName = names[0] || ''
                const lName = names.slice(1).join(' ') || ''

                await createUserDocument(user.uid, {
                    email: user.email,
                    displayName: user.displayName || '',
                    firstName: fName,
                    lastName: lName
                })
            }
            navigate('/tableau-de-bord')
        } catch (err) {
            console.error(err)
            setError("Impossible de s'inscrire avec Google.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-fade-in">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-6">
                        <img src="/logo.png" alt="SYANA" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                    </div>
                    <h2 className="text-3xl font-bold text-text-primary mb-2">Créer un compte</h2>
                    <p className="text-text-secondary">
                        Commencez votre voyage vers la clarté et la réussite
                    </p>
                </div>

                <div className="bg-bg-card border border-border-primary rounded-2xl p-8 shadow-xl">
                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg flex items-center gap-3 text-sm">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleRegister}>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleGoogleRegister}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 mb-6 bg-white text-gray-800 border-transparent hover:bg-gray-100 shadow shadow-white/10 font-medium"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            S'inscrire avec Google
                        </Button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border-primary"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-bg-card text-text-secondary">Ou avec un email</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Prénom"
                                placeholder="Julie"
                                value={firstName}
                                onChange={(e) => { setError(''); setFirstName(e.target.value) }}
                                required
                            />
                            <Input
                                label="Nom"
                                placeholder="Martin"
                                value={lastName}
                                onChange={(e) => { setError(''); setLastName(e.target.value) }}
                                required
                            />
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
                            <p className="mt-1 text-xs text-text-secondary">
                                Minimum 8 caractères
                            </p>
                        </div>

                        <div className="flex items-start">
                            <input
                                id="cgu"
                                type="checkbox"
                                className="mt-1 h-4 w-4 rounded border-border-primary bg-bg-primary text-cyan focus:ring-cyan/20"
                                required
                            />
                            <label htmlFor="cgu" className="ml-2 block text-sm text-text-secondary">
                                J'accepte les{' '}
                                <a href="/cgu" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:underline">Conditions Générales d'Utilisation</a>
                                {' '}et la{' '}
                                <a href="/confidentialite" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:underline">Politique de Confidentialité</a>.
                            </label>
                        </div>

                        <Button
                            className="w-full shadow-glow-cyan"
                            size="lg"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            Créer mon compte
                        </Button>
                    </form>

                    <div className="text-center mt-8">
                        <p className="text-text-secondary">
                            Déjà un compte ?{' '}
                            <Link to="/connexion" className="text-cyan font-semibold hover:text-cyan/80 transition-colors">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-xs text-text-secondary mt-8">
                    🔒 Vos données sont sécurisées et cryptées.
                </p>
            </div>
        </div>
    )
}

export default Register
