import {
  BOOKING_RECIPIENT,
  escapeHtml,
  rowsToTable,
  sendBrevoEmail,
} from "./email.server";

export type BookingPayload = {
  name: string;
  phone: string;
  email?: string;
  from: string;
  to: string;
  datetime: string;
  pax?: string;
  message?: string;
  quote?: {
    distanceKm: number;
    durationMin: number;
    ridePrice: number;
    tolls: number;
    total: number;
  } | null;
};

export function buildBookingRows(data: BookingPayload): Array<[string, string]> {
  const rows: Array<[string, string]> = [
    ["Nom", escapeHtml(data.name)],
    ["Téléphone", escapeHtml(data.phone)],
    ["E-mail", data.email ? escapeHtml(data.email) : "Non renseigné"],
    ["Départ", escapeHtml(data.from)],
    ["Destination", escapeHtml(data.to)],
    ["Date & heure", escapeHtml(formatFrDatetime(data.datetime))],
    ["Passagers", data.pax ? escapeHtml(data.pax) : "Non renseigné"],
    [
      "Message",
      data.message ? escapeHtml(data.message).replace(/\n/g, "<br/>") : "Aucun",
    ],
  ];
  if (data.quote) {
    rows.push(
      ["Distance", `${data.quote.distanceKm.toFixed(1)} km`],
      ["Durée estimée", `${data.quote.durationMin} min`],
      ["Prix de la course", `${data.quote.total} €`],
    );
  }
  return rows;
}

export async function sendBookingEmail(subject: string, data: BookingPayload) {
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2 style="color:#111;">${escapeHtml(subject)} — Eden Drive VTC</h2>
        ${rowsToTable(buildBookingRows(data))}
        <p style="margin-top:24px;color:#666;font-size:12px;">
          Envoyé depuis le formulaire de réservation du site Eden Drive VTC (${BOOKING_RECIPIENT}).
        </p>
      </body>
    </html>`;

  return sendBrevoEmail({
    subject,
    html,
    replyTo: data.email ? { email: data.email, name: data.name } : undefined,
  });
}
