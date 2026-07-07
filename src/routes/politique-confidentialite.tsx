import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Politique de confidentialité — EDEN DRIVE VTC";
const DESCRIPTION =
  "Politique de confidentialité et de protection des données personnelles du site EDEN DRIVE VTC.";

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
        <span className="text-xs uppercase tracking-[0.3em] text-silver">Vie privée</span>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Politique de <em className="text-silver-gradient not-italic">confidentialité</em>
        </h1>
        <div className="hairline my-6 w-24" />

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section>
            <p>
              EDEN DRIVE VTC accorde la plus grande importance à la protection de votre vie
              privée et de vos données personnelles. La présente politique décrit les
              informations collectées via le site edendrive-vtc.fr, la manière dont elles
              sont utilisées et les droits dont vous disposez, conformément au Règlement
              général sur la protection des données (RGPD) et à la loi Informatique et
              Libertés.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Responsable du traitement</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Le responsable du traitement des données est EDEN DRIVE VTC, joignable à
              l'adresse{" "}
              <a href="mailto:edendrivevtc@gmail.com" className="text-silver hover:underline">
                edendrivevtc@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Données collectées</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Dans le cadre d'une demande de réservation ou de contact, nous collectons
              uniquement les informations strictement nécessaires au traitement de votre
              demande :
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>Nom et prénom</li>
              <li>Numéro de téléphone</li>
              <li>Adresse e-mail</li>
              <li>Adresses de prise en charge et de destination</li>
              <li>Date, heure et détails du trajet souhaité</li>
              <li>Toute information communiquée dans le champ « message »</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Finalités du traitement</h2>
            <div className="hairline my-4 w-16" />
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>Répondre à vos demandes de devis et de réservation</li>
              <li>Assurer la bonne exécution de la prestation de transport</li>
              <li>Vous recontacter en cas de besoin</li>
              <li>Respecter nos obligations légales et comptables</li>
            </ul>
            <p className="mt-4">
              Aucune donnée n'est utilisée à des fins de prospection commerciale sans votre
              consentement, ni cédée ou revendue à des tiers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Base légale</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Le traitement de vos données repose sur votre consentement (envoi du
              formulaire) et sur l'exécution de mesures précontractuelles ou contractuelles
              prises à votre demande.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Durée de conservation</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Les données liées à une demande de réservation sont conservées pendant la
              durée nécessaire à la gestion de la prestation, puis archivées conformément
              aux obligations légales (notamment comptables et fiscales), avant d'être
              supprimées.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Destinataires</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Vos données sont destinées uniquement à EDEN DRIVE VTC et à ses sous-traitants
              techniques strictement nécessaires au fonctionnement du site et à l'envoi des
              e-mails (hébergeur Cloudflare, service d'envoi transactionnel Brevo). Ces
              prestataires agissent sur nos instructions et sont tenus à la confidentialité.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Vos droits</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
              d'effacement, de limitation, d'opposition et de portabilité concernant vos
              données personnelles. Vous pouvez exercer ces droits à tout moment par e-mail
              à{" "}
              <a href="mailto:edendrivevtc@gmail.com" className="text-silver hover:underline">
                edendrivevtc@gmail.com
              </a>
              .
            </p>
            <p className="mt-4">
              En cas de désaccord persistant, vous pouvez introduire une réclamation auprès
              de la CNIL —{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener"
                className="text-silver hover:underline"
              >
                www.cnil.fr
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Cookies</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Le site edendrive-vtc.fr n'utilise pas de cookies publicitaires ni de traceurs
              de mesure d'audience non essentiels. Seuls des cookies strictement nécessaires
              au bon fonctionnement du site peuvent être déposés.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Sécurité</h2>
            <div className="hairline my-4 w-16" />
            <p>
              EDEN DRIVE VTC met en œuvre toutes les mesures techniques et organisationnelles
              appropriées pour garantir la sécurité, l'intégrité et la confidentialité de vos
              données.
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
