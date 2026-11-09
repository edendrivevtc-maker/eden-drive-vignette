import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Calendar, Car, Clock, ShieldCheck, Sparkles, BadgeCheck, ArrowUpRight, Plane, Train, Briefcase, MessageCircle, Mail, MapPin, ShoppingBag, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqSection, buildFaqJsonLd, type FaqItem } from "@/components/faq-section";
import { LongJourneyFooter, LongJourneyReviews } from "@/components/long-journey-shared";
import { googleReviewsQueryOptions } from "@/lib/google-reviews.query";
import heroPhoto from "@/assets/private-driver-toulouse.jpg";

const TITLE = "Mise à disposition chauffeur privé Toulouse — À l'heure ou à la journée | EDEN DRIVE VTC";
const DESCRIPTION = "Chauffeur privé à votre disposition à Toulouse, à l'heure ou à la journée. Rendez-vous, tourisme, shopping, mariage, événement. Tarif ferme, véhicule premium. Devis personnalisé.";
const URL = "https://edendrive-vtc.fr/mise-a-disposition-chauffeur-toulouse";
const FAQ: FaqItem[] = [{"q": "Comment réserver une mise à disposition ?", "a": "La mise à disposition est une prestation sur mesure. Contactez-nous par téléphone au 06 35 58 58 23, par WhatsApp ou par email à edendrivevtc@gmail.com, en précisant la date, l'heure de prise en charge, la durée souhaitée et votre programme. Nous vous répondons avec un tarif ferme et une proposition adaptée."}, {"q": "Quelle est la différence entre une mise à disposition et un trajet simple ?", "a": "Un trajet simple relie un point A à un point B. La mise à disposition met un chauffeur et un véhicule à votre disposition pendant une durée convenue : il vous dépose, vous attend, vous reprend et vous conduit où vous le souhaitez, à votre rythme."}, {"q": "Combien de temps peut durer une mise à disposition ?", "a": "De quelques heures à une journée complète, et au-delà sur demande. Nos formules standard sont à l'heure, à la demi-journée ou à la journée. Pour un programme plus long, contactez-nous pour un devis personnalisé."}, {"q": "Le chauffeur attend-il entre les différents arrêts ?", "a": "Oui. Pendant toute la durée convenue, votre chauffeur reste à votre disposition. Il vous attend pendant vos rendez-vous, vos achats ou vos visites, et vous reprend dès que vous êtes prêt."}, {"q": "Peut-on modifier le programme en cours de prestation ?", "a": "Oui, dans la limite de la durée convenue. Votre chauffeur s'adapte à vos changements de programme. Pour une prolongation au-delà de la durée initiale, contactez-nous au plus vite au 06 35 58 58 23."}, {"q": "Le tarif inclut-il les péages, le carburant et l'attente ?", "a": "Oui, le tarif ferme annoncé inclut les péages, le carburant, la mise à disposition du véhicule et l'attente pendant la durée convenue. Vous ne payez rien de plus que le prix convenu."}, {"q": "Peut-on réserver une mise à disposition pour un mariage ou un événement ?", "a": "Oui, c'est l'une de nos prestations les plus demandées. Pour un mariage ou un événement, précisez-le dans votre demande : nous adaptons la formule, le véhicule et la décoration à votre cérémonie."}];
const services = [
  { icon: Car, title: "Long trajet VTC Toulouse", to: "/long-trajet-vtc-toulouse" },
  { icon: Plane, title: "Transfert aéroport Toulouse-Blagnac", to: "/vtc-aeroport-toulouse-blagnac" },
  { icon: Briefcase, title: "Déplacements professionnels", to: "/chauffeur-vtc-entreprise-toulouse" },
] as const;

export const Route = createFileRoute("/mise-a-disposition-chauffeur-toulouse")({
  head: () => ({
    meta: [
      { title: TITLE }, { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" }, { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://edendrive-vtc.fr/share/disposal.jpg" },
      { name: "twitter:image", content: "https://edendrive-vtc.fr/share/disposal.jpg" },
      { name: "twitter:title", content: TITLE }, { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service", name: "Mise à disposition d'un chauffeur privé à Toulouse", url: URL,
        description: DESCRIPTION, serviceType: "Mise à disposition d'un chauffeur privé à tarif ferme",
        provider: { "@type": "LocalBusiness", "@id": "https://edendrive-vtc.fr/#business", name: "EDEN DRIVE VTC", telephone: "+33635585823" },
        areaServed: ["Toulouse", "Occitanie"].map(name => ({ "@type": "Place", name })),
        offers: { "@type": "Offer", description: "Tarif ferme annoncé à l'avance", priceCurrency: "EUR" },
      }) },
      { type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(FAQ)) },
    ],
  }),
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(googleReviewsQueryOptions()); },
  component: DisposalPage,
});

