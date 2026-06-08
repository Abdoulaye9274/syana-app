import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Loading } from '@/components/ui'

const RequireSubscription = ({ children }) => {
    const { userProfile, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-bg-primary">
                <Loading size="lg" />
            </div>
        )
    }

    // Admin bypass everything
    if (userProfile?.role === 'admin') {
        return children
    }

    const hasActiveSubscription = ['active', 'trialing', 'paused'].includes(userProfile?.subscriptionStatus)

    if (!hasActiveSubscription) {
        // Redirect to pricing page, but save the location they tried to access
        return <Navigate to="/tarifs" state={{ from: location }} replace />
    }

    return children
}

export default RequireSubscription
