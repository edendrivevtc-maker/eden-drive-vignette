import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Politique de confidentialité — EDEN DRIVE VTC";
const DESCRIPTION =
  "Politique de confidentialité et de protection des données personnelles du site EURL EDEN DRIVE VTC.";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://edendrive-vtc.fr/politique-confidentialite" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://edendrive-vtc.fr/share/logo.jpg" },
      { name: "twitter:image", content: "https://edendrive-vtc.fr/share/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://edendrive-vtc.fr/politique-confidentialite" }],
  }),
  component: PolitiqueConfidentialite,
});

function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LegalHeader />
      <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <span className="text-xs uppercase tracking-[0.3em] text-silver">Vie privée</span>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Politique de <em className="text-silver-gradient not-italic">confidentialité</em>
        </h1>
        <div className="hairline my-6 w-24" />
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Dernière mise à jour : 6 novembre 2026
        </p>

        <div className="mt-10 space-y-12 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section>
            <p>
              EURL EDEN DRIVE VTC accorde une importance particulière à la protection des données
              personnelles de ses clients et visiteurs.
            </p>
            <p className="mt-4">
              La présente politique explique quelles informations sont collectées via le site{" "}
              <a href="https://edendrive-vtc.fr" className="text-silver hover:underline">
                https://edendrive-vtc.fr
              </a>
              , pourquoi elles sont utilisées et quels sont vos droits.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">1. Responsable du traitement des données</h2>
            <div className="hairline my-4 w-16" />
            <p>Le responsable du traitement des données personnelles collectées sur ce site est :</p>
            <p className="mt-4">
              <strong className="text-ivory">EURL EDEN DRIVE VTC</strong><br />
              3 rue Suzanne Valadon<br />
              31850 Montrabé<br />
              France
            </p>
            <p className="mt-4"><span className="text-ivory">Contact :</span></p>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="mailto:edendrivevtc@gmail.com" className="text-silver hover:underline">
                  edendrivevtc@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+33635585823" className="text-silver hover:underline">
                  06 35 58 58 23
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">2. Données collectées</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Lorsque vous utilisez le formulaire d'estimation et de réservation, les informations
              suivantes peuvent être collectées :
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>Nom et prénom ;</li>
              <li>Numéro de téléphone ;</li>
              <li>Adresse e-mail ;</li>
              <li>Adresse de départ ;</li>
              <li>Adresse d'arrivée ;</li>
              <li>Date de la course ;</li>
              <li>Heure de prise en charge ;</li>
              <li>Nombre de passagers ;</li>
              <li>Nombre de bagages ;</li>
              <li>Distance, durée estimée et montant calculé du devis, y compris les péages éventuels ;</li>
              <li>Informations complémentaires éventuellement renseignées dans le message.</li>
            </ul>
            <p className="mt-4">
              Les champs signalés par un astérisque sont obligatoires pour établir votre devis et
              organiser votre transport ; sans eux, le formulaire ne peut pas être validé. Le message
              complémentaire est facultatif. Évitez d'y indiquer des données sensibles non nécessaires
              à la prestation.
            </p>
            <p className="mt-4">
              Pendant la saisie d'une adresse, les fragments saisis et un identifiant temporaire de
              session sont transmis à Google Places via le serveur du site pour proposer des adresses.
              Cet identifiant est conservé en mémoire pendant l'interaction, sans cookie persistant.
              Lors de la sélection, l'identifiant du lieu est utilisé pour obtenir son adresse complète.
              Aucune géolocalisation de votre appareil n'est demandée par cette fonctionnalité.
            </p>
            <p className="mt-4">
              L'hébergement et les services techniques peuvent traiter l'adresse IP, les informations
              de requête et de navigateur, les dates d'accès et les erreurs, pour servir et sécuriser
              le site. Le contenu exact des journaux et leurs paramètres de conservation doivent être
              confirmés par l'administrateur auprès des prestataires.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">3. Finalités et bases légales</h2>
            <div className="hairline my-4 w-16" />
            <p>Les traitements sont distingués selon leur finalité :</p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li><strong>Demandes de devis :</strong> rechercher les adresses, calculer l'itinéraire et
                le prix, répondre à votre demande. La base légale est l'exécution de mesures
                précontractuelles à votre demande (article 6.1.b du RGPD). Une estimation réussie
                déclenche déjà l'envoi des informations du formulaire et du devis à l'exploitant par
                e-mail, même si vous ne cliquez pas ensuite sur « Réserver ».</li>
              <li><strong>Réservations et prestations confirmées :</strong> traiter la demande,
                organiser et assurer le transport, transmettre les confirmations, le bon de commande
                et échanger avec vous. La base légale est l'exécution du contrat et des mesures
                précontractuelles (article 6.1.b). Le clic sur « Réserver » déclenche les e-mails de
                demande et de confirmation de prise en compte ; il ne constitue pas un paiement.</li>
              <li><strong>Facturation et obligations comptables :</strong> établir et conserver les
                pièces nécessaires aux obligations légales de l'entreprise, sur le fondement de
                l'article 6.1.c. Le formulaire du site ne réalise pas de paiement en ligne.</li>
              <li><strong>Fonctionnement, sécurité et présentation :</strong> fournir un site fiable,
                prévenir les incidents et afficher les statistiques publiques d'avis Google.
                Ces traitements reposent sur l'intérêt légitime de l'entreprise (article 6.1.f),
                sous réserve de nécessité, de proportionnalité et de vos droits.</li>
            </ul>
            <p className="mt-4">
              Les données ne sont pas utilisées à des fins publicitaires et ne sont pas vendues ou
              louées à des tiers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">4. Conservation des données</h2>
            <div className="hairline my-4 w-16" />
            <p>
              La conservation dépend de la finalité et de la nature du document. Aucune durée générale
              unique n'est appliquée à l'ensemble des données dans la présente politique.
            </p>
            <p className="mt-4">
              <strong>Devis sans réservation :</strong> les données sont nécessaires au traitement et
              au suivi de la demande. La durée effective après clôture, le point de départ et les règles
              de suppression dans la messagerie et chez Brevo restent à confirmer par l'administrateur.
            </p>
            <p className="mt-4">
              <strong>Réservations confirmées :</strong> les données utiles sont conservées pour
              l'exécution et le suivi de la prestation. Un archivage limité peut être nécessaire pour
              les obligations légales et la défense des droits. Les durées applicables à chaque type
              de document et les modalités d'accès aux archives doivent être validées par
              l'administrateur ; elles ne justifient pas de conserver indéfiniment tous les champs.
            </p>
            <p className="mt-4">
              <strong>Facturation et comptabilité :</strong> les livres et pièces justificatives
              comptables sont soumis à une conservation légale de dix ans (article L.123-22 du Code
              de commerce). L'administrateur doit confirmer le classement des documents concernés,
              le point de départ applicable et la mise en œuvre de l'archivage. Cette obligation
              n'étend pas automatiquement cette durée à toutes les demandes de devis.
            </p>
            <p className="mt-4">
              <strong>Données techniques :</strong> les durées des journaux d'accès, de sécurité et
              d'envoi d'e-mails, des sauvegardes et des éventuelles sessions techniques dépendent des
              réglages des prestataires ; elles restent à vérifier et à documenter. Les statistiques
              publiques d'avis sont mises en cache six heures sur le serveur, sans historique de
              navigation individuel associé dans cette fonctionnalité.
            </p>
            <p className="mt-4">
              Les règles de suppression ou d'anonymisation à l'échéance et leur application chez les
              prestataires doivent être confirmées. Les mentions « à confirmer » signalent les points
              non encore vérifiés, et ne constituent ni une durée de conservation ni une garantie de
              suppression automatique.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">5. Destinataires et services utilisés</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Les informations du formulaire sont traitées par le serveur du site, puis envoyées
              via Brevo à la messagerie professionnelle de l'exploitant :
            </p>
            <p className="mt-4">
              <a href="mailto:edendrivevtc@gmail.com" className="text-silver hover:underline">
                edendrivevtc@gmail.com
              </a>
            </p>
            <p className="mt-4">
              Le parcours actuel n'enregistre pas les demandes dans une base de données dédiée du
              site. Elles sont néanmoins traitées dans les e-mails, leurs pièces jointes et les
              services techniques nécessaires à leur transmission.
            </p>
            <p className="mt-4">
              Les personnes habilitées d'EDEN DRIVE VTC et, lorsque nécessaire, les prestataires
              participant à la prestation ou aux obligations comptables accèdent aux seules données
              utiles à leur mission. Les services externes suivants interviennent :
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li><strong>Google Places :</strong> reçoit les fragments d'adresse, l'identifiant
                temporaire de session et les identifiants de lieux pour l'autocomplétion et la
                résolution d'adresse, par des appels serveur. La zone de recherche est orientée
                autour de Toulouse ; ce n'est pas la position de votre appareil.</li>
              <li><strong>Google Routes :</strong> reçoit les adresses de départ et d'arrivée et,
                selon le calcul, l'heure de départ pour déterminer distance, durée et péages.
                Le nom, le téléphone, l'e-mail et le message du formulaire ne sont pas inclus dans
                la requête d'itinéraire examinée.</li>
              <li><strong>Avis Google :</strong> le serveur récupère la note et le nombre d'avis
                publics de l'établissement via Google Places. Aucun profil de navigation du
                visiteur n'est envoyé par cette fonctionnalité.</li>
              <li><strong>Google Fonts :</strong> les polices Inter et Cormorant Garamond sont
                désormais servies localement par le site. Leur affichage ne nécessite plus de
                connexion du navigateur aux serveurs Google Fonts. Auparavant, leur chargement
                externe transmettait notamment l'adresse IP et les informations de connexion à
                Google ; il ne s'agissait pas d'un outil publicitaire ajouté par le site.</li>
              <li><strong>Brevo :</strong> assure l'envoi des notifications de devis, des demandes de
                réservation et de la confirmation client. Il traite les destinataires, les
                informations incluses dans les e-mails et, pour le bon de commande, les pièces
                jointes PDF et calendrier. Aucun script de suivi Brevo n'est intégré à la page.
                Les réglages éventuels de suivi d'ouverture ou de clic dans les e-mails restent à
                confirmer ; leur absence n'est pas garantie par cette politique.</li>
              <li><strong>Google / Gmail et Agenda :</strong> la messagerie professionnelle reçoit
                les demandes et leurs pièces jointes. Le lien « Ajouter à Google Agenda » de
                l'e-mail exploitant transmet, lorsqu'il est ouvert, les informations de l'événement
                et de la course dans l'URL. Les données utiles peuvent alors être traitées dans
                l'agenda de l'exploitant.</li>
              <li><strong>Cloudflare et services techniques d'hébergement :</strong> servent et
                sécurisent le site et peuvent traiter les données de connexion et d'erreur.
                Selon la configuration d'hébergement, les services Lovable peuvent intervenir
                comme intermédiaire serveur pour les appels Google, pour une session technique
                existante ou pour un signalement d'erreur conditionnel. Leur activation effective,
                leurs rôles et leurs paramètres doivent être confirmés par l'administrateur.</li>
            </ul>
            <p className="mt-4">
              Les boutons WhatsApp et les liens vers Google sont de simples liens sortants, non des
              widgets chargés automatiquement. Lorsque vous les ouvrez, le service concerné applique
              sa propre politique de confidentialité.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">6. Transferts hors Union européenne</h2>
            <div className="hairline my-4 w-16" />
            <p>
              L'utilisation de Google, Cloudflare, Brevo et des éventuels intermédiaires techniques
              peut impliquer un traitement ou un accès aux données hors de l'Union européenne.
              Le pays du siège d'un prestataire ne permet pas à lui seul de déterminer les lieux de
              traitement. Les pays, sous-traitants et accès réellement concernés doivent être
              confirmés pour les comptes et services utilisés.
            </p>
            <p className="mt-4">
              Tout transfert concerné doit reposer sur un mécanisme applicable du chapitre V du RGPD :
              décision d'adéquation, y compris le cadre UE–États-Unis uniquement pour une entité
              certifiée et un service couvert, ou garanties appropriées telles que les clauses
              contractuelles types de la Commission européenne, avec évaluation et mesures
              complémentaires si nécessaires. Ces mécanismes sont indiqués comme exigences,
              et non comme des garanties contractuelles déjà vérifiées pour chaque prestataire.
            </p>
            <p className="mt-4">
              L'administrateur doit vérifier les contrats, les accords de traitement des données,
              les lieux de traitement et les garanties effectivement applicables. Vous pouvez
              demander des précisions et les informations disponibles sur ces garanties à
              edendrivevtc@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">7. Cookies et outils de suivi</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Le site{" "}
              <a href="https://edendrive-vtc.fr" className="text-silver hover:underline">
                https://edendrive-vtc.fr
              </a>{" "}
              n'utilise pas d'outil d'analyse d'audience ou de suivi publicitaire tel que Google
              Analytics, Meta Pixel ou outils similaires.
            </p>
            <p className="mt-4">
              L'audit du 6 novembre 2026 n'a observé aucun cookie ni stockage publicitaire ou de
              suivi à l'arrivée sur les pages publiques. Aucun Google Ads, Google Tag Manager ou
              outil de mesure d'audience n'est intégré dans le code contrôlé.
            </p>
            <p className="mt-4">
              Des éléments techniques nécessaires au fonctionnement du site peuvent toutefois être
              utilisés par les services d'hébergement afin d'assurer la sécurité et le bon
              fonctionnement du site.
            </p>
            <p className="mt-4">
              Une session d'authentification technique existante peut utiliser le stockage local ;
              aucune session n'a été créée lors des visites anonymes contrôlées. Les appels Google
              Places et Routes sont effectués côté serveur, sans chargement d'un widget cartographique
              Google dans le navigateur. Aucun bandeau de consentement n'est actuellement affiché,
              aucun traceur non exempté n'ayant été identifié dans ce périmètre. Tout ajout de
              traceur non strictement nécessaire devra faire l'objet d'une information et du
              consentement préalable requis, avec possibilité de refus et de retrait.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">8. Vos droits</h2>
            <div className="hairline my-4 w-16" />
            <p>
              Conformément à la réglementation applicable sur la protection des données
              personnelles, vous disposez des droits suivants :
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>droit d'accès à vos données ;</li>
              <li>droit de rectification des informations inexactes ;</li>
              <li>droit à l'effacement de vos données ;</li>
              <li>droit de limitation du traitement ;</li>
              <li>droit d'opposition aux traitements fondés sur l'intérêt légitime, selon votre situation ;</li>
              <li>droit à la portabilité pour les données fournies, lorsque le traitement automatisé
                est fondé sur le contrat ou le consentement ;</li>
              <li>droit de retirer votre consentement à tout moment si un traitement en dépend,
                sans remettre en cause la licéité du traitement antérieur.</li>
            </ul>
            <p className="mt-4">Pour exercer vos droits, vous pouvez contacter :</p>
            <p className="mt-4">
              <strong className="text-ivory">EURL EDEN DRIVE VTC</strong><br />
              E-mail :{" "}
              <a href="mailto:edendrivevtc@gmail.com" className="text-silver hover:underline">
                edendrivevtc@gmail.com
              </a>
              <br />
              Téléphone :{" "}
              <a href="tel:+33635585823" className="text-silver hover:underline">
                06 35 58 58 23
              </a>
            </p>
            <p className="mt-4">
              Une réponse vous sera apportée en principe dans un délai d'un mois à compter de la
              réception de la demande. En cas de complexité ou de demandes nombreuses, ce délai
              peut être prolongé de deux mois ; vous serez informé des motifs dans le premier mois.
              Une vérification proportionnée de votre identité peut être demandée en cas de doute.
              Certains droits peuvent être limités par les obligations légales de conservation.
            </p>
            <p className="mt-4">
              Vous pouvez également adresser une réclamation à la{" "}
              <a href="https://www.cnil.fr/fr/adresser-une-plainte" className="text-silver hover:underline">
                Commission nationale de l'informatique et des libertés (CNIL)
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">9. Sécurité des données</h2>
            <div className="hairline my-4 w-16" />
            <p>
              EURL EDEN DRIVE VTC met en œuvre des mesures raisonnables afin de protéger les
              informations transmises contre toute perte, utilisation abusive ou accès non
              autorisé.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ivory">10. Modification de la politique de confidentialité</h2>
            <div className="hairline my-4 w-16" />
            <p>
              EURL EDEN DRIVE VTC se réserve le droit de modifier la présente politique afin de
              tenir compte des évolutions légales, techniques ou organisationnelles.
            </p>
            <p className="mt-4">
              La version applicable est celle publiée sur le site au moment de votre consultation.
            </p>
          </section>
        </div>

        <div className="mt-16">
          <Link
            to="/"
            className="btn-silver inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium uppercase tracking-widest"
          >
            Retour à l'accueil
          </Link>
        </div>
      </main>
    </div>
  );
}

function LegalHeader() {
  return (
    <header className="border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" aria-label="EDEN DRIVE VTC - Accueil" className="inline-flex items-center">
          <img src="/logo.png" alt="EDEN DRIVE VTC" className="h-12 w-auto object-contain" />
        </Link>
        <Link
          to="/"
          className="text-sm text-muted-foreground transition-colors hover:text-silver"
        >
          Accueil
        </Link>
      </div>
    </header>
  );
}