const cta = "btn-silver h-auto whitespace-normal rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest";
function DisposalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-silver/15 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/" aria-label="EDEN DRIVE VTC — Accueil"><img src="/logo.png" alt="EDEN DRIVE VTC" className="h-16 w-auto object-contain" /></Link>
          <nav className="flex items-center gap-6" aria-label="Navigation principale">
            <a href="#contact" className="hidden text-sm text-silver md:block">Réservation</a>
            <a href="#services" className="hidden text-sm text-silver md:block">Prestations</a>
            <Button asChild className={`${cta} hidden md:inline-flex`}><a href="tel:+33635585823"><Phone />06 35 58 58 23</a></Button>
            <Button asChild className="btn-silver h-10 w-10 rounded-full md:hidden"><a href="tel:+33635585823" aria-label="Appeler EDEN DRIVE VTC"><Phone /></a></Button>
          </nav>
        </div>
      </header>
      <main>
        <section id="top" className="relative isolate flex min-h-[650px] scroll-mt-28 items-end overflow-hidden md:min-h-[720px]">
          <img src={heroPhoto} alt="Chauffeur privé en attente devant une berline noire premium, place du Capitole à Toulouse" width={1152} height={768} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 md:pb-20">
            <div className="max-w-3xl motion-safe:animate-fade-up">
              <p className="mb-5 text-sm uppercase tracking-widest text-silver">EDEN DRIVE VTC</p>
              <h1 className="font-display text-4xl leading-tight tracking-normal text-ivory sm:text-5xl md:text-6xl">Mise à disposition d'un chauffeur privé à Toulouse</h1>
              <div className="hairline my-6 w-40" />
              <p className="max-w-2xl text-base leading-relaxed text-ivory/90 sm:text-lg">Votre chauffeur à l'heure ou à la journée, à votre entière disposition. Déplacements multiples, rendez-vous, visites, shopping, tourisme : un véhicule premium et un chauffeur dédié, sans contrainte d'horaire.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className={cta}><a href="#contact"><Phone />Nous contacter</a></Button>
                <Button asChild className={cta}><a href="tel:+33635585823"><Phone />06 35 58 58 23</a></Button>
              </div>
            </div>
          </div>
        </section>
