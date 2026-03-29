import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Loading } from '@/components/ui'

const RequireAdmin = ({ children }) => {
    const { user, userProfile, loading: authLoading } = useAuth()

    if (authLoading) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <Loading size="lg" />
            </div>
        )
    }

    // Must be logged in
    if (!user) {
        return <Navigate to="/connexion" />
    }

    // Must be admin
    // We check if userProfile exists and has role == 'admin'
    // If userProfile is still loading (it might be async after auth), we might need to handle that state.
    // AuthContext sets loading=false ONLY after both auth and profile are fetched?
    // Looking at AuthContext: 
    // const profile = await getUserProfile(authUser.uid)
    // setUserProfile(profile)
    // setLoading(false)
    // So yes, loading=false implies profile is ready.

    if (userProfile?.role !== 'admin') {
        const handleRefresh = () => {
            window.location.reload()
        }

        return (
            <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
                <div className="max-w-xl w-full bg-bg-card border border-red-500/20 rounded-2xl p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />

                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 ring-4 ring-red-500/5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                    </div>

                    <h1 className="text-2xl font-bold text-text-primary mb-2">Accès Refusé</h1>
                    <p className="text-text-secondary mb-8">
                        Le système ne détecte pas les droits d'administration sur ce profil.
                    </p>

                    <div className="bg-bg-card-hover/50 rounded-lg border border-border-primary p-4 mb-8 text-left font-mono text-xs overflow-x-auto max-h-60 custom-scrollbar">
                        <div className="grid grid-cols-[100px_1fr] gap-2 mb-2 pb-2 border-b border-border-primary">
                            <span className="text-text-secondary">UID (Auth):</span>
                            <span className="text-cyan font-bold select-all">{user?.uid}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2 mb-2 pb-2 border-b border-border-primary">
                            <span className="text-text-secondary">Email:</span>
                            <span className="text-text-primary select-all">{user?.email}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2 mb-4">
                            <span className="text-text-secondary">Rôle détecté:</span>
                            <span className={`font-bold ${userProfile?.role === 'admin' ? 'text-green-500' : 'text-red-500'}`}>
                                {userProfile?.role || 'undefined (Profil non chargé ?)'}
                            </span>
                        </div>

                        <div className="text-text-secondary mb-1">Données brutes du profil :</div>
                        <pre className="text-green-400 whitespace-pre-wrap break-all">
                            {JSON.stringify(userProfile, null, 2)}
                        </pre>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={handleRefresh}
                            className="bg-text-secondary/10 text-text-primary font-medium py-2 px-6 rounded-lg hover:bg-text-secondary/20 transition-colors border border-border-primary"
                        >
                            Rafraîchir la page
                        </button>
                        <button
                            onClick={() => window.location.href = '/tableau-de-bord'}
                            className="bg-text-primary text-bg-primary font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-none"
                        >
                            Retour au Dashboard
                        </button>
                    </div>

                    <p className="mt-8 text-xs text-text-secondary">
                        Si le problème persiste, vérifiez que l'ID du document dans la collection "users" correspond bien à l'UID affiché ci-dessus.
                    </p>
                </div>
            </div>
        )
    }

    return children
}

export default RequireAdmin
