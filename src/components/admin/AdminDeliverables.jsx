import { useState, useEffect } from 'react'
import { Card, Button, Badge, Loading } from '@/components/ui'
import { CheckCircle2, XCircle, ExternalLink, Clock, MessageSquare, AlertCircle } from 'lucide-react'
import { collection, query, where, orderBy, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase/config'

const AdminDeliverables = () => {
    // Note: In a real app with many users, we would need a Collection Group Query or a dedicated 'admin_queue' collection.
    // For this 'Low-Code' / MVP scale, we will fetch users and their deliverables client-side or use a composite index if setup.
    // To keep it simple and robust without complex indexing requirements right now, 
    // we'll iterate active users or use a simplified approach: 
    // We added a 'users/{uid}/deliverables' collection. 
    // An efficient way WITHOUT Collection Group Index is to fetch 'users' and then their subcollections, 
    // but that reads too much.
    // BETTER STRATEGY FOR MVP: When a user submits, write to a 'deliverables_queue' root collection as well.
    // SINCE I cannot easily change the submit logic in a "single shot" without risking regression, 
    // I will try to use the 'collectionGroup' query if possible, or fallback to fetching recent users.

    // Let's rely on caching or just fetch pending deliverables if we can. 
    // Actually, simpler for this specific project context: 
    // We will assume I can update the submit logic to also write to a 'pending_deliverables' collection 
    // OR we just iterate the known users (from UsersList logic).

    // Let's try to fetch all deliverables via collectionGroup (requires index usually).
    // If index missing, it errors.

    // PLAN B (Robust MVP): Fetch users, then fetch their 'pending' deliverables.

    const [deliverables, setDeliverables] = useState([])
    const [loading, setLoading] = useState(true)
    const [processingId, setProcessingId] = useState(null)
    const [feedbackInputs, setFeedbackInputs] = useState({})

    useEffect(() => {
        fetchPendingDeliverables()
    }, [])

    const fetchPendingDeliverables = async () => {
        setLoading(true)
        try {
            // 1. Fetch all users
            const usersSnap = await getDocs(collection(db, 'users'))
            const promises = usersSnap.docs.map(async (userDoc) => {
                const userData = userDoc.data()
                // 2. Fetch subcollection deliverables for each user where status is pending
                // (This is N+1 reads, acceptable for < 100 users MVP)
                const dRef = collection(db, 'users', userDoc.id, 'deliverables')
                const q = query(dRef, where('status', '==', 'pending'))
                const dSnap = await getDocs(q)

                return dSnap.docs.map(d => ({
                    id: d.id, // moduleId
                    ...d.data(),
                    uid: userDoc.id,
                    userDisplayName: userData.displayName || userData.email
                }))
            })

            const results = await Promise.all(promises)
            const flatResults = results.flat()
            setDeliverables(flatResults)
        } catch (error) {
            console.error("Error fetching admin deliverables:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleValidation = async (item, status) => {
        setProcessingId(item.id + item.uid)
        try {
            const feedback = feedbackInputs[item.id + item.uid] || ''

            const docRef = doc(db, 'users', item.uid, 'deliverables', item.id)
            await updateDoc(docRef, {
                status: status, // 'approved' or 'rejected'
                feedback: feedback,
                reviewedAt: serverTimestamp()
            })

            // Refresh local state
            setDeliverables(prev => prev.filter(d => !(d.id === item.id && d.uid === item.uid)))
        } catch (error) {
            console.error("Error updating deliverable:", error)
            alert("Erreur lors de la validation")
        } finally {
            setProcessingId(null)
        }
    }

    if (loading) return <Loading size="sm" />

    if (deliverables.length === 0) {
        return (
            <div className="p-8 text-center text-text-secondary bg-bg-card/30 rounded-2xl border border-white/5">
                <CheckCircle2 className="mx-auto mb-3 text-green-500/50" size={32} />
                <p>Aucun livrable en attente.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {deliverables.map((item) => (
                <Card key={item.id + item.uid} className="p-4 border-white/10 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Badge variant="warning">En attente</Badge>
                                <span className="text-xs text-text-secondary flex items-center gap-1">
                                    <Clock size={12} />
                                    {item.submittedAt?.toDate().toLocaleDateString()}
                                </span>
                            </div>
                            <h4 className="font-bold text-white">{item.userDisplayName}</h4>
                            <p className="text-sm text-text-secondary">Module {item.moduleId}</p>
                        </div>
                        <a
                            href={item.content}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-white/5 rounded-lg text-cyan hover:bg-cyan/10 transition-colors"
                        >
                            <ExternalLink size={20} />
                        </a>
                    </div>

                    {/* Feedback Input */}
                    <div>
                        <div className="relative">
                            <MessageSquare className="absolute top-3 left-3 text-text-secondary" size={16} />
                            <textarea
                                className="w-full bg-bg-primary/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-cyan outline-none resize-none h-20"
                                placeholder="Votre feedback pour l'élève..."
                                value={feedbackInputs[item.id + item.uid] || ''}
                                onChange={(e) => setFeedbackInputs({ ...feedbackInputs, [item.id + item.uid]: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button
                            variant="primary"
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700 border-none"
                            onClick={() => handleValidation(item, 'approved')}
                            disabled={processingId === item.id + item.uid}
                        >
                            <CheckCircle2 size={16} className="mr-2" />
                            Valider
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleValidation(item, 'rejected')}
                            disabled={processingId === item.id + item.uid}
                        >
                            <XCircle size={16} className="mr-2" />
                            À revoir
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default AdminDeliverables