<Band title="Un chauffeur dédié, à votre rythme" narrow><p>La mise à disposition, c'est la liberté totale. Contrairement à un trajet simple, votre chauffeur reste avec vous pendant toute la durée convenue : il vous dépose, vous attend, vous reprend, et vous conduit où vous le souhaitez, quand vous le souhaitez.</p><p>EDEN DRIVE VTC met à votre disposition un chauffeur privé et un véhicule premium à l'heure ou à la journée, à Toulouse et dans toute l'Occitanie. Idéal pour une journée de rendez-vous, une visite touristique, une séance de shopping, un mariage, un salon professionnel ou tout programme sur mesure.</p><p>Chaque mise à disposition est sur réservation, avec un tarif ferme et transparent communiqué avant la prestation. Aucune surprise, aucune attente facturée à la minute.</p></Band>
<Band title="Pour qui et pour quoi ?"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><article className="luxe-card rounded-2xl p-7"><Briefcase className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">Journée de rendez-vous professionnels</h3><p className="mt-3 text-sm leading-relaxed">Votre chauffeur vous conduit de rendez-vous en rendez-vous, vous attend, gère les imprévus. Vous ne pensez qu'à vos affaires.</p></article><article className="luxe-card rounded-2xl p-7"><MapPin className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">Visite touristique de Toulouse et sa région</h3><p className="mt-3 text-sm leading-relaxed">Capitole, basilique Saint-Sernin, Cité de l'espace, canal du Midi : votre chauffeur connaît la ville et adapte le parcours à vos envies.</p></article><article className="luxe-card rounded-2xl p-7"><ShoppingBag className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">Shopping et loisirs</h3><p className="mt-3 text-sm leading-relaxed">Une journée de boutiques, un passage chez le coiffeur, un déjeuner en ville : votre chauffeur vous dépose et vous reprend à chaque étape.</p></article><article className="luxe-card rounded-2xl p-7"><Heart className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">Événement privé ou familial</h3><p className="mt-3 text-sm leading-relaxed">Mariage, anniversaire, baptême, réception : un chauffeur dédié pour vous et vos proches, du début à la fin de la journée.</p></article><article className="luxe-card rounded-2xl p-7"><Users className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">Mise à disposition pour un séminaire ou un salon</h3><p className="mt-3 text-sm leading-relaxed">Vos équipes, vos invités, vos intervenants : un service de transport continu, coordonné, sans attente.</p></article><article className="luxe-card rounded-2xl p-7"><ShieldCheck className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">Programme VIP sur mesure</h3><p className="mt-3 text-sm leading-relaxed">Personnalités, artistes, protocole spécifique : un chauffeur formé à la confidentialité, un véhicule discret, une organisation millimétrée.</p></article></div></Band>
<Band title="Comment fonctionne la mise à disposition ?" narrow><ol className="space-y-6"><li className="flex gap-5 border-b border-border pb-6"><span className="font-display text-4xl text-silver-deep">01</span><p className="pt-2">Vous nous indiquez la date, l'heure de prise en charge, la durée souhaitée (à l'heure ou à la journée) et votre programme.</p></li><li className="flex gap-5 border-b border-border pb-6"><span className="font-display text-4xl text-silver-deep">02</span><p className="pt-2">Nous vous communiquons un tarif ferme, adapté à la durée et au véhicule.</p></li><li className="flex gap-5 border-b border-border pb-6"><span className="font-display text-4xl text-silver-deep">03</span><p className="pt-2">Votre chauffeur vous prend en charge à l'adresse convenue, à l'heure exacte.</p></li><li className="flex gap-5 border-b border-border pb-6"><span className="font-display text-4xl text-silver-deep">04</span><p className="pt-2">Il reste à votre disposition pendant toute la durée convenue : il vous attend, vous reprend, s'adapte à votre rythme.</p></li><li className="flex gap-5 border-b border-border pb-6"><span className="font-display text-4xl text-silver-deep">05</span><p className="pt-2">À la fin de la prestation, il vous dépose à l'adresse de votre choix.</p></li></ol></Band>
<Band title="Nos formules de mise à disposition"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><article className="luxe-card rounded-2xl p-7"><Clock className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">À l'heure</h3><p className="mt-3 text-sm leading-relaxed">Idéal pour quelques heures : rendez-vous, déjeuner, shopping. Tarif ferme par heure, chauffeur dédié.</p></article><article className="luxe-card rounded-2xl p-7"><Calendar className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">À la demi-journée</h3><p className="mt-3 text-sm leading-relaxed">Parfait pour une matinée de rendez-vous ou une visite. Chauffeur dédié sur 4 à 5 heures.</p></article><article className="luxe-card rounded-2xl p-7"><Car className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">À la journée</h3><p className="mt-3 text-sm leading-relaxed">La formule complète pour un programme chargé, un mariage, un événement. Chauffeur dédié du matin au soir, jusqu'à 10 heures.</p></article></div><p className="text-center">Chaque formule est personnalisable. Renseignez votre demande dans le formulaire pour obtenir votre devis personnalisé.</p></Band>
<Band title="Pourquoi choisir EDEN DRIVE VTC pour une mise à disposition ?"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><article className="luxe-card rounded-2xl p-7"><ShieldCheck className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">Un chauffeur dédié, rien que pour vous</h3><p className="mt-3 text-sm leading-relaxed">Votre chauffeur reste avec vous pendant toute la durée de la prestation. Pas de relais, pas d'attente, pas d'inconnu.</p></article><article className="luxe-card rounded-2xl p-7"><BadgeCheck className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">Un tarif ferme, annoncé à l'avance</h3><p className="mt-3 text-sm leading-relaxed">Le prix est calculé et confirmé avant la prestation, selon la durée et le véhicule choisi. Pas de compteur, pas de supplément caché.</p></article><article className="luxe-card rounded-2xl p-7"><Car className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">Un confort d'exception</h3><p className="mt-3 text-sm leading-relaxed">Berline premium, climatisation, sièges confortables, eau fraîche à bord, chargeurs à disposition. Même une longue journée reste agréable.</p></article><article className="luxe-card rounded-2xl p-7"><Sparkles className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">Une flexibilité totale</h3><p className="mt-3 text-sm leading-relaxed">Votre programme change ? Un rendez-vous se prolonge ? Votre chauffeur s'adapte, sans stress et sans surcoût caché.</p></article><article className="luxe-card rounded-2xl p-7"><Clock className="h-6 w-6 text-silver-deep" strokeWidth={1.4} /><h3 className="mt-5 font-display text-2xl tracking-normal text-foreground">Disponible 24h/24, 7j/7</h3><p className="mt-3 text-sm leading-relaxed">Journée, soirée, week-end, jour férié : nous nous adaptons à votre agenda.</p></article></div></Band>
<DisposalContact />
        <section id="contact-rapide" className="scroll-mt-28 border-t border-border/40 bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <p className="text-muted-foreground">Disponible 24h/24, 7j/7. Réponse immédiate par téléphone ou WhatsApp.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className={cta}><a href="tel:+33635585823"><Phone />06 35 58 58 23</a></Button>
              <Button asChild className={cta}><a href="https://wa.me/33635585823" target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a></Button>
            </div>
          </div>
        </section>
        <FaqSection items={FAQ} title="Questions fréquentes sur la mise à disposition" />
        <LongJourneyReviews selection={[0, 3, 2]} />
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
const WA_ICON = "M16.001 3.2C8.937 3.2 3.2 8.937 3.2 16c0 2.257.594 4.457 1.723 6.397L3.2 28.8l6.55-1.7A12.77 12.77 0 0 0 16.001 28.8C23.064 28.8 28.8 23.063 28.8 16S23.064 3.2 16.001 3.2zm0 23.36a10.53 10.53 0 0 1-5.365-1.467l-.384-.228-3.887 1.009 1.037-3.788-.25-.39A10.53 10.53 0 0 1 5.44 16c0-5.822 4.738-10.56 10.561-10.56 5.822 0 10.56 4.738 10.56 10.56 0 5.822-4.738 10.56-10.56 10.56zm5.79-7.905c-.317-.159-1.876-.926-2.167-1.032-.291-.106-.503-.159-.715.159-.212.317-.82 1.032-1.005 1.244-.185.212-.371.238-.688.079-.317-.159-1.339-.494-2.55-1.574-.943-.841-1.58-1.88-1.765-2.197-.185-.317-.02-.489.139-.647.143-.142.317-.371.476-.556.159-.185.212-.317.317-.529.106-.212.053-.397-.027-.556-.079-.159-.715-1.723-.98-2.36-.258-.62-.52-.536-.715-.546l-.609-.011c-.212 0-.556.079-.847.397-.291.317-1.111 1.085-1.111 2.65 0 1.564 1.137 3.076 1.296 3.288.159.212 2.239 3.418 5.424 4.792.759.328 1.35.523 1.812.669.761.242 1.454.208 2.001.126.611-.091 1.876-.767 2.141-1.508.265-.741.265-1.376.185-1.508-.079-.132-.291-.212-.608-.371z";

