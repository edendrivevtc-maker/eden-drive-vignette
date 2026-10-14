import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { computeRoute } from "./estimate.server";
import { sendBookingEmail } from "./booking.server";
import { placeAddress, placesAutocomplete } from "./places.server";

const estimateSchema = z.object({
  name: z.string().trim().min(2, "Le nom est requis").max(100),
  phone: z.string().trim().min(6, "Le téléphone est requis").max(30),
  email: z.string().trim().min(1, "L'adresse e-mail est requise").email("Adresse e-mail invalide").max(255),
  from: z.string().trim().min(3, "L'adresse de départ est requise").max(200),
  to: z.string().trim().min(3, "L'adresse de destination est requise").max(200),
  datetime: z.string().trim().min(1, "La date et l'heure sont requises"),
  pax: z.string().trim().min(1, "Le nombre de passagers est requis").max(10),
  luggage: z.string().trim().min(1, "Le nombre de bagages est requis").max(10),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const estimateRide = createServerFn({ method: "POST" })
  .inputValidator((data) => estimateSchema.parse(data))
  .handler(async ({ data }) => {
    const quote = await computeRoute(data.from, data.to, data.datetime, data.pax);
    // La notification ne doit jamais bloquer l'affichage du tarif : délai max 4 s.
    const notify = sendBookingEmail("Un client vient d'estimer une course", { ...data, quote }).catch(
      (err) => console.error("[estimate] notification email failed", err),
    );
    await Promise.race([notify, new Promise((r) => setTimeout(r, 4000))]);
    return quote;
  });

export const getPlacesBrowserKey = createServerFn({ method: "GET" }).handler(async () => {
  const key =
    process.env.GOOGLE_PLACES_BROWSER_KEY ??
    process.env.GOOGLE_API_KEY ??
    process.env.GOOGLE_MAPS_BROWSER_KEY ??
    null;
  return { key };
});

const tokenSchema = z.string().trim().min(8).max(64);

export const suggestAddresses = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ input: z.string().trim().min(2).max(120), sessionToken: tokenSchema }).parse(data),
  )
  .handler(async ({ data }) => {
    try {
      return await placesAutocomplete(data.input, data.sessionToken);
    } catch (err) {
      console.error("[places] autocomplete failed", err);
      return [];
    }
  });

export const resolveAddress = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ placeId: z.string().trim().min(5).max(300), sessionToken: tokenSchema }).parse(data),
  )
  .handler(async ({ data }) => {
    try {
      return await placeAddress(data.placeId, data.sessionToken);
    } catch (err) {
      console.error("[places] details failed", err);
      return null;
    }
  });
