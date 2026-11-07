import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { parseGoogleReviewsStats, type GoogleReviewsStats } from "./google-reviews-cache";
export type { GoogleReviewsStats } from "./google-reviews-cache";

export const getGoogleReviewsStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsStats | null> => {
    // External Cloudflare deployments can use the same compiled public connection.
    // Prefer server URLs when supplied (in particular for isolated draft backends).
    const url = process.env.SUPABASE_URL ?? import.meta.env.VITE_SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      console.error("[google-reviews] Shared cache configuration missing");
      return null;
    }
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { data, error } = await client.from("google_reviews_cache")
      .select("rating,user_rating_count")
      .eq("place_id", "ChIJNwxPMyNDmSMRqfrpaqAitZY").maybeSingle();
    if (error) console.error(`[google-reviews] Shared cache read failed: ${error.message}`);
    return data ? parseGoogleReviewsStats({ rating: data.rating, userRatingCount: data.user_rating_count }) : null;
  },
);
