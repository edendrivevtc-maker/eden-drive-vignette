import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Phone,
  MapPin,
  Briefcase,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ShieldCheck,
  BadgeCheck,
  FileText,
  Users,
  Handshake,
  Plane,
  Train,
  UserCheck,
  ChevronDown,
} from "lucide-react";
import { sendBookingRequest } from "@/lib/booking.functions";
import { PlacesField } from "@/components/places-autocomplete";
import businessImg from "@/assets/business-transfer.jpg.asset.json";

const TITLE = "Chauffeur VTC entreprise Toulouse | Eden Drive";
const DESCRIPTION =
  "Chauffeur VTC entreprise à Toulouse pour vos déplacements professionnels, rendez-vous clients et transferts vers les gares et aéroports. Service premium et personnalisé.";

const PHONE_DISPLAY_LOCAL = "06 35 58 58 23";
const PHONE_TEL = "+33635585823";
const WHATSAPP = "https://wa.me/33635585823";

const FAQ = [
  {
    q: "Comment réserver un chauffeur VTC professionnel à Toulouse ?",
    a: "Rien de plus simple : complétez le formulaire de réservation en ligne, appelez-nous au 06 35 58 58 23 ou contactez-nous par WhatsApp. Nous confirmons rapidement votre trajet avec un tarif ferme, transparent et adapté à vos besoins professionnels.",
  },
  {
    q: "Une entreprise peut-elle obtenir une facture pour ses déplacements ?",
    a: "Bien sûr. Nous établissons une facture professionnelle conforme pour chaque prestation, envoyée par e-mail après votre trajet. Sur demande, nous pouvons également mettre en place une facturation mensuelle groupée pour simplifier votre comptabilité.",
  },
  {
    q: "Peut-on réserver un chauffeur pour plusieurs trajets professionnels ?",
    a: "Oui. Que ce soit pour une journée entière de rendez-vous, un roadshow, un séminaire ou une mise à disposition récurrente, nous adaptons notre service à vos plannings professionnels avec le même chauffeur privé pour garantir continuité et discrétion.",
  },
  {
    q: "Proposez-vous des transferts professionnels vers l'aéroport Toulouse-Blagnac ?",
    a: "Absolument. Nous assurons vos transferts vers et depuis l'aéroport Toulouse-Blagnac ainsi que la gare Matabiau, avec suivi de vol ou de train en temps réel, prise en charge à votre domicile, hôtel ou lieu de travail.",
  },
  {
    q: "Travaillez-vous avec des entreprises régulièrement ?",
    a: "Oui. De nombreuses entreprises et cabinets toulousains font appel à Eden Drive VTC pour le transport quotidien de leurs collaborateurs, dirigeants et clients. Nous proposons des conventions sur mesure pour les besoins réguliers.",
  },
];

