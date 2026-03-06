import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const navLinks = [
        { label: 'Le Système', href: '/systeme' },
        { label: 'Témoignages', href: '/temoignages' },
        { label: 'Tarifs', href: '/tarifs' },
        { label: 'Pourquoi SYANA ?', href: '/pourquoi-syana' }
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/logo.png"
                        alt="SYANA Logo"
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className="text-text-secondary hover:text-white font-medium transition-colors text-sm"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/connexion" className="text-white hover:text-cyan font-medium transition-colors text-sm">
                        Se connecter
                    </Link>
                    <Link to="/inscription">
                        <Button size="sm" className="shadow-none">
                            Commencer l'essai
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text-secondary hover:text-white"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-bg-primary border-b border-white/5 absolute top-20 left-0 right-0 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className="text-text-secondary hover:text-white font-medium text-lg py-2 block"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="h-px bg-white/5 my-2" />
                    <Link
                        to="/connexion"
                        className="text-white font-medium text-lg py-2 block"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Se connecter
                    </Link>
                    <Link to="/inscription" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full">
                            Commencer l'essai
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar
