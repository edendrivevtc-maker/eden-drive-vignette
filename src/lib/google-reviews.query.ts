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
    // Rafraîchissement automatique : données considérées fraîches 6 h,
    // puis re-fetch au chargement de page suivant.
    staleTime: 6 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnMount: true,
  });
