import { createServerFn } from "@tanstack/react-start";

const PLACE_ID = "ChIJNwxPMyNDmSMRqfrpaqAitZY";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";
const PLACES_URL = "https://places.googleapis.com/v1/places";
const FIELD_MASK = "rating,userRatingCount";

export type GoogleReviewsStats = {
  rating: number;
  userRatingCount: number;
};

const DISPLAY_FALLBACK: GoogleReviewsStats = { rating: 5, userRatingCount: 50 };

let cache: { data: GoogleReviewsStats; expires: number } | null = null;

function parseStats(json: unknown): GoogleReviewsStats | null {
  const j = json as { rating?: number; userRatingCount?: number } | null;
  if (!j || typeof j.userRatingCount !== "number") return null;
  return {
    rating: typeof j.rating === "number" ? j.rating : DISPLAY_FALLBACK.rating,
    userRatingCount: j.userRatingCount,
  };
}

export const getGoogleReviewsStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsStats> => {
    const now = Date.now();
    if (cache && cache.expires > now) return cache.data;

    // 1) Clé serveur directe (production Cloudflare) — jamais exposée au client.
    const directKey = process.env.GOOGLE_PLACES_API_KEY ?? process.env.GOOGLE_API_KEY;
    // 2) Fallback connector gateway Lovable (preview).
    const lovableKey = process.env.LOVABLE_API_KEY;
    const gmapsKey = process.env.GOOGLE_MAPS_API_KEY;

    const attempts: Array<{ label: string; url: string; headers: Record<string, string> }> = [];
    if (directKey) {
      attempts.push({
        label: "places-direct",
        url: `${PLACES_URL}/${PLACE_ID}?languageCode=fr`,
        headers: { "X-Goog-Api-Key": directKey, "X-Goog-FieldMask": FIELD_MASK },
      });
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
        "[google-reviews] Aucune clé disponible: définir GOOGLE_API_KEY (Places API New) ou LOVABLE_API_KEY + GOOGLE_MAPS_API_KEY. Affichage du fallback.",
      );
      return cache?.data ?? DISPLAY_FALLBACK;
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
        cache = { data: stats, expires: now + 60 * 60 * 1000 };
        return stats;
      } catch (err) {
        console.error(`[google-reviews] ${attempt.label}: erreur réseau`, err);
      }
    }

    console.error(
      "[google-reviews] Toutes les tentatives Google Places ont échoué — affichage du fallback (50).",
    );
    return cache?.data ?? DISPLAY_FALLBACK;
  },
);
