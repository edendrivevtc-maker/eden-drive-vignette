import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertCircle,
  Calculator,
  Calendar,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { PlacesField } from "@/components/places-autocomplete";
import { sendBookingRequest } from "@/lib/booking.functions";
import { estimateRide } from "@/lib/estimate.functions";

export type Quote = {
  distanceKm: number;
  durationMin: number;
  ridePrice: number;
  tolls: number;
  total: number;
};

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="text-silver"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-silver"
      />
    </div>
  );
}

const eur = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function BookingFormSection({
  id = "reserver",
  eyebrow = "Réservation",
  title = <em className="text-silver-gradient not-italic">Réservation en ligne</em>,
  subtitle,
  fromPlaceholder = "Adresse ou aéroport",
  sectionClassName = "section-light relative border-t border-border/40 py-28 sm:py-40",
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  fromPlaceholder?: string;
  sectionClassName?: string;
}) {
  const runEstimate = useServerFn(estimateRide);
  const sendBooking = useServerFn(sendBookingRequest);

  const formRef = useRef<HTMLFormElement>(null);
  const [payload, setPayload] = useState<Record<string, string> | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [status, setStatus] = useState<"idle" | "estimating" | "estimated" | "booking" | "booked">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const readForm = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    return {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      from: String(fd.get("from") ?? ""),
      to: String(fd.get("to") ?? ""),
      datetime: String(fd.get("datetime") ?? ""),
      pax: String(fd.get("pax") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
  };

  const handleEstimate = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (status === "estimating" || status === "booking") return;
    const form = formRef.current;
    if (!form) return;
    if (typeof form.reportValidity === "function" && !form.reportValidity()) return;
    const data = readForm(form);
    setStatus("estimating");
    setError(null);
    try {
      const result = (await runEstimate({ data })) as Quote;
      setQuote(result);
      setPayload(data);
      setStatus("estimated");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  };

  const handleBook = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!payload || status === "booking" || status === "booked") return;
    setStatus("booking");
    setError(null);
    try {
      await sendBooking({ data: { ...payload, quote } });
      setStatus("booked");
    } catch (err) {
      setStatus("estimated");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  };


  return (
    <section id={id} className={sectionClassName}>
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-silver">{eyebrow}</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            {title}
          </h2>
          <div className="hairline mx-auto my-6 w-24" />
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        <form onSubmit={handleEstimate} className="luxe-card mt-10 rounded-2xl p-7 sm:p-10">
          <div className="space-y-5">
            <Field label="Nom complet" name="name" required />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Téléphone" name="phone" type="tel" required />
              <Field label="E-mail" name="email" type="email" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <PlacesField label="Départ" name="from" placeholder={fromPlaceholder} required />
              <PlacesField label="Destination" name="to" required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Date & heure" name="datetime" type="datetime-local" required />
              <Field label="Passagers" name="pax" type="number" placeholder="2" />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                name="message"
                rows={3}
                className="w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-silver"
                placeholder="Précisions, bagages, vol, etc."
              />
            </div>

            <button
              type="submit"
              disabled={status === "estimating"}
              className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest disabled:opacity-70"
            >
              {status === "estimating" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Calculator className="h-4 w-4" />
              )}
              {status === "estimating" ? "Calcul en cours..." : "Estimer mon trajet"}
            </button>

            {quote && (
              <div className="rounded-2xl border border-silver/30 bg-background/60 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-silver">Votre estimation</p>
                <div className="mt-4 space-y-2 text-sm">
                  <p>Prix de la course : <strong>{eur(quote.ridePrice)} €</strong></p>
                  {quote.tolls > 0 && <p>Péage estimé : <strong>{eur(quote.tolls)} €</strong></p>}
                  <p className="font-display text-2xl text-silver-gradient">
                    Tarif total : {quote.total} €
                  </p>
                  <p className="text-muted-foreground">
                    Distance : {quote.distanceKm.toLocaleString("fr-FR")} km · Durée estimée :{" "}
                    {quote.durationMin} min
                  </p>
                  <p className="text-xs text-muted-foreground">Sous réserve de frais de péage</p>
                </div>

                <button
                  type="button"
                  onClick={handleBook}
                  disabled={status === "booking" || status === "booked"}
                  className="btn-silver mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest disabled:opacity-70"
                >
                  {status === "booking" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Calendar className="h-4 w-4" />
                  )}
                  {status === "booked"
                    ? "Demande envoyée"
                    : status === "booking"
                      ? "Envoi en cours..."
                      : "Réserver"}
                </button>
              </div>
            )}

            {status === "booked" && (
              <p className="flex items-center gap-2 text-sm text-silver">
                <CheckCircle2 className="h-4 w-4" />
                Merci — nous vous recontactons très vite.
              </p>
            )}
            {error && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
