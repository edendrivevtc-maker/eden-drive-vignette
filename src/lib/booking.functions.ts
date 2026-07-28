import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendBookingEmail } from "./booking.server";

const quoteSchema = z
  .object({
    distanceKm: z.number(),
    durationMin: z.number(),
    ridePrice: z.number(),
    tolls: z.number(),
    total: z.number(),
  })
  .nullable()
  .optional();

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Le nom est requis").max(100),
  phone: z.string().trim().min(6, "Le téléphone est requis").max(30),
  email: z.string().trim().email("Adresse e-mail invalide").optional().or(z.literal("")),
  from: z.string().trim().min(3, "L'adresse de départ est requise").max(200),
  to: z.string().trim().min(3, "L'adresse de destination est requise").max(200),
  datetime: z.string().trim().min(1, "La date et l'heure sont requises"),
  pax: z.string().trim().max(10).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  quote: quoteSchema,
});

export const sendBookingRequest = createServerFn({ method: "POST" })
  .inputValidator((data) => bookingSchema.parse(data))
  .handler(async ({ data }) => sendBookingEmail("Demande de réservation", data));
