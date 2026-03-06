import { Bell, Search } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import NotificationDropdown from './NotificationDropdown'
import ThemeToggle from '@/components/ui/ThemeToggle'

const Header = ({ title, subtitle }) => {
    const [showNotifications, setShowNotifications] = useState(false)
    const notificationRef = useRef(null)

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <header className="flex items-center justify-between mb-8 z-40 relative">
            <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-text-secondary">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="hidden md:block w-80">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full bg-bg-card border border-border-primary rounded-button py-2.5 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all placeholder:text-text-secondary"
                        />
                    </div>
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative w-10 h-10 flex items-center justify-center rounded-button transition-colors ${showNotifications ? 'bg-cyan/20 text-cyan' : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'}`}
                    >
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                    </button>

                    {showNotifications && (
                        <NotificationDropdown onClose={() => setShowNotifications(false)} />
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
