import { refreshClaimedGoogleReviews } from "./google-reviews-cache";

const PLACE_ID = "ChIJNwxPMyNDmSMRqfrpaqAitZY";

export async function refreshGoogleReviews(credentials: {
  serverKey?: string;
  lovableKey?: string;
  mapsKey?: string;
}) {
  // Called only after the scheduled route has authenticated its server-only secret.
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { serverKey, lovableKey, mapsKey } = credentials;
  if (!serverKey && !(lovableKey && mapsKey)) {
    throw new Error("Google reviews credentials are missing");
  }
  return refreshClaimedGoogleReviews({
    claim: async () => {
      const { data, error } = await supabaseAdmin.rpc("claim_google_reviews_refresh");
      if (error) throw new Error(`Review cache claim failed: ${error.message}`);
      return data;
    },
    complete: async (token, stats) => {
      const { data, error } = await supabaseAdmin.rpc("complete_google_reviews_refresh", {
        p_token: token, p_rating: stats.rating, p_count: stats.userRatingCount,
      });
      if (error || !data) throw new Error(`Review cache save failed: ${error?.message ?? "stale claim"}`);
    },
  }, async () => {
    // Choose ONE provider configuration: no fallback calls or automatic retries.
    const url = serverKey
      ? `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=fr`
      : `https://connector-gateway.lovable.dev/google_maps/places/v1/places/${PLACE_ID}`;
    const headers: Record<string, string> = { "X-Goog-FieldMask": "rating,userRatingCount" };
    if (serverKey) headers["X-Goog-Api-Key"] = serverKey;
    else if (lovableKey && mapsKey) {
      headers.Authorization = `Bearer ${lovableKey}`;
      headers["X-Connection-Api-Key"] = mapsKey;
    }
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(10_000), redirect: "error" });
    if (!response.ok) {
      const body = await response.text();
      console.error(`[google-reviews] Provider failed [${response.status}]: ${body}`);
      throw new Error(`Google reviews provider failed [${response.status}]: ${body}`);
    }
    return response.json();
  });
}