import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => { setIsMenuOpen(false) }, [location])

    const navLinks = [
        { label: 'Le Système', href: '/systeme' },
        { label: 'Témoignages', href: '/temoignages' },
        { label: 'Tarifs', href: '/tarifs' },
        { label: 'Pourquoi SYANA ?', href: '/pourquoi-syana' }
    ]

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border-primary shadow-lg shadow-black/5'
                    : 'bg-transparent border-b border-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/logo.png" alt="SYANA Logo" className="h-10 w-auto object-contain" />
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className="text-text-secondary hover:text-text-primary font-medium transition-colors text-sm relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full rounded-full" />
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
                        aria-label="Changer le thème"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <Link to="/connexion" className="text-text-primary hover:text-cyan font-medium transition-colors text-sm">
                        Se connecter
                    </Link>
                    <Link to="/inscription">
                        <Button size="sm" className="rounded-full">
                            Commencer l'essai
                        </Button>
                    </Link>
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleTheme} className="text-text-secondary hover:text-text-primary focus:outline-none">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button
                        className="text-text-secondary hover:text-text-primary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={isMenuOpen ? 'close' : 'open'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="block"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.span>
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="md:hidden bg-bg-primary/95 backdrop-blur-xl border-b border-border-primary overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.25 }}
                                >
                                    <Link
                                        to={link.href}
                                        className="text-text-secondary hover:text-text-primary font-medium text-lg py-3 block"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="h-px bg-border-primary my-2" />
                            <Link to="/connexion" className="text-text-primary font-medium text-lg py-3 block">
                                Se connecter
                            </Link>
                            <Link to="/inscription">
                                <Button className="w-full rounded-full mt-2">Commencer l'essai</Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar
