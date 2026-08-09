import { createServerFn } from "@tanstack/react-start";

const PLACE_ID = "ChIJNwxPMyNDmSMRqfrpaqAitZY";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";
const PLACES_URL = "https://places.googleapis.com/v1/places";
const FIELD_MASK = "rating,userRatingCount";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // rafraîchissement automatique (< 24 h)

export type GoogleReviewsStats = {
  rating: number;
  userRatingCount: number;
};

// Dernière valeur réellement obtenue de Google. Aucune valeur codée en dur :
// si Google est injoignable, on renvoie null et l'UI masque le compteur.
let cache: { data: GoogleReviewsStats; expires: number } | null = null;

function parseStats(json: unknown): GoogleReviewsStats | null {
  const j = json as { rating?: number; userRatingCount?: number } | null;
  if (!j || typeof j.userRatingCount !== "number") return null;
  return {
    rating: typeof j.rating === "number" ? j.rating : 5,
    userRatingCount: j.userRatingCount,
  };
}

export const getGoogleReviewsStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsStats | null> => {
    const now = Date.now();
    if (cache && cache.expires > now) return cache.data;

    // 1) Clé serveur dédiée (aucune restriction applicative) — recommandée en production.
    const serverKey = process.env.GOOGLE_PLACES_API_KEY;
    // 2) Clé Google existante (peut échouer si restreinte par référent HTTP).
    const browserKey = process.env.GOOGLE_API_KEY;
    // 3) Passerelle Lovable (aperçu).
    const lovableKey = process.env.LOVABLE_API_KEY;
    const gmapsKey = process.env.GOOGLE_MAPS_API_KEY;

    const attempts: Array<{ label: string; url: string; headers: Record<string, string> }> = [];
    for (const [label, key] of [
      ["places-server-key", serverKey],
      ["places-google-api-key", browserKey],
    ] as const) {
      if (key) {
        attempts.push({
          label,
          url: `${PLACES_URL}/${PLACE_ID}?languageCode=fr`,
          headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": FIELD_MASK },
        });
      }
    }
    if (lovableKey && gmapsKey) {
      attempts.push({
        label: "lovable-gateway",
        url: `${GATEWAY_URL}/places/v1/places/${PLACE_ID}`,
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": gmapsKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
      });
    }

    if (attempts.length === 0) {
      console.error(
        "[google-reviews] Aucune clé disponible: définir GOOGLE_PLACES_API_KEY (Places API New, sans restriction applicative) dans l'environnement serveur.",
      );
      return cache?.data ?? null;
    }

    for (const attempt of attempts) {
      try {
        const res = await fetch(attempt.url, { headers: attempt.headers });
        if (!res.ok) {
          const body = await res.text();
          console.error(
            `[google-reviews] ${attempt.label} a échoué [${res.status}]: ${body.slice(0, 500)}`,
          );
          continue;
        }
        const stats = parseStats(await res.json());
        if (!stats) {
          console.error(
            `[google-reviews] ${attempt.label}: réponse sans userRatingCount exploitable.`,
          );
          continue;
        }
        cache = { data: stats, expires: now + CACHE_TTL_MS };
        return stats;
      } catch (err) {
        console.error(`[google-reviews] ${attempt.label}: erreur réseau`, err);
      }
    }

    console.error("[google-reviews] Toutes les tentatives Google Places ont échoué.");
    return cache?.data ?? null;
  },
);
