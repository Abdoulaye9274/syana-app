import { DashboardLayout } from '@/components/layout'
import AdminSeeder from '@/components/admin/AdminSeeder'
import UsersList from '@/components/admin/UsersList'
import AdminDeliverables from '@/components/admin/AdminDeliverables'
import ModulesManager from '@/components/admin/ModulesManager'
import AdminTipEditor from '@/components/admin/AdminTipEditor'
import AdminReviews from '@/components/admin/AdminReviews'
import { ShieldCheck, Users, TrendingUp, FileCheck, Clock, AlertCircle, Star } from 'lucide-react'
import { Card, Badge, Loading } from '@/components/ui'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/services/firebase/config'

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeSubscriptions: 0,
        pendingDeliverables: 0,
        approvedDeliverables: 0,
        totalRevenue: 0,
        avgCompletion: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // 1. Fetch all users
                const usersSnap = await getDocs(collection(db, 'users'))
                const totalUsers = usersSnap.size
                const activeSubscriptions = usersSnap.docs.filter(
                    doc => doc.data().subscriptionStatus === 'active'
                ).length

                // 2. Fetch deliverables stats
                const deliverablesSnap = await getDocs(collection(db, 'deliverables'))
                const pendingDeliverables = deliverablesSnap.docs.filter(
                    doc => doc.data().status === 'submitted'
                ).length
                const approvedDeliverables = deliverablesSnap.docs.filter(
                    doc => doc.data().status === 'approved'
                ).length

                // 3. Calculate revenue (simplified)
                const totalRevenue = activeSubscriptions * 97 // Basic plan ~ 97€/mois

                // 4. Determine total number of modules for percentage calculation
                let totalModulesCount = 14
                const modulesSnap = await getDocs(collection(db, 'modules'))
                if (!modulesSnap.empty) {
                    totalModulesCount = modulesSnap.size
                }

                // 5. Calculate average completion
                let totalCompletion = 0
                let userCount = 0
                for (const userDoc of usersSnap.docs) {
                    const progressRef = collection(db, 'users', userDoc.id, 'progress')
                    const progressSnap = await getDocs(progressRef)
                    if (progressSnap.size > 0) {
                        const validated = progressSnap.docs.filter(p => p.data().validated).length
                        totalCompletion += (validated / totalModulesCount) * 100
                        userCount++
                    }
                }
                const avgCompletion = userCount > 0 ? Math.round(totalCompletion / userCount) : 0

                setStats({
                    totalUsers,
                    activeSubscriptions,
                    pendingDeliverables,
                    approvedDeliverables,
                    totalRevenue,
                    avgCompletion
                })
            } catch (error) {
                console.error('Error fetching stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    const [activeTab, setActiveTab] = useState('users') // 'users', 'content', 'deliverables'

    if (loading) {
        return (
            <DashboardLayout
                title="Administration"
                subtitle="Chargement du tableau de bord..."
            >
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loading size="lg" />
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout
            title="Administration"
            subtitle="Gérez le contenu, les utilisateurs et les paramètres de la plateforme."
        >
            <div className="py-8">
                {/* Header Stats */}
                <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck className="text-cyan" size={32} />
                    <h1 className="text-3xl font-bold text-white">Panneau de Contrôle Admin</h1>
                </div>

                {/* TABS NAVIGATION */}
                <div className="flex gap-4 mb-8 border-b border-white/10 pb-1 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors border-b-2 ${activeTab === 'users' ? 'border-cyan text-cyan' : 'border-transparent text-text-secondary hover:text-white'}`}
                    >
                        <Users size={18} /> Utilisateurs
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors border-b-2 ${activeTab === 'content' ? 'border-cyan text-cyan' : 'border-transparent text-text-secondary hover:text-white'}`}
                    >
                        <TrendingUp size={18} /> Modules & Contenu
                    </button>
                    <button
                        onClick={() => setActiveTab('deliverables')}
                        className={`px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors border-b-2 ${activeTab === 'deliverables' ? 'border-cyan text-cyan' : 'border-transparent text-text-secondary hover:text-white'}`}
                    >
                        <FileCheck size={18} /> Livrables
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors border-b-2 ${activeTab === 'reviews' ? 'border-cyan text-cyan' : 'border-transparent text-text-secondary hover:text-white'}`}
                    >
                        <Star size={18} /> Avis
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column: Dynamic Content based on Tab */}
                    <div className="xl:col-span-2 space-y-8 min-h-[500px]">
                        {activeTab === 'users' && <UsersList />}
                        {activeTab === 'content' && <ModulesManager />}
                        {activeTab === 'deliverables' && <AdminDeliverables />}
                        {activeTab === 'reviews' && <AdminReviews />}
                    </div>

                    {/* Right Sidebar: Tools & Actions */}
                    <div className="space-y-6">
                        {/* Quick Stats Cards (Always Visible Sidebar Version) */}
                        <div className="bg-bg-card/30 border border-white/5 rounded-2xl p-6 space-y-4">
                            <h3 className="text-lg font-bold text-white mb-2">Aperçu</h3>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary">Utilisateurs</span>
                                <span className="text-white font-bold">{stats.totalUsers}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary">Abonnés</span>
                                <span className="text-cyan font-bold">{stats.activeSubscriptions}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary">Revenu (Est.)</span>
                                <span className="text-green-400 font-bold">{stats.totalRevenue}€</span>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        {activeTab === 'content' && (
                            <Card className="p-6 bg-bg-card/30 border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4">🛠️ Outils Contenu</h3>
                                <div className="space-y-6">
                                    <AdminSeeder />

                                    <div className="pt-6 border-t border-white/10">
                                        <AdminTipEditor />
                                    </div>
                                </div>
                            </Card>
                        )}


                        {/* Alerts */}
                        {stats.pendingDeliverables > 0 && (
                            <Card className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                <div className="flex gap-3">
                                    <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-semibold text-yellow-500 text-sm">Action Requise</h4>
                                        <p className="text-xs text-text-secondary mt-1">
                                            {stats.pendingDeliverables} livrable(s) en attente.
                                            <br />
                                            <button onClick={() => setActiveTab('deliverables')} className="underline hover:text-white">Voir maintenant</button>
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminDashboard
