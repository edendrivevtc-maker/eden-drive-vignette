import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { googleReviewsQueryOptions } from "@/lib/google-reviews.query";

function formatRating(rating: number) {
  const rounded = Math.round(rating * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}/5` : `${rounded.toFixed(1)}/5`;
}

export function GoogleReviewsRating({ className }: { className?: string }) {
  const { data } = useQuery(googleReviewsQueryOptions());
  return (
    <div
      className={
        className ??
        "flex items-center gap-3 font-display text-5xl text-ivory sm:text-6xl"
      }
    >
      <span>{data ? formatRating(data.rating) : "5/5"}</span>
      <Star className="h-8 w-8 fill-silver text-silver" />
    </div>
  );
}

export function GoogleReviewsCount({ className }: { className?: string }) {
  const { data } = useQuery(googleReviewsQueryOptions());
  if (!data) return null;
  return (
    <p className={className ?? "text-sm text-muted-foreground"}>
      {data.userRatingCount} avis vérifiés
    </p>
  );
}
