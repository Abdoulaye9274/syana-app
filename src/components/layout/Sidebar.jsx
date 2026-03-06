import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Layers, FileText, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'

const Sidebar = () => {
    const location = useLocation()

    const navigation = [
        { name: 'Mon parcours', href: '/tableau-de-bord', icon: LayoutDashboard },
        { name: 'Tous les modules', href: '/modules', icon: Layers },
        { name: 'Mes livrables', href: '/livrables', icon: FileText },
        { name: 'Mon compte', href: '/compte', icon: User },
    ]

    const isActive = (path) => location.pathname === path

    const { user, userProfile, logout } = useAuth()

    // Fallback initials if no profile
    const getInitials = () => {
        if (userProfile?.firstName && userProfile?.lastName) {
            return `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase()
        }
        return user?.email?.[0].toUpperCase() || '?'
    }

    const displayName = userProfile
        ? `${userProfile.firstName} ${userProfile.lastName}`
        : user?.displayName || 'Utilisateur'

    return (
        <div className="fixed left-0 top-0 h-full w-[280px] bg-bg-secondary border-r border-border-primary flex flex-col p-6 z-40 transition-colors duration-300">
            {/* Logo */}
            <div className="mb-10 px-2">
                <Link to="/" className="block">
                    <img
                        src="/logo.png"
                        alt="SYANA Logo"
                        className="h-12 w-auto object-contain"
                    />
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navigation.map((item) => {
                    const active = isActive(item.href)
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-button transition-all duration-300 group
                ${active
                                    ? 'bg-cyan/10 text-cyan'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'
                                }
              `}
                        >
                            <Icon
                                size={20}
                                className={`transition-colors duration-300 ${active ? 'text-cyan' : 'text-text-secondary group-hover:text-white'}`}
                            />
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile & Logout */}
            <div className="pt-6 border-t border-border-primary">
                <Link to="/compte" className="bg-bg-card rounded-card p-4 mb-4 flex items-center gap-3 border border-border-primary hover:bg-bg-card-hover transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">
                        {getInitials()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary truncate group-hover:text-cyan transition-colors">
                            {displayName}
                        </p>
                        <p className="text-xs text-text-secondary truncate">
                            {user?.email}
                        </p>
                    </div>
                </Link>

                <Button
                    variant="ghost"
                    onClick={logout}
                    className="w-full justify-start gap-3 hover:bg-red-500/10 hover:text-red-500 text-text-secondary px-4"
                >
                    <LogOut size={20} />
                    <span className="text-sm">Se déconnecter</span>
                </Button>
            </div>
        </div>
    )
}

export default Sidebar
