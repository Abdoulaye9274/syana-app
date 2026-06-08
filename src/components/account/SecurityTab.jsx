import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Input, Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { httpsCallable } from 'firebase/functions'
import { functions } from '@/services/firebase/config'
import { Check, AlertCircle, Lock, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

const SecurityTab = () => {
    const { updateUserPassword, logout } = useAuth()
    const navigate = useNavigate()

    const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' })
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleUpdatePassword = async () => {
        setError('')
        setSuccess(false)

        if (passwords.newPassword !== passwords.confirmPassword) {
            return setError("Les mots de passe ne correspondent pas.")
        }

        if (passwords.newPassword.length < 8) {
            return setError("Le mot de passe doit faire au moins 8 caractères.")
        }

        setLoading(true)

        try {
            await updateUserPassword(passwords.newPassword)
            setSuccess(true)
            setPasswords({ newPassword: '', confirmPassword: '' })
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            console.error("Error updating password:", err)
            if (err.code === 'auth/requires-recent-login') {
                setError("Par sécurité, veuillez vous déconnecter et vous reconnecter avant de changer votre mot de passe.")
            } else {
                setError("Impossible de mettre à jour le mot de passe.")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action est irréversible et supprimera toutes vos données ainsi que votre abonnement.'
        )
        if (!confirmed) return

        setDeleting(true)
        try {
            const deleteUserData = httpsCallable(functions, 'deleteUserData')
            await deleteUserData()
            toast.success('Votre compte a été supprimé.')
            await logout()
            navigate('/')
        } catch (err) {
            console.error(err)
            toast.error('Erreur lors de la suppression. Veuillez contacter le support.')
        } finally {
            setDeleting(false)
        }
    }

    return (
        <Card>
            <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <Lock className="text-cyan" size={24} />
                Sécurité du compte
            </h3>

            {success && (
                <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-lg flex items-center gap-3 text-sm">
                    <Check size={18} />
                    Mot de passe modifié avec succès !
                </div>
            )}

            {error && (
                <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg flex items-center gap-3 text-sm">
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            <div className="space-y-6 max-w-md">
                <Input
                    label="Nouveau mot de passe"
                    type="password"
                    placeholder="••••••••"
                    showToggle
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                />
                <Input
                    label="Confirmer le nouveau mot de passe"
                    type="password"
                    placeholder="••••••••"
                    showToggle
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                />

                <div className="pt-4">
                    <Button
                        className="shadow-glow-cyan"
                        onClick={handleUpdatePassword}
                        loading={loading}
                        disabled={loading || !passwords.newPassword}
                    >
                        Mettre à jour le mot de passe
                    </Button>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border-primary">
                <p className="text-sm text-text-secondary mb-6">
                    En cas de problème de sécurité, contactez immédiatement le support.
                </p>

                {/* Zone danger — Droit à l'oubli RGPD */}
                <div className="border border-red-500/20 rounded-xl p-6 bg-red-500/5">
                    <h4 className="text-base font-bold text-red-500 mb-2 flex items-center gap-2">
                        <Trash2 size={18} />
                        Supprimer mon compte
                    </h4>
                    <p className="text-sm text-text-secondary mb-4">
                        Cette action est irréversible. Toutes vos données, votre progression et votre abonnement seront définitivement supprimés (conformément au RGPD, droit à l'oubli).
                    </p>
                    <Button
                        variant="danger"
                        onClick={handleDeleteAccount}
                        loading={deleting}
                        disabled={deleting}
                    >
                        Supprimer définitivement mon compte
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default SecurityTab
