import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Star,
  Calendar,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Car,
  BadgeCheck,
  Heart,
  Briefcase,
  Plane,
  Train,
  Hotel,
  Users,
  Crown,
  Route as RouteIcon,
  ShieldCheck,
} from "lucide-react";
import { BookingFormSection } from "@/components/booking-form";
import { GoogleReviewsRating, GoogleReviewsCount } from "@/components/google-reviews-stats";
import { googleReviewsQueryOptions } from "@/lib/google-reviews.query";
import heroImg from "@/assets/private-driver-toulouse.jpg";
import { FaqSection, buildFaqJsonLd, type FaqItem } from "@/components/faq-section";

const FAQ: FaqItem[] = [
  {
    q: "Quel est le rôle d'un chauffeur privé à Toulouse ?",
    a: "Un chauffeur privé VTC à Toulouse vous accompagne dans tous vos déplacements urbains ou longue distance à bord d'un véhicule haut de gamme. Il assure votre confort, votre discrétion et votre ponctualité, contrairement à un taxi classique qui fonctionne à la course sans réservation privilégiée.",
  },
  {
    q: "Comment réserver un chauffeur privé à Toulouse ?",
    a: "La réservation se fait en ligne via notre formulaire, par téléphone au 06 35 58 58 23 ou par WhatsApp. Vous recevez une confirmation rapide avec un tarif forfaitaire ferme, sans mauvaise surprise à l'arrivée.",
  },
  {
    q: "Vos chauffeurs sont-ils disponibles pour un trajet en centre-ville ?",
    a: "Oui. Nous assurons tous les trajets urbains à Toulouse : Capitole, Compans-Caffarelli, Saint-Cyprien, Les Carmes, Jean Jaurès, Purpan, Saint-Michel, hôtels du centre, restaurants, bars et lieux culturels. Vos déplacements se font en toute discrétion et confort.",
  },
  {
    q: "Un chauffeur privé peut-il être réservé pour la soirée ?",
    a: "Absolument. Que ce soit pour un dîner, une soirée entre amis, un événement privé ou une sortie au théâtre, votre chauffeur vous conduit et vous récupère à l'heure de votre choix. Vous profitez pleinement de votre soirée sans vous soucier du retour.",
  },
  {
    q: "Quels sont vos tarifs pour un trajet privé dans Toulouse ?",
    a: "Nos tarifs sont forfaitaires et communiqués avant la course. Ils varient selon la distance, l'horaire et le nombre de passagers. Aucun compteur, aucun supplément caché : le prix confirmé lors de la réservation est celui que vous payez.",
  },
  {
    q: "Peut-on réserver un chauffeur privé pour un événement (mariage, anniversaire) ?",
    a: "Oui. Nous accompagnons vos événements privés à Toulouse : mariage, anniversaire, EVJF/EVG, cérémonie, gala. Nous organisons vos trajets sur mesure et pouvons coordonner plusieurs véhicules pour vos invités si nécessaire.",
  },
  {
    q: "Assurez-vous les transferts entre les hôtels toulousains ?",
    a: "Oui. Nous prenons en charge nos clients depuis et vers les grands hôtels de Toulouse (Grand Hôtel de l'Opéra, Crowne Plaza, Pullman, Novotel, Hôtel de Brienne, etc.), pour un transfert vers l'aéroport, la gare Matabiau ou tout autre lieu.",
  },
  {
    q: "La ponctualité est-elle garantie ?",
    a: "La ponctualité est notre priorité absolue. Chaque trajet est planifié en tenant compte du trafic toulousain et des imprévus. Votre chauffeur arrive systématiquement quelques minutes en avance pour vous permettre de partir sereinement.",
  },
  {
    q: "Peut-on personnaliser un trajet ou une prestation ?",
    a: "Bien sûr. Vous pouvez demander un itinéraire spécifique, plusieurs arrêts, une mise à disposition à l'heure, un accueil VIP à l'aéroport ou toute autre attention particulière. Nous adaptons notre prestation à vos exigences.",
  },
  {
    q: "Est-il possible de réserver le même chauffeur pour plusieurs trajets ?",
    a: "Oui. Pour les clients réguliers ou les journées comportant plusieurs déplacements, nous mettons à votre disposition le même chauffeur privé afin de garantir continuité, confidentialité et confort dans votre relation.",
  },
];

const TITLE = "Chauffeur privé Toulouse | VTC premium Eden Drive";
const DESCRIPTION =
  "Eden Drive VTC, votre chauffeur privé à Toulouse pour vos transferts aéroport, gare, déplacements professionnels et trajets longue distance. Un service VTC confortable et ponctuel.";

