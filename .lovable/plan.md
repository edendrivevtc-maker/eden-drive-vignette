# Diagnostic : l'estimation ne s'affiche pas pour certaines clientes

## Ce que j'ai vérifié (sans rien modifier)

**La grille tarifaire est correcte.** Jour (06h–19h) : 2,20 €/km. Nuit, dimanche et jours fériés (19h–06h) : 3 €/km. Minimum 20 €. +20 € au-delà de 4 passagers. Péages ajoutés, puis total arrondi au multiple de 5 supérieur. Aucun bug de calcul, et aucune "prise en charge de 5 €" n'existe dans le code aujourd'hui (c'est l'arrondi à 5 € qui joue ce rôle) — à confirmer si vous voulez la facturer séparément.

**Le calcul d'itinéraire Google fonctionne.** J'ai lancé un vrai calcul Aéroport Blagnac → Gare Matabiau : réponse correcte (8,5 km, 20 min). L'accès Google côté serveur est donc opérationnel.

**L'estimation fonctionne en aperçu.** Formulaire rempli, clic sur « Estimer mon trajet » : le tarif et le bouton « Réserver » apparaissent bien.

## Les 4 causes identifiées, par ordre de gravité

**1. La version en ligne n'est pas la version actuelle du site.**
Sur l'adresse publiée, le formulaire n'a qu'un bouton « Demander un devis » : pas de champ bagages, pas d'estimation, pas de bouton « Réserver ». La publication est très en retard sur le code actuel. Selon la version que vos clientes ont utilisée, elles peuvent donc tomber sur un formulaire différent de celui que vous testez. C'est l'explication la plus probable du « ça marchait avant, plus maintenant » et du « pour certaines seulement ».

**2. L'autocomplétion d'adresses est cassée depuis le 10 septembre 2026.**
Google a cessé d'autoriser la suggestion d'adresses avec la clé d'affichage de carte utilisée par le site : chaque frappe renvoie une erreur 403 (vérifié en direct). Résultat : plus aucune suggestion, les clientes tapent l'adresse à la main. Une adresse imprécise donne alors soit « Aucun itinéraire trouvé », soit un résultat absurde. Test réel : « 12 rue des Fleurs » → « 5 avenue de la gare » a renvoyé 827 km et 2 485 €. C'est une cause directe d'échec pour certaines clientes et pas pour d'autres, selon ce qu'elles saisissent.

**3. Un clic qui ne fait rien, sans message.**
Si le navigateur juge un champ invalide (date/heure antérieure à maintenant sur iPhone, e-mail mal formé, champ obligatoire vide plus haut dans le formulaire), le bouton s'arrête silencieusement : aucun message, aucune roue de chargement, aucun tarif. La cliente croit avoir cliqué dans le vide. Comportement typiquement mobile/Safari, donc variable d'une personne à l'autre.

**4. L'e-mail de notification bloque l'affichage du prix.**
Au clic sur « Estimer », le site vous envoie un e-mail *avant* de renvoyer le tarif. Si Brevo répond lentement ou ne répond pas, la roue tourne indéfiniment et le prix ne s'affiche jamais, alors que le calcul Google a réussi.

## Corrections proposées (à votre validation)

1. **Publier le site** pour que la version en ligne corresponde au formulaire actuel (aucune modification de code nécessaire).
2. **Rétablir l'autocomplétion d'adresses** en la faisant passer par le serveur du site (méthode désormais recommandée par Google), avec la même liste déroulante qu'aujourd'hui, et exiger une adresse choisie dans la liste plutôt qu'une saisie libre.
3. **Ne plus jamais laisser un clic sans réponse** : afficher un message clair indiquant le champ à corriger, et rendre l'échec visible.
4. **Envoyer l'e-mail de notification en arrière-plan**, après l'affichage du tarif, pour qu'un souci d'e-mail ne bloque plus l'estimation.
5. **Messages d'erreur explicites** quand Google ne trouve pas l'itinéraire ou refuse la requête, avec invitation à préciser l'adresse et le numéro de téléphone pour réserver malgré tout.

## Fichiers concernés

- `src/components/places-autocomplete.tsx` — suggestions d'adresses via le serveur (design inchangé).
- `src/lib/estimate.functions.ts` — nouvelle fonction serveur de suggestions + envoi de l'e-mail d'estimation en arrière-plan.
- `src/components/booking-form.tsx` — messages de validation visibles (champs, design et grille tarifaire inchangés).
- `src/lib/estimate.server.ts` — messages d'erreur plus précis uniquement. **Aucune** modification du calcul de prix.

Non touchés : grille tarifaire, champs du formulaire, design, envoi des demandes par e-mail/Brevo, PDF et calendrier.
