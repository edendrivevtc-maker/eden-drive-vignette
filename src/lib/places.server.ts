const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

function gatewayHeaders(fieldMask: string): Record<string, string> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!lovableKey || !mapsKey) throw new Error("Configuration Google manquante");
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": mapsKey,
    "Content-Type": "application/json",
    "X-Goog-FieldMask": fieldMask,
  };
}

export async function placesAutocomplete(input: string, sessionToken: string) {
  const res = await fetch(`${GATEWAY_URL}/places/v1/places:autocomplete`, {
    method: "POST",
    headers: gatewayHeaders(
      "suggestions.placePrediction.placeId,suggestions.placePrediction.text.text",
    ),
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
  const url = `${GATEWAY_URL}/places/v1/places/${encodeURIComponent(placeId)}?sessionToken=${encodeURIComponent(sessionToken)}&languageCode=fr`;
  const res = await fetch(url, { headers: gatewayHeaders("displayName,formattedAddress") });
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
