import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Phone,
  MapPin,
  Plane,
  Clock,
  Sparkles,
  Star,
  Calendar,
  CheckCircle2,
  Loader2,
  AlertCircle,
  UserCheck,
  Home as HomeIcon,
  Car,
  BadgeCheck,
  Heart,
  ChevronDown,
} from "lucide-react";
import { sendBookingRequest } from "@/lib/booking.functions";
import { PlacesField } from "@/components/places-autocomplete";
import airportImg from "@/assets/airport-transfer.jpg";

const TITLE = "Chauffeur VTC Aéroport Toulouse-Blagnac | Eden Drive";
const DESCRIPTION =
  "Réservez votre chauffeur VTC pour vos transferts vers l'aéroport Toulouse-Blagnac. Service privé, ponctuel et confortable avec Eden Drive.";

const PHONE_DISPLAY_LOCAL = "06 35 58 58 23";
const PHONE_TEL = "+33635585823";
const WHATSAPP = "https://wa.me/33635585823";
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=EDEN+DRIVE+VTC+Toulouse+avis";

const FAQ = [
  {
    q: "Quel est le prix d'un VTC pour l'aéroport Toulouse-Blagnac ?",
    a: "Le tarif d'un transfert VTC vers l'aéroport Toulouse-Blagnac dépend de votre adresse de prise en charge, de l'horaire et du nombre de passagers. Nous vous confirmons un tarif ferme et transparent avant la réservation, sans surprise ni supplément caché.",
  },
  {
    q: "Combien de temps avant mon vol réserver un chauffeur VTC ?",
    a: "Nous recommandons de réserver au moins 24 à 48 heures à l'avance pour garantir la disponibilité d'un chauffeur. Pour les trajets de dernière minute, contactez-nous directement par téléphone ou WhatsApp : nous mettons tout en œuvre pour répondre à votre demande.",
  },
  {
    q: "Le chauffeur suit-il mon vol en cas de retard ?",
    a: "Oui. Nous suivons en temps réel votre numéro de vol. En cas de retard, d'avance ou de changement de terminal, votre chauffeur ajuste automatiquement l'heure de prise en charge — sans frais supplémentaires.",
  },
  {
    q: "Peut-on réserver un transfert retour depuis l'aéroport ?",
    a: "Absolument. Nous assurons les transferts dans les deux sens : aéroport Toulouse-Blagnac vers Toulouse, Blagnac, l'Occitanie ou toute autre destination. Votre chauffeur vous accueille avec pancarte à la sortie de l'aire d'arrivée.",
  },
  {
    q: "Le service est-il disponible tôt le matin ou tard le soir ?",
    a: "Eden Drive VTC est disponible 24h/24 et 7j/7, y compris pour les vols très matinaux, tardifs, de nuit, week-ends et jours fériés. Aucun supplément horaire n'est facturé de manière opaque.",
  },
];

