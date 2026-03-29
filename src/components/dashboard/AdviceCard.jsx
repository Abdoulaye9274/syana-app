import { Card } from '@/components/ui'
import { Lightbulb, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getTipOfTheDay } from '@/services/admin'

const AdviceCard = () => {
    const [tip, setTip] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTip = async () => {
            const content = await getTipOfTheDay()
            setTip(content)
            setLoading(false)
        }
        fetchTip()
    }, [])

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet/20 to-rose/10 border border-violet/20 p-6 h-full">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Lightbulb size={120} />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/20 text-violet text-xs font-bold mb-4">
                        <Lightbulb size={14} />
                        CONSEIL DU JOUR
                    </div>

                    {loading ? (
                        <div className="animate-pulse space-y-3">
                            <div className="h-6 bg-border-primary rounded w-3/4"></div>
                            <div className="h-4 bg-border-primary rounded w-full"></div>
                            <div className="h-4 bg-border-primary rounded w-5/6"></div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold text-text-primary mb-2">
                                Info pour l'entrepreneur
                            </h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                {tip || "Pour créer des personas efficaces, basez-vous sur de vraies données et interviews clients plutôt que sur des suppositions."}
                            </p>
                        </>
                    )}
                </div>

                <button className="flex items-center gap-2 text-sm font-bold text-text-primary mt-6 hover:gap-3 transition-all">
                    En savoir plus <ArrowRight size={16} />
                </button>
            </div>
        </div>
    )
}

export default AdviceCard
