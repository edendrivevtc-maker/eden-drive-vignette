import { queryOptions } from "@tanstack/react-query";
import {
  getGoogleReviewsStats,
  type GoogleReviewsStats,
} from "@/lib/google-reviews.functions";

export const GOOGLE_REVIEWS_FALLBACK: GoogleReviewsStats = {
  rating: 5,
  userRatingCount: 50,
};

export const googleReviewsQueryOptions = () =>
  queryOptions({
    queryKey: ["google-reviews-stats"],
    queryFn: () => getGoogleReviewsStats(),
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    placeholderData: GOOGLE_REVIEWS_FALLBACK,
  });
