const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";
const DIRECT_URL = "https://places.googleapis.com";

// Hébergement Lovable : passerelle (LOVABLE_API_KEY + GOOGLE_MAPS_API_KEY).
// Hébergement Cloudflare : appel direct Google avec la clé serveur GOOGLE_PLACES_API_KEY
// (même clé que le compteur d'avis), à défaut GOOGLE_API_KEY.
function endpoint(fieldMask: string): { base: string; headers: Record<string, string> } {
  const common = { "Content-Type": "application/json", "X-Goog-FieldMask": fieldMask };
  const lovableKey = process.env.LOVABLE_API_KEY;
  const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
  if (lovableKey && mapsKey) {
    return {
      base: `${GATEWAY_URL}/places/v1`,
      headers: { ...common, Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": mapsKey },
    };
  }
  const directKey = process.env.GOOGLE_PLACES_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (directKey) {
    return { base: `${DIRECT_URL}/v1`, headers: { ...common, "X-Goog-Api-Key": directKey } };
  }
  throw new Error("Configuration Google manquante (aucune clé Places côté serveur)");
}

export async function placesAutocomplete(input: string, sessionToken: string) {
  const { base, headers } = endpoint(
    "suggestions.placePrediction.placeId,suggestions.placePrediction.text.text",
  );
  const res = await fetch(`${base}/places:autocomplete`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      input,
      sessionToken,
      languageCode: "fr",
      regionCode: "fr",
      locationBias: {
        circle: { center: { latitude: 43.6045, longitude: 1.4442 }, radius: 50000 },
      },
    }),
  });
  if (!res.ok) {
    console.error(`[places] autocomplete ${res.status}: ${await res.text().catch(() => "")}`);
    return [];
  }
  const json: any = await res.json();
  return ((json?.suggestions ?? []) as any[])
    .map((s) => s.placePrediction)
    .filter((p) => p?.placeId)
    .slice(0, 6)
    .map((p) => ({ placeId: String(p.placeId), text: String(p.text?.text ?? "") }));
}

export async function placeAddress(placeId: string, sessionToken: string) {
  const { base, headers } = endpoint("displayName,formattedAddress");
  const url = `${base}/places/${encodeURIComponent(placeId)}?sessionToken=${encodeURIComponent(sessionToken)}&languageCode=fr`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error(`[places] details ${res.status}: ${await res.text().catch(() => "")}`);
    return null;
  }
  const json: any = await res.json();
  return {
    name: String(json?.displayName?.text ?? ""),
    formatted: String(json?.formattedAddress ?? ""),
  };
}
