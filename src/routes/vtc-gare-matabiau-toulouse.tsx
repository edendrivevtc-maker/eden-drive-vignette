import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Phone,
  MapPin,
  Train,
  Clock,
  Sparkles,
  Star,
  Calendar,
  CheckCircle2,
  Loader2,
  AlertCircle,
  UserCheck,
  Luggage,
  Car,
  BadgeCheck,
  Heart,
  Building2,
  Briefcase,
  Plane,
  Hotel,
  Users,
} from "lucide-react";
import { sendBookingRequest } from "@/lib/booking.functions";
import { PlacesField } from "@/components/places-autocomplete";
import stationImg from "@/assets/station-transfer.jpg";

const TITLE = "VTC Gare Matabiau Toulouse | Transfert Gare avec Chauffeur Privé";
const DESCRIPTION =
  "Besoin d'un VTC Gare Matabiau Toulouse ? Eden Drive VTC vous accompagne pour vos transferts gare avec un chauffeur privé ponctuel, confortable et professionnel.";

const PHONE_DISPLAY_LOCAL = "06 35 58 58 23";
const PHONE_TEL = "+33635585823";
const WHATSAPP = "https://wa.me/33635585823";

export const Route = createFileRoute("/vtc-gare-matabiau-toulouse")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "VTC Gare Matabiau Toulouse, chauffeur privé Gare Matabiau, transfert gare Toulouse, chauffeur gare Toulouse, transport Gare Matabiau, Eden Drive VTC",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://edendrive-vtc.fr/vtc-gare-matabiau-toulouse" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: stationImg },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: stationImg },
    ],
    links: [{ rel: "canonical", href: "https://edendrive-vtc.fr/vtc-gare-matabiau-toulouse" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TaxiService",
          name: "Eden Drive VTC — Transfert Gare Toulouse Matabiau",
          description: DESCRIPTION,
          image: stationImg,
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
            { "@type": "AdministrativeArea", name: "Occitanie" },
          ],
          serviceType: "Transfert Gare Toulouse Matabiau",
        }),
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
      <Advantages />
      <Destinations />
      <WhyUs />
      <Clients />
      <FinalCta />
      <BookingForm />
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" aria-label="EDEN DRIVE VTC" className="inline-flex items-center">
          <img src="/logo.png" alt="EDEN DRIVE VTC" className="h-16 w-auto object-contain" />
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <a href="#reserver" className="text-sm text-muted-foreground transition-colors hover:text-silver">
            Réservation
          </a>
          <a href="#avantages" className="text-sm text-muted-foreground transition-colors hover:text-silver">
            Avantages
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-silver/40 bg-silver/10 text-silver transition hover:bg-silver/20 md:hidden"
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
        src={stationImg}
        alt="Chauffeur VTC Eden Drive devant la Gare Toulouse Matabiau"
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
            <Train className="h-3.5 w-3.5" /> Gare Toulouse Matabiau
          </div>

          <h1 className="font-display text-4xl leading-[1.05] text-ivory sm:text-5xl md:text-6xl">
            Votre chauffeur VTC pour vos transferts{" "}
            <span className="text-silver-gradient">Gare Toulouse Matabiau</span>
          </h1>
          <div className="hairline my-6 w-40" />
          <p className="max-w-2xl text-base text-ivory/85 sm:text-lg">
            Un service de chauffeur privé ponctuel et confortable pour vos arrivées et départs depuis la
            gare Matabiau.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#reserver"
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest sm:w-auto"
            >
              <Calendar className="h-4 w-4" /> Réserver votre transfert
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest sm:w-auto"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY_LOCAL}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-ivory/60">
            <span className="flex items-center gap-2"><Train className="h-4 w-4 text-silver" /> Suivi des horaires</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-silver" /> 24h/24 · 7j/7</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4 text-silver" /> Service 5 étoiles</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Intro ---------- */
function Intro() {
  return (
    <section className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-silver">Chauffeur privé Gare Matabiau</span>
        <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Un transfert gare <em className="text-silver-gradient not-italic">sur mesure</em>
        </h2>
        <div className="hairline mx-auto my-6 w-24" />
        <p className="text-muted-foreground">
          Eden Drive VTC accompagne particuliers et professionnels pour leurs trajets depuis et vers la
          Gare Toulouse Matabiau. Chaque prise en charge est organisée sur réservation avec un service
          personnalisé, un chauffeur privé formé aux exigences du service premium et un trajet confortable
          jusqu'à votre destination — que vous rejoigniez le centre-ville de Toulouse, un hôtel, un
          rendez-vous d'affaires ou l'aéroport Toulouse-Blagnac.
        </p>
        <p className="mt-4 text-muted-foreground">
          Notre service de VTC Gare Matabiau Toulouse vous garantit ponctualité, discrétion et sérénité,
          en évitant l'attente des taxis et le stress des transports en commun après un long trajet en
          train.
        </p>
      </div>
    </section>
  );
}

