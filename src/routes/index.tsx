import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Plane,
  Train,
  Hotel,
  Briefcase,
  Clock,
  Sparkles,
  ShieldCheck,
  Star,
  Calendar,
  Car,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { sendBookingRequest } from "@/lib/booking.functions";
import { PlacesField } from "@/components/places-autocomplete";
import { GoogleReviewsRating, GoogleReviewsCount } from "@/components/google-reviews-stats";
import heroCar from "@/assets/hero-car.jpg";


const TITLE = "EDEN DRIVE VTC — Chauffeur privé haut de gamme à Toulouse & Occitanie";
const DESCRIPTION =
  "EDEN DRIVE VTC : chauffeur privé premium à Toulouse, Blagnac et en Occitanie. Transferts aéroport, gares, longs trajets, mise à disposition. Discrétion, ponctualité, luxe.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "chauffeur privé Toulouse, VTC Toulouse, chauffeur privé Blagnac, transfert aéroport Toulouse-Blagnac, chauffeur premium Toulouse, VTC haut de gamme Toulouse, EDEN DRIVE VTC",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroCar },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: heroCar },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://edendrive-vtc.fr/#business",
          name: "EDEN DRIVE VTC",
          description: DESCRIPTION,
          image: heroCar,
          telephone: "+33 6 35 58 58 23",
          email: "edendrivevtc@gmail.com",
          areaServed: ["Toulouse", "Blagnac", "Occitanie"],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Toulouse",
            addressRegion: "Occitanie",
            addressCountry: "FR",
          },
          priceRange: "€€€",
          openingHours: "Mo-Su 00:00-23:59",
        }),
      },
    ],
  }),
  component: Home,
});

const PHONE_DISPLAY = "+33 6 35 58 58 23";
const PHONE_DISPLAY_LOCAL = "06 35 58 58 23";
const PHONE_TEL = "+33635585823";
const WHATSAPP = "https://wa.me/33635585823";
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=EDEN+DRIVE+VTC+Toulouse+avis"; // Remplacer par le lien direct vers vos avis Google

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Contact />
      <Hero />
      <Services />
      <ContactCTA />
      <Testimonials />
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}

function WhatsAppFloating() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter EDEN DRIVE VTC sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 active:scale-105 md:hidden"
      style={{ backgroundColor: "#25D366" }}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="#ffffff" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.001 3.2C8.937 3.2 3.2 8.937 3.2 16c0 2.257.594 4.457 1.723 6.397L3.2 28.8l6.55-1.7A12.77 12.77 0 0 0 16.001 28.8C23.064 28.8 28.8 23.063 28.8 16S23.064 3.2 16.001 3.2zm0 23.36a10.53 10.53 0 0 1-5.365-1.467l-.384-.228-3.887 1.009 1.037-3.788-.25-.39A10.53 10.53 0 0 1 5.44 16c0-5.822 4.738-10.56 10.561-10.56 5.822 0 10.56 4.738 10.56 10.56 0 5.822-4.738 10.56-10.56 10.56zm5.79-7.905c-.317-.159-1.876-.926-2.167-1.032-.291-.106-.503-.159-.715.159-.212.317-.82 1.032-1.005 1.244-.185.212-.371.238-.688.079-.317-.159-1.339-.494-2.55-1.574-.943-.841-1.58-1.88-1.765-2.197-.185-.317-.02-.489.139-.647.143-.142.317-.371.476-.556.159-.185.212-.317.317-.529.106-.212.053-.397-.027-.556-.079-.159-.715-1.723-.98-2.36-.258-.62-.52-.536-.715-.546l-.609-.011c-.212 0-.556.079-.847.397-.291.317-1.111 1.085-1.111 2.65 0 1.564 1.137 3.076 1.296 3.288.159.212 2.239 3.418 5.424 4.792.759.328 1.35.523 1.812.669.761.242 1.454.208 2.001.126.611-.091 1.876-.767 2.141-1.508.265-.741.265-1.376.185-1.508-.079-.132-.291-.212-.608-.371z"/>
      </svg>

    </a>
  );
}



