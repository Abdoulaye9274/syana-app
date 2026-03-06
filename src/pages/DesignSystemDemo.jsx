import { useState } from 'react'
import { Button, Input, Card, Badge, ProgressBar, Tabs, Accordion, Modal } from '@/components/ui'
import { Home, User, Settings, Lock, Check } from 'lucide-react'

const DesignSystemDemo = () => {
    const [modalOpen, setModalOpen] = useState(false)

    const tabsData = [
        { label: 'Vidéo', content: <div className="p-4 text-white">Contenu vidéo</div> },
        { label: 'Transcription', content: <div className="p-4 text-white">Contenu transcription</div> },
        { label: 'Notes', content: <div className="p-4 text-white">Contenu notes</div> }
    ]

    const accordionItems = [
        { title: 'Exercice 1 : Définir ton client idéal', content: 'Contenu de l\'exercice 1' },
        { title: 'Exercice 2 : Interviewer 3 clients potentiels', content: 'Contenu de l\'exercice 2' },
        { title: 'Exercice 3 : Créer ta carte d\'empathie', content: 'Contenu de l\'exercice 3' }
    ]

    return (
        <div className="min-h-screen bg-bg-primary p-8">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-6xl font-bold gradient-text mb-4">
                        SYANA Design System
                    </h1>
                    <p className="text-text-secondary text-xl">
                        Tous les composants UI pixel-perfect
                    </p>
                </div>

                {/* Buttons */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-6">Buttons</h2>
                    <Card>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="primary">Primary Button</Button>
                            <Button variant="secondary">Secondary Button</Button>
                            <Button variant="ghost">Ghost Button</Button>
                            <Button variant="danger">Danger Button</Button>
                            <Button variant="primary" loading>Loading...</Button>
                            <Button variant="primary" disabled>Disabled</Button>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <Button variant="primary" size="sm">Small</Button>
                            <Button variant="primary" size="md">Medium</Button>
                            <Button variant="primary" size="lg">Large</Button>
                        </div>
                    </Card>
                </section>

                {/* Inputs */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-6">Inputs</h2>
                    <Card>
                        <div className="grid grid-cols-2 gap-6">
                            <Input label="Prénom" placeholder="Sophie" />
                            <Input label="Nom" placeholder="Martin" />
                            <Input label="Email" type="email" placeholder="sophie@email.com" />
                            <Input label="Mot de passe" type="password" showToggle placeholder="••••••••" />
                            <Input label="Avec erreur" error="Ce champ est requis" />
                        </div>
                    </Card>
                </section>

                {/* Cards */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-6">Cards</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <Card>
                            <h3 className="text-xl font-semibold text-white mb-2">Default Card</h3>
                            <p className="text-text-secondary">Background #1E2432 avec border subtile</p>
                        </Card>
                        <Card variant="gradient">
                            <h3 className="text-xl font-semibold text-white mb-2">Gradient Card</h3>
                            <p className="text-white/90">Dégradé cyan → violet → rose</p>
                        </Card>
                        <Card variant="glass">
                            <h3 className="text-xl font-semibold text-white mb-2">Glass Card</h3>
                            <p className="text-text-secondary">Effet glassmorphism avec blur</p>
                        </Card>
                        <Card hover>
                            <h3 className="text-xl font-semibold text-white mb-2">Hover Card</h3>
                            <p className="text-text-secondary">Survole-moi pour voir l'effet</p>
                        </Card>
                    </div>
                </section>

                {/* Badges */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-6">Badges</h2>
                    <Card>
                        <div className="flex flex-wrap gap-3">
                            <Badge status="completed">✓ Terminé</Badge>
                            <Badge status="in_progress">En cours</Badge>
                            <Badge status="locked">🔒 Verrouillé</Badge>
                            <Badge status="to_rework">À retravailler</Badge>
                            <Badge status="pending">En attente</Badge>
                            <Badge status="validated">Validé</Badge>
                        </div>
                    </Card>
                </section>

                {/* Progress Bars */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-6">Progress Bars</h2>
                    <Card>
                        <div className="space-y-6">
                            <div>
                                <p className="text-white mb-2">Linéaire - 65%</p>
                                <ProgressBar value={65} showLabel />
                            </div>
                            <div>
                                <p className="text-white mb-2">Linéaire - 26%</p>
                                <ProgressBar value={26} />
                            </div>
                            <div className="flex gap-8">
                                <div className="text-center">
                                    <p className="text-white mb-2">Circulaire Small</p>
                                    <ProgressBar value={75} variant="circular" size="sm" showLabel />
                                </div>
                                <div className="text-center">
                                    <p className="text-white mb-2">Circulaire Medium</p>
                                    <ProgressBar value={50} variant="circular" size="md" showLabel />
                                </div>
                                <div className="text-center">
                                    <p className="text-white mb-2">Circulaire Large</p>
                                    <ProgressBar value={90} variant="circular" size="lg" showLabel />
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Tabs */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-6">Tabs</h2>
                    <Card>
                        <Tabs tabs={tabsData} />
                    </Card>
                </section>

                {/* Accordion */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-6">Accordion</h2>
                    <Card>
                        <Accordion items={accordionItems} defaultOpen={[0]} />
                    </Card>
                </section>

                {/* Modal */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-6">Modal</h2>
                    <Card>
                        <Button onClick={() => setModalOpen(true)}>Ouvrir Modal</Button>
                        <Modal
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            title="Exemple de Modal"
                        >
                            <p className="text-text-secondary mb-4">
                                Ceci est un exemple de modal avec backdrop blur et animations.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                                    Annuler
                                </Button>
                                <Button variant="primary" onClick={() => setModalOpen(false)}>
                                    Confirmer
                                </Button>
                            </div>
                        </Modal>
                    </Card>
                </section>

                {/* Icons */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-6">Icons (Lucide)</h2>
                    <Card>
                        <div className="flex gap-6">
                            <div className="text-center">
                                <Home size={32} className="text-cyan mb-2 mx-auto" />
                                <p className="text-sm text-text-secondary">Home</p>
                            </div>
                            <div className="text-center">
                                <User size={32} className="text-violet mb-2 mx-auto" />
                                <p className="text-sm text-text-secondary">User</p>
                            </div>
                            <div className="text-center">
                                <Settings size={32} className="text-rose mb-2 mx-auto" />
                                <p className="text-sm text-text-secondary">Settings</p>
                            </div>
                            <div className="text-center">
                                <Lock size={32} className="text-text-secondary mb-2 mx-auto" />
                                <p className="text-sm text-text-secondary">Lock</p>
                            </div>
                            <div className="text-center">
                                <Check size={32} className="text-green-500 mb-2 mx-auto" />
                                <p className="text-sm text-text-secondary">Check</p>
                            </div>
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    )
}

export default DesignSystemDemo
