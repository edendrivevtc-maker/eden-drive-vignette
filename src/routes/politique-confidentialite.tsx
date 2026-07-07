import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Politique de confidentialité — EDEN DRIVE VTC";
const DESCRIPTION =
  "Politique de confidentialité et de protection des données personnelles du site EURL EDEN DRIVE VTC.";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/politique-confidentialite" }],
  }),
  component: PolitiqueConfidentialite,
});

function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LegalHeader />
      <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Vie privée</span>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Politique de <em className="text-silver-gradient not-italic">confidentialité</em>
          </h1>
          <div className="hairline mx-auto my-6 w-24" />
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Dernière mise à jour : juillet 2026
          </p>
        </div>

        <div className="mt-10 space-y-12 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section>
            <p>
              EURL EDEN DRIVE VTC accorde une importance particulière à la protection des données
              personnelles de ses clients et visiteurs.
            </p>
            <p className="mt-4">
              La présente politique explique quelles informations sont collectées via le site{" "}
              <a href="https://edendrive-vtc.fr" className="text-silver hover:underline">
                https://edendrive-vtc.fr
              </a>
              , pourquoi elles sont utilisées et quels sont vos droits.
            </p>
          </section>

          <section>
            <h2 className="text-center font-display text-2xl text-ivory">1. Responsable du traitement des données</h2>
            <div className="hairline mx-auto my-4 w-16" />
            <p>Le responsable du traitement des données personnelles collectées sur ce site est :</p>
            <p className="mt-4">
              <strong className="text-ivory">EURL EDEN DRIVE VTC</strong><br />
              3 rue Suzanne Valadon<br />
              31850 Montrabé<br />
              France
            </p>
            <p className="mt-4"><span className="text-ivory">Contact :</span></p>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="mailto:edendrivevtc@gmail.com" className="text-silver hover:underline">
                  edendrivevtc@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+33635585823" className="text-silver hover:underline">
                  06 35 58 58 23
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-center font-display text-2xl text-ivory">2. Données collectées</h2>
            <div className="hairline mx-auto my-4 w-16" />
            <p>
              Lorsque vous utilisez le formulaire de demande de réservation, les informations
              suivantes peuvent être collectées :
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>Nom et prénom ;</li>
              <li>Numéro de téléphone ;</li>
              <li>Adresse e-mail ;</li>
              <li>Adresse de départ ;</li>
              <li>Adresse d'arrivée ;</li>
              <li>Date de la course ;</li>
              <li>Heure de prise en charge ;</li>
              <li>Nombre de passagers ;</li>
              <li>Informations complémentaires éventuellement renseignées dans le message.</li>
            </ul>
            <p className="mt-4">
              Ces informations sont nécessaires afin de pouvoir répondre à votre demande de
              réservation et organiser votre transport.
            </p>
          </section>

          <section>
            <h2 className="text-center font-display text-2xl text-ivory">3. Utilisation des données</h2>
            <div className="hairline mx-auto my-4 w-16" />
            <p>Les données collectées sont utilisées uniquement pour :</p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>répondre aux demandes de réservation ;</li>
              <li>établir une proposition tarifaire ;</li>
              <li>organiser et assurer les prestations de transport ;</li>
              <li>échanger avec le client concernant sa demande.</li>
            </ul>
            <p className="mt-4">
              Les données ne sont pas utilisées à des fins publicitaires et ne sont pas vendues ou
              louées à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-center font-display text-2xl text-ivory">4. Conservation des données</h2>
            <div className="hairline mx-auto my-4 w-16" />
            <p>
              Les demandes reçues par e-mail sont conservées pendant une durée raisonnable
              permettant le suivi administratif et commercial des demandes clients.
            </p>
            <p className="mt-4">
              Sauf obligation légale particulière, les données sont conservées pendant une durée
              maximale de 3 ans à compter du dernier contact avec le client, conformément aux
              bonnes pratiques applicables en matière de gestion commerciale.
            </p>
            <p className="mt-4">Au-delà de cette période, les données sont supprimées ou anonymisées.</p>
          </section>

          <section>
            <h2 className="text-center font-display text-2xl text-ivory">5. Transmission des données</h2>
            <div className="hairline mx-auto my-4 w-16" />
            <p>
              Les informations transmises via le formulaire sont envoyées directement à l'adresse
              e-mail professionnelle :
            </p>
            <p className="mt-4">
              <a href="mailto:edendrivevtc@gmail.com" className="text-silver hover:underline">
                edendrivevtc@gmail.com
              </a>
            </p>
            <p className="mt-4">
              Elles ne sont pas enregistrées dans une base de données dédiée sur le site internet.
            </p>
            <p className="mt-4">
              EURL EDEN DRIVE VTC ne transmet pas vos données personnelles à des tiers, sauf
              obligation légale ou nécessité liée à l'exécution de la prestation demandée.
            </p>
          </section>

          <section>
            <h2 className="text-center font-display text-2xl text-ivory">6. Cookies et outils de suivi</h2>
            <div className="hairline mx-auto my-4 w-16" />
            <p>
              Le site{" "}
              <a href="https://edendrive-vtc.fr" className="text-silver hover:underline">
                https://edendrive-vtc.fr
              </a>{" "}
              n'utilise pas d'outil d'analyse d'audience ou de suivi publicitaire tel que Google
              Analytics, Meta Pixel ou outils similaires.
            </p>
            <p className="mt-4">Aucun cookie publicitaire ou de suivi n'est utilisé.</p>
            <p className="mt-4">
              Des éléments techniques nécessaires au fonctionnement du site peuvent toutefois être
              utilisés par les services d'hébergement afin d'assurer la sécurité et le bon
              fonctionnement du site.
            </p>
          </section>

          <section>
            <h2 className="text-center font-display text-2xl text-ivory">7. Vos droits</h2>
            <div className="hairline mx-auto my-4 w-16" />
            <p>
              Conformément à la réglementation applicable sur la protection des données
              personnelles, vous disposez des droits suivants :
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>droit d'accès à vos données ;</li>
              <li>droit de rectification des informations inexactes ;</li>
              <li>droit à l'effacement de vos données ;</li>
              <li>droit de limitation du traitement ;</li>
              <li>droit d'opposition dans certains cas.</li>
            </ul>
            <p className="mt-4">Pour exercer vos droits, vous pouvez contacter :</p>
            <p className="mt-4">
              <strong className="text-ivory">EURL EDEN DRIVE VTC</strong><br />
              E-mail :{" "}
              <a href="mailto:edendrivevtc@gmail.com" className="text-silver hover:underline">
                edendrivevtc@gmail.com
              </a>
              <br />
              Téléphone :{" "}
              <a href="tel:+33635585823" className="text-silver hover:underline">
                06 35 58 58 23
              </a>
            </p>
            <p className="mt-4">
              Une réponse vous sera apportée dans les délais prévus par la réglementation.
            </p>
          </section>

          <section>
            <h2 className="text-center font-display text-2xl text-ivory">8. Sécurité des données</h2>
            <div className="hairline mx-auto my-4 w-16" />
            <p>
              EURL EDEN DRIVE VTC met en œuvre des mesures raisonnables afin de protéger les
              informations transmises contre toute perte, utilisation abusive ou accès non
              autorisé.
            </p>
          </section>

          <section>
            <h2 className="text-center font-display text-2xl text-ivory">9. Modification de la politique de confidentialité</h2>
            <div className="hairline mx-auto my-4 w-16" />
            <p>
              EURL EDEN DRIVE VTC se réserve le droit de modifier la présente politique afin de
              tenir compte des évolutions légales, techniques ou organisationnelles.
            </p>
            <p className="mt-4">
              La version applicable est celle publiée sur le site au moment de votre consultation.
            </p>
          </section>
        </div>

        <div className="mt-16">
          <Link
            to="/"
            className="btn-ghost-silver inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium uppercase tracking-widest"
          >
            Retour à l'accueil
          </Link>
        </div>
      </main>
    </div>
  );
}

function LegalHeader() {
  return (
    <header className="border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" aria-label="EDEN DRIVE VTC - Accueil" className="inline-flex items-center">
          <img src="/logo.png" alt="EDEN DRIVE VTC" className="h-12 w-auto object-contain" />
        </Link>
        <Link
          to="/"
          className="text-sm text-muted-foreground transition-colors hover:text-silver"
        >
          Accueil
        </Link>
      </div>
    </header>
  );
}
