import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { computePrice, hourFromDatetimeLocal, type PriceQuote } from "./pricing";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

const quoteSchema = z.object({
  from: z.string().trim().min(3).max(200),
  to: z.string().trim().min(3).max(200),
  datetime: z.string().trim().min(1).max(40),
});

export const getPriceQuote = createServerFn({ method: "POST" })
  .inputValidator((data) => quoteSchema.parse(data))
  .handler(async ({ data }): Promise<PriceQuote> => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const gmapsKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!lovableKey || !gmapsKey) {
      throw new Error("Estimation indisponible pour le moment. Contactez-nous par téléphone.");
    }

    const res = await fetch(`${GATEWAY_URL}/routes/directions/v2:computeRoutes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmapsKey,
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
      },
      body: JSON.stringify({
        origin: { address: data.from },
        destination: { address: data.to },
        travelMode: "DRIVE",
        // Itinéraire recommandé le plus rapide (et non le plus court)
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        languageCode: "fr-FR",
        units: "METRIC",
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[pricing] Routes API error ${res.status}: ${body}`);
      throw new Error("Impossible de calculer l'itinéraire. Vérifiez les adresses saisies.");
    }

    const json = (await res.json()) as {
      routes?: Array<{ distanceMeters?: number; duration?: string }>;
    };
    const route = json.routes?.[0];
    if (!route?.distanceMeters) {
      throw new Error("Aucun itinéraire routier trouvé entre ces deux adresses.");
    }

    const distanceKm = Math.round((route.distanceMeters / 1000) * 10) / 10;
    const durationMin = Math.round(Number(String(route.duration ?? "0s").replace("s", "")) / 60);

    return computePrice(distanceKm, durationMin, hourFromDatetimeLocal(data.datetime));
  });
