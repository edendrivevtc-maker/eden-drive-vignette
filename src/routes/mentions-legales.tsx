import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Mentions légales — EDEN DRIVE VTC";
const DESCRIPTION =
  "Mentions légales du site EDEN DRIVE VTC, chauffeur privé haut de gamme à Toulouse et en Occitanie.";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LegalHeader />
      <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <span className="text-xs uppercase tracking-[0.3em] text-silver">Informations légales</span>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Mentions <em className="text-silver-gradient not-italic">légales</em>
        </h1>
        <div className="hairline my-6 w-24" />

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section>
            <h2 className="font-display text-2xl text-ivory">Éditeur du site</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Le site <strong className="text-ivory">edendrive-vtc.fr</strong> est édité par
              EDEN DRIVE VTC, entreprise individuelle spécialisée dans le transport de
              personnes avec chauffeur (VTC).
            </p>
            <ul className="mt-4 space-y-1">
              <li>Dénomination : EDEN DRIVE VTC</li>
              <li>Siège : Toulouse, Occitanie, France</li>
              <li>Téléphone : +33 6 35 58 58 23</li>
              <li>
                E-mail :{" "}
                <a href="mailto:edendrivevtc@gmail.com" className="text-silver hover:underline">
                  edendrivevtc@gmail.com
                </a>
              </li>
              <li>Directeur de la publication : le représentant légal de l'entreprise</li>
              <li>Numéro SIRET et inscription au registre EVTC : disponibles sur demande</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Hébergement</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Le site est hébergé par Cloudflare, Inc., 101 Townsend Street, San Francisco,
              CA 94107, États-Unis — <a href="https://www.cloudflare.com" className="text-silver hover:underline" target="_blank" rel="noopener">cloudflare.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Propriété intellectuelle</h2>
            <div className="hairline my-4 w-16" />
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, logo, graphismes,
              mise en page) est la propriété exclusive d'EDEN DRIVE VTC, sauf mention
              contraire. Toute reproduction, représentation, modification ou diffusion,
              totale ou partielle, sans autorisation écrite préalable, est strictement
              interdite et constitue une contrefaçon sanctionnée par le Code de la
              propriété intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Responsabilité</h2>
            <div className="hairline my-4 w-16" />
            <p>
              EDEN DRIVE VTC met tout en œuvre pour assurer l'exactitude et l'actualité des
              informations diffusées sur ce site. Toutefois, l'éditeur ne saurait être tenu
              responsable des erreurs ou omissions, ni des conséquences d'une utilisation des
              informations mises à disposition.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">Contact</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Pour toute question relative au site ou à nos prestations, contactez-nous par
              e-mail à{" "}
              <a href="mailto:edendrivevtc@gmail.com" className="text-silver hover:underline">
                edendrivevtc@gmail.com
              </a>{" "}
              ou par téléphone au +33 6 35 58 58 23.
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
