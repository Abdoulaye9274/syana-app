import { useState, useEffect } from 'react'
import { Button, Input } from '@/components/ui'
import { getTipOfTheDay, updateTipOfTheDay } from '@/services/admin'
import { Check, Loader2, Lightbulb } from 'lucide-react'

const AdminTipEditor = () => {
    const [tip, setTip] = useState('')
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const loadTip = async () => {
            setLoading(true)
            const currentTip = await getTipOfTheDay()
            if (currentTip) setTip(currentTip)
            setLoading(false)
        }
        loadTip()
    }, [])

    const handleSave = async () => {
        if (!tip.trim()) return

        setSaving(true)
        try {
            await updateTipOfTheDay(tip)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (error) {
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan mb-2">
                <Lightbulb size={20} />
                <h4 className="font-semibold text-sm">Conseil du Jour</h4>
            </div>

            <textarea
                className="w-full bg-bg-primary border border-border-primary rounded-lg p-3 text-sm text-text-primary focus:border-cyan focus:ring-1 focus:ring-cyan outline-none resize-none h-24"
                placeholder="Écrivez le conseil du jour..."
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                disabled={loading}
            />

            <Button
                size="sm"
                onClick={handleSave}
                disabled={saving || loading || !tip.trim()}
                className="w-full"
            >
                {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                {success ? <Check className="mr-2" size={16} /> : null}
                {success ? 'Mis à jour !' : 'Mettre à jour'}
            </Button>
        </div>
    )
}

export default AdminTipEditor
