import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Mentions légales — EDEN DRIVE VTC";
const DESCRIPTION =
  "Mentions légales du site EURL EDEN DRIVE VTC, chauffeur privé haut de gamme à Toulouse et en Occitanie.";

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

        <div className="space-y-12 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section>
            <h2 className="font-display text-2xl text-ivory">1. Éditeur du site</h2>
            <div className="hairline my-4 w-16" />
            <p>Le présent site internet est édité par :</p>
            <ul className="mt-4 space-y-1">
              <li><strong className="text-ivory">EURL EDEN DRIVE VTC</strong></li>
              <li>Forme juridique : Entreprise Unipersonnelle à Responsabilité Limitée (EURL)</li>
              <li>Capital social : 1 000 €</li>
              <li>Siège social : 3 rue Suzanne Valadon, 31850 Montrabé, France</li>
              <li>SIRET : 938 872 017 00018</li>
              <li>Immatriculation : Registre du Commerce et des Sociétés de Toulouse</li>
            </ul>

            <p className="mt-6"><span className="text-ivory">Dirigeant de la publication :</span><br />Fabrice Lopez</p>

            <p className="mt-6"><span className="text-ivory">Contact :</span></p>
            <ul className="mt-2 space-y-1">
              <li>
                Téléphone :{" "}
                <a href="tel:+33635585823" className="text-silver hover:underline">
                  06 35 58 58 23
                </a>
              </li>
              <li>
                E-mail :{" "}
                <a href="mailto:edendrivevtc@gmail.com" className="text-silver hover:underline">
                  edendrivevtc@gmail.com
                </a>
              </li>
            </ul>

            <p className="mt-6"><span className="text-ivory">Site internet :</span><br />
              <a href="https://edendrive-vtc.fr" className="text-silver hover:underline">
                https://edendrive-vtc.fr
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">2. Hébergement du site</h2>
            <div className="hairline my-4 w-16" />
            <p>Le site est hébergé par :</p>
            <p className="mt-4">
              <strong className="text-ivory">Cloudflare, Inc.</strong><br />
              101 Townsend St, San Francisco, CA 94107, États-Unis
            </p>
            <p className="mt-4">
              Cloudflare fournit notamment des services d'hébergement technique, de sécurité et
              d'optimisation du réseau.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">3. Propriété intellectuelle</h2>
            <div className="hairline my-4 w-16" />
            <p>
              L'ensemble des éléments présents sur ce site (textes, images, logos, éléments
              graphiques, structure et contenus) sont protégés par les dispositions relatives à la
              propriété intellectuelle.
            </p>
            <p className="mt-4">
              Toute reproduction, représentation ou utilisation sans autorisation préalable
              d'EURL EDEN DRIVE VTC est interdite.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">4. Responsabilité</h2>
            <div className="hairline my-4 w-16" />
            <p>
              EURL EDEN DRIVE VTC s'efforce de fournir des informations exactes et à jour sur son
              site.
            </p>
            <p className="mt-4">
              Toutefois, l'entreprise ne peut garantir l'exactitude complète, l'absence d'erreur ou
              la disponibilité permanente des informations publiées.
            </p>
            <p className="mt-4">L'utilisation du site relève de la responsabilité de l'utilisateur.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">5. Liens externes</h2>
            <div className="hairline my-4 w-16" />
            <p>Le site peut contenir des liens vers des sites externes.</p>
            <p className="mt-4">
              EURL EDEN DRIVE VTC ne peut être tenue responsable du contenu, du fonctionnement ou
              des pratiques de confidentialité de ces sites tiers.
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
