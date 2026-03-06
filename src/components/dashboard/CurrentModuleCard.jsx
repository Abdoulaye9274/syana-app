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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-card p-8 text-white">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                    <div>
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-3 backdrop-blur-sm">
                            MODULE {moduleNumber} • EN COURS
                        </span>
                        <h3 className="text-3xl font-bold mb-2 leading-tight">
                            {title}
                        </h3>
                        <p className="text-white/80 text-lg">
                            Continuez votre progression vers la réussite.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                        <span className="font-medium text-sm">En cours</span>
                    </div>
                </div>

                <div className="bg-black/20 rounded-xl p-6 backdrop-blur-md border border-white/10">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                        <div className="flex-1 w-full">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-medium text-white/80">Progression du module</span>
                                <span className="text-lg font-bold">{progress}%</span>
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-auto">
                            <span className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                                Prochaine leçon
                            </span>
                            <div className="flex items-center gap-2 font-semibold">
                                <Play size={16} className="fill-white" />
                                {nextLesson}
                            </div>
                            <span className="text-xs text-white/60 mt-1 block">
                                {timeLeft} restants
                            </span>
                        </div>
                    </div>

                    {moduleId ? (
                        <Link to={`/modules/${moduleId}`}>
                            <Button
                                className="w-full md:w-auto bg-white text-violet hover:bg-white/90 hover:shadow-lg shadow-black/20 transition-all font-bold"
                                size="lg"
                            >
                                Continuer le module
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            className="w-full md:w-auto bg-white text-violet hover:bg-white/90 hover:shadow-lg shadow-black/20 transition-all font-bold opacity-60"
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
