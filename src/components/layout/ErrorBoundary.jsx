import { Component } from 'react'

/**
 * Composant ErrorBoundary pour capturer les erreurs de rendu
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 text-center">
                    <div className="max-w-md space-y-4">
                        <h2 className="text-3xl font-bold text-text-primary">Oups ! 😕</h2>
                        <p className="text-text-secondary">
                            Une erreur inattendue s'est produite. L'équipe Syana a été prévenue.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-cyan text-black font-bold rounded-lg hover:shadow-lg transition-all"
                        >
                            Recharger la page
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
