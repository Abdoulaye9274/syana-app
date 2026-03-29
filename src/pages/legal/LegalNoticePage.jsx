import { Navbar, Footer } from '@/components/layout'

const LegalNoticePage = () => {
    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary">
            <Navbar />
            
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto bg-bg-card border border-border-primary rounded-2xl p-8 md:p-12 shadow-sm">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Mentions légales et informations consommateurs</h1>
                    
                    <div className="space-y-6 text-text-secondary leading-relaxed">
                        <p>En France, le site SYANA SYSTEM est un site exploité par ABI ROSA SARAH, entrepreneur individuel, agissant dans le cadre de ses activités de programmation informatique, de conseil et d’accompagnement entrepreneurial.</p>
                        
                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Éditeur du site et exploitant de la plateforme</h2>
                        <p><strong>ABI ROSA SARAH</strong><br/>Entrepreneur individuel</p>
                        <ul className="list-none space-y-1 mt-4">
                            <li><strong>SIREN :</strong> 888 275 336</li>
                            <li><strong>SIRET (siège) :</strong> 888 275 336 00012</li>
                            <li><strong>Numéro de TVA intracommunautaire :</strong> FR19888275336</li>
                        </ul>
                        
                        <p className="mt-4"><strong>Immatriculation au RCS :</strong><br/>888 275 336 R.C.S. Nanterre (inscrite le 24/08/2020)</p>
                        <p className="mt-4"><strong>Immatriculation au RNE :</strong><br/>Inscrite le 01/09/2020</p>
                        <p className="mt-4"><strong>Forme juridique :</strong> Entrepreneur individuel<br/><strong>Formes d’exercice :</strong> Commerciale et libérale non réglementée</p>
                        <p className="mt-4"><strong>Adresse professionnelle :</strong><br/>(Adresse communiquée sur demande pour des raisons de confidentialité)</p>
                        <p className="mt-4"><strong>Responsable de la publication :</strong><br/>ABI ROSA SARAH</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Hébergement du site</h2>
                        <p>Le site SYANA SYSTEM est hébergé par :</p>
                        <p className="mt-2">
                            <strong>o2switch</strong><br/>
                            Chemin des Pardiaux<br/>
                            63000 Clermont-Ferrand – France<br/>
                            Téléphone : 04 44 44 60 40<br/>
                            Site web : <a href="https://www.o2switch.fr" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline hover:text-cyan/80 transition-colors">o2switch, Un Hébergeur Web Aux Serveurs De Qualité Industrielle !</a>
                        </p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Contact</h2>
                        <p>Pour toute question relative au site, à la plateforme ou aux services proposés :</p>
                        <p className="mt-2">📧 Email : <a href="mailto:contact@syanasystem.com" className="text-cyan hover:underline hover:text-cyan/80 transition-colors">contact@syanasystem.com</a></p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Médiation et règlement des litiges</h2>
                        <p>En cas de réclamation ou de différend, les parties s’engagent à rechercher en priorité une solution amiable.</p>
                        <p className="mt-2">L’utilisateur est invité à contacter le support SYANA SYSTEM par voie électronique afin de tenter de résoudre le litige.</p>
                        <p className="mt-2">Conformément aux articles L.612-1 et suivants du Code de la consommation, si aucune solution amiable n’a pu être trouvée après une réclamation écrite préalable, le consommateur peut recourir gratuitement à un médiateur de la consommation.</p>
                        <p className="mt-2">À défaut de médiateur désigné à ce jour, l’utilisateur peut également utiliser la plateforme européenne de règlement en ligne des litiges accessible à l’adresse suivante : <br/>
                        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline hover:text-cyan/80 transition-colors">https://ec.europa.eu/consumers/odr</a></p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Informations consommateurs</h2>
                        
                        <h3 className="text-lg font-bold text-text-primary mt-6 mb-3">Description du service et nature des relations contractuelles</h3>
                        <p>SYANA SYSTEM est une plateforme numérique (SAAS) dédiée à la structuration entrepreneuriale. Elle permet aux utilisateurs d’accéder à un parcours progressif composé de modules, d’outils, de tableaux de travail, de contenus pédagogiques et, selon la formule choisie, d’un accompagnement humain.</p>
                        <p className="mt-2">L’objectif de SYANA SYSTEM est d’aider les entrepreneurs à clarifier leur activité, structurer leurs décisions et construire un business cohérent et durable.</p>
                        <p className="mt-2">Lorsqu’un utilisateur souscrit à SYANA SYSTEM, un contrat est conclu directement entre l’utilisateur et ABI ROSA SARAH.</p>
                        <p className="mt-2">SYANA SYSTEM ne constitue ni une formation certifiante, ni un conseil juridique, fiscal ou financier réglementé. Les décisions prises à partir des contenus ou outils fournis relèvent de la seule responsabilité de l’utilisateur.</p>

                        <h3 className="text-lg font-bold text-text-primary mt-6 mb-3">Accès, référencement et retrait des contenus</h3>
                        <p>Les contenus accessibles sur la plateforme SYANA SYSTEM sont créés et mis à disposition par l’éditeur du site.</p>
                        <p className="mt-2">L’accès aux modules, outils et ressources est conditionné à la création d’un compte utilisateur et à la souscription d’un abonnement actif.</p>
                        <p className="mt-4 font-medium">SYANA SYSTEM se réserve le droit de suspendre ou de retirer l’accès à tout contenu ou compte utilisateur ne respectant pas :</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>la législation en vigueur,</li>
                            <li>les présentes mentions légales,</li>
                            <li>les Conditions Générales d’Utilisation,</li>
                            <li>ou tout comportement contraire à l’éthique, à la sécurité ou à l’intégrité de la plateforme.</li>
                        </ul>

                        <h3 className="text-lg font-bold text-text-primary mt-6 mb-3">Secteurs d’activité non acceptés</h3>
                        <p className="font-medium">Par souci de conformité légale, éthique et de responsabilité, SYANA SYSTEM n’accepte pas les activités relevant notamment des secteurs suivants (liste non exhaustive) :</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>jeux d’argent et de hasard,</li>
                            <li>contenus ou services à caractère sexuel explicite,</li>
                            <li>vente ou promotion de drogues ou substances illicites,</li>
                            <li>produits cosmétiques dangereux ou non conformes,</li>
                            <li>toute activité illégale ou réglementée sans autorisation.</li>
                        </ul>
                        <p className="mt-4">SYANA SYSTEM se réserve le droit de refuser ou de suspendre l’accès à la plateforme à tout utilisateur exerçant une activité incompatible avec ses valeurs ou la réglementation applicable.</p>

                        <h3 className="text-lg font-bold text-text-primary mt-6 mb-3">Modalités de paiement et transactions financières</h3>
                        <p>L’accès à SYANA SYSTEM est proposé sous forme d’abonnement payant, selon différentes formules présentées sur le site.</p>
                        <p className="mt-2">Les prix sont affichés en euros, toutes taxes comprises, et sont précisés avant toute validation de paiement.</p>
                        <p className="mt-2">Les paiements sont réalisés via des prestataires de paiement sécurisés. Un justificatif de paiement est transmis à l’utilisateur par voie électronique après validation de la transaction.</p>
                        <p className="mt-2">Les modalités détaillées relatives aux abonnements, à la durée d’engagement, aux conditions de résiliation et au droit de rétractation sont précisées dans les Conditions Générales de Vente.</p>

                        <h3 className="text-lg font-bold text-text-primary mt-6 mb-3">Garanties et responsabilités</h3>
                        <p>SYANA SYSTEM met tout en œuvre pour assurer la disponibilité, la sécurité et la qualité de la plateforme.</p>
                        <p className="mt-2">Toutefois, l’éditeur ne garantit ni un résultat financier, ni une performance commerciale, ni une réussite entrepreneuriale. Les contenus, outils et accompagnements proposés constituent une aide à la structuration et à la prise de décision.</p>
                        <p className="mt-2">L’utilisateur reste seul responsable de l’utilisation qu’il fait des informations et outils mis à disposition.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Droit applicable</h2>
                        <p>Les présentes mentions légales sont soumises au droit français.</p>
                        <p className="mt-2">Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence des juridictions françaises.</p>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default LegalNoticePage
