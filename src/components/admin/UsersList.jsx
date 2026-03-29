import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import { Card, Badge, Button } from '@/components/ui'
import { Search, User, CreditCard, Shield } from 'lucide-react'

const PLANS = {
    free: { label: 'Gratuit', color: 'gray' },
    start: { label: 'Start (97€)', color: 'white' },
    guided: { label: 'Guidé (197€)', color: 'cyan' },
    premium: { label: 'Premium (397€)', color: 'violet' }
}

const UsersList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [updatingId, setUpdatingId] = useState(null)

    useEffect(() => {
        // Real-time subscription to users collection
        const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date()
            }))
            setUsers(usersData)
            setLoading(false)
        }, (error) => {
            console.error("Error fetching users:", error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handlePlanChange = async (userId, newPlan) => {
        setUpdatingId(userId)
        try {
            const userRef = doc(db, 'users', userId)
            await updateDoc(userRef, {
                plan: newPlan,
                subscriptionStatus: newPlan === 'free' ? 'free' : 'active', // Auto-activate status
                updatedAt: new Date()
            })
            // Success feedback could be handled by a global toaster, but for now simple alert or local state is fine.
            // A more polished way would be to show a small checklist icon temporarily.
        } catch (error) {
            console.error("Error updating plan:", error)
            alert("Erreur lors de la mise à jour du plan")
        } finally {
            setUpdatingId(null)
        }
    }

    const filteredUsers = users.filter(user =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return <div className="text-text-secondary p-8 text-center">Chargement des utilisateurs...</div>
    }

    return (
        <Card className="border-border-primary bg-bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-border-primary flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    <User className="text-cyan" size={24} />
                    Utilisateurs ({users.length})
                </h2>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher un email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-bg-primary/50 border border-border-primary rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-cyan w-full sm:w-64"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-bg-primary/50 text-text-secondary text-sm">
                            <th className="p-4 font-medium">Utilisateur</th>
                            <th className="p-4 font-medium">Date d'inscription</th>
                            <th className="p-4 font-medium">Plan Actuel</th>
                            <th className="p-4 font-medium">Action (Assigner Plan)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-primary">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-bg-card-hover transition-colors">
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-text-primary font-medium">{user.displayName || 'Sans nom'}</span>
                                        <span className="text-text-secondary text-sm">{user.email}</span>
                                        <span className="text-xs text-text-secondary/50 font-mono mt-1">{user.id}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-text-secondary text-sm">
                                    {user.createdAt.toLocaleDateString('fr-FR', {
                                        day: '2-digit', month: 'long', year: 'numeric'
                                    })}
                                </td>
                                <td className="p-4">
                                    <Badge variant={PLANS[user.plan]?.color || 'gray'}>
                                        {PLANS[user.plan]?.label || 'Gratuit'}
                                    </Badge>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <select
                                            disabled={updatingId === user.id}
                                            value={user.plan || 'free'}
                                            onChange={(e) => handlePlanChange(user.id, e.target.value)}
                                            className="bg-bg-primary border border-border-primary rounded px-3 py-1.5 text-sm text-text-secondary focus:outline-none focus:border-cyan"
                                        >
                                            <option value="free">Gratuit</option>
                                            <option value="start">Start</option>
                                            <option value="guided">Guidé</option>
                                            <option value="premium">Premium</option>
                                        </select>
                                        {updatingId === user.id && (
                                            <div className="animate-spin h-4 w-4 border-2 border-cyan border-t-transparent rounded-full" />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-text-secondary">
                        Aucun utilisateur trouvé.
                    </div>
                )}
            </div>
        </Card>
    )
}

export default UsersList
