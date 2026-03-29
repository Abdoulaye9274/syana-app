import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-bg-primary">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            Contactez-nous
                        </h1>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Une question, un retour ou un besoin spécifique ? Notre équipe est à votre écoute pour vous accompagner.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <Card className="p-8">
                                <h2 className="text-2xl font-bold text-text-primary mb-8">Informations de contact</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
                                            <Mail className="text-cyan" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-secondary mb-1">Email</p>
                                            <a href="mailto:contact@sarahdigitalimpact.com" className="text-lg text-text-primary hover:text-cyan transition-colors">
                                                contact@sarahdigitalimpact.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                                            <Phone className="text-purple-500" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-secondary mb-1">Téléphone</p>
                                            <a href="tel:+33745047086" className="text-lg text-text-primary hover:text-purple-500 transition-colors">
                                                +33 7 45 04 70 86
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
                                            <MapPin className="text-rose-500" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-secondary mb-1">Localisation</p>
                                            <p className="text-lg text-text-primary">
                                                France / International
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-8 bg-gradient-to-br from-cyan/5 to-purple-500/5 border-cyan/20">
                                <h3 className="text-xl font-bold text-text-primary mb-4">Support WhatsApp</h3>
                                <p className="text-text-secondary mb-6">
                                    Besoin d'une réponse ultra-rapide ? Nos experts sont disponibles sur WhatsApp pour vous guider.
                                </p>
                                <Button
                                    className="w-full bg-[#25D366] hover:bg-[#20bd5c] text-white border-none"
                                    onClick={() => window.open('https://wa.me/33745047086?text=Bonjour%20je%20souhaite%20des%20informations', '_blank')}
                                >
                                    Ouvrir WhatsApp
                                </Button>
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <Card className="p-8">
                            <h2 className="text-2xl font-bold text-text-primary mb-8">Envoyez-nous un message</h2>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-secondary">Prénom</label>
                                        <Input placeholder="Votre prénom" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-secondary">Nom</label>
                                        <Input placeholder="Votre nom" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-secondary">Email</label>
                                    <Input type="email" placeholder="votre@email.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-secondary">Sujet</label>
                                    <Input placeholder="Comment pouvons-nous vous aider ?" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-secondary">Message</label>
                                    <textarea
                                        className="w-full bg-bg-primary border border-border-primary rounded-xl p-4 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 min-h-[150px] transition-all"
                                        placeholder="Décrivez votre besoin ici..."
                                    />
                                </div>
                                <Button className="w-full gap-2 py-6">
                                    <Send size={18} />
                                    Envoyer le message
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default ContactPage