export const Route = createFileRoute("/chauffeur-vtc-entreprise-toulouse")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "chauffeur VTC entreprise Toulouse, VTC professionnel Toulouse, chauffeur privé entreprise, transport professionnel Toulouse, VTC déplacement affaires, Eden Drive VTC",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://edendrive-vtc.fr/chauffeur-vtc-entreprise-toulouse" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: businessImg.url },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: businessImg.url },
    ],
    links: [{ rel: "canonical", href: "https://edendrive-vtc.fr/chauffeur-vtc-entreprise-toulouse" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TaxiService",
          name: "Eden Drive VTC — Chauffeur entreprise Toulouse",
          description: DESCRIPTION,
          image: businessImg.url,
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
          serviceType: "Chauffeur VTC entreprise et déplacements professionnels",
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
      <Usages />
      <WhyUs />
      <Partner />
      <CtaBlock />
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
        src={businessImg.url}
        alt="Chauffeur VTC Eden Drive accueillant un cadre à Toulouse pour un déplacement professionnel"
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
            <Briefcase className="h-3.5 w-3.5" /> Service entreprise
          </div>

          <h1 className="font-display text-4xl leading-[1.05] text-ivory sm:text-5xl md:text-6xl">
            Chauffeur VTC <span className="text-silver-gradient">entreprise à Toulouse</span>
          </h1>
          <div className="hairline my-6 w-40" />
          <p className="max-w-2xl text-base text-ivory/85 sm:text-lg">
            Un service de transport professionnel pour vos rendez-vous, déplacements
            d'affaires et trajets professionnels avec un chauffeur privé ponctuel et
            discret.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#reserver"
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest sm:w-auto"
            >
              <Calendar className="h-4 w-4" /> Réserver un chauffeur
            </a>
            <a
              href="#reserver"
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest sm:w-auto"
            >
              <FileText className="h-4 w-4" /> Demander un devis professionnel
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-ivory/60">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-silver" /> Confidentialité</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-silver" /> Ponctualité</span>
            <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-silver" /> Facturation pro</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Usages ---------- */
function Usages() {
  const items = [
    { icon: Handshake, title: "Rendez-vous clients", text: "Arrivez détendu et à l'heure à chaque rendez-vous, avec l'image d'une entreprise soignée." },
    { icon: Briefcase, title: "Déplacements d'affaires", text: "Trajets inter-villes, journées de rendez-vous, séminaires : un chauffeur dédié à votre agenda." },
    { icon: Plane, title: "Transferts gares et aéroports", text: "Toulouse-Blagnac, Matabiau et les gares régionales, avec suivi de vol et de train." },
    { icon: Users, title: "Transport de collaborateurs", text: "Accueil de vos équipes, invités ou partenaires, avec pancarte et prise en charge personnalisée." },
    { icon: Clock, title: "Mise à disposition", text: "Chauffeur à l'heure ou à la journée, disponible entre chaque étape de votre planning." },
  ];
  return (
    <section id="avantages" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Service entreprise</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Vos déplacements professionnels{" "}
            <em className="text-silver-gradient not-italic">en toute sérénité</em>
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
          <p className="text-muted-foreground">
            Confiez vos trajets professionnels à un chauffeur privé expérimenté et
            profitez d'un service pensé pour l'exigence des professionnels toulousains.
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

/* ---------- Why us ---------- */
function WhyUs() {
  const items = [
    { icon: Clock, title: "Ponctualité", text: "Arrivée systématique en avance, itinéraire optimisé et suivi de votre trajet en temps réel." },
    { icon: ShieldCheck, title: "Confidentialité", text: "Un chauffeur privé discret, tenu au secret professionnel, respectueux de vos échanges et de vos données." },
    { icon: Sparkles, title: "Confort premium", text: "Berline haut de gamme entretenue avec soin, climatisation, eau à disposition, silence à bord." },
    { icon: UserCheck, title: "Service personnalisé", text: "Un interlocuteur unique qui connaît vos préférences et adapte chaque prestation à vos exigences." },
    { icon: FileText, title: "Facturation professionnelle", text: "Factures conformes envoyées par e-mail, facturation mensuelle possible pour les entreprises régulières." },
  ];
  return (
    <section className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Eden Drive VTC</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Pourquoi choisir Eden Drive VTC pour vos{" "}
            <em className="text-silver-gradient not-italic">déplacements professionnels</em> ?
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

/* ---------- Partner ---------- */
function Partner() {
  const pillars = [
    { icon: Clock, title: "Gain de temps", text: "Concentrez-vous sur vos dossiers pendant que votre chauffeur gère l'itinéraire, le trafic et le stationnement." },
    { icon: BadgeCheck, title: "Image professionnelle", text: "Recevez vos clients et partenaires dans un cadre soigné, à la hauteur de l'image de votre entreprise." },
    { icon: Sparkles, title: "Confort de vos équipes", text: "Un environnement calme et confortable pour préparer un rendez-vous ou récupérer entre deux missions." },
    { icon: Handshake, title: "Solution sur mesure", text: "Conventions récurrentes, chauffeur attitré, tarifs négociés : nous nous adaptons à vos besoins." },
  ];
  return (
    <section className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Partenariat B2B</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Un partenaire transport <em className="text-silver-gradient not-italic">fiable</em> pour votre entreprise
          </h2>
          <div className="hairline my-6 w-24" />
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Eden Drive VTC accompagne les dirigeants, cadres et entrepreneurs de Toulouse
            dans leurs trajets professionnels du quotidien comme dans leurs déplacements
            stratégiques. Un chauffeur privé dédié, c'est l'assurance de trajets fluides,
            confidentiels et alignés sur les standards attendus par vos clients.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pour les besoins réguliers, nous construisons avec vous une solution adaptée :
            chauffeur attitré, disponibilité prioritaire, facturation centralisée et
            reporting mensuel.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
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

/* ---------- CTA block ---------- */
function CtaBlock() {
  return (
    <section className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <span className="text-xs uppercase tracking-[0.3em] text-silver">Passez à l'action</span>
        <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Organisez vos déplacements professionnels{" "}
          <em className="text-silver-gradient not-italic">simplement</em>
        </h2>
        <div className="hairline mx-auto my-6 w-24" />
        <p className="text-muted-foreground">
          Décrivez-nous vos besoins : nous revenons vers vous rapidement avec un devis
          professionnel personnalisé.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#reserver"
            className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest sm:w-auto"
          >
            <FileText className="h-4 w-4" /> Demander un devis
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

/* ---------- FAQ ---------- */
function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Questions fréquentes</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            <em className="text-silver-gradient not-italic">FAQ</em> chauffeur entreprise
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
          <span className="text-xs uppercase tracking-[0.3em] text-silver">Devis professionnel</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            <em className="text-silver-gradient not-italic">Réservez</em> votre chauffeur
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
          <p className="text-muted-foreground">
            Complétez le formulaire, nous vous confirmons rapidement un tarif ferme et un
            devis professionnel adapté.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="luxe-card mt-10 rounded-2xl p-7 sm:p-10">
          <div className="space-y-5">
            <Field label="Nom / Société" name="name" required />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Téléphone" name="phone" type="tel" required />
              <Field label="E-mail" name="email" type="email" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <PlacesField label="Départ" name="from" placeholder="Adresse, bureau, hôtel…" required />
              <PlacesField label="Destination" name="to" required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Date & heure" name="datetime" type="datetime-local" required />
              <Field label="Passagers" name="pax" type="number" placeholder="1" />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                name="message"
                rows={3}
                className="w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-silver"
                placeholder="Fréquence, besoins spécifiques, facturation…"
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
        <path d="M16.001 3.2C8.937 3.2 3.2 8.937 3.2 16c0 2.257.594 4.457 1.723 6.397L3.2 28.8l6.55-1.7A12.77 12.77 0 0 0 16.001 28.8C23.064 28.8 28.8 23.063 28.8 16S23.064 3.2 16.001 3.2zm0 23.36a10.53 10.53 0 0 1-5.365-1.467l-.384-.228-3.887 1.009 1.037-3.788-.25-.39A10.53 10.53 0 0 1 5.44 16c0-5.822 4.738-10.56 10.561-10.56 5.822 0 10.56 4.738 10.56 10.56 0 5.822-4.738 10.56-10.56 10.56zm5.79-7.905c-.317-.159-1.876-.926-2.167-1.032-.291-.106-.503-.159-.715.159-.212.317-.82 1.032-1.005 1.244-.185.212-.371.238-.688.079-.317-.159-1.339-.494-2.55-1.574-.943-.841-1.58-1.88-1.765-2.197-.185-.317-.02-.489.139-.647.143-.142.317-.371.476-.556.159-.185.212-.317.317-.529.106-.212.053-.397-.027-.556-.079-.159-.715-1.723-.98-2.36-.258-.62-.52-.536-.715-.546l-.609-.011c-.212 0-.556.079-.847.397-.291.317-1.111 1.085-1.111 2.65 0 1.564 1.137 3.076 1.296 3.288.159.212 2.239 3.418 5.424 4.792.759.328 1.35.523 1.812.669.761.242 1.454.208 2.001.126.761-.242 1.876-.767 2.141-1.508.265-.741.265-1.376.185-1.508-.079-.132-.291-.212-.608-.371z"/>
      </svg>
    </a>
  );
}
