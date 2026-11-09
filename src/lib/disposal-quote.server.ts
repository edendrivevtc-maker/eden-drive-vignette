import { sendBookingEmail, type BookingPayload } from "./booking.server";

/** A disposal request is a quote, never a distance-priced booking. */
export async function deliverDisposalQuote(data: BookingPayload) {
  const { quote: _ignored, ...request } = data;
  await sendBookingEmail("Demande de devis — Mise à disposition d'un chauffeur", request);
  return { success: true as const };
}