import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Calendar, Car, Clock, ShieldCheck, Sparkles, BadgeCheck, ArrowUpRight, Briefcase, MessageCircle, Heart, Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingFormSection } from "@/components/booking-form";
import { FaqSection, buildFaqJsonLd, type FaqItem } from "@/components/faq-section";
import { LongJourneyFooter, LongJourneyReviews } from "@/components/long-journey-shared";
import { googleReviewsQueryOptions } from "@/lib/google-reviews.query";
import eventPhoto from "@/assets/wedding-event-toulouse.jpg";
const TITLE = "VTC mariage et événement privé Toulouse — Chauffeur premium | EDEN DRIVE VTC";
const DESCRIPTION = "Chauffeur privé pour mariage, gala et événement privé à Toulouse. Arrivée remarquée, discrétion absolue, véhicule premium. Tarif ferme. Devis immédiat.";
const URL = "https://edendrive-vtc.fr/vtc-mariage-evenement-toulouse";
const FAQ: FaqItem[] = [{"q": "Proposez-vous des véhicules décorés pour un mariage ?", "a": "Oui, nous pouvons décorer le véhicule selon votre thème (rubans, fleurs, couleurs). Précisez-le dans votre demande : nous convenons ensemble des détails avant le jour J."}, {"q": "Combien de temps à l'avance faut-il réserver pour un mariage ?", "a": "Nous recommandons de réserver plusieurs semaines à l'avance, idéalement 1 à 3 mois avant l'événement, pour garantir la disponibilité du véhicule et du chauffeur, et pour organiser les détails sereinement."}, {"q": "Peut-on prévoir plusieurs véhicules pour transporter les invités ?", "a": "Oui. Pour un mariage ou un événement avec de nombreux invités, nous pouvons mobiliser plusieurs véhicules et plusieurs chauffeurs, coordonnés entre eux. Précisez le nombre de passagers dans votre demande."}, {"q": "Le chauffeur attend-il pendant la cérémonie et la réception ?", "a": "Oui, selon la formule choisie. Votre chauffeur peut rester à votre disposition pendant toute la durée de l'événement, ou effectuer des trajets successifs (arrivée, navettes, retour). Nous adaptons la prestation à votre programme."}, {"q": "Le tarif inclut-il la décoration, l'attente et les péages ?", "a": "Le tarif ferme annoncé inclut les péages, le carburant, la mise à disposition du véhicule et l'attente pendant la durée convenue. La décoration est incluse dans les formules qui la prévoient. Vous ne payez rien de plus que le prix convenu."}, {"q": "Que se passe-t-il en cas d'imprévu le jour J ?", "a": "Contactez-nous au plus vite au 06 35 58 58 23. Nous faisons le maximum pour adapter la prestation. Les conditions d'annulation et de modification vous sont communiquées à la réservation."}];
const intro = ["Un mariage, un gala, une soirée prestige : ces moments ne s'improvisent pas. L'arrivée, le transport des proches, le retour en fin de soirée : chaque détail compte. EDEN DRIVE VTC met à votre disposition un chauffeur privé et un véhicule premium pour que votre événement reste un souvenir parfait.", "Nous accompagnons les mariés, leurs familles, leurs invités, ainsi que les organisateurs d'événements privés à Toulouse et dans toute l'Occitanie. Mariage, anniversaire, baptême, gala, soirée de lancement, remise de prix : nous adaptons la prestation à votre cérémonie et à votre protocole.", "Chaque prestation est sur réservation, avec un tarif ferme et transparent communiqué avant l'événement. Aucune surprise le jour J."];
const uses = [{"title": "Mariage — transport des mariés", "text": "Arrivée des mariés, départ vers la réception, retour en fin de soirée : un chauffeur dédié, un véhicule décoré selon votre thème."}, {"title": "Mariage — transport des proches", "text": "Navettes pour les invités, transport des témoins, des parents, des enfants : une organisation millimétrée, sans stress."}, {"title": "Anniversaire, baptême, réception familiale", "text": "Un chauffeur privé pour vous et vos proches, du début à la fin de la journée, avec discrétion et élégance."}, {"title": "Gala, soirée prestige, remise de prix", "text": "Arrivée remarquée, transport des invités, retour en fin de soirée : un service à la hauteur de l'événement."}, {"title": "Soirée de lancement, événement corporate", "text": "Transport des intervenants, des clients VIP, des équipes : une coordination sans faille."}, {"title": "Événement VIP et protocole sur mesure", "text": "Personnalités, artistes, invités de marque : un chauffeur formé à la confidentialité, un véhicule discret, une organisation millimétrée."}];
const plans = [{"title": "Formule Mariés", "text": "Transport des mariés : arrivée, départ vers la réception, retour en fin de soirée. Véhicule décoré, chauffeur dédié en tenue."}, {"title": "Formule Invités", "text": "Navettes pour les proches : transport des témoins, des parents, des invités entre les lieux de l'événement."}, {"title": "Formule Sur mesure", "text": "Un programme complet, coordonné avec votre wedding planner ou organisateur : plusieurs véhicules, plusieurs chauffeurs, une organisation sans faille."}];
const reasons = [{"title": "Une arrivée remarquée", "text": "Un véhicule premium, un chauffeur en tenue, une arrivée soignée. Votre entrée reste dans les mémoires, pour les bonnes raisons."}, {"title": "Une discrétion absolue", "text": "Chauffeurs formés à la confidentialité, véhicules discrets, aucune indiscrétion. Votre événement reste le vôtre."}, {"title": "Une ponctualité irréprochable", "text": "Le jour J, aucun retard n'est permis. Votre chauffeur arrive en avance, anticipe les imprévus, gère la circulation."}, {"title": "Un tarif ferme, annoncé à l'avance", "text": "Le prix est calculé et confirmé avant l'événement, selon la durée, le véhicule et le programme. Pas de surprise le jour J."}, {"title": "Une flexibilité totale", "text": "Votre programme change ? Un discours se prolonge ? Votre chauffeur s'adapte, sans stress et sans surcoût caché."}];
const steps = ["Vous nous contactez avec la date, le lieu, le nombre de passagers et votre programme (arrivée, transport des proches, retour).", "Nous vous communiquons un tarif ferme, adapté à la durée, au véhicule et au nombre de trajets.", "Nous convenons ensemble des détails : heure d'arrivée, décoration du véhicule, points de rendez-vous, coordination avec le lieu de réception.", "Le jour J, votre chauffeur arrive en avance, en tenue, avec un véhicule impeccable. Il gère les trajets et s'adapte à votre rythme.", "En fin de soirée, il vous raccompagne, vous et vos proches, en toute sécurité."];
const services = [
  { icon: Clock, title: "Mise à disposition chauffeur Toulouse", to: "/mise-a-disposition-chauffeur-toulouse" },
  { icon: Car, title: "Long trajet VTC Toulouse", to: "/long-trajet-vtc-toulouse" },
  { icon: Briefcase, title: "Déplacements professionnels", to: "/chauffeur-vtc-entreprise-toulouse" },
] as const;
export const Route = createFileRoute("/vtc-mariage-evenement-toulouse")({
  head: () => ({
    meta: [
      { title: TITLE }, { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" }, { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://edendrive-vtc.fr/share/wedding-event.jpg" },
      { name: "twitter:image", content: "https://edendrive-vtc.fr/share/wedding-event.jpg" },
      { name: "twitter:title", content: TITLE }, { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service", name: "VTC mariage et événement privé à Toulouse", url: URL,
        description: DESCRIPTION, serviceType: "Chauffeur privé pour mariage et événement à tarif ferme",
        provider: { "@type": "LocalBusiness", "@id": "https://edendrive-vtc.fr/#business", name: "EDEN DRIVE VTC", telephone: "+33635585823" },
        areaServed: ["Toulouse", "Occitanie"].map(name => ({ "@type": "Place", name })),
        offers: { "@type": "Offer", description: "Tarif ferme annoncé à l'avance", priceCurrency: "EUR" },
      }) },
      { type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(FAQ)) },
    ],
  }),
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(googleReviewsQueryOptions()); },
  component: EventPage,
});
const cta = "btn-silver h-auto whitespace-normal rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest";
function EventPage() {
  return <div className="min-h-screen bg-background text-foreground">
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
          <img src={eventPhoto} alt="Berline noire premium décorée de rubans devant un lieu de réception élégant" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 md:pb-20">
            <div className="max-w-3xl motion-safe:animate-fade-up">
              <p className="mb-5 text-sm uppercase tracking-widest text-silver">EDEN DRIVE VTC</p>
              <h1 className="font-display text-4xl leading-tight tracking-normal text-ivory sm:text-5xl md:text-6xl">VTC mariage et événement privé à Toulouse</h1>
              <div className="hairline my-6 w-40" />
              <p className="max-w-2xl text-base leading-relaxed text-ivory/90 sm:text-lg">Un chauffeur privé et un véhicule premium pour votre mariage, votre gala ou votre soirée prestige. Arrivée remarquée, discrétion absolue, ponctualité irréprochable. Sur réservation.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className={cta}><a href="#reserver"><Calendar />Estimer mon événement</a></Button>
                <Button asChild className={cta}><a href="tel:+33635585823"><Phone />06 35 58 58 23</a></Button>
              </div>
            </div>
          </div>
        </section>

        <Band title="Votre arrivée mérite l'exception" narrow>{intro.map(text => <p key={text}>{text}</p>)}</Band>
        <Band title="Nos prestations événementielles"><Cards items={uses} icons={[Heart, Users, Gift, Sparkles, Briefcase, ShieldCheck]} /></Band>
        <Band title="Comment se déroule un événement avec EDEN DRIVE VTC ?" narrow>
          <ol className="space-y-6">{steps.map((text, i) => <li key={text} className="flex gap-5 border-b border-border pb-6"><span className="font-display text-4xl text-silver-deep">{String(i + 1).padStart(2, "0")}</span><p className="pt-2">{text}</p></li>)}</ol>
        </Band>
        <Band title="Nos formules pour votre événement"><Cards items={plans} icons={[Heart, Users, Sparkles]} /><p className="text-center">Chaque formule est personnalisable. Renseignez votre demande dans le formulaire pour obtenir votre tarif ferme immédiatement.</p></Band>
        <Band title="Pourquoi choisir EDEN DRIVE VTC pour votre événement ?"><Cards items={reasons} icons={[Sparkles, ShieldCheck, Clock, BadgeCheck, Calendar]} /></Band>
        <BookingFormSection estimateLabel="Estimer mon événement" messagePlaceholder="Précisez le type d'événement, le nombre de passagers, le programme (arrivée, transport des proches, retour) et toute demande particulière." title="Réservez votre VTC événement dès maintenant" subtitle="Chauffeur dédié, tarif ferme, véhicule premium." sectionClassName="section-light relative scroll-mt-28 border-t border-border/40 py-24 sm:py-32" />
        <section id="contact-rapide" className="scroll-mt-28 border-t border-border/40 bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <p className="text-muted-foreground">Disponible 24h/24, 7j/7. Réponse immédiate par téléphone ou WhatsApp.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className={cta}><a href="tel:+33635585823"><Phone />06 35 58 58 23</a></Button>
              <Button asChild className={cta}><a href="https://wa.me/33635585823" target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a></Button>
            </div>
          </div>
        </section>
        <FaqSection items={FAQ} title="Questions fréquentes sur les VTC événementiels" />
        <LongJourneyReviews selection={[3, 0, 2]} />
        <section id="services" className="section-light scroll-mt-28 border-t border-border/40 py-24 sm:py-32">
          <nav aria-label="Autres prestations" className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-3">
            {services.map(service => <Link key={service.to} to={service.to} className="luxe-card group flex flex-col rounded-2xl p-7"><service.icon className="h-6 w-6 text-silver-deep" /><span className="mt-5 font-display text-2xl text-foreground">{service.title}</span><ArrowUpRight className="mt-6 h-5 w-5 text-silver-deep" /></Link>)}
          </nav>
        </section>
      </main>
      <LongJourneyFooter />
    </div>;
}
function Cards({ items, icons }: { items: { title: string; text: string }[]; icons: typeof Phone[] }) {
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.map((item, i) => {
    const Icon = icons[i] ?? Sparkles;
    return <article key={item.title} className="luxe-card rounded-2xl p-7"><Icon className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">{item.title}</h3><p className="mt-3 text-sm leading-relaxed">{item.text}</p></article>;
  })}</div>;
}
function Band({ title, narrow = false, children }: { title: string; narrow?: boolean; children: React.ReactNode }) {
  return <section className="section-light border-t border-border/40 py-24 sm:py-32"><div className={`mx-auto px-5 sm:px-8 ${narrow ? "max-w-3xl" : "max-w-7xl"}`}><h2 className="text-center font-display text-4xl leading-tight tracking-normal sm:text-5xl">{title}</h2><div className="hairline mx-auto my-6 w-24" /><div className="mt-10 space-y-6 leading-relaxed text-muted-foreground">{children}</div></div></section>;
}
