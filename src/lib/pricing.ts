/**
 * Grille tarifaire EDEN DRIVE VTC — source unique de vérité.
 * Modifier uniquement ces valeurs pour ajuster les tarifs du site.
 */
export const PRICING = {
  /** Course minimum facturée (€ TTC) */
  minimumFare: 20,
  /** Frais de prise en charge (€) */
  pickupFee: 5,
  /** Tarif kilométrique de jour (€/km) */
  dayRatePerKm: 2,
  /** Tarif kilométrique de nuit (€/km) */
  nightRatePerKm: 3,
  /** Heure de début du tarif jour (incluse) */
  dayStartHour: 6,
  /** Heure de début du tarif nuit (incluse) */
  nightStartHour: 19,
} as const;

export type PriceQuote = {
  distanceKm: number;
  durationMin: number;
  ratePerKm: number;
  isNight: boolean;
  total: number;
};

/** Tarif nuit de 19h00 à 06h00, tarif jour de 06h00 à 19h00. */
export function isNightHour(hour: number): boolean {
  return hour >= PRICING.nightStartHour || hour < PRICING.dayStartHour;
}

/** Extrait l'heure d'une valeur `datetime-local` (ex: "2026-07-28T21:30"). */
export function hourFromDatetimeLocal(value: string): number {
  const match = /T(\d{2}):/.exec(value);
  return match ? Number(match[1]) : new Date().getHours();
}

export function computePrice(
  distanceKm: number,
  durationMin: number,
  departureHour: number,
): PriceQuote {
  const isNight = isNightHour(departureHour);
  const ratePerKm = isNight ? PRICING.nightRatePerKm : PRICING.dayRatePerKm;
  const raw = PRICING.pickupFee + distanceKm * ratePerKm;
  const total = Math.max(PRICING.minimumFare, Math.round(raw));
  return { distanceKm, durationMin, ratePerKm, isNight, total };
}

export function formatEuro(amount: number): string {
  return `${amount} €`;
}
