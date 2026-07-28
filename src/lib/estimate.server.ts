const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

export type Estimate = {
  distanceKm: number;
  durationMin: number;
  ridePrice: number;
  tolls: number;
  total: number;
};

export function computePrice(distanceKm: number, datetime: string, tolls: number): Estimate {
  const hour = Number(datetime.slice(11, 13));
  const rate = hour >= 6 && hour < 19 ? 2 : 3;
  const raw = 5 + distanceKm * rate;
  const ridePrice = Math.max(20, Math.round(raw * 100) / 100);
  const total = Math.ceil(ridePrice + tolls);
  return { distanceKm, durationMin: 0, ridePrice, tolls, total };
}

export async function computeRoute(origin: string, destination: string, datetime: string) {
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

  const priced = computePrice(distanceKm, datetime, tolls);
  return { ...priced, durationMin };
}