export const Route = createFileRoute("/transfert-aeroport-toulouse")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "chauffeur VTC aéroport Toulouse, transfert aéroport Toulouse-Blagnac, VTC Blagnac aéroport, chauffeur privé aéroport Toulouse, taxi VTC aéroport Toulouse, Eden Drive VTC",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/transfert-aeroport-toulouse" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: airportImg },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: airportImg },
    ],
    links: [{ rel: "canonical", href: "/transfert-aeroport-toulouse" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TaxiService",
          name: "Eden Drive VTC — Transfert aéroport Toulouse-Blagnac",
          description: DESCRIPTION,
          image: airportImg,
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
            { "@type": "AdministrativeArea", name: "Occitanie" },
          ],
          serviceType: "Transfert aéroport Toulouse-Blagnac",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
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
      <Advantages />
      <HowItWorks />
      <WhyUs />
      <TestimonialsBlock />
      <Faq />
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
          <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-silver">
            FAQ
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
        src={airportImg}
        alt="Chauffeur VTC Eden Drive déposant un client à l'aéroport Toulouse-Blagnac"
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
            <Plane className="h-3.5 w-3.5" /> Aéroport Toulouse-Blagnac
          </div>

          <h1 className="font-display text-4xl leading-[1.05] text-ivory sm:text-5xl md:text-6xl">
            Chauffeur VTC pour transfert{" "}
            <span className="text-silver-gradient">aéroport Toulouse-Blagnac</span>
          </h1>
          <div className="hairline my-6 w-40" />
          <p className="max-w-2xl text-base text-ivory/85 sm:text-lg">
            Voyagez sereinement avec Eden Drive VTC. Votre chauffeur privé vous accompagne pour vos
            trajets vers et depuis l'aéroport Toulouse-Blagnac avec ponctualité, confort et discrétion.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#reserver"
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest sm:w-auto"
            >
              <Calendar className="h-4 w-4" /> Réserver mon trajet
            </a>
            <a
              href="#reserver"
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest sm:w-auto"
            >
              <Sparkles className="h-4 w-4" /> Demander un devis
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-ivory/60">
            <span className="flex items-center gap-2"><Plane className="h-4 w-4 text-silver" /> Suivi de vol</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-silver" /> 24h/24 · 7j/7</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4 text-silver" /> Service 5 étoiles</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Advantages ---------- */
function Advantages() {
  const items = [
    { icon: UserCheck, title: "Chauffeur professionnel", text: "Chauffeur VTC certifié, expérimenté et discret, à votre écoute." },
    { icon: Plane, title: "Suivi des horaires de vol", text: "Nous adaptons votre prise en charge en temps réel selon l'heure d'arrivée ou de départ." },
    { icon: HomeIcon, title: "Prise en charge à domicile ou hôtel", text: "Départ depuis votre adresse, votre hôtel ou votre lieu de rendez-vous à Toulouse et alentours." },
    { icon: Car, title: "Véhicule confortable et propre", text: "Berline premium impeccable, eau à disposition, climatisation, silence et confort absolu." },
  ];
  return (
    <section id="avantages" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Aéroport Toulouse-Blagnac</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Votre transfert aéroport en toute{" "}
            <em className="text-silver-gradient not-italic">tranquillité</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
          <p className="text-muted-foreground">
            Évitez le stress du stationnement, des transports en commun ou des taxis. Eden Drive VTC
            vous propose un service de transport privé adapté à vos horaires.
          </p>
        </div>
        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
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

/* ---------- How it works ---------- */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Réservez votre trajet", text: "En ligne via notre formulaire ou par téléphone. Confirmation rapide et tarif ferme." },
    { n: "02", title: "Votre chauffeur prépare la prise en charge", text: "Suivi de vol, itinéraire optimisé et coordonnées transmises avant le rendez-vous." },
    { n: "03", title: "Profitez d'un trajet confortable", text: "Voyagez sereinement jusqu'à votre destination dans une berline haut de gamme." },
  ];
  return (
    <section className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Réservation simplifiée</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Comment fonctionne votre <em className="text-silver-gradient not-italic">réservation</em> ?
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="luxe-card relative rounded-2xl p-7">
              <div className="font-display text-5xl text-silver-gradient">{s.n}</div>
              <h3 className="mt-4 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why us ---------- */
function WhyUs() {
  const items = [
    { icon: BadgeCheck, title: "Chauffeur VTC professionnel", text: "Basé à Toulouse, formé aux exigences du service premium et parfaitement au fait des accès de l'aéroport Toulouse-Blagnac." },
    { icon: Sparkles, title: "Service personnalisé", text: "Chaque trajet est pensé pour vous : itinéraire, horaires, attentions particulières, bagages volumineux." },
    { icon: Clock, title: "Ponctualité", text: "Arrivée systématique en avance, suivi de vol en temps réel, aucune improvisation." },
    { icon: Heart, title: "Relation client privilégiée", text: "Un interlocuteur unique, disponible et à l'écoute, pour une confiance qui s'installe dans la durée." },
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
        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        <div className="mt-12 flex justify-center">
          <a
            href="#reserver"
            className="btn-silver inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest"
          >
            <Calendar className="h-4 w-4" /> Réserver mon trajet
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function TestimonialsBlock() {
  const reviews = [
    {
      name: "Sarah Vrancken",
      text: "J'utilise Eden Drive pour le transport école maison des enfants et mes trajets personnels depuis plusieurs années. Le chauffeur hyper gentil est toujours à l'heure, la voiture impeccable, une conduite parfaite et toujours disponible. Je recommande vivement. Merci Mr Lopez!!",
    },
    {
      name: "Laurence Favre",
      text: "Nous avons fait appel à Fabrice pour un long trajet, et nous avons apprécié notre voyage. Le confort, la conduite et la gentillesse de Fabrice nous ont permis de ne pas voir passer le temps pendant nos 2 heures de trajet. Petite attention de la part de Fabrice qui montre tout son professionnalisme : des bouteilles d'eau fraîches nous ont été offertes pour braver cette chaleur. Je recommande à 200%",
    },
    {
      name: "Mariam Jbilou",
      text: "Très très bon chauffeur, TRÈS PROFESSIONNEL, rapide, efficace, véhicule très propre !",
    },
    {
      name: "Karen Le Boulanger",
      text: "Service impeccable, qui s'adapte aux demandes particulières des clients avec un service chaleureux. Au top, je recommande.",
    },
  ];
  return (
    <section className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Avis clients</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Ils nous font <em className="text-silver-gradient not-italic">confiance</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
        </div>

        <div className="mt-12 flex justify-center">
          <div className="luxe-card w-full max-w-xl rounded-2xl p-8 text-center sm:p-10">
            <div className="flex flex-col items-center gap-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-silver/30 bg-silver/5 px-4 py-1.5 text-silver">
                <span className="text-xs uppercase tracking-[0.2em]">Avis Google</span>
              </div>
              <div className="flex items-center gap-3 font-display text-5xl text-ivory sm:text-6xl">
                <span>5/5</span>
                <Star className="h-8 w-8 fill-silver text-silver" />
              </div>
              <p className="text-sm text-muted-foreground">48 avis vérifiés</p>
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
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Questions fréquentes</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            <em className="text-silver-gradient not-italic">FAQ</em> transfert aéroport
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
        </div>
        <div className="mt-10 space-y-3">
          {FAQ.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={item.q} className="luxe-card rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="font-display text-lg text-ivory">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-silver transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
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
            <em className="text-silver-gradient not-italic">Réservez</em> votre transfert
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
                placeholder="N° de vol, bagages, précisions…"
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
        <path d="M16.001 3.2C8.937 3.2 3.2 8.937 3.2 16c0 2.257.594 4.457 1.723 6.397L3.2 28.8l6.55-1.7A12.77 12.77 0 0 0 16.001 28.8C23.064 28.8 28.8 23.063 28.8 16S23.064 3.2 16.001 3.2zm0 23.36a10.53 10.53 0 0 1-5.365-1.467l-.384-.228-3.887 1.009 1.037-3.788-.25-.39A10.53 10.53 0 0 1 5.44 16c0-5.822 4.738-10.56 10.561-10.56 5.822 0 10.56 4.738 10.56 10.56 0 5.822-4.738 10.56-10.56 10.56zm5.79-7.905c-.317-.159-1.876-.926-2.167-1.032-.291-.106-.503-.159-.715.159-.212.317-.82 1.032-1.005 1.244-.185.212-.371.238-.688.079-.317-.159-1.339-.494-2.55-1.574-.943-.841-1.58-1.88-1.765-2.197-.185-.317-.02-.489.139-.647.143-.142.317-.371.476-.556.159-.185.212-.317.317-.529.106-.212.053-.397-.027-.556-.079-.159-.715-1.723-.98-2.36-.258-.62-.52-.536-.715-.546l-.609-.011c-.212 0-.556.079-.847.397-.291.317-1.111 1.085-1.111 2.65 0 1.564 1.137 3.076 1.296 3.288.159.212 2.239 3.418 5.424 4.792.759.328 1.35.523 1.812.669.761.242 1.454.208 2.001.126.611-.091 1.876-.767 2.141-1.508.265-.741.265-1.376.185-1.508-.079-.132-.291-.212-.608-.371z"/>
      </svg>
    </a>
  );
}
