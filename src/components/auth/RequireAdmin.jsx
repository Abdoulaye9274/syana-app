import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Loading } from '@/components/ui'

const RequireAdmin = ({ children }) => {
    const { user, userProfile, loading: authLoading } = useAuth()
    const navigate = useNavigate()

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
        return (
            <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-bg-card border border-red-500/20 rounded-2xl p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />

                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 ring-4 ring-red-500/5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                    </div>

                    <h1 className="text-2xl font-bold text-text-primary mb-3">Accès refusé</h1>
                    <p className="text-text-secondary mb-8">
                        Vous n'avez pas les droits nécessaires pour accéder à cette page.
                    </p>

                    <button
                        onClick={() => navigate('/tableau-de-bord')}
                        className="bg-text-primary text-bg-primary font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Retour au Dashboard
                    </button>
                </div>
            </div>
        )
    }

    return children
}

export default RequireAdmin
