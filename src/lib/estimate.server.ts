const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

export type Estimate = {
  distanceKm: number;
  durationMin: number;
  ridePrice: number;
  tolls: number;
  total: number;
};

function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

function isFrenchHoliday(year: number, month: number, day: number): boolean {
  const fixed = [
    [1, 1],
    [5, 1],
    [5, 8],
    [7, 14],
    [8, 15],
    [11, 1],
    [11, 11],
    [12, 25],
  ];
  if (fixed.some(([m, d]) => m === month && d === day)) return true;
  const easter = easterSunday(year);
  const offsets = [1, 39, 50]; // lundi de Pâques, Ascension, lundi de Pentecôte
  return offsets.some((o) => {
    const dt = new Date(easter.getTime() + o * 86400000);
    return dt.getUTCMonth() + 1 === month && dt.getUTCDate() === day;
  });
}

export function isNightRate(datetime: string): boolean {
  const year = Number(datetime.slice(0, 4));
  const month = Number(datetime.slice(5, 7));
  const day = Number(datetime.slice(8, 10));
  const hour = Number(datetime.slice(11, 13));
  if (hour >= 19 || hour < 6) return true;
  if (!year || !month || !day) return false;
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  if (weekday === 0) return true;
  return isFrenchHoliday(year, month, day);
}

export function computePrice(
  distanceKm: number,
  datetime: string,
  tolls: number,
  pax?: string | number,
): Estimate {
  const night = isNightRate(datetime);
  const rate = night ? 3 : 2.2;
  const raw = distanceKm * rate;
  const paxCount = Number(pax);
  const paxSurcharge = Number.isFinite(paxCount) && paxCount > 4 ? 20 : 0;
  const ridePrice = Math.max(20, Math.round(raw * 100) / 100) + paxSurcharge;
  const total = Math.ceil((ridePrice + tolls) / 5) * 5;
  return { distanceKm, durationMin: 0, ridePrice, tolls, total };
}

export async function computeRoute(
  origin: string,
  destination: string,
  datetime: string,
  pax?: string | number,
) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
  const directKey = process.env.GOOGLE_ROUTES_API_KEY ?? process.env.GOOGLE_API_KEY;

  const useGateway = Boolean(lovableKey && mapsKey);
  if (!useGateway && !directKey) {
    console.error(
      "[estimate] Missing env: set GOOGLE_API_KEY (Routes API) or LOVABLE_API_KEY + GOOGLE_MAPS_API_KEY",
    );
    throw new Error("Configuration itinéraire manquante (clé Google Routes absente du serveur).");
  }

  const departure = new Date(datetime);
  const useTraffic = !Number.isNaN(departure.getTime()) && departure.getTime() > Date.now() + 60_000;

  const body: Record<string, unknown> = {
    origin: { address: origin },
    destination: { address: destination },
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
    computeAlternativeRoutes: false,
    extraComputations: ["TOLLS"],
    routeModifiers: { vehicleInfo: { emissionType: "GASOLINE" } },
    languageCode: "fr-FR",
    regionCode: "FR",
    units: "METRIC",
  };
  if (useTraffic) body.departureTime = departure.toISOString();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.travelAdvisory.tollInfo",
  };
  let url: string;
  if (useGateway) {
    url = `${GATEWAY_URL}/routes/directions/v2:computeRoutes`;
    headers.Authorization = `Bearer ${lovableKey}`;
    headers["X-Connection-Api-Key"] = mapsKey as string;
  } else {
    url = "https://routes.googleapis.com/directions/v2:computeRoutes";
    headers["X-Goog-Api-Key"] = directKey as string;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`[estimate] Routes API error ${res.status}: ${text}`);
    if (res.status === 403) {
      throw new Error(
        "Itinéraire refusé par Google (403) : la clé Routes API du serveur est restreinte ou l'API n'est pas activée.",
      );
    }
    throw new Error(`Impossible de calculer l'itinéraire (${res.status}).`);
  }


  const json: any = await res.json();
  const route = json?.routes?.[0];
  if (!route) throw new Error("Aucun itinéraire trouvé pour ces adresses.");

  const distanceKm = Math.round(((route.distanceMeters ?? 0) / 1000) * 10) / 10;
  const durationMin = Math.round(Number(String(route.duration ?? "0s").replace("s", "")) / 60);

  const prices: any[] = route.travelAdvisory?.tollInfo?.estimatedPrice ?? [];
  const eur = prices.find((p) => p.currencyCode === "EUR") ?? prices[0];
  const tolls = eur
    ? Math.round((Number(eur.units ?? 0) + Number(eur.nanos ?? 0) / 1e9) * 100) / 100
    : 0;

  const priced = computePrice(distanceKm, datetime, tolls, pax);
  return { ...priced, durationMin };
}
