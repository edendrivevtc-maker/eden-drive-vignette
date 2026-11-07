import { queryOptions } from "@tanstack/react-query";
import {
  getGoogleReviewsStats,
  type GoogleReviewsStats,
} from "@/lib/google-reviews.functions";

export type { GoogleReviewsStats };

export const googleReviewsQueryOptions = () =>
  queryOptions({
    queryKey: ["google-reviews-stats"],
    queryFn: () => getGoogleReviewsStats(),
    // Browser freshness only; Google refresh is exclusively scheduled and DB-locked.
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnMount: true,
  });