function DisposalContact() {
  const card = "luxe-card flex flex-col items-center rounded-2xl p-7 text-center";
  const head = "mt-5 font-display text-2xl tracking-normal text-foreground";
  const sub = "mt-4 text-sm leading-relaxed text-muted-foreground";
  return (
    <section id="contact" className="section-light scroll-mt-28 border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="text-center font-display text-4xl leading-tight tracking-normal sm:text-5xl">Réservez votre mise à disposition</h2>
        <div className="hairline mx-auto my-6 w-24" />
        <p className="mx-auto max-w-3xl text-center leading-relaxed text-muted-foreground">La mise à disposition est une prestation sur mesure. Pour obtenir votre tarif ferme et organiser votre programme, contactez-nous directement par téléphone, WhatsApp ou email. Réponse immédiate, 24h/24 et 7j/7.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <article className={card}>
            <Phone className="h-7 w-7 text-silver-deep" strokeWidth={1.4} />
            <h3 className={head}>Par téléphone</h3>
            <a href="tel:0635585823" className="mt-4 font-display text-3xl text-foreground underline-offset-4 hover:underline">06 35 58 58 23</a>
            <p className={sub}>Disponible 24h/24, 7j/7. Réponse immédiate.</p>
          </article>
          <article className={card}>
            <svg viewBox="0 0 32 32" className="h-7 w-7 fill-silver-deep" aria-hidden="true"><path d={WA_ICON} /></svg>
            <h3 className={head}>Par WhatsApp</h3>
            <Button asChild className={`${cta} mt-4 w-full`}><a href="https://wa.me/33635585823" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 32 32" className="fill-current" aria-hidden="true"><path d={WA_ICON} /></svg>Discuter sur WhatsApp</a></Button>
            <p className={sub}>Réponse immédiate par message.</p>
          </article>
          <article className={card}>
            <Mail className="h-7 w-7 text-silver-deep" strokeWidth={1.4} />
            <h3 className={head}>Par email</h3>
            <a href="mailto:edendrivevtc@gmail.com" className="mt-4 break-all text-lg font-medium text-foreground underline-offset-4 hover:underline">edendrivevtc@gmail.com</a>
            <p className={sub}>Réponse sous quelques heures.</p>
          </article>
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center leading-relaxed text-muted-foreground">Précisez-nous la date, l'heure de prise en charge, la durée souhaitée et votre programme : nous vous répondons avec un tarif ferme et une proposition adaptée.</p>
      </div>
    </section>
  );
}
