import { useState, useEffect } from 'react'
import { Card, Input, Button, SkeletonProfileCard } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import { Check, AlertCircle } from 'lucide-react'

const ProfileTab = () => {
    const { user, userProfile, updateUser } = useAuth()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: ''
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    // Initialize form with profile data when available
    useEffect(() => {
        if (userProfile) {
            setFormData({
                firstName: userProfile.firstName || '',
                lastName: userProfile.lastName || ''
            })
        }
    }, [userProfile])

    const handleSave = async () => {
        setLoading(true)
        setError('')
        setSuccess(false)

        try {
            if (!user) return

            // 1. Update Firestore
            const userRef = doc(db, 'users', user.uid)
            await updateDoc(userRef, {
                firstName: formData.firstName,
                lastName: formData.lastName
            })

            // 2. Update Auth Profile (DisplayName)
            await updateUser(`${formData.firstName} ${formData.lastName}`)

            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            console.error("Error updating profile:", err)
            setError("Impossible de mettre à jour le profil.")
        } finally {
            setLoading(false)
        }
    }

    if (!userProfile) return <SkeletonProfileCard />

    return (
        <Card>
            <h3 className="text-xl font-bold text-text-primary mb-6">Informations personnelles</h3>

            {success && (
                <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-lg flex items-center gap-3 text-sm">
                    <Check size={18} />
                    Profil mis à jour avec succès !
                </div>
            )}

            {error && (
                <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg flex items-center gap-3 text-sm">
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                    label="Prénom"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Votre prénom"
                />
                <Input
                    label="Nom"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Votre nom"
                />
            </div>

            <div className="mb-6">
                <Input
                    label="Email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="opacity-50 cursor-not-allowed"
                />
                <p className="text-xs text-text-secondary mt-2">
                    L'adresse email ne peut pas être modifiée ici.
                </p>
            </div>

            <div className="mb-8">
                <Input
                    label="Votre Formule"
                    value={
                        !userProfile?.plan || userProfile.plan === 'free' ? 'Membre Gratuit' :
                            userProfile.plan === 'start' ? 'SYANA Start' :
                                userProfile.plan === 'guided' ? 'SYANA Guidée' :
                                    userProfile.plan === 'premium' ? 'SYANA Premium' : 'Abonnement Actif'
                    }
                    disabled
                />
            </div>

            <Button
                className="shadow-glow-cyan"
                onClick={handleSave}
                loading={loading}
                disabled={loading}
            >
                Sauvegarder les modifications
            </Button>
        </Card>
    )
}

export default ProfileTab
