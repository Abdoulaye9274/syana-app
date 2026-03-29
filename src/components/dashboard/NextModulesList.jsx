import { Card } from '@/components/ui'
import { Lock, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getNextModules } from '@/services/modules'

const NextModulesList = () => {
    const { userProfile } = useAuth()
    const currentModuleOrder = userProfile?.currentModule || 1
    const [nextModules, setNextModules] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const modules = await getNextModules(currentModuleOrder, 3)
            setNextModules(modules)
            setLoading(false)
        }
        fetch()
    }, [currentModuleOrder])

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-cyan" size={24} />
            </div>
        )
    }

    if (nextModules.length === 0) {
        return (
            <Card className="h-full flex flex-col justify-center text-center p-6">
                <h3 className="font-bold text-text-primary text-lg mb-2">Félicitations ! 🎉</h3>
                <p className="text-text-secondary text-sm">
                    Vous avez atteint le dernier module disponible.
                </p>
            </Card>
        )
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-text-primary text-lg">Prochains modules</h3>
                <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">
                    VERROUILLÉS
                </span>
            </div>

            <div className="space-y-4">
                {nextModules.map((module) => (
                    <div
                        key={module.id}
                        className="flex items-center gap-4 p-3 rounded-lg border border-border-primary bg-bg-card-hover opacity-70"
                    >
                        <div className="w-10 h-10 rounded-lg bg-text-secondary/10 flex items-center justify-center text-text-secondary">
                            <Lock size={18} />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-text-secondary font-bold uppercase tracking-wider mb-0.5">
                                MODULE {module.order}
                            </p>
                            <h4 className="text-sm font-semibold text-text-secondary">
                                {module.title}
                            </h4>
                        </div>
                    </div>
                ))}

                <div className="pt-2 flex justify-end">
                    <Link to="/modules" className="text-xs text-cyan hover:text-text-primary flex items-center gap-1 transition-colors">
                        Voir tout le programme <ArrowRight size={12} />
                    </Link>
                </div>
            </div>
        </Card>
    )
}

export default NextModulesList
