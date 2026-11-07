import { describe, expect, it } from "vitest";
import { parseGoogleReviewsStats, refreshClaimedGoogleReviews } from "./google-reviews-cache";

describe("Google reviews durable refresh protocol", () => {
  it("calls Google only for the winner of a shared claim", async () => {
    let claimed = false;
    let calls = 0;
    const store = {
      claim: async () => { if (claimed) return null; claimed = true; return "winner"; },
      complete: async () => {},
    };
    const results = await Promise.all(Array.from({ length: 20 }, () =>
      refreshClaimedGoogleReviews(store, async () => { calls++; return { rating: 5, userRatingCount: 60 }; }),
    ));
    expect(calls).toBe(1);
    expect(results.filter(value => value === "updated")).toHaveLength(1);
  });

  it("preserves known stats and does not retry after Google fails", async () => {
    let claimed = false;
    let calls = 0;
    let known = { rating: 5, userRatingCount: 60 };
    const store = {
      claim: async () => { if (claimed) return null; claimed = true; return "winner"; },
      complete: async (_token: string, stats: typeof known) => { known = stats; },
    };
    const fetchStats = async () => { calls++; throw new Error("Google unavailable"); };
    await expect(refreshClaimedGoogleReviews(store, fetchStats)).rejects.toThrow("Google unavailable");
    expect(await refreshClaimedGoogleReviews(store, fetchStats)).toBe("not-due");
    expect(calls).toBe(1);
    expect(known).toEqual({ rating: 5, userRatingCount: 60 });
  });

  it("never fabricates data from empty or malformed Google replies", () => {
    expect(parseGoogleReviewsStats({ userRatingCount: 60 })).toBeNull();
    expect(parseGoogleReviewsStats({ rating: 5, userRatingCount: -1 })).toBeNull();
    expect(parseGoogleReviewsStats({ rating: NaN, userRatingCount: 60 })).toBeNull();
    expect(parseGoogleReviewsStats({ rating: 4.9, userRatingCount: 61 })).toEqual({ rating: 4.9, userRatingCount: 61 });
  });
});