/* ---------- Navigation ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#reserver", label: "Réservation" },
    { href: "#services", label: "Services" },
    { href: "#contact-rapide", label: "Contact" },
    { href: "#avis", label: "Avis" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Logo className="h-16 w-auto" />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-silver"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE_TEL}`}
            className="btn-silver inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
          >
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY_LOCAL}
          </a>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label="Appeler EDEN DRIVE VTC"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-silver/40 bg-silver/10 text-silver transition hover:bg-silver/20"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            aria-label="Menu"
            className="rounded-full border border-border p-2 text-silver"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="space-y-1">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </div>
          </button>
        </div>

      </div>
      {open && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${PHONE_TEL}`}
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY_LOCAL}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

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

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] w-full overflow-hidden">
      <img
        src={heroCar}
        alt="Berline noire premium EDEN DRIVE VTC devant un hôtel de luxe"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-veil)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-24 md:justify-center">
        <div className="max-w-3xl animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-silver/40 bg-black/30 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-silver backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Chauffeur VTC Toulouse
          </div>

          <h1 className="font-display text-4xl leading-[1.05] text-ivory sm:text-6xl md:text-7xl">
            EDEN DRIVE <span className="text-silver-gradient tracking-[0.08em]">VTC</span>
          </h1>
          <div className="hairline my-6 w-40" />
          <p className="max-w-xl text-lg text-ivory/85 sm:text-xl">
            Votre chauffeur privé haut de gamme à Toulouse et en Occitanie.
          </p>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Discrétion absolue, ponctualité irréprochable, confort d'exception.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="#reserver"
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
            >
              <Calendar className="h-4 w-4" /> Réserver maintenant
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY_LOCAL}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-ivory/60">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-silver" /> Chauffeurs certifiés</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-silver" /> Disponible 24/7</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4 text-silver" /> Service 5 étoiles</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  const pillars = [
    { icon: Clock, title: "Ponctualité", text: "Chaque minute compte. Nous arrivons toujours en avance." },
    { icon: ShieldCheck, title: "Discrétion", text: "Confidentialité totale, protocole irréprochable." },
    { icon: Sparkles, title: "Confort", text: "Berlines premium, prestations soignées jusque dans le détail." },
    { icon: Star, title: "Personnalisation", text: "Un service pensé sur mesure, selon vos exigences." },
  ];
  return (
    <section id="about" className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 md:grid-cols-2 md:items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Notre maison</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            L'art du voyage <em className="text-silver-gradient not-italic">privé</em>
          </h2>
          <div className="hairline my-6 w-24" />
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            EDEN DRIVE VTC accompagne particuliers, dirigeants d'entreprise, touristes
            et voyageurs d'affaires à travers Toulouse et l'Occitanie. Nous avons fait
            de l'excellence un principe : véhicules d'exception, chauffeurs formés,
            attentions discrètes.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Notre engagement : une prestation où la sécurité, la ponctualité et la
            confidentialité se conjuguent à un confort absolu, pour chacun de vos
            déplacements.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="luxe-card rounded-xl p-5 sm:p-7">
              <p.icon className="h-6 w-6 text-silver" strokeWidth={1.4} />
              <h3 className="mt-4 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const services: Array<{ icon: typeof Plane; title: string; text: string; to?: string }> = [
    { icon: Plane, title: "Transfert aéroport", text: "Toulouse-Blagnac et aéroports d'Occitanie. Suivi de vol inclus.", to: "/vtc-aeroport-toulouse-blagnac" },
    { icon: Train, title: "Transfert gare", text: "Gare Matabiau et gares régionales, accueil quai avec pancarte.", to: "/vtc-gare-matabiau-toulouse" },
    { icon: Hotel, title: "Transferts hôtels", text: "Prise en charge à votre hôtel, palace ou résidence." },
    { icon: Car, title: "Longs trajets", text: "Interville et longue distance dans toute la France." },
    { icon: Clock, title: "Mise à disposition", text: "Votre chauffeur à l'heure ou à la journée, disponibilité totale." },
    { icon: Briefcase, title: "Déplacement professionnel", text: "Roadshows, rendez-vous d'affaires, événements corporate.", to: "/chauffeur-vtc-entreprise-toulouse" },
    { icon: Sparkles, title: "Événements privés", text: "Mariages, galas, soirées prestige, arrivées remarquées." },
    { icon: ShieldCheck, title: "Service VIP", text: "Personnalités, artistes, protocole sur mesure." },
  ];
  return (
    <section id="services" className="section-light relative border-t border-border/40 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Prestations</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Nos <em className="text-silver-gradient not-italic">services</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
          <p className="text-muted-foreground">
            Une flotte premium et des chauffeurs d'exception, pour chaque occasion.
          </p>
        </div>
        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const cardInner = (
              <>
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-silver/30 bg-silver/5">
                  <s.icon className="h-5 w-5 text-silver" strokeWidth={1.4} />
                </div>
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </>
            );
            if (s.to) {
              return (
                <Link
                  key={s.title}
                  to={s.to}
                  className="luxe-card group block rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-silver/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver/40"
                >
                  {cardInner}
                </Link>
              );
            }
            return (
              <article key={s.title} className="luxe-card group rounded-2xl p-7">
                {cardInner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
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
    <section id="avis" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
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

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
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

/* ---------- How to book ---------- */
function HowToBook() {
  const steps = [
    { n: "01", title: "Contactez-nous", text: "Par téléphone, WhatsApp ou formulaire — 24h/24." },
    { n: "02", title: "Devis immédiat", text: "Nous confirmons un tarif ferme et un véhicule adapté." },
    { n: "03", title: "Chauffeur assigné", text: "Vous recevez le nom et la plaque de votre chauffeur." },
    { n: "04", title: "Voyagez sereinement", text: "Prise en charge ponctuelle, prestation premium." },
  ];
  return (
    <section id="reserver" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Réservation</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Comment <em className="text-silver-gradient not-italic">réserver</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
          <p className="text-muted-foreground">Une réservation simple, rapide et sans engagement.</p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="luxe-card relative rounded-2xl p-7">
              <div className="font-display text-5xl text-silver-gradient">{s.n}</div>
              <h3 className="mt-4 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
          >
            <Phone className="h-4 w-4" /> Réserver par téléphone
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact CTA (rappel numéro + WhatsApp) ---------- */
function ContactCTA() {
  return (
    <section id="contact-rapide" className="relative border-t border-border/40 bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="text-xs uppercase tracking-[0.3em] text-silver">Contact & Réservation</span>
        <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Contactez-nous <em className="text-silver-gradient not-italic">directement</em>
        </h2>
        <div className="hairline mx-auto my-6 w-24" />
        <p className="mx-auto max-w-xl text-muted-foreground">
          Disponible 24h/24, 7j/7. Réponse immédiate par téléphone ou WhatsApp.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
          >
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY_LOCAL}
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact form ---------- */
function Contact() {
  const sendBooking = useServerFn(sendBookingRequest);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      from: String(formData.get("from") ?? ""),
      to: String(formData.get("to") ?? ""),
      datetime: String(formData.get("datetime") ?? ""),
      pax: String(formData.get("pax") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    setStatus("loading");
    setError(null);

    try {
      await sendBooking({ data: payload });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  };

  return (
    <section id="reserver" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Réservation</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            <em className="text-silver-gradient not-italic">Réservation en ligne</em>
          </h2>
        <div className="hairline mx-auto my-6 w-24" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="luxe-card mt-10 rounded-2xl p-7 sm:p-10"
        >
          <div className="space-y-5">
            <Field label="Nom complet" name="name" required />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Téléphone" name="phone" type="tel" required />
              <Field label="E-mail" name="email" type="email" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <PlacesField label="Départ" name="from" placeholder="Adresse ou aéroport" required />
              <PlacesField label="Destination" name="to" required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Date & heure" name="datetime" type="datetime-local" required />
              <Field label="Passagers" name="pax" type="number" placeholder="2" />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                name="message"
                rows={3}
                className="w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-silver"
                placeholder="Précisions, bagages, vol, etc."
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest disabled:opacity-70"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Calendar className="h-4 w-4" />
              )}
              {status === "success"
                ? "Demande envoyée"
                : status === "loading"
                ? "Envoi en cours..."
                : "Demander un devis"}
            </button>
            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-silver">
                <CheckCircle2 className="h-4 w-4" />
                Merci — nous vous recontactons très vite.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                {error ?? "L'envoi a échoué. Veuillez réessayer ou nous appeler."}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}


function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="text-silver"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-silver"
      />
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
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
        </nav>


        <div className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} EDEN DRIVE VTC — Chauffeur VTC Toulouse. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

