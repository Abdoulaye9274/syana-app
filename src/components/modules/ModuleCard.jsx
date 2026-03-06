import { Card, Badge, ProgressBar, Button } from '@/components/ui'
import { Lock, Play, Clock, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const ModuleCard = ({ module, locked = false }) => {
    if (locked) {
        return (
            <Card className="opacity-75 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 group">
                <div className="flex items-start justify-between mb-6">
                    <Badge status="locked">
                        <Lock size={12} className="mr-1" />
                        MODULE {module.number}
                    </Badge>
                    <div className="w-10 h-10 rounded-full bg-bg-card-hover flex items-center justify-center text-text-secondary group-hover:bg-bg-card group-hover:text-text-primary transition-colors border border-border-primary">
                        <Lock size={20} />
                    </div>
                </div>

                <h3 className="font-bold text-text-primary mb-1">{module.title}</h3>
                <p className="text-text-secondary text-sm mb-6">{module.description}</p>

                <div className="flex items-center gap-4 text-xs text-text-secondary font-medium">
                    <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {module.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Play size={14} /> {module.lessonsCount} leçons
                    </span>
                </div>
            </Card>
        )
    }

    const isCompleted = module.progress === 100

    return (
        <Card
            variant={isCompleted ? 'bordered' : 'default'}
            className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan/5 hover:border-cyan/30"
        >
            {isCompleted && (
                <div className="absolute top-0 right-0 p-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                        <CheckCircle2 size={20} />
                    </div>
                </div>
            )}

            {/* Module Number & Title */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="text-xs font-bold text-cyan mb-1 uppercase tracking-wider">
                        Module {module.order || module.number} • {module.phase || 'Fondations'}
                    </div>
                    <h3 className="text-lg font-bold text-text-primary group-hover:text-cyan transition-colors">
                        {module.title}
                    </h3>
                </div>
            </div>
            <p className="text-text-secondary text-sm mb-6 line-clamp-2">
                {module.description}
            </p>

            {!isCompleted ? (
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs font-medium mb-2">
                            <span className="text-text-primary">Progression</span>
                            <span className="text-cyan">{module.progress}%</span>
                        </div>
                        <ProgressBar value={module.progress} size="sm" />
                    </div>

                    <Link to={`/modules/${module.id}`}>
                        <Button className="w-full justify-between group-hover:bg-cyan group-hover:text-white border-cyan/30 text-cyan hover:border-cyan" variant="secondary">
                            Continuer
                            <Play size={16} className="ml-2 fill-current" />
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="pt-4 mt-auto">
                    <Link to={`/modules/${module.id}`}>
                        <Button variant="ghost" className="w-full justify-center text-text-secondary hover:text-text-primary">
                            Revoir le module
                        </Button>
                    </Link>
                </div>
            )}
        </Card>
    )
}

export default ModuleCard
