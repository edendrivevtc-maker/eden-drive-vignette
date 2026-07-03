import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/brevo";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Le nom est requis").max(100),
  phone: z.string().trim().min(6, "Le téléphone est requis").max(30),
  email: z.string().trim().email("Adresse e-mail invalide").optional().or(z.literal("")),
  from: z.string().trim().min(3, "L'adresse de départ est requise").max(200),
  to: z.string().trim().min(3, "L'adresse de destination est requise").max(200),
  datetime: z.string().trim().min(1, "La date et l'heure sont requises"),
  pax: z.string().trim().max(10).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const sendBookingRequest = createServerFn({ method: "POST" })
  .inputValidator((data) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableApiKey = process.env.LOVABLE_API_KEY;
    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!lovableApiKey || !brevoApiKey) {
      throw new Error("Configuration email manquante.");
    }

    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="color: #111;">Nouvelle demande de réservation — Eden Drive VTC</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Nom</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Téléphone</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.phone)}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail</td><td style="padding: 8px; border: 1px solid #ddd;">${data.email ? escapeHtml(data.email) : "Non renseigné"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Départ</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.from)}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Destination</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.to)}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Date & heure</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.datetime)}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Passagers</td><td style="padding: 8px; border: 1px solid #ddd;">${data.pax ? escapeHtml(data.pax) : "Non renseigné"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td><td style="padding: 8px; border: 1px solid #ddd;">${data.message ? escapeHtml(data.message).replace(/\n/g, "<br/>") : "Aucun"}</td></tr>
          </table>
          <p style="margin-top: 24px; color: #666; font-size: 12px;">
            Cette demande provient du formulaire de réservation en ligne du site Eden Drive VTC.
          </p>
        </body>
      </html>
    `;

    const response = await fetch(`${GATEWAY_URL}/smtp/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${lovableApiKey}`,
        "X-Connection-Api-Key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: { name: "Eden Drive VTC", email: "edendrivevtc@gmail.com" },
        to: [{ email: "edendrivevtc@gmail.com" }],
        replyTo: data.email ? { email: data.email, name: data.name } : undefined,
        subject: `Nouvelle demande de réservation — ${data.name}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(`Échec de l'envoi de l'e-mail (${response.status}).`);
    }

    return { success: true };
  });

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
