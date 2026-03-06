import { DashboardLayout } from '@/components/layout'
import {
    StatCard,
    CurrentModuleCard,
    ActivityList,
    TodoList,
    AdviceCard,
    NextModulesList
} from '@/components/dashboard'
import { Layers, Clock, TrendingUp } from 'lucide-react'
import { useDashboardData } from '@/hooks/useDashboardData'
import { Loading } from '@/components/ui'

const Dashboard = () => {
    const {
        loading,
        stats,
        totalModules,
        currentModuleData,
        userProfile,
        user
    } = useDashboardData()

    if (loading) {
        return (
            <DashboardLayout
                title="Bonjour 👋"
                subtitle="Chargement de votre tableau de bord..."
            >
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loading size="lg" />
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout
            title={`Bonjour, ${user?.displayName || userProfile?.firstName || 'Entrepreneur'} 👋`}
            subtitle="Prête à structurer ton business aujourd'hui ?"
        >
            <div className="space-y-8">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        label="Modules complétés"
                        value={`${stats.completedModules}/${totalModules}`}
                        icon={Layers}
                        color="cyan"
                    />
                    <StatCard
                        label="Temps investi"
                        value={`${stats.totalTime}h`}
                        icon={Clock}
                        color="violet"
                    />
                    <StatCard
                        label="Progression globale"
                        value={`${stats.globalProgress}%`}
                        icon={TrendingUp}
                        color="rose"
                    />
                </div>

                {/* Current Module & Sidebar Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column (2/3) */}
                    <div className="lg:col-span-2 space-y-8">
                        {currentModuleData && (
                            <CurrentModuleCard
                                module={currentModuleData}
                                progress={stats.currentModuleProgress}
                            />
                        )}

                        <ActivityList />
                    </div>

                    {/* Sidebar Column (1/3) */}
                    <div className="space-y-8">
                        <div className="h-[300px]">
                            <TodoList />
                        </div>

                        <NextModulesList />

                        <div className="h-[250px]">
                            <AdviceCard />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard
