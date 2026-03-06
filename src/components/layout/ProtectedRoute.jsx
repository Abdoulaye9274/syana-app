import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Loading } from '@/components/ui'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <Loading size="lg" />
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/connexion" />
    }

    return children
}

export default ProtectedRoute
