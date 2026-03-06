import { CheckCircle2, Play, Lock } from 'lucide-react'

const LessonList = ({ lessons = [], activeLessonIndex = 0, onLessonSelect }) => {
    // Calculate total duration (mock logic as example, real would parse 'X min')
    const totalLessons = lessons.length

    return (
        <div className="bg-bg-secondary w-full lg:w-96 border-l border-white/5 flex flex-col h-full">
            <div className="p-6 border-b border-white/5">
                <h3 className="font-bold text-white mb-1">Programme du module</h3>
                <div className="flex justify-between text-xs text-text-secondary">
                    <span>{totalLessons} leçons</span>
                    {/* Placeholder for total duration calculation */}
                </div>
                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${((activeLessonIndex) / totalLessons) * 100}%` }}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {lessons.map((lesson, index) => {
                    const isActive = index === activeLessonIndex
                    const isCompleted = false // TODO: Real completion logic

                    return (
                        <div
                            key={index}
                            onClick={() => onLessonSelect && onLessonSelect(index)}
                            className={`
                              p-4 border-b border-white/5 transition-colors cursor-pointer relative
                              ${isActive ? 'bg-cyan/5 border-l-2 border-l-cyan' : 'hover:bg-white/5 border-l-2 border-l-transparent'}
                            `}
                        >
                            <div className="flex gap-3">
                                <div className="mt-0.5">
                                    {isCompleted ? (
                                        <CheckCircle2 size={16} className="text-green-500" />
                                    ) : isActive ? (
                                        <div className="w-4 h-4 rounded-full bg-cyan/20 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                                        </div>
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-white/20" />
                                    )}
                                </div>
                                <div>
                                    <p className={`text-sm font-medium mb-1 ${isActive ? 'text-cyan' : 'text-white'}`}>
                                        {index + 1}. {lesson.title}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                                        <Play size={10} />
                                        <span>{lesson.duration || 'Video'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LessonList
