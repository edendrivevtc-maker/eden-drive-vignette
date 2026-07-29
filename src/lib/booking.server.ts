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

export function formatFrDatetime(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/.exec(value ?? "");
  if (!m) return value;
  const [, y, mo, d, h, mi] = m;
  return `${d}/${mo}/${y} à ${Number(h)}:${mi}`;
}

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

export function buildBookingPdf(data: BookingPayload): string {
  const lines: PdfLine[] = [
    { kind: "title", text: "Bon de commande" },
    { kind: "subtitle", text: "EDEN DRIVE VTC — Toulouse et ses environs" },
    { kind: "rule" },
  ];
  for (const [label, value] of buildBookingRows(data, { plain: true })) {
    lines.push({ kind: "row", label, value });
  }
  lines.push(
    { kind: "space" },
    { kind: "rule" },
    {
      kind: "note",
      text: "Document généré automatiquement lors de la demande de réservation en ligne. Le prix indiqué est le tarif de la course, arrondi, péages inclus.",
    },
    { kind: "note", text: `Contact : ${BOOKING_RECIPIENT} — 06 35 58 58 23` },
  );
  return buildSimplePdf(lines);
}

export async function sendBookingEmail(
  subject: string,
  data: BookingPayload,
  options?: { attachPdf?: boolean },
) {
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
    attachments: options?.attachPdf
      ? [{ name: "bon-de-commande.pdf", content: buildBookingPdf(data) }]
      : undefined,
  });
}

