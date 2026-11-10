import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Calendar, Star } from "lucide-react";
import { GoogleReviewsRating, GoogleReviewsCount } from "@/components/google-reviews-stats";
const PHONE_DISPLAY_LOCAL = "06 35 58 58 23";
const PHONE_TEL = "+33635585823";
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=EDEN+DRIVE+VTC+Toulouse+avis";
function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" aria-label="EDEN DRIVE VTC - Retour en haut" className="inline-flex items-center">
      <img
        src="/logo.png"
        alt="EDEN DRIVE VTC"
        className={`h-10 w-auto object-contain ${className}`}
      />
    </a>
  );
}

export function LongJourneyReviews({ selection = [0, 1, 2] }: { selection?: number[] }) {
  const reviews = [
    {
      name: "Sarah Vrancken",
      role: "",
      text: "J’utilise Eden Drive pour le transport école maison des enfants et mes trajets personnels depuis plusieurs années. Le chauffeur hyper gentil est toujours à l’heure, la voiture impeccable, une conduite parfaite et toujours disponible. Je recommande vivement. Merci Mr Lopez!!",
    },
    {
      name: "Laurence Favre",
      role: "",
      text: "Nous avons fait appel à Fabrice pour un long trajet, et nous avons apprécié notre voyage. Le confort, la conduite et la gentillesse de Fabrice nous ont permis de ne pas voir passer le temps pendant nos 2 heures de trajet. Petite attention de la part de Fabrice qui montre tout son professionnalisme : des bouteilles d’eau fraîches nous ont été offertes pour braver cette chaleur. Je recommande à 200%",
    },
    {
      name: "Mariam Jbilou",
      role: "",
      text: "Très très bon chauffeur, TRÈS PROFESSIONNEL, rapide, efficace, véhicule très propre !",
    },
    {
      name: "Karen Le Boulanger",
      role: "",
      text: "Service impeccable, qui s’adapte aux demandes particulières des clients avec un service chaleureux. Au top, je recommande.",
    },
  ];
  return (
    <section id="avis" className="section-light relative border-t border-border/40 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Avis clients</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Ils nous font <em className="text-silver-gradient not-italic">confiance</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
        </div>

        {/* Google reviews highlight */}
        <div className="mt-12 flex justify-center">
          <div className="luxe-card w-full max-w-xl rounded-2xl p-8 text-center sm:p-10">
            <div className="flex flex-col items-center gap-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-silver/30 bg-silver/5 px-4 py-1.5 text-silver">
                <GoogleG className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.2em]">Avis Google</span>
              </div>
              <GoogleReviewsRating />
              <GoogleReviewsCount />
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener"
                className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
              >
                Laissez un avis
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {selection.flatMap(index => reviews[index] ? [reviews[index]] : []).map((r) => (
            <figure key={r.name} className="luxe-card flex h-full flex-col rounded-2xl p-7">
              <div className="flex gap-1 text-silver">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-ivory/90">
                « {r.text} »
              </blockquote>
              <figcaption className="mt-6 border-t border-border/60 pt-4">
                <div className="font-medium">{r.name}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {r.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="currentColor"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="currentColor"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
        fill="currentColor"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l2.85 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LongJourneyFooter() {
  return (
    <footer className="border-t border-border/40 bg-background py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Menu */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <a href="#reserver" className="hover:text-silver">Réservation</a>
          <a href="#services" className="hover:text-silver">Services</a>
          <a href="#contact-rapide" className="hover:text-silver">Contact</a>
          <a href="#avis" className="hover:text-silver">Avis clients</a>
        </nav>

        <div className="hairline my-8" />

        {/* Coordonnées entreprise */}
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo className="h-14 w-auto" />
          <div className="font-display text-2xl uppercase tracking-[0.15em] text-ivory">EDEN DRIVE VTC</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-silver" /> Toulouse et ses environs
            </li>
            <li className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-silver" /> Ouvert 24h/24, 7j/7
            </li>
          </ul>
          <div className="flex w-full flex-col gap-3">
            <a
              href={`tel:${PHONE_TEL}`}
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY_LOCAL}
            </a>
            <a
              href="#reserver"
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
            >
              <Calendar className="h-4 w-4" /> Réserver
            </a>
          </div>
        </div>

        <div className="hairline my-8" />

        {/* Services */}
        <div className="mb-8 text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.25em] text-silver">Services</div>
          <nav className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <Link to="/chauffeur-prive-toulouse" className="hover:text-silver">
              Chauffeur privé Toulouse
            </Link>
            <Link to="/vtc-aeroport-toulouse-blagnac" className="hover:text-silver">
              Transfert Aéroport Toulouse-Blagnac
            </Link>
            <Link to="/vtc-gare-matabiau-toulouse" className="hover:text-silver">
              Transfert Gare Toulouse Matabiau
            </Link>
            <Link to="/chauffeur-vtc-entreprise-toulouse" className="hover:text-silver">
              Déplacements professionnels
            </Link>
          </nav>
        </div>

        <div className="hairline my-8" />

        {/* Liens légaux */}
        <nav className="flex flex-col items-center gap-2 text-center text-xs uppercase tracking-widest text-muted-foreground">
          <Link to="/mentions-legales" className="transition-colors hover:text-silver">
            Mentions légales
          </Link>
          <Link to="/politique-confidentialite" className="transition-colors hover:text-silver">
            Politique de confidentialité
          </Link>
          <button
            type="button"
            onClick={() => window.Cookiebot?.renew()}
            className="transition-colors hover:text-silver"
          >
            Gérer mes cookies
          </button>
        </nav>


        <div className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} EDEN DRIVE VTC — Chauffeur VTC Toulouse. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

