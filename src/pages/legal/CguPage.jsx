import { Navbar, Footer } from '@/components/layout'

const CguPage = () => {
    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary">
            <Navbar />
            
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto bg-bg-card border border-border-primary rounded-2xl p-8 md:p-12 shadow-sm">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Conditions Générales d’Utilisation (CGU)</h1>
                    
                    <div className="space-y-6 text-text-secondary leading-relaxed">
                        <p className="italic">Dernière mise à jour : janvier 2026</p>
                        
                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Acceptation des conditions</h2>
                        <p>Les services proposés par SYANA SYSTEM sont soumis aux présentes Conditions Générales d’Utilisation (ci-après les « CGU »).</p>
                        <p className="mt-2">SYANA SYSTEM se réserve le droit de modifier ou de mettre à jour les présentes CGU à tout moment, notamment afin de se conformer aux évolutions légales, réglementaires, techniques ou fonctionnelles de la plateforme.</p>
                        <p className="mt-2">La version applicable est celle publiée sur le site au moment de l’utilisation des Services. Toute utilisation de la plateforme après la mise à jour des CGU vaut acceptation pleine et entière de la version en vigueur.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Description des services</h2>
                        <p>SYANA SYSTEM est une plateforme SAAS d’accompagnement stratégique destinée aux entrepreneurs, indépendants, porteurs de projets et structures souhaitant structurer, clarifier et développer une activité professionnelle durable.</p>
                        <p className="mt-4 mb-2 font-medium">Les Services comprennent notamment :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>un accès à une plateforme en ligne sécurisée,</li>
                            <li>un parcours structuré en modules progressifs,</li>
                            <li>des contenus pédagogiques (vidéos, textes, outils, tableaux),</li>
                            <li>des espaces de travail personnels,</li>
                            <li>des retours d’experts selon la formule choisie,</li>
                            <li>des outils d’aide à la décision et à la structuration.</li>
                        </ul>
                        <p className="mt-4">Les Services peuvent évoluer, être enrichis ou modifiés sans que cela n’engage la responsabilité de SYANA SYSTEM.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Accès aux services et création de compte</h2>
                        <p>L’accès à certains Services nécessite la création d’un compte utilisateur.</p>
                        <p className="mt-2">L’utilisateur s’engage à fournir des informations exactes, complètes et à jour lors de l’inscription. Il est seul responsable de la confidentialité de ses identifiants et de toute activité réalisée via son compte.</p>
                        <p className="mt-2">SYANA SYSTEM ne pourra être tenue responsable d’un accès non autorisé résultant d’une négligence de l’utilisateur.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Utilisation personnelle et professionnelle autorisée</h2>
                        <p>Les Services sont destinés à un usage professionnel personnel, dans le cadre de la structuration de l’activité de l’utilisateur.</p>
                        <p className="mt-4 mb-2 font-medium">Sauf autorisation écrite préalable, il est strictement interdit de :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>copier, reproduire ou redistribuer les contenus,</li>
                            <li>revendre ou commercialiser l’accès à la plateforme,</li>
                            <li>utiliser les contenus à des fins de formation tierce,</li>
                            <li>modifier, détourner ou exploiter les outils à des fins non prévues.</li>
                        </ul>
                        <p className="mt-4">Toute utilisation abusive pourra entraîner la suspension ou la résiliation du compte.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Vie privée et données personnelles</h2>
                        <p>La collecte et le traitement des données personnelles sont régis par la Déclaration de confidentialité SYANA SYSTEM, accessible sur le site.</p>
                        <p className="mt-2">L’utilisateur reconnaît en avoir pris connaissance et l’accepter.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Contenus et propriété intellectuelle</h2>
                        <p>L’ensemble des contenus disponibles sur SYANA SYSTEM (textes, vidéos, supports, outils, structure du parcours, méthodologie) est protégé par le droit de la propriété intellectuelle.</p>
                        <p className="mt-2">Ces contenus sont la propriété exclusive de ABI ROSA SARAH – SYANA SYSTEM, sauf mention contraire.</p>
                        <p className="mt-2">Aucun droit de propriété n’est transféré à l’utilisateur.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Logiciels, plateforme et accès technique</h2>
                        <p>La plateforme est mise à disposition « en l’état », avec les fonctionnalités disponibles au moment de l’utilisation.</p>
                        <p className="mt-2">SYANA SYSTEM ne garantit pas une accessibilité permanente sans interruption, notamment en cas de maintenance, mise à jour ou incident technique indépendant de sa volonté.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Limitation de responsabilité</h2>
                        <p>SYANA SYSTEM fournit un accompagnement stratégique, des outils et des contenus à vocation pédagogique et professionnelle.</p>
                        <p className="mt-4 mb-2 font-medium">L’utilisateur reste seul responsable :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>de ses décisions,</li>
                            <li>de la mise en œuvre des recommandations,</li>
                            <li>des résultats obtenus dans son activité.</li>
                        </ul>
                        <p className="mt-4">SYANA SYSTEM ne saurait être tenue responsable de pertes financières, commerciales ou de toute conséquence indirecte liée à l’utilisation des Services.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Compte utilisateur, sécurité et responsabilité</h2>
                        <p className="mb-2 font-medium">L’utilisateur est responsable :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>de la sécurité de son compte,</li>
                            <li>de la sauvegarde de ses données personnelles,</li>
                            <li>de l’utilisation conforme de la plateforme.</li>
                        </ul>
                        <p className="mt-4">Toute tentative de fraude, d’intrusion, de détournement ou d’accès non autorisé entraînera la suspension immédiate du compte.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Utilisation interdite et activités exclues</h2>
                        <p className="mb-2 font-medium">Il est strictement interdit d’utiliser SYANA SYSTEM pour des activités :</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>illégales,</li>
                            <li>contraires à l’ordre public,</li>
                            <li>liées aux jeux d’argent,</li>
                            <li>à caractère sexuel explicite,</li>
                            <li>liées aux substances illicites,</li>
                            <li>ou aux produits dangereux ou non réglementés.</li>
                        </ul>
                        <p className="mt-4">SYANA SYSTEM se réserve le droit de supprimer tout contenu ou compte ne respectant pas ces règles.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Espaces d’échange et contributions utilisateur</h2>
                        <p>Les utilisateurs peuvent être amenés à partager des informations, réponses ou contenus dans le cadre du parcours.</p>
                        <p className="mt-2">L’utilisateur garantit disposer des droits nécessaires sur les contenus qu’il transmet.</p>
                        <p className="mt-2">SYANA SYSTEM se réserve le droit de supprimer tout contenu jugé inapproprié, sans préavis.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Absence d’obligation de résultat</h2>
                        <p>SYANA SYSTEM est tenue à une obligation de moyens, et non de résultat.</p>
                        <p className="mt-2">Les parcours proposés visent à structurer et accompagner, mais ne constituent en aucun cas une promesse de chiffre d’affaires, de succès commercial ou de performance financière.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Liens vers des sites tiers</h2>
                        <p>La plateforme peut contenir des liens vers des services tiers.</p>
                        <p className="mt-2">SYANA SYSTEM ne saurait être tenue responsable du contenu ou du fonctionnement de ces sites.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Durée, suspension et résiliation</h2>
                        <p>L’accès à la plateforme est accordé selon la formule souscrite.</p>
                        <p className="mt-2">SYANA SYSTEM se réserve le droit de suspendre ou résilier un compte en cas de non-respect des présentes CGU, sans indemnité.</p>
                        <p className="mt-2">L’utilisateur peut cesser d’utiliser la plateforme à tout moment, dans les conditions prévues contractuellement.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Droit applicable et juridiction compétente</h2>
                        <p>Les présentes CGU sont régies par le droit français.</p>
                        <p className="mt-2">En cas de litige, une tentative de résolution amiable sera privilégiée. À défaut, les tribunaux compétents seront ceux du ressort de Nanterre.</p>

                        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Contact</h2>
                        <p>Pour toute question relative aux présentes CGU :</p>
                        <p className="mt-2 mb-8">📧 <a href="mailto:contact@syanasystem.com" className="text-cyan hover:underline hover:text-cyan/80 transition-colors">contact@syanasystem.com</a></p>
                        
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default CguPage
