import { Bell, X, Check, Trash2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui'

const NotificationDropdown = ({ onClose }) => {
    // Mock data - eventually connect to Firestore 'notifications' collection
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Bienvenue sur Syana ! 🚀",
            message: "Ravi de vous compter parmi nous. Commencez par le Module 1.",
            time: "À l'instant",
            read: false,
            type: 'info'
        },
        {
            id: 2,
            title: "Module 1 Débloqué",
            message: "Vous avez maintenant accès à 'Fondations & Mindset'.",
            time: "Il y a 1 heure",
            read: false,
            type: 'success'
        }
    ])

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true } : n
        ))
    }

    const clearAll = () => {
        setNotifications([])
    }

    return (
        <Card className="absolute top-12 right-0 w-80 md:w-96 p-0 z-50 shadow-2xl border-white/10 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-xl rounded-t-2xl">
                <h3 className="font-bold text-white text-sm">Notifications</h3>
                {notifications.length > 0 && (
                    <button onClick={clearAll} className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-400 transition-colors">
                        <Trash2 size={12} />
                        Tout effacer
                    </button>
                )}
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-bg-card/95 backdrop-blur-xl">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center text-text-secondary text-sm">
                        <Bell size={24} className="mx-auto mb-2 opacity-50" />
                        <p>Aucune nouvelle notification</p>
                    </div>
                ) : (
                    notifications.map(notification => (
                        <div
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={`p-4 border-b border-white/5 transition-colors cursor-pointer hover:bg-white/5 relative ${notification.read ? 'opacity-60' : 'bg-cyan/5'}`}
                        >
                            {!notification.read && (
                                <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                            )}
                            <h4 className="text-sm font-semibold text-white mb-1">{notification.title}</h4>
                            <p className="text-xs text-text-secondary mb-2">{notification.message}</p>
                            <span className="text-[10px] text-text-secondary/70 uppercase tracking-wider">{notification.time}</span>
                        </div>
                    ))
                )}
            </div>
        </Card>
    )
}

export default NotificationDropdown
