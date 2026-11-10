import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { observeMarketingConsent } from "@/lib/cookiebot-consent";

export function GoogleReviewsConsent({ children }: { children: ReactNode }) {
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => observeMarketingConsent(window, setMarketingConsent), []);

  if (!marketingConsent) {
    return (
      <div className="mx-auto mt-12 max-w-xl border border-border bg-card p-8 text-center text-card-foreground">
        <p className="mb-5 text-sm text-muted-foreground">
          Les avis Google sont masqués sans votre consentement marketing.
        </p>
        <Button type="button" onClick={() => window.Cookiebot?.renew()} className="btn-silver h-auto whitespace-normal px-6 py-4">
          Voir nos avis Google
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}