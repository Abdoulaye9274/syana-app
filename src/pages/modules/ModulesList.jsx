import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout'
import ModuleCard from '@/components/modules/ModuleCard'
import { Card, Loading } from '@/components/ui'
import { Search, AlertCircle } from 'lucide-react'
import { useModulesList } from '@/hooks/useModulesList'

const ModulesList = () => {
    const { modules, loading, error } = useModulesList()
    const [filter, setFilter] = useState('all')
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

    useEffect(() => {
        const q = searchParams.get('q')
        if (q) setSearchQuery(q)
    }, [searchParams])

    if (loading) return (
        <DashboardLayout title="Tous les modules">
            <div className="flex justify-center py-20">
                <Loading size="lg" />
            </div>
        </DashboardLayout>
    )

    if (error) return (
        <DashboardLayout title="Tous les modules">
            <div className="flex justify-center py-20 text-red-500 gap-2 font-medium">
                <AlertCircle /> {error}
            </div>
        </DashboardLayout>
    )

    const filteredModules = modules.filter(m => {
        const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.description.toLowerCase().includes(searchQuery.toLowerCase())

        if (!matchesSearch) return false

        if (filter === 'all') return true
        if (filter === 'locked') return m.locked
        if (filter === 'completed') return !m.locked && m.isCompleted
        if (filter === 'in_progress') return !m.locked && !m.isCompleted
        return true
    })

    return (
        <DashboardLayout
            title="Tous les modules"
            subtitle="Votre parcours complet vers la réussite entrepreneuriale"
        >
            <div className="space-y-8">
                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher un module..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-bg-card border border-border-primary rounded-xl py-3 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all placeholder:text-text-secondary"
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {[
                            { id: 'all', label: 'Tous' },
                            { id: 'in_progress', label: 'En cours' },
                            { id: 'completed', label: 'Terminés' },
                            { id: 'locked', label: 'À venir' }
                        ].map(f => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                className={`px-5 py-2.5 text-sm font-bold rounded-full whitespace-nowrap transition-all ${filter === f.id
                                        ? 'bg-cyan text-black shadow-glow-cyan'
                                        : 'bg-bg-card border border-border-primary text-text-secondary hover:text-text-primary hover:border-text-secondary'
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Modules Grid */}
                {filteredModules.length === 0 ? (
                    <Card className="py-20 text-center">
                        <Search className="mx-auto mb-4 text-text-secondary/20" size={48} />
                        <p className="text-text-secondary italic">Aucun module trouvé pour votre recherche.</p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredModules.map((module) => (
                            <ModuleCard key={module.id} module={module} locked={module.locked} />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default ModulesList
