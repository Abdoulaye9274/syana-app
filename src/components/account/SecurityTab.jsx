import { useState } from 'react'
import { Card, Input, Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { Check, AlertCircle, Lock } from 'lucide-react'

const SecurityTab = () => {
    const { updateUserPassword } = useAuth()

    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleUpdatePassword = async () => {
        setError('')
        setSuccess(false)

        if (passwords.newPassword !== passwords.confirmPassword) {
            return setError("Les mots de passe ne correspondent pas.")
        }

        if (passwords.newPassword.length < 6) {
            return setError("Le mot de passe doit faire au moins 6 caractères.")
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
                <p className="text-sm text-text-secondary">
                    En cas de problème de sécurité, contactez immédiatement le support.
                </p>
            </div>
        </Card>
    )
}

export default SecurityTab
