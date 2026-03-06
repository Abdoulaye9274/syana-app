import { Card } from '@/components/ui'

const StatsRow = ({ stats }) => {
    const resolved = stats || { total: 0, validated: 0, pending: 0, toRework: 0 }
    const items = [
        { label: 'Total envoyés', value: resolved.total, color: 'text-cyan' },
        { label: 'Validés', value: resolved.validated, color: 'text-green-500' },
        { label: 'En attente', value: resolved.pending, color: 'text-blue-500' },
        { label: 'À retravailler', value: resolved.toRework, color: 'text-orange-500' }
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {items.map((stat, index) => (
                <Card key={index} padding="sm" className="bg-bg-card/50">
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">
                        {stat.label}
                    </p>
                    <p className={`text-3xl font-bold ${stat.color}`}>
                        {stat.value}
                    </p>
                </Card>
            ))}
        </div>
    )
}

export default StatsRow