const PHONE_DISPLAY_LOCAL = "06 35 58 58 23";
const PHONE_TEL = "+33635585823";
const WHATSAPP = "https://wa.me/33635585823";
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=EDEN+DRIVE+VTC+Toulouse+avis";


export const Route = createFileRoute("/chauffeur-prive-toulouse")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "chauffeur privé Toulouse, VTC Toulouse, chauffeur VTC Toulouse, chauffeur privé Toulouse métropole, VTC premium Toulouse, Eden Drive VTC",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://edendrive-vtc.fr/chauffeur-prive-toulouse" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImg },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "https://edendrive-vtc.fr/chauffeur-prive-toulouse" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TaxiService",
          name: "Eden Drive VTC — Chauffeur privé Toulouse",
          description: DESCRIPTION,
          image: heroImg,
          provider: {
            "@type": "LocalBusiness",
            name: "EDEN DRIVE VTC",
            telephone: "+33 6 35 58 58 23",
            email: "edendrivevtc@gmail.com",
            priceRange: "€€€",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Toulouse",
              addressRegion: "Occitanie",
              addressCountry: "FR",
            },
          },
          areaServed: [
            { "@type": "City", name: "Toulouse" },
            { "@type": "City", name: "Blagnac" },
            { "@type": "City", name: "Balma" },
            { "@type": "City", name: "Colomiers" },
            { "@type": "City", name: "Labège" },
            { "@type": "City", name: "Montrabé" },
            { "@type": "AdministrativeArea", name: "Occitanie" },
          ],
          serviceType: "Chauffeur privé VTC Toulouse",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(buildFaqJsonLd(FAQ)),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Intro />
      <Services />
      <WhyUs />
      <Areas />
      <BookingForm />

      <FaqSection items={FAQ} title={<><em className="text-silver-gradient not-italic">FAQ</em> chauffeur privé Toulouse</>} />
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-silver/15 bg-black/95 shadow-[0_1px_0_0_rgba(192,192,192,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" aria-label="EDEN DRIVE VTC" className="inline-flex items-center">
          <img src="/logo.png" alt="EDEN DRIVE VTC" className="h-16 w-auto object-contain" />
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <a href="#reserver" className="text-sm text-muted-foreground transition-colors hover:text-silver">
            Réservation
          </a>
          <a href="#services" className="text-sm text-muted-foreground transition-colors hover:text-silver">
            Prestations
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="btn-silver inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
          >
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY_LOCAL}
          </a>
        </div>
        <a
          href={`tel:${PHONE_TEL}`}
          aria-label="Appeler EDEN DRIVE VTC"
          className="btn-silver inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden"
        >
          <Phone className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Chauffeur privé Eden Drive VTC à Toulouse devant une berline premium"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-24 md:justify-center">
        <div className="max-w-3xl animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-silver/40 bg-black/30 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-silver backdrop-blur">
            <Crown className="h-3.5 w-3.5" /> VTC premium Toulouse
          </div>

          <h1 className="font-display text-4xl leading-[1.05] text-ivory sm:text-5xl md:text-6xl">
            Chauffeur privé Toulouse —{" "}
            <span className="text-silver-gradient">Eden Drive VTC</span>
          </h1>
          <div className="hairline my-6 w-40" />
          <p className="max-w-2xl text-base text-ivory/85 sm:text-lg">
            Votre chauffeur VTC à Toulouse pour des déplacements confortables, ponctuels et
            personnalisés.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#reserver"
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest sm:w-auto"
            >
              <Calendar className="h-4 w-4" /> Réserver votre trajet
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest sm:w-auto"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY_LOCAL}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-ivory/60">
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-silver" /> 24h/24 · 7j/7</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4 text-silver" /> Service 5 étoiles</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-silver" /> Chauffeur certifié</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Intro ---------- */
function Intro() {
  return (
    <section className="section-light relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-silver">Chauffeur privé Toulouse</span>
        <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Votre chauffeur privé <em className="text-silver-gradient not-italic">VTC à Toulouse</em>
        </h2>
        <div className="hairline mx-auto my-6 w-24" />
        <p className="text-muted-foreground">
          Eden Drive VTC est votre chauffeur privé Toulouse pour tous vos déplacements dans la ville
          rose et sa métropole. Particuliers, cadres, entrepreneurs et entreprises font confiance à
          notre service de VTC Toulouse pour la ponctualité, le confort et le professionnalisme d'un
          chauffeur VTC Toulouse dédié.
        </p>
        <p className="mt-4 text-muted-foreground">
          Chaque trajet est organisé sur réservation anticipée, avec un service personnalisé, une
          berline premium impeccable et un chauffeur formé aux exigences du haut de gamme — pour
          transformer vos déplacements en un moment de sérénité.
        </p>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const pillars = [
    {
      icon: Plane,
      title: "Transfert Aéroport Toulouse-Blagnac",
      text: "Prise en charge ponctuelle depuis ou vers l'aéroport, suivi des vols en temps réel et accueil avec pancarte.",
      to: "/vtc-aeroport-toulouse-blagnac",
      linkLabel: "Découvrir la prestation aéroport",
    },
    {
      icon: Train,
      title: "Transfert Gare Toulouse Matabiau",
      text: "Chauffeur privé Gare Matabiau : accueil à la sortie, suivi des horaires de train et aide aux bagages.",
      to: "/vtc-gare-matabiau-toulouse",
      linkLabel: "Découvrir la prestation gare",
    },
    {
      icon: Briefcase,
      title: "Déplacements professionnels",
      text: "Un chauffeur VTC dédié aux entreprises, cadres et entrepreneurs : ponctualité, discrétion et facturation adaptée.",
      to: "/chauffeur-vtc-entreprise-toulouse",
      linkLabel: "Découvrir la prestation entreprise",
    },
  ];
  const extras = [
    { icon: Hotel, title: "Transferts hôtels", text: "Prise en charge et dépose devant votre hôtel, palace ou résidence." },
    { icon: RouteIcon, title: "Longues distances", text: "Trajets confortables vers toutes les grandes villes et destinations d'Occitanie." },
    { icon: Clock, title: "Mise à disposition", text: "Un chauffeur privé à votre disposition pour la demi-journée ou la journée." },
    { icon: Sparkles, title: "Événements privés", text: "Mariages, cérémonies, soirées : un service élégant et discret." },
    { icon: Crown, title: "Services VIP", text: "Accueil personnalisé, discrétion absolue et prestation sur-mesure." },
  ];

  return (
    <section id="services" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Prestations</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Un service adapté à tous vos <em className="text-silver-gradient not-italic">déplacements</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
          <p className="text-muted-foreground">
            Découvrez nos prestations dédiées de chauffeur privé à Toulouse.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-3">
          {pillars.map((s) => (
            <Link
              key={s.title}
              to={s.to}
              className="luxe-card group flex flex-col rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-silver/30 bg-silver/5">
                <s.icon className="h-5 w-5 text-silver" strokeWidth={1.4} />
              </div>
              <h3 className="font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-silver">
                {s.linkLabel} →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {extras.map((s) => (
            <article key={s.title} className="luxe-card rounded-2xl p-7">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-silver/30 bg-silver/5">
                <s.icon className="h-5 w-5 text-silver" strokeWidth={1.4} />
              </div>
              <h3 className="font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why us ---------- */
function WhyUs() {
  const items = [
    { icon: BadgeCheck, title: "Chauffeur professionnel", text: "Chauffeur VTC certifié, expérimenté, discret et à l'écoute." },
    { icon: Car, title: "Véhicule confortable", text: "Berline premium impeccable, entretenue avec soin, climatisation et eau à disposition." },
    { icon: Clock, title: "Service ponctuel", text: "Arrivée en avance, itinéraires optimisés en temps réel." },
    { icon: Heart, title: "Relation personnalisée", text: "Un interlocuteur unique, à l'écoute de vos préférences et de vos habitudes." },
    { icon: Star, title: "Avis Google 5/5", text: "Une clientèle fidèle et des avis authentiques 5 étoiles." },
  ];
  return (
    <section className="section-light relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Eden Drive VTC</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Pourquoi choisir <em className="text-silver-gradient not-italic">Eden Drive VTC</em> ?
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <GoogleReviewsRating />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              basé sur <GoogleReviewsCount />
            </span>
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-silver inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-widest"
          >
            <Star className="h-4 w-4" /> Voir tous les avis Google
          </a>
        </div>


        <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <article key={s.title} className="luxe-card rounded-2xl p-7">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-silver/30 bg-silver/5">
                <s.icon className="h-5 w-5 text-silver" strokeWidth={1.4} />
              </div>
              <h3 className="font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Areas ---------- */
function Areas() {
  return (
    <section className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-silver">Zones desservies</span>
        <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Un chauffeur privé disponible à{" "}
          <em className="text-silver-gradient not-italic">Toulouse et sa métropole</em>
        </h2>
        <div className="hairline mx-auto my-6 w-24" />
        <p className="text-muted-foreground">
          Eden Drive VTC intervient à Toulouse, au cœur du centre-ville comme dans les communes
          voisines. Que vous soyez à Blagnac près de l'aéroport, à Balma, à Colomiers, à Labège
          dans les zones d'affaires ou à Montrabé, votre chauffeur privé vient à votre rencontre
          pour un trajet fluide vers la destination de votre choix.
        </p>
        <p className="mt-4 text-muted-foreground">
          Notre service de chauffeur VTC Toulouse s'adapte à vos habitudes : rendez-vous
          professionnels, transferts aéroport ou gare, sorties personnelles, événements privés
          ou trajets longue distance dans toute l'Occitanie.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-silver">
          {["Toulouse", "Toulouse centre", "Blagnac", "Balma", "Colomiers", "Labège", "Montrabé"].map((z) => (
            <span key={z} className="rounded-full border border-silver/30 bg-silver/5 px-3 py-1">
              {z}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ---------- Booking form ---------- */
function BookingForm() {
  return (
    <BookingFormSection
      sectionClassName="relative border-t border-border/40 bg-onyx py-24 sm:py-32"
      title={<em className="text-silver-gradient not-italic">Estimation/Réservation en ligne</em>}
      subtitle="Complétez le formulaire, nous vous confirmons rapidement un tarif ferme."
      fromPlaceholder="Adresse de départ…"
    />
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
        <div className="flex flex-col items-center gap-4 text-center">
          <img src="/logo.png" alt="EDEN DRIVE VTC" className="h-14 w-auto object-contain" />
          <div className="font-display text-2xl uppercase tracking-[0.15em] text-ivory">EDEN DRIVE VTC</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-silver" /> Toulouse · Blagnac · Occitanie
            </li>
            <li className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-silver" /> Ouvert 24h/24, 7j/7
            </li>
          </ul>
          <div className="flex w-full max-w-md flex-col gap-3">
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

        <div className="grid gap-6 text-center sm:grid-cols-2">
          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-silver">Services</div>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/chauffeur-prive-toulouse" className="hover:text-silver">Chauffeur privé Toulouse</Link>
              <Link to="/vtc-aeroport-toulouse-blagnac" className="hover:text-silver">Transfert Aéroport Toulouse-Blagnac</Link>
              <Link to="/vtc-gare-matabiau-toulouse" className="hover:text-silver">Transfert Gare Toulouse Matabiau</Link>
              <Link to="/chauffeur-vtc-entreprise-toulouse" className="hover:text-silver">Déplacements professionnels</Link>
            </nav>
          </div>
          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-silver">Liens utiles</div>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-silver">Accueil</Link>
              <Link to="/mentions-legales" className="hover:text-silver">Mentions légales</Link>
              <Link to="/politique-confidentialite" className="hover:text-silver">Politique de confidentialité</Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} EDEN DRIVE VTC — Chauffeur VTC Toulouse. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

/* ---------- WhatsApp floating (mobile) ---------- */
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
        <path d="M16.001 3.2C8.937 3.2 3.2 8.937 3.2 16c0 2.257.594 4.457 1.723 6.397L3.2 28.8l6.55-1.7A12.77 12.77 0 0 0 16.001 28.8C23.064 28.8 28.8 23.063 28.8 16S23.064 3.2 16.001 3.2zm0 23.36a10.53 10.53 0 0 1-5.365-1.467l-.384-.228-3.887 1.009 1.037-3.788-.25-.39A10.53 10.53 0 0 1 5.44 16c0-5.822 4.738-10.56 10.561-10.56 5.822 0 10.56 4.738 10.56 10.56 0 5.822-4.738 10.56-10.56 10.56zm5.79-7.905c-.317-.159-1.876-.926-2.167-1.032-.291-.106-.503-.159-.715.159-.212.317-.82 1.032-1.005 1.244-.185.212-.371.238-.688.079-.317-.159-1.339-.494-2.55-1.574-.943-.841-1.58-1.88-1.765-2.197-.185-.317-.02-.489.139-.647.143-.142.317-.371.476-.556.159-.185.212-.317.317-.529.106-.212.053-.397-.027-.556-.079-.159-.715-1.723-.98-2.36-.258-.62-.52-.536-.715-.546l-.609-.011c-.212 0-.556.079-.847.397-.291.317-1.111 1.085-1.111 2.65 0 1.564 1.137 3.076 1.296 3.288.159.212 2.239 3.418 5.424 4.792.759.328 1.35.523 1.812.669.761.242 1.454.208 2.001.126.761-.091 1.876-.767 2.141-1.508.265-.741.265-1.376.185-1.508-.079-.132-.291-.212-.608-.371z"/>
      </svg>
    </a>
  );
}
