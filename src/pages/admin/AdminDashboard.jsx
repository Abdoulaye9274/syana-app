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
import { collection, getDocs, collectionGroup } from 'firebase/firestore'
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
                    doc => ['active', 'trialing'].includes(doc.data().subscriptionStatus)
                ).length

                // 2. Fetch deliverables stats via collectionGroup
                const allDeliverables = await getDocs(collectionGroup(db, 'deliverables'))
                const pendingDeliverables = allDeliverables.docs.filter(d => d.data().status === 'pending').length
                const approvedDeliverables = allDeliverables.docs.filter(d => d.data().status === 'approved').length

                // 3. Calculate revenue based on actual plan
                const PLAN_PRICES = { basic: 97, guided: 197, premium: 397 }
                const totalRevenue = usersSnap.docs
                    .filter(d => ['active', 'trialing'].includes(d.data().subscriptionStatus))
                    .reduce((sum, d) => sum + (PLAN_PRICES[d.data().plan] || 97), 0)

                // 4. Determine total number of modules for percentage calculation
                let totalModulesCount = 14
                const modulesSnap = await getDocs(collection(db, 'modules'))
                if (!modulesSnap.empty) {
                    totalModulesCount = modulesSnap.size
                }

                // 5. Calculate average completion (parallel)
                const progressResults = await Promise.all(
                    usersSnap.docs.map(async (userDoc) => {
                        const progressSnap = await getDocs(collection(db, 'users', userDoc.id, 'progress'))
                        if (progressSnap.size === 0) return null
                        const validated = progressSnap.docs.filter(p => p.data().completed).length
                        return (validated / totalModulesCount) * 100
                    })
                )
                const validResults = progressResults.filter(r => r !== null)
                const avgCompletion = validResults.length > 0
                    ? Math.round(validResults.reduce((a, b) => a + b, 0) / validResults.length)
                    : 0

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
                    <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">Panneau de Contrôle Admin</h1>
                </div>

                {/* TABS NAVIGATION */}
                <div className="flex gap-4 mb-8 border-b border-border-primary pb-1 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-3 text-sm font-bold flex items-center gap-2 transition-colors border-b-2 ${activeTab === 'users' ? 'border-cyan text-cyan' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
                    >
                        <Users size={18} /> Utilisateurs
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`px-4 py-3 text-sm font-bold flex items-center gap-2 transition-colors border-b-2 ${activeTab === 'content' ? 'border-cyan text-cyan' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
                    >
                        <TrendingUp size={18} /> Modules & Contenu
                    </button>
                    <button
                        onClick={() => setActiveTab('deliverables')}
                        className={`px-4 py-3 text-sm font-bold flex items-center gap-2 transition-colors border-b-2 ${activeTab === 'deliverables' ? 'border-cyan text-cyan' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
                    >
                        <FileCheck size={18} /> Livrables
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-4 py-3 text-sm font-bold flex items-center gap-2 transition-colors border-b-2 ${activeTab === 'reviews' ? 'border-cyan text-cyan' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
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
                        <div className="bg-bg-card border border-border-primary rounded-2xl p-6 space-y-4 shadow-sm">
                            <h3 className="text-lg font-bold text-text-primary mb-2">Aperçu</h3>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary">Utilisateurs</span>
                                <span className="text-text-primary font-bold">{stats.totalUsers}</span>
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
                            <Card className="p-6 bg-bg-card border-border-primary shadow-sm">
                                <h3 className="text-lg font-bold text-text-primary mb-4">🛠️ Outils Contenu</h3>
                                <div className="space-y-6">
                                    <AdminSeeder />

                                    <div className="pt-6 border-t border-border-primary">
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
                                            <button onClick={() => setActiveTab('deliverables')} className="underline hover:text-text-primary">Voir maintenant</button>
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
