import { modulesData } from '@/data/modulesData'
import { db } from '@/services/firebase/config'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { Button } from '@/components/ui'
import { useState } from 'react'
import { Check, Loader2, AlertTriangle, Database } from 'lucide-react'

const AdminSeeder = () => {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null) // 'success' | 'error'

    const seedDatabase = async () => {
        if (!window.confirm("Attention : Cette action va écraser/ajouter des données dans la base de données. Continuer ?")) {
            return
        }

        setLoading(true)
        setStatus(null)

        try {
            const batch = writeBatch(db)

            modulesData.forEach((module) => {
                // Create a custom ID based on order (e.g., 'module_01')
                const moduleId = `module_${module.order.toString().padStart(2, '0')}`
                const docRef = doc(db, 'modules', moduleId)

                batch.set(docRef, {
                    ...module,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                })
            })

            await batch.commit()
            setStatus('success')
        } catch (error) {
            console.error("Error seeding DB:", error)
            setStatus('error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 bg-bg-card border border-white/5 rounded-2xl max-w-lg mx-auto mt-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
                    <Database size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Zone Admin</h2>
                    <p className="text-sm text-text-secondary">Injection de données</p>
                </div>
            </div>

            <p className="text-text-secondary mb-8">
                Utilisez ce bouton pour injecter les 14 modules par défaut dans la base de données Firestore.
                Cela créera les documents dans la collection `modules`.
            </p>

            {status === 'success' && (
                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg flex items-center gap-2">
                    <Check size={18} />
                    <span>Modules injectés avec succès !</span>
                </div>
            )}

            {status === 'error' && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg flex items-center gap-2">
                    <AlertTriangle size={18} />
                    <span>Erreur lors de l'injection. Vérifiez la console.</span>
                </div>
            )}

            <Button
                onClick={seedDatabase}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-900/20"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin mr-2" size={18} />
                        Injection en cours...
                    </>
                ) : (
                    "Initialiser la Base de Données (14 Modules)"
                )}
            </Button>
        </div>
    )
}

export default AdminSeeder
