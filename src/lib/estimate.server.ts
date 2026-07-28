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
  if (!lovableKey || !mapsKey) {
    throw new Error("Configuration itinéraire manquante.");
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

  const res = await fetch(`${GATEWAY_URL}/routes/directions/v2:computeRoutes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": mapsKey,
      "X-Goog-FieldMask":
        "routes.distanceMeters,routes.duration,routes.travelAdvisory.tollInfo",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`[estimate] Routes API error ${res.status}: ${text}`);
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
