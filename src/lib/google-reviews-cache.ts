export type GoogleReviewsStats = { rating: number; userRatingCount: number };

export function parseGoogleReviewsStats(value: unknown): GoogleReviewsStats | null {
  if (!value || typeof value !== "object") return null;
  const row = value as { rating?: unknown; userRatingCount?: unknown };
  if (
    typeof row.rating !== "number" || !Number.isFinite(row.rating) || row.rating < 0 || row.rating > 5 ||
    typeof row.userRatingCount !== "number" || !Number.isSafeInteger(row.userRatingCount) || row.userRatingCount < 0
  ) return null;
  return { rating: row.rating, userRatingCount: row.userRatingCount };
}

export async function refreshClaimedGoogleReviews(
  store: {
    claim: () => Promise<string | null>;
    complete: (token: string, stats: GoogleReviewsStats) => Promise<void>;
  },
  fetchStats: () => Promise<unknown>,
): Promise<"updated" | "not-due"> {
  const token = await store.claim();
  if (!token) return "not-due";
  // The database already reserved the next 24 hours. Never release on failure.
  const stats = parseGoogleReviewsStats(await fetchStats());
  if (!stats) throw new Error("Google reviews response is invalid");
  await store.complete(token, stats);
  return "updated";
}