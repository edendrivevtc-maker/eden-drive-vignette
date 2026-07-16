import { createServerFn } from "@tanstack/react-start";

const PLACE_ID = "ChIJNwxPMyNDmSMRqfrpaqAitZY";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

export type GoogleReviewsStats = {
  rating: number;
  userRatingCount: number;
};

let cache: { data: GoogleReviewsStats; expires: number } | null = null;

export const getGoogleReviewsStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsStats> => {
    const now = Date.now();
    if (cache && cache.expires > now) return cache.data;

    const lovableKey = process.env.LOVABLE_API_KEY;
    const gmapsKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!lovableKey || !gmapsKey) {
      return cache?.data ?? { rating: 5, userRatingCount: 50 };
    }

    try {
      const res = await fetch(`${GATEWAY_URL}/places/v1/places/${PLACE_ID}`, {
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": gmapsKey,
          "X-Goog-FieldMask": "rating,userRatingCount",
        },
      });
      if (!res.ok) {
        const body = await res.text();
        console.error(`Google Places request failed [${res.status}]: ${body}`);
        return cache?.data ?? { rating: 5, userRatingCount: 50 };
      }
      const json = (await res.json()) as { rating?: number; userRatingCount?: number };
      const data: GoogleReviewsStats = {
        rating: typeof json.rating === "number" ? json.rating : 5,
        userRatingCount:
          typeof json.userRatingCount === "number" ? json.userRatingCount : 50,
      };
      cache = { data, expires: now + 60 * 60 * 1000 };
      return data;
    } catch (err) {
      console.error("Google Places fetch error:", err);
      return cache?.data ?? { rating: 5, userRatingCount: 50 };
    }
  },
);
