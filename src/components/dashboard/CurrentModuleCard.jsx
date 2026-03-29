import { Play } from 'lucide-react'
import { Card, Button } from '@/components/ui'
import { Link } from 'react-router-dom'

const CurrentModuleCard = ({ module, progress }) => {
    if (!module) return null;

    const {
        title,
        order: moduleNumber,
        id: moduleId,
        duration: timeLeft = '2-3h',
        lessons = []
    } = module;

    const nextLesson = lessons[0]?.title || "Commencer le module";
    return (
        <div className="relative overflow-hidden rounded-2xl bg-bg-card border border-border-primary p-6 md:p-8 shadow-sm">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 dark:bg-cyan/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                    <div>
                        <span className="inline-block px-3 py-1 bg-border-primary rounded-full text-xs font-bold mb-3 text-text-secondary">
                            MODULE {moduleNumber} • EN COURS
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black mb-2 text-text-primary tracking-tight">
                            {title}
                        </h3>
                        <p className="text-text-secondary text-base md:text-lg">
                            Continuez votre progression vers la réussite.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-bg-secondary px-4 py-2 rounded-lg border border-border-primary w-fit">
                        <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                        <span className="font-medium text-sm text-text-primary">En cours</span>
                    </div>
                </div>

                <div className="bg-bg-secondary rounded-xl p-6 border border-border-primary">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                        <div className="flex-1 w-full">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-medium text-text-secondary">Progression du module</span>
                                <span className="text-lg font-bold text-text-primary">{progress}%</span>
                            </div>
                            <div className="h-2 bg-border-primary rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-auto">
                            <span className="block text-xs uppercase tracking-wider text-text-secondary mb-1">
                                Prochaine leçon
                            </span>
                            <div className="flex items-center gap-2 font-semibold text-text-primary">
                                <Play size={16} className="text-text-primary" />
                                {nextLesson}
                            </div>
                            <span className="text-xs text-text-secondary mt-1 block">
                                {timeLeft} restants
                            </span>
                        </div>
                    </div>

                    {moduleId ? (
                        <Link to={`/modules/${moduleId}`}>
                            <Button
                                className="w-full md:w-auto mt-6"
                                size="lg"
                            >
                                Continuer le module
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            className="w-full md:w-auto mt-6 opacity-60"
                            size="lg"
                            disabled
                        >
                            Continuer le module
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CurrentModuleCard
