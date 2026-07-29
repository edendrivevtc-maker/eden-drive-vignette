import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { computeRoute } from "./estimate.server";
import { sendBookingEmail } from "./booking.server";

const estimateSchema = z.object({
  name: z.string().trim().min(2, "Le nom est requis").max(100),
  phone: z.string().trim().min(6, "Le téléphone est requis").max(30),
  email: z.string().trim().email("Adresse e-mail invalide").optional().or(z.literal("")),
  from: z.string().trim().min(3, "L'adresse de départ est requise").max(200),
  to: z.string().trim().min(3, "L'adresse de destination est requise").max(200),
  datetime: z.string().trim().min(1, "La date et l'heure sont requises"),
  pax: z.string().trim().min(1, "Le nombre de passagers est requis").max(10),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const estimateRide = createServerFn({ method: "POST" })
  .inputValidator((data) => estimateSchema.parse(data))
  .handler(async ({ data }) => {
    const quote = await computeRoute(data.from, data.to, data.datetime, data.pax);
    try {
      await sendBookingEmail("Un client vient d'estimer une course", { ...data, quote });
    } catch (err) {
      console.error("[estimate] notification email failed", err);
    }
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
