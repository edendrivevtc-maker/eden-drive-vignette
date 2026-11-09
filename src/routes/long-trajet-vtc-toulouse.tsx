import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Calendar, Car, Clock, ShieldCheck, Sparkles, BadgeCheck, ArrowUpRight, Plane, Train, Briefcase, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingFormSection } from "@/components/booking-form";
import { FaqSection, buildFaqJsonLd, type FaqItem } from "@/components/faq-section";
import { LongJourneyFooter, LongJourneyReviews } from "@/components/long-journey-shared";
import { googleReviewsQueryOptions } from "@/lib/google-reviews.query";
import heroPhoto from "@/assets/gallery-road.jpg";

const TITLE = "Long trajet VTC Toulouse — Chauffeur privé longue distance | EDEN DRIVE VTC";
const DESCRIPTION = "Chauffeur privé pour longs trajets au départ de Toulouse : tarif ferme, confort premium, ponctualité. Interville et longue distance partout en France. Devis immédiat.";
const URL = "https://edendrive-vtc.fr/long-trajet-vtc-toulouse";
const FAQ: FaqItem[] = [
  { q: "Quel est le tarif d'un long trajet au départ de Toulouse ?", a: "Le tarif dépend de la distance, du véhicule et des éventuels arrêts. Il vous est communiqué avant le départ, de façon ferme et transparente, via notre formulaire d'estimation, par téléphone ou WhatsApp. Aucun supplément n'est appliqué en cours de route." },
  { q: "Peut-on faire des pauses pendant un long trajet ?", a: "Oui, les arrêts sont possibles sur demande. Votre chauffeur adapte l'itinéraire et les pauses à votre confort et à votre programme." },
  { q: "Combien de passagers et de bagages pouvez-vous transporter ?", a: "Nos véhicules accueillent jusqu'à 4 passagers confortablement, avec les bagages adaptés. Pour un groupe plus important, contactez-nous : nous étudions la solution." },
  { q: "Le tarif inclut-il les péages et le carburant ?", a: "Oui, le tarif ferme annoncé inclut les péages, le carburant et la mise à disposition du véhicule. Vous ne payez rien de plus que le prix convenu." },
  { q: "Peut-on réserver un aller-retour sur la journée ?", a: "Oui, l'aller-retour sur la journée est possible, avec ou sans mise à disposition du chauffeur sur place. Précisez-le dans votre demande pour obtenir le tarif adapté." },
  { q: "Que se passe-t-il en cas de retard ou d'imprévu ?", a: "Contactez-nous au plus vite au 06 35 58 58 23. Nous faisons le maximum pour adapter la prestation. Les conditions d'annulation et de modification vous sont communiquées à la réservation." },
];
const benefits = [
  { icon: BadgeCheck, title: "Un tarif ferme, annoncé à l'avance", text: "Le prix est calculé et confirmé avant le départ, selon la distance et le véhicule choisi. Pas de compteur, pas de supplément caché." },
  { icon: Car, title: "Un confort d'exception", text: "Berline premium, climatisation, sièges confortables, eau fraîche à bord, chargeurs à disposition. Les longs trajets se transforment en moments de repos." },
  { icon: ShieldCheck, title: "Un chauffeur professionnel et discret", text: "Chauffeurs certifiés, ponctuels, courtois, formés à la confidentialité. Votre temps de trajet est votre temps, pas le nôtre." },
  { icon: Sparkles, title: "Une flexibilité totale", text: "Départ à l'heure de votre choix, arrêts possibles sur demande, prise en charge à domicile, à l'hôtel, à l'aéroport ou à la gare." },
  { icon: Clock, title: "Disponible 24h/24, 7j/7", text: "Départ tôt le matin, retour tard le soir, week-end ou jour férié : nous nous adaptons à votre programme." },
];
const destinations = ["Toulouse → Montpellier (env. 2 h 30)", "Toulouse → Bordeaux (env. 2 h 30)", "Toulouse → Barcelone (env. 3 h 30)", "Toulouse → Andorre (env. 2 h 30)", "Toulouse → Paris (env. 7 h)", "Toulouse → Marseille / Nice (env. 4 h à 5 h)", "Toulouse → Lourdes / Pau (env. 2 h)", "Toulouse → Carcassonne / Narbonne / Perpignan"];
const steps = [
  "Vous réservez via le formulaire en ligne, par téléphone au 06 35 58 58 23 ou par WhatsApp.",
  "Vous recevez votre tarif ferme immédiatement ou après confirmation rapide.",
  "Votre chauffeur vous prend en charge à l'adresse convenue, à l'heure exacte.",
  "Vous voyagez sereinement : le chauffeur gère l'itinéraire, les pauses et l'arrivée.",
  "Vous êtes déposé porte à porte à destination.",
];
const services = [
  { icon: Plane, title: "Transfert aéroport Toulouse-Blagnac", to: "/vtc-aeroport-toulouse-blagnac" },
  { icon: Train, title: "Transfert gare Toulouse Matabiau", to: "/vtc-gare-matabiau-toulouse" },
  { icon: Briefcase, title: "Déplacements professionnels", to: "/chauffeur-vtc-entreprise-toulouse" },
] as const;

