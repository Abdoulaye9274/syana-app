import { Card } from '@/components/ui'
import { Loader2 } from 'lucide-react'
import { useRecentActivity } from '@/hooks/useRecentActivity'
import { Link } from 'react-router-dom'

const ActivityList = () => {
    const { activities, loading } = useRecentActivity(3)

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-text-primary text-lg">Activité récente</h3>
                <Link to="/modules" className="text-sm text-cyan hover:text-cyan/80 transition-colors">
                    Voir tout
                </Link>
            </div>

            <div className="space-y-6">
                {loading ? (
                    <div className="flex justify-center py-4">
                        <Loader2 className="animate-spin text-cyan" size={24} />
                    </div>
                ) : activities.length > 0 ? (
                    activities.map((activity) => {
                        const Icon = activity.icon
                        return (
                            <Link key={activity.id} to={activity.link} className="flex gap-4 group cursor-pointer">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg} ${activity.color}`}>
                                    <Icon size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-text-primary truncate group-hover:text-cyan transition-colors">
                                        {activity.title}
                                    </p>
                                    <p className="text-xs text-text-secondary truncate">
                                        {activity.description}
                                    </p>
                                </div>
                                <span className="text-xs text-text-secondary whitespace-nowrap">
                                    {activity.time}
                                </span>
                            </Link>
                        )
                    })
                ) : (
                    <div className="text-center py-6 text-text-secondary text-sm italic">
                        Aucune activité récente.
                        <br />Commencez votre premier module !
                    </div>
                )}
            </div>
        </Card>
    )
}

export default ActivityList
