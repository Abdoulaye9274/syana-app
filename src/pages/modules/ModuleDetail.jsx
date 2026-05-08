import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, ChevronLeft, AlertCircle, Target, ListChecks, Lightbulb, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import { Button, Badge, Loading } from '@/components/ui'
import VideoPlayer from '@/components/modules/VideoPlayer'
import ResourceList from '@/components/modules/ResourceList'
import LessonList from '@/components/modules/LessonList'
import ValidationChecklist from '@/components/modules/ValidationChecklist'
import ReviewModal from '@/components/modules/ReviewModal'
import { useState } from 'react'
import { useModuleDetail } from '@/hooks/useModuleDetail'

const ModuleDetail = () => {
    const { id } = useParams()
    const {
        module,
        loading,
        activeLessonIndex,
        lessonsCompleted,
        markLessonComplete,
        setLesson,
        goToNextModule,
        goToPreviousModule
    } = useModuleDetail(id)

    const [showReviewModal, setShowReviewModal] = useState(false)

    const handleModuleValidated = () => {
        setShowReviewModal(true)
    }

    if (loading) return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center">
            <Loading size="lg" />
        </div>
    )

    if (!module) return (
        <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center text-text-secondary p-6 text-center">
            <AlertCircle size={64} className="mb-6 text-red-500/20" />
            <h1 className="text-2xl font-bold text-text-primary mb-2">Module introuvable</h1>
            <p className="text-text-secondary mb-8 max-w-sm">
                Ce module n'est pas disponible ou vous n'avez pas les droits nécessaires.
            </p>
            <Link to="/modules">
                <Button variant="secondary" className="px-8">Retour aux modules</Button>
            </Link>
        </div>
    )

    const currentLesson = module.lessons?.[activeLessonIndex]
    const isFirstLesson = activeLessonIndex === 0
    const isLastLesson = activeLessonIndex === (module.lessons?.length - 1 || 0)

    return (
        <>
            <div className="min-h-screen bg-bg-primary flex flex-col">
                {/* Header */}
                <header className="h-20 bg-bg-card/80 backdrop-blur-md border-b border-border-primary flex items-center justify-between px-6 sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/modules"
                            className="w-10 h-10 rounded-xl bg-bg-card-hover border border-border-primary flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-secondary transition-all"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="hidden md:block h-8 w-px bg-border-primary" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-text-secondary uppercase tracking-[0.2em] font-black">
                                Module {module.order}
                            </span>
                            <span className="text-sm font-bold text-text-primary truncate max-w-[200px] md:max-w-none">
                                {module.title}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setLesson(activeLessonIndex - 1)}
                            disabled={isFirstLesson}
                            className="bg-bg-card-hover border-border-primary"
                        >
                            <ChevronLeft size={20} />
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setLesson(activeLessonIndex + 1)}
                            disabled={isLastLesson}
                            className="px-6 font-bold"
                        >
                            <span className="hidden md:inline mr-2">Suivant</span>
                            <ChevronRight size={18} />
                        </Button>
                    </div>
                </header>

                <div className="flex flex-1 relative overflow-hidden">
                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar h-[calc(100vh-80px)]">
                        <div className="max-w-5xl mx-auto p-4 md:p-10">
                            {currentLesson ? (
                                <div className="space-y-10">
                                    <div className="rounded-3xl overflow-hidden border border-border-primary shadow-2xl bg-black">
                                        <VideoPlayer
                                            poster={module.image}
                                            src={currentLesson.videoUrl || currentLesson.url}
                                            title={currentLesson.title}
                                        />
                                    </div>

                                    <div className="flex flex-col xl:flex-row gap-10">
                                        <div className="flex-1 space-y-10">
                                            <div>
                                                <div className="flex items-center gap-3 mb-6">
                                                    <Badge variant="info">
                                                        Leçon {activeLessonIndex + 1} sur {module.lessons.length}
                                                    </Badge>
                                                    <span className="text-text-secondary text-xs font-medium uppercase tracking-wider">
                                                        • {currentLesson.duration || 'Durée inconnue'}
                                                    </span>
                                                </div>

                                                <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-6 tracking-tight">
                                                    {currentLesson.title}
                                                </h1>

                                                <div className="bg-bg-card border border-border-primary rounded-2xl p-8 shadow-sm">
                                                    <p className="text-lg text-text-primary mb-6 leading-relaxed font-medium">
                                                        {module.description}
                                                    </p>
                                                    <div className="h-px bg-border-primary mb-6" />
                                                    <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-text-secondary leading-relaxed">
                                                        <p>
                                                            Cette leçon est une étape clé du module. Prenez des notes et assurez-vous de bien comprendre les concepts avant de passer à la suite.
                                                            Exécutez les actions recommandées pour obtenir des résultats immédiats.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Grid of detail boxes */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Objectif */}
                                                {module.objective && (
                                                    <div className="bg-bg-card border border-border-primary rounded-2xl p-6 hover:border-cyan/30 transition-colors">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="w-10 h-10 rounded-xl bg-cyan/10 text-cyan flex items-center justify-center">
                                                                <Target size={20} />
                                                            </div>
                                                            <h3 className="text-lg font-bold text-text-primary">Objectif</h3>
                                                        </div>
                                                        <p className="text-sm text-text-secondary leading-relaxed">{module.objective}</p>
                                                    </div>
                                                )}

                                                {/* Exercice */}
                                                {module.exercise && (
                                                    <div className="bg-bg-card border border-border-primary rounded-2xl p-6 hover:border-violet/30 transition-colors">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="w-10 h-10 rounded-xl bg-violet/10 text-violet flex items-center justify-center">
                                                                <Lightbulb size={20} />
                                                            </div>
                                                            <h3 className="text-lg font-bold text-text-primary">Action</h3>
                                                        </div>
                                                        <p className="text-sm text-text-secondary leading-relaxed">{module.exercise}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Points clés & Erreurs Column */}
                                            <div className="space-y-6">
                                                {Array.isArray(module.keyPoints) && module.keyPoints.length > 0 && (
                                                    <div className="bg-bg-card border border-border-primary rounded-2xl p-8">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                                                                <ListChecks size={20} />
                                                            </div>
                                                            <h3 className="text-xl font-bold text-text-primary">À mémoriser</h3>
                                                        </div>
                                                        <div className="space-y-4">
                                                            {module.keyPoints.map((p, idx) => (
                                                                <div key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-bg-card-hover transition-colors">
                                                                    <div className="mt-0.5 w-6 h-6 rounded-lg bg-bg-card-hover border border-border-primary flex items-center justify-center text-[10px] text-text-secondary font-black">
                                                                        {idx + 1}
                                                                    </div>
                                                                    <p className="text-sm text-text-primary leading-relaxed">{p}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {Array.isArray(module.mistakes) && module.mistakes.length > 0 && (
                                                    <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-8">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                                                <AlertTriangle size={20} />
                                                            </div>
                                                            <h3 className="text-xl font-bold text-orange-500">Erreurs classiques</h3>
                                                        </div>
                                                        <ul className="space-y-3">
                                                            {module.mistakes.map((m, idx) => (
                                                                <li key={idx} className="text-sm text-text-secondary leading-relaxed flex gap-3">
                                                                    <span className="text-orange-500">✕</span>
                                                                    {m}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>

                                            <ValidationChecklist
                                                moduleId={id}
                                                moduleOrder={module?.order || 1}
                                                totalLessons={module?.lessons?.length || 0}
                                                lessonsCompleted={lessonsCompleted}
                                                onValidated={handleModuleValidated}
                                            />

                                            {/* Mark current lesson as done */}
                                            {!lessonsCompleted.includes(`lesson_${activeLessonIndex}`) && (
                                                <div className="flex justify-end pt-4">
                                                    <Button
                                                        variant="secondary"
                                                        onClick={() => markLessonComplete(activeLessonIndex)}
                                                        className="border-green-500/30 text-green-500 hover:bg-green-500/10"
                                                    >
                                                        <CheckCircle2 size={16} className="mr-2" />
                                                        Marquer cette leçon comme terminée
                                                    </Button>
                                                </div>
                                            )}

                                            {/* Navigation Modules Row */}
                                            <div className="grid grid-cols-2 gap-4 pt-10 border-t border-border-primary">
                                                <Button
                                                    variant="secondary"
                                                    onClick={goToPreviousModule}
                                                    disabled={module?.order <= 1}
                                                    className="h-14 font-bold border-border-primary"
                                                >
                                                    <ChevronLeft size={20} className="mr-2" />
                                                    Précédent
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    onClick={goToNextModule}
                                                    disabled={module?.order >= 14}
                                                    className="h-14 font-bold border-border-primary"
                                                >
                                                    Suivant
                                                    <ChevronRight size={20} className="ml-2" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Sidebar Content */}
                                        <div className="hidden xl:block w-80 space-y-8">
                                            <div className="bg-gradient-to-br from-cyan/20 to-violet/20 border border-white/5 p-8 rounded-3xl shadow-lg">
                                                <h4 className="font-black text-text-primary mb-3 text-lg uppercase tracking-tight">Focus</h4>
                                                <p className="text-sm text-text-secondary leading-relaxed italic">
                                                    "La constance est plus importante que l'intensité. Mieux vaut faire 15 minutes chaque jour qu'une heure une fois par semaine."
                                                </p>
                                            </div>
                                            <ResourceList resources={module.resources || []} />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[50vh] text-text-secondary text-center">
                                    <Clock size={48} className="mb-4 opacity-20" />
                                    <p className="text-xl font-bold text-text-primary mb-2">Pas de contenu encore</p>
                                    <p className="text-sm">Ce module sera bientôt enrichi par nos experts.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop Lesson Sidebar (Sticky) */}
                    <div className="hidden xl:block w-96 h-[calc(100vh-80px)] border-l border-border-primary sticky top-0 bg-bg-card/30">
                        <LessonList
                            lessons={module.lessons || []}
                            activeLessonIndex={activeLessonIndex}
                            lessonsCompleted={lessonsCompleted}
                            onLessonSelect={setLesson}
                        />
                    </div>
                </div>
            </div>

            <ReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                moduleId={id}
                moduleName={module?.title}
            />
        </>
    )
}

export default ModuleDetail