export const Route = createFileRoute("/long-trajet-vtc-toulouse")({
  head: () => ({
    meta: [
      { title: TITLE }, { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" }, { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://edendrive-vtc.fr/share/long-journey.jpg" },
      { name: "twitter:image", content: "https://edendrive-vtc.fr/share/long-journey.jpg" },
      { name: "twitter:title", content: TITLE }, { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service", name: "Long trajet VTC au départ de Toulouse", url: URL,
        description: DESCRIPTION, serviceType: "Chauffeur privé longue distance à tarif ferme",
        provider: { "@type": "LocalBusiness", "@id": "https://edendrive-vtc.fr/#business", name: "EDEN DRIVE VTC", telephone: "+33635585823" },
        areaServed: ["Toulouse", "Montpellier", "Bordeaux", "Paris", "Barcelone", "Andorre"].map(name => ({ "@type": "Place", name })),
        offers: { "@type": "Offer", description: "Tarif ferme annoncé à l'avance", priceCurrency: "EUR" },
      }) },
      { type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(FAQ)) },
    ],
  }),
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(googleReviewsQueryOptions()); },
  component: LongJourneyPage,
});

const cta = "btn-silver h-auto whitespace-normal rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest";
function LongJourneyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-silver/15 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/" aria-label="EDEN DRIVE VTC — Accueil"><img src="/logo.png" alt="EDEN DRIVE VTC" className="h-16 w-auto object-contain" /></Link>
          <nav className="flex items-center gap-6" aria-label="Navigation principale">
            <a href="#reserver" className="hidden text-sm text-silver md:block">Réservation</a>
            <a href="#services" className="hidden text-sm text-silver md:block">Prestations</a>
            <Button asChild className={`${cta} hidden md:inline-flex`}><a href="tel:+33635585823"><Phone />06 35 58 58 23</a></Button>
            <Button asChild className="btn-silver h-10 w-10 rounded-full md:hidden"><a href="tel:+33635585823" aria-label="Appeler EDEN DRIVE VTC"><Phone /></a></Button>
          </nav>
        </div>
      </header>
      <main>
        <section id="top" className="relative isolate flex min-h-[650px] scroll-mt-28 items-end overflow-hidden md:min-h-[720px]">
          <img src={heroPhoto} alt="Berline noire premium sur une autoroute au coucher du soleil" width={1024} height={768} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 md:pb-20">
            <div className="max-w-3xl motion-safe:animate-fade-up">
              <p className="mb-5 text-sm uppercase tracking-widest text-silver">EDEN DRIVE VTC</p>
              <h1 className="font-display text-4xl leading-tight tracking-normal text-ivory sm:text-5xl md:text-6xl">Long trajet VTC au départ de Toulouse</h1>
              <div className="hairline my-6 w-40" />
              <p className="max-w-2xl text-base leading-relaxed text-ivory/90 sm:text-lg">Chauffeur privé pour vos trajets interville et longue distance. Tarif ferme annoncé à l'avance, confort premium, ponctualité irréprochable. Partout en France, sur réservation.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className={cta}><a href="#reserver"><Calendar />Estimer mon trajet</a></Button>
                <Button asChild className={cta}><a href="tel:+33635585823"><Phone />06 35 58 58 23</a></Button>
              </div>
            </div>
          </div>
        </section>
        <Band title="Votre chauffeur privé pour les longues distances" narrow>
          <p>Un long trajet en VTC, c'est d'abord la tranquillité. Pas de correspondance, pas de gare bondée, pas de conduite fatigante après une journée chargée. Vous montez à bord, vous vous installez, et votre chauffeur s'occupe du reste.</p>
          <p>EDEN DRIVE VTC assure des trajets interville et longue distance depuis Toulouse vers toute la France : Occitanie, Nouvelle-Aquitaine, Provence, région parisienne, et au-delà. Que ce soit pour un déplacement professionnel, un rendez-vous familial, un déménagement léger ou un simple aller-retour, votre chauffeur vous conduit porte à porte, à l'heure exacte que vous avez choisie.</p>
          <p>Chaque prestation est sur réservation, avec un tarif ferme et transparent communiqué avant le départ. Aucune surprise à l'arrivée.</p>
        </Band>
        <Band title="Nos destinations longue distance les plus demandées">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map(destination => <li key={destination} className="luxe-card flex items-start gap-3 rounded-2xl p-6"><Car className="mt-1 h-5 w-5 shrink-0 text-silver-deep" /><span className="text-foreground">{destination}</span></li>)}
          </ul>
          <p className="text-center"><a href="#reserver" className="underline underline-offset-4">Vous ne trouvez pas votre destination ? Renseignez votre trajet dans le formulaire : votre tarif s'affiche immédiatement.</a></p>
        </Band>
        <Band title="Pourquoi choisir EDEN DRIVE VTC pour un long trajet ?">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{benefits.map(item => <article key={item.title} className="luxe-card rounded-2xl p-7"><item.icon className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">{item.title}</h3><p className="mt-3 text-sm leading-relaxed">{item.text}</p></article>)}</div>
        </Band>
        <Band title="Comment se déroule un long trajet avec EDEN DRIVE VTC ?" narrow>
          <ol className="space-y-6">{steps.map((step, i) => <li key={step} className="flex gap-5 border-b border-border pb-6"><span className="font-display text-4xl text-silver-deep">{String(i + 1).padStart(2, "0")}</span><p className="pt-2">{step}</p></li>)}</ol>
        </Band>
        <Band title="Long trajet et déplacement professionnel" narrow>
          <p>Vous avez un rendez-vous à Bordeaux, un salon à Montpellier, une visite client à Paris ? Le long trajet en VTC est une alternative efficace au train et à l'avion : pas d'attente, pas de correspondance, un espace de travail confortable à bord, et la possibilité de travailler ou de vous reposer pendant le trajet.</p>
          <p>EDEN DRIVE VTC accompagne les entreprises, cadres et équipes sur leurs déplacements longue distance, avec facturation et devis adaptés.</p>
          <Link to="/chauffeur-vtc-entreprise-toulouse" className="block underline underline-offset-4">Découvrez notre offre déplacements professionnels →</Link>
        </Band>
        <BookingFormSection title="Réservez votre long trajet dès maintenant" subtitle="Tarif ferme, chauffeur privé, véhicule premium." sectionClassName="section-light relative scroll-mt-28 border-t border-border/40 py-24 sm:py-32" />
        <section id="contact-rapide" className="scroll-mt-28 border-t border-border/40 bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <p className="text-muted-foreground">Disponible 24h/24, 7j/7. Réponse immédiate par téléphone ou WhatsApp.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className={cta}><a href="tel:+33635585823"><Phone />06 35 58 58 23</a></Button>
              <Button asChild className={cta}><a href="https://wa.me/33635585823" target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a></Button>
            </div>
          </div>
        </section>
        <FaqSection items={FAQ} title="Questions fréquentes sur les longs trajets" />
        <LongJourneyReviews />
        <section id="services" className="section-light scroll-mt-28 border-t border-border/40 py-24 sm:py-32">
          <nav aria-label="Autres prestations" className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-3">
            {services.map(service => <Link key={service.to} to={service.to} className="luxe-card group flex flex-col rounded-2xl p-7"><service.icon className="h-6 w-6 text-silver-deep" /><span className="mt-5 font-display text-2xl text-foreground">{service.title}</span><ArrowUpRight className="mt-6 h-5 w-5 text-silver-deep" /></Link>)}
          </nav>
        </section>
      </main>
      <LongJourneyFooter />
    </div>
  );
}

function Band({ title, narrow = false, children }: { title: string; narrow?: boolean; children: React.ReactNode }) {
  return <section className="section-light border-t border-border/40 py-24 sm:py-32"><div className={`mx-auto px-5 sm:px-8 ${narrow ? "max-w-3xl" : "max-w-7xl"}`}><h2 className="text-center font-display text-4xl leading-tight tracking-normal sm:text-5xl">{title}</h2><div className="hairline mx-auto my-6 w-24" /><div className="mt-10 space-y-6 leading-relaxed text-muted-foreground">{children}</div></div></section>;
}