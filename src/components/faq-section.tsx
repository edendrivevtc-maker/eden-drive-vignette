import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

type Props = {
  items: FaqItem[];
  eyebrow?: string;
  title?: React.ReactNode;
  id?: string;
};

export function FaqSection({
  items,
  eyebrow = "Questions fréquentes",
  title,
  id = "faq",
}: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id={id} className="relative border-t border-border/40 bg-onyx py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">{eyebrow}</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            {title ?? (
              <>
                <em className="text-silver-gradient not-italic">FAQ</em>
              </>
            )}
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
        </div>
        <div className="mt-10 space-y-3">
          {items.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={item.q} className="luxe-card rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="font-display text-lg text-ivory">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-silver transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
