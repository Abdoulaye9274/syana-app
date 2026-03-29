import { Navbar, Footer } from '@/components/layout'

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary">
            <Navbar />
            
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto bg-bg-card border border-border-primary rounded-2xl p-8 md:p-12 shadow-sm">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Déclaration de confidentialité SYANA SYSTEM</h1>
                    
                    <div className="space-y-6 text-text-secondary leading-relaxed">
                        <p className="italic">Dernière mise à jour : janvier 2026</p>
                        
                        <p>Chez SYANA SYSTEM, la confidentialité et la protection des données personnelles sont prises très au sérieux. La présente déclaration de confidentialité explique quelles données personnelles sont collectées, comment elles sont utilisées, partagées et protégées, ainsi que les droits dont disposent les utilisateurs.</p>
                        <p className="mt-2">Cette politique s’applique à l’ensemble des interactions entre vous et SYANA SYSTEM, notamment via le site internet, la plateforme SAAS, les contenus, les outils, les formulaires et les échanges avec notre équipe.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">1. Responsable du traitement des données</h2>
                        <p>Le responsable du traitement des données personnelles est :</p>
                        <ul className="list-none space-y-1 mt-2">
                            <li><strong>ABI ROSA SARAH</strong></li>
                            <li>Entrepreneur individuel</li>
                            <li><strong>SIREN :</strong> 888 275 336</li>
                            <li><strong>RCS Nanterre :</strong> 888 275 336</li>
                            <li><strong>Email de contact :</strong> <a href="mailto:contact@syanasystem.com" className="text-cyan hover:underline hover:text-cyan/80 transition-colors">contact@syanasystem.com</a></li>
                        </ul>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">2. Les données personnelles que nous collectons</h2>
                        <p>Nous collectons des données personnelles de différentes manières, selon vos interactions avec SYANA SYSTEM.</p>
                        
                        <h3 className="text-lg font-bold text-text-primary mt-6 mb-3">Données fournies directement par l’utilisateur</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Nom et prénom</li>
                            <li>Adresse email</li>
                            <li>Informations professionnelles (activité, projet, objectifs)</li>
                            <li>Informations de connexion à la plateforme</li>
                            <li>Données transmises via formulaires, questionnaires, tableaux ou échanges avec nos conseillers</li>
                        </ul>

                        <h3 className="text-lg font-bold text-text-primary mt-6 mb-3">Données collectées automatiquement</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Adresse IP</li>
                            <li>Type d’appareil et navigateur</li>
                            <li>Données de navigation sur le site</li>
                            <li>Pages consultées, durée de visite</li>
                            <li>Données techniques nécessaires au bon fonctionnement de la plateforme</li>
                        </ul>

                        <h3 className="text-lg font-bold text-text-primary mt-6 mb-3">Données de paiement</h3>
                        <p>Les paiements sont traités par des prestataires sécurisés. SYANA SYSTEM ne stocke pas directement les données bancaires.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">3. Comment nous utilisons les données personnelles</h2>
                        <p className="font-medium mb-2">Les données collectées sont utilisées pour :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Fournir l’accès à la plateforme SYANA SYSTEM</li>
                            <li>Créer et gérer les comptes utilisateurs</li>
                            <li>Assurer le fonctionnement technique et la sécurité du service</li>
                            <li>Proposer un accompagnement adapté à la situation de l’utilisateur</li>
                            <li>Améliorer les contenus, outils et parcours proposés</li>
                            <li>Communiquer avec les utilisateurs (emails informatifs, support, notifications importantes)</li>
                            <li>Respecter nos obligations légales et contractuelles</li>
                        </ul>
                        <p className="mt-4">Les données ne sont jamais utilisées à des fins incompatibles avec les finalités décrites ci-dessus.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">4. Bases légales du traitement</h2>
                        <p className="font-medium mb-2">Les traitements de données reposent sur :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>L’exécution d’un contrat (accès à la plateforme, abonnement)</li>
                            <li>Le consentement de l’utilisateur (formulaires, cookies non essentiels)</li>
                            <li>L’intérêt légitime de SYANA SYSTEM (sécurité, amélioration du service)</li>
                            <li>Les obligations légales applicables</li>
                        </ul>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">5. Partage des données personnelles</h2>
                        <p className="font-medium mb-2">Les données personnelles peuvent être partagées uniquement avec :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Des prestataires techniques nécessaires au fonctionnement du service (hébergement, paiement, emailing, analytics)</li>
                            <li>Des partenaires agissant pour le compte de SYANA SYSTEM, dans le respect du RGPD</li>
                        </ul>
                        <p className="mt-4">Aucune donnée personnelle n’est vendue ou louée à des tiers.</p>
                        <p className="mt-2">Les prestataires sont contractuellement tenus de garantir la confidentialité et la sécurité des données.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">6. Hébergement et sécurité des données</h2>
                        <p>Le site et les données sont hébergés par :</p>
                        <p className="mt-2"><strong>o2switch</strong><br/>63000 Clermont-Ferrand – France</p>
                        
                        <p className="font-medium mt-4 mb-2">Des mesures techniques et organisationnelles appropriées sont mises en œuvre pour protéger les données contre :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>l’accès non autorisé</li>
                            <li>la perte</li>
                            <li>l’altération</li>
                            <li>la divulgation</li>
                        </ul>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">7. Durée de conservation des données</h2>
                        <p className="font-medium mb-2">Les données sont conservées :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>pendant la durée de la relation contractuelle</li>
                            <li>puis archivées selon les obligations légales</li>
                            <li>ou supprimées à la demande de l’utilisateur, dans les limites prévues par la loi</li>
                        </ul>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">8. Cookies et technologies similaires</h2>
                        <p className="font-medium mb-2">SYANA SYSTEM utilise des cookies pour :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>assurer le bon fonctionnement du site</li>
                            <li>améliorer l’expérience utilisateur</li>
                            <li>mesurer l’audience et les performances</li>
                        </ul>
                        <p className="mt-4">Les cookies non essentiels sont soumis au consentement préalable de l’utilisateur via un bandeau de gestion des cookies.</p>
                        <p className="mt-2">Vous pouvez à tout moment modifier vos préférences via votre navigateur ou l’outil de gestion des cookies.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">9. Accès, modification et suppression des données</h2>
                        <p className="font-medium mb-2">Conformément au RGPD, vous disposez des droits suivants :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Droit d’accès</li>
                            <li>Droit de rectification</li>
                            <li>Droit d’effacement</li>
                            <li>Droit à la limitation du traitement</li>
                            <li>Droit d’opposition</li>
                            <li>Droit à la portabilité</li>
                        </ul>
                        <p className="mt-4">Pour exercer vos droits, vous pouvez contacter :<br/>📧 <a href="mailto:contact@syanasystem.com" className="text-cyan hover:underline hover:text-cyan/80 transition-colors">contact@syanasystem.com</a></p>
                        <p className="mt-2">Une réponse vous sera apportée dans un délai maximum de 30 jours.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">10. Données relatives aux enfants</h2>
                        <p>SYANA SYSTEM est destiné aux personnes majeures et aux professionnels. Aucune donnée concernant des mineurs n’est collectée volontairement.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">11. Activités exclues et conformité légale</h2>
                        <p className="font-medium mb-2">Certaines activités ne sont pas autorisées sur la plateforme, notamment :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>jeux d’argent</li>
                            <li>activités illégales</li>
                            <li>substances illicites</li>
                            <li>contenus à caractère sexuel explicite</li>
                            <li>produits dangereux ou non conformes</li>
                        </ul>
                        <p className="mt-4">SYANA SYSTEM se réserve le droit de suspendre ou supprimer tout compte ne respectant pas ces règles.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">12. Modification de la politique de confidentialité</h2>
                        <p>SYANA SYSTEM peut être amené à modifier la présente déclaration afin de rester conforme aux évolutions légales ou techniques.</p>
                        <p className="mt-2">La date de mise à jour sera indiquée en haut de page. Les utilisateurs seront informés en cas de modification majeure.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">13. Contact et réclamation</h2>
                        <p>Pour toute question relative à la protection des données personnelles :</p>
                        <p className="mt-2">📧 <a href="mailto:contact@syanasystem.com" className="text-cyan hover:underline hover:text-cyan/80 transition-colors">contact@syanasystem.com</a></p>
                        <p className="mt-4">En cas de litige, vous pouvez également saisir la CNIL :<br/><a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline hover:text-cyan/80 transition-colors">Particulier | CNIL</a></p>
                        
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default PrivacyPage
