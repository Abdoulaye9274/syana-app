import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-bg-primary border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="inline-block">
                            <img
                                src="/logo.png"
                                alt="SYANA"
                                className="h-8 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                            Structurez votre business avec un système guidé et intelligent.
                        </p>
                    </div>

                    {/* Column 2: Produit */}
                    <div>
                        <h4 className="font-medium text-white mb-6">Produit</h4>
                        <ul className="space-y-3">
                            <li><Link to="/systeme" className="text-text-secondary hover:text-white text-sm transition-colors">Le Système</Link></li>
                            <li><Link to="/tarifs" className="text-text-secondary hover:text-white text-sm transition-colors">Tarifs</Link></li>
                            <li><Link to="#" className="text-text-secondary hover:text-white text-sm transition-colors">Démo</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Entreprise */}
                    <div>
                        <h4 className="font-medium text-white mb-6">Entreprise</h4>
                        <ul className="space-y-3">
                            <li><Link to="/faq" className="text-text-secondary hover:text-white text-sm transition-colors">FAQ</Link></li>
                            <li><Link to="/support" className="text-text-secondary hover:text-white text-sm transition-colors">Support</Link></li>
                            <li><Link to="/contact" className="text-text-secondary hover:text-white text-sm transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Légal */}
                    <div>
                        <h4 className="font-medium text-white mb-6">Légal</h4>
                        <ul className="space-y-3">
                            {['Confidentialité', 'CGU', 'Mentions légales'].map(item => (
                                <li key={item}>
                                    <Link to="#" className="text-text-secondary hover:text-white text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/5 pt-8 text-center">
                    <p className="text-text-secondary text-sm">
                        &copy; 2026 SYANA. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