/* ---------- Advantages ---------- */
function Advantages() {
  const items = [
    { icon: MapPin, title: "Prise en charge devant la gare", text: "Point de rendez-vous précis à la sortie de la Gare Matabiau, coordonnées transmises au préalable." },
    { icon: Train, title: "Suivi des horaires de train", text: "Nous adaptons votre prise en charge en fonction de l'heure réelle d'arrivée de votre TGV, TER ou Intercités." },
    { icon: Luggage, title: "Aide aux bagages", text: "Votre chauffeur prend en charge vos valises et vous accompagne jusqu'au véhicule." },
    { icon: Car, title: "Véhicule confortable", text: "Berline premium impeccable, climatisation, eau à disposition, silence et confort absolu." },
    { icon: Calendar, title: "Service sur réservation", text: "Réservation en ligne ou par téléphone, confirmation rapide et tarif ferme sans surprise." },
    { icon: Sparkles, title: "Trajet direct vers votre destination", text: "Itinéraire optimisé pour vous conduire directement à votre adresse, sans détour." },
  ];
  return (
    <section id="avantages" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Gare Toulouse Matabiau</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Un service adapté à vos <em className="text-silver-gradient not-italic">déplacements en gare</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
          <p className="text-muted-foreground">
            Tous les détails pensés pour que votre transfert gare se déroule en toute tranquillité.
          </p>
        </div>
        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
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

/* ---------- Destinations ---------- */
function Destinations() {
  const items = [
    { icon: Building2, title: "Centre-ville de Toulouse", text: "Capitole, Carmes, Saint-Étienne, Compans-Caffarelli et tous les quartiers du centre." },
    { icon: Plane, title: "Aéroport Toulouse-Blagnac", text: "Liaison directe entre la Gare Matabiau et l'aéroport, sans rupture de charge." },
    { icon: Hotel, title: "Hôtels et résidences", text: "Prise en charge jusqu'à votre hôtel, palace, résidence ou logement privé." },
    { icon: Briefcase, title: "Zones d'affaires", text: "Compans, Labège, Blagnac, Basso Cambo : rejoignez votre rendez-vous à l'heure." },
    { icon: Building2, title: "Entreprises de la métropole", text: "Sièges sociaux et sites industriels de la métropole toulousaine et de l'Occitanie." },
  ];
  return (
    <section className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Destinations</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Vos trajets depuis la <em className="text-silver-gradient not-italic">Gare Matabiau</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
          <p className="text-muted-foreground">
            Toulouse et sa métropole, en toute simplicité.
          </p>
        </div>
        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
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

/* ---------- Why us ---------- */
function WhyUs() {
  const items = [
    { icon: Clock, title: "Ponctualité", text: "Arrivée en avance devant la Gare Matabiau, suivi des horaires de train en temps réel." },
    { icon: Car, title: "Confort", text: "Berline premium, climatisation, eau à disposition et silence pour vous détendre." },
    { icon: BadgeCheck, title: "Professionnalisme", text: "Chauffeur VTC certifié, discret et parfaitement au fait des accès de la gare." },
    { icon: Calendar, title: "Réservation simple", text: "En ligne ou par téléphone, confirmation immédiate et tarif transparent." },
    { icon: Heart, title: "Service personnalisé", text: "Un interlocuteur unique, à l'écoute de vos préférences et de vos contraintes." },
  ];
  return (
    <section className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Eden Drive VTC</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Pourquoi choisir <em className="text-silver-gradient not-italic">Eden Drive VTC</em> ?
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
        </div>
        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
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

/* ---------- Clients ---------- */
function Clients() {
  const blocks = [
    {
      icon: Users,
      tag: "Particuliers",
      title: "Vacances, visites, déplacements personnels",
      text: "Vous arrivez à la Gare Matabiau pour un week-end à Toulouse, une visite en famille ou des vacances en Occitanie ? Votre chauffeur privé Eden Drive vous accueille et vous conduit sereinement jusqu'à votre hôtel, votre résidence ou votre lieu de séjour.",
    },
    {
      icon: Briefcase,
      tag: "Professionnels",
      title: "Rendez-vous, séminaires, déplacements d'affaires",
      text: "Un service de VTC Gare Matabiau pensé pour les cadres, entrepreneurs et entreprises : prise en charge ponctuelle, discrétion, facturation adaptée et transferts directs vers vos rendez-vous, séminaires ou événements d'affaires.",
    },
  ];
  return (
    <section className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Nos clients</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Un service pour <em className="text-silver-gradient not-italic">chaque voyageur</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {blocks.map((b) => (
            <article key={b.tag} className="luxe-card rounded-2xl p-8 sm:p-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-silver/30 bg-silver/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-silver">
                <b.icon className="h-3.5 w-3.5" /> {b.tag}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl">{b.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCta() {
  return (
    <section className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-silver">Réservation</span>
        <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Réservez votre chauffeur VTC{" "}
          <em className="text-silver-gradient not-italic">Gare Matabiau Toulouse</em>
        </h2>
        <div className="hairline mx-auto my-6 w-24" />
        <p className="text-muted-foreground">
          Confirmation rapide, tarif ferme et transparent, chauffeur ponctuel à la Gare Matabiau.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#reserver"
            className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest sm:w-auto"
          >
            <Calendar className="h-4 w-4" /> Réserver maintenant
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest sm:w-auto"
          >
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY_LOCAL}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Booking form ---------- */
function BookingForm() {
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
    <section id="reserver" className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Réservation</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            <em className="text-silver-gradient not-italic">Réservez</em> votre transfert gare
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
          <p className="text-muted-foreground">
            Complétez le formulaire, nous vous confirmons rapidement un tarif ferme.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="luxe-card mt-10 rounded-2xl p-7 sm:p-10">
          <div className="space-y-5">
            <Field label="Nom complet" name="name" required />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Téléphone" name="phone" type="tel" required />
              <Field label="E-mail" name="email" type="email" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <PlacesField label="Départ" name="from" placeholder="Gare Matabiau, adresse…" required />
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
                placeholder="N° de train, bagages, précisions…"
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

        <nav className="flex flex-col items-center gap-2 text-center text-xs uppercase tracking-widest text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-silver">Accueil</Link>
          <Link to="/mentions-legales" className="transition-colors hover:text-silver">Mentions légales</Link>
          <Link to="/politique-confidentialite" className="transition-colors hover:text-silver">Politique de confidentialité</Link>
        </nav>

        <div className="mt-6 text-center text-xs text-muted-foreground">
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
