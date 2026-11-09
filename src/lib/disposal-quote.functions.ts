import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { deliverDisposalQuote } from "./disposal-quote.server";

const requestSchema = z.object({
  name: z.string().trim().min(2, "Le nom est requis").max(100),
  phone: z.string().trim().min(6, "Le téléphone est requis").max(30),
  email: z.string().trim().email("Adresse e-mail invalide").max(255),
  from: z.string().trim().min(3, "L'adresse de départ est requise").max(200),
  to: z.string().trim().min(3, "L'adresse de destination est requise").max(200),
  datetime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "La date et l'heure sont requises"),
  pax: z.string().regex(/^[1-9]\d*$/, "Le nombre de passagers est requis").max(10),
  luggage: z.string().regex(/^\d+$/, "Le nombre de bagages est requis").max(10),
  message: z.string().trim().max(2000).optional(),
});

export const sendDisposalQuote = createServerFn({ method: "POST" })
  .inputValidator(data => requestSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      return await deliverDisposalQuote(data);
    } catch (error) {
      console.error("[disposal-quote] delivery failed", error);
      throw new Error("Votre demande n'a pas pu être envoyée. Réessayez ou appelez le 06 35 58 58 23.");
    }
  });