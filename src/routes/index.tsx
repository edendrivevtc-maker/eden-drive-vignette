import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
} from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import logoAsset from "@/assets/eden-drive-logo.jpeg.asset.json";

const TITLE = "Eden Drive VTC — Chauffeur privé haut de gamme à Toulouse & Occitanie";
const DESCRIPTION =
  "Eden Drive VTC : chauffeur privé premium à Toulouse, Blagnac et en Occitanie. Transferts aéroport, gares, longs trajets, mise à disposition. Discrétion, ponctualité, luxe.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "chauffeur privé Toulouse, VTC Toulouse, chauffeur privé Blagnac, transfert aéroport Toulouse-Blagnac, chauffeur premium Toulouse, VTC haut de gamme Toulouse, Eden Drive VTC",
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
          name: "Eden Drive VTC",
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
const PHONE_TEL = "+33635585823";
const WHATSAPP = "https://wa.me/33635585823";

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Contact />
      <Services />
      <ContactCTA />
      <Testimonials />
      <Footer />
    </div>
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
        <a href="#top" className="flex items-center">
          <Logo className="h-16 w-auto" />
        </a>
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
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            className="btn-ghost-silver inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="btn-silver inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
          >
            <Phone className="h-4 w-4" /> Appeler
          </a>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label="Appeler Eden Drive VTC"
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
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
              className="btn-ghost-silver inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="btn-silver inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            >
              <Phone className="h-4 w-4" /> Nous appeler
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Eden Drive VTC"
      className={`h-10 w-auto object-contain ${className}`}
    />
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] w-full overflow-hidden">
      <img
        src={heroCar}
        alt="Berline noire premium Eden Drive VTC devant un hôtel de luxe"
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
            Eden Drive <span className="text-silver-gradient">VTC</span>
          </h1>
          <div className="hairline my-6 w-40" />
          <p className="max-w-xl text-lg text-ivory/85 sm:text-xl">
            Votre chauffeur privé haut de gamme à Toulouse et en Occitanie.
          </p>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Discrétion absolue, ponctualité irréprochable, confort d'exception.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#reserver"
              className="btn-silver inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest"
            >
              <Calendar className="h-4 w-4" /> Réserver maintenant
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="btn-ghost-silver inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest"
            >
              <Phone className="h-4 w-4" /> Nous appeler
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
            Eden Drive VTC accompagne particuliers, dirigeants d'entreprise, touristes
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
  const services = [
    { icon: Plane, title: "Transfert aéroport", text: "Toulouse-Blagnac et aéroports d'Occitanie. Suivi de vol inclus." },
    { icon: Train, title: "Transfert gare", text: "Gare Matabiau et gares régionales, accueil quai avec pancarte." },
    { icon: Hotel, title: "Transferts hôtels", text: "Prise en charge à votre hôtel, palace ou résidence." },
    { icon: Car, title: "Longs trajets", text: "Interville et longue distance dans toute la France." },
    { icon: Clock, title: "Mise à disposition", text: "Votre chauffeur à l'heure ou à la journée, disponibilité totale." },
    { icon: Briefcase, title: "Déplacements pros", text: "Roadshows, rendez-vous d'affaires, événements corporate." },
    { icon: Sparkles, title: "Événements privés", text: "Mariages, galas, soirées prestige, arrivées remarquées." },
    { icon: ShieldCheck, title: "Service VIP", text: "Personnalités, artistes, protocole sur mesure." },
  ];
  return (
    <section id="services" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
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
          {services.map((s) => (
            <article key={s.title} className="luxe-card group rounded-2xl p-7">
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

/* ---------- Testimonials ---------- */
function Testimonials() {
  const reviews = [
    {
      name: "Claire M.",
      role: "Dirigeante — Toulouse",
      text: "Un service irréprochable. Le chauffeur, la voiture, la ponctualité : tout est au niveau des plus grands palaces.",
    },
    {
      name: "Antoine R.",
      role: "Voyageur d'affaires",
      text: "J'utilise Eden Drive à chaque déplacement à Blagnac. Discrétion parfaite, véhicule sublime. Le standard que je cherchais.",
    },
    {
      name: "Sophie L.",
      role: "Cliente privée",
      text: "Élégance, calme, professionnalisme. Réservation simple, prix communiqué à l'avance. Rien à redire.",
    },
    {
      name: "Marc D.",
      role: "Événement privé",
      text: "Nous avons fait appel à Eden Drive pour notre mariage. Les invités ont adoré. Un service digne d'un grand hôtel.",
    },
  ];
  return (
    <section id="avis" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Témoignages</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Ils nous font <em className="text-silver-gradient not-italic">confiance</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
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
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`tel:${PHONE_TEL}`}
            className="btn-silver inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest"
          >
            <Phone className="h-4 w-4" /> Réserver par téléphone
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            className="btn-ghost-silver inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest"
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
        <a
          href={`tel:${PHONE_TEL}`}
          className="mt-8 inline-flex items-center gap-3 font-display text-3xl text-silver-gradient hover:opacity-90 sm:text-4xl"
        >
          <Phone className="h-6 w-6 text-silver" /> {PHONE_DISPLAY}
        </a>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`tel:${PHONE_TEL}`}
            className="btn-silver inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest"
          >
            <Phone className="h-4 w-4" /> Appeler
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            className="btn-ghost-silver inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest"
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
  const [sent, setSent] = useState(false);
  return (
    <section id="reserver" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Réservation</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Demande de <em className="text-silver-gradient not-italic">réservation</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
          <p className="text-muted-foreground">
            Remplissez le formulaire — nous vous répondons sous 15 minutes.
          </p>
        </div>



        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="luxe-card mt-10 rounded-2xl p-7 sm:p-10"
        >
          <div className="space-y-5">
            <Field label="Nom complet" name="name" required />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Téléphone" name="phone" type="tel" required />
              <Field label="E-mail" name="email" type="email" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Départ" name="from" placeholder="Adresse ou aéroport" required />
              <Field label="Destination" name="to" required />
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
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
            >
              <Calendar className="h-4 w-4" />
              {sent ? "Demande envoyée" : "Demander un devis"}
            </button>
            {sent && (
              <p className="flex items-center gap-2 text-sm text-silver">
                <CheckCircle2 className="h-4 w-4" />
                Merci — nous vous recontactons très vite.
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
          <div className="font-display text-2xl text-ivory">Eden Drive VTC</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-silver" /> Toulouse & Blagnac, Occitanie
            </li>
            <li className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-silver" /> Ouvert 24h/24, 7j/7
            </li>
            <li>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 hover:text-silver"
              >
                <Phone className="h-4 w-4 text-silver" /> {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
          <a
            href="#reserver"
            className="btn-silver mt-4 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-medium uppercase tracking-widest"
          >
            <Calendar className="h-4 w-4" /> Nous contacter
          </a>
        </div>

        <div className="hairline my-8" />

        <div className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Eden Drive VTC — Chauffeur VTC Toulouse. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

