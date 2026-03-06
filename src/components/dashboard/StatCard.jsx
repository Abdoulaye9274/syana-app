import { Card } from '@/components/ui'

const StatCard = ({ label, value, icon: Icon, color = 'cyan', className = '' }) => {
    const colors = {
        cyan: 'bg-cyan/10 text-cyan',
        violet: 'bg-violet/10 text-violet',
        rose: 'bg-rose/10 text-rose'
    }

    return (
        <Card className={`flex flex-col ${className}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors[color]}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-3xl font-bold text-text-primary mb-1">
                    {value}
                </p>
                <p className="text-sm text-text-secondary font-medium">
                    {label}
                </p>
            </div>
        </Card>
    )
}

export default StatCard
