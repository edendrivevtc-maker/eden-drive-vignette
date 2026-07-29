import {
  BOOKING_RECIPIENT,
  escapeHtml,
  rowsToTable,
  sendBrevoEmail,
} from "./email.server";
import { buildSimplePdf, type PdfLine } from "./pdf.server";
import { buildIcs, toBase64Utf8 } from "./ics.server";

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

export function buildBookingRows(
  data: BookingPayload,
  options?: { plain?: boolean },
): Array<[string, string]> {
  const esc = (v: string) => (options?.plain ? v : escapeHtml(v));
  const rows: Array<[string, string]> = [
    ["Nom", esc(data.name)],
    ["Téléphone", esc(data.phone)],
    ["E-mail", data.email ? esc(data.email) : "Non renseigné"],
    ["Départ", esc(data.from)],
    ["Destination", esc(data.to)],
    ["Date & heure", esc(formatFrDatetime(data.datetime))],
    ["Passagers", data.pax ? esc(data.pax) : "Non renseigné"],
    [
      "Message",
      data.message
        ? options?.plain
          ? data.message.replace(/\n/g, " ")
          : escapeHtml(data.message).replace(/\n/g, "<br/>")
        : "Aucun",
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


function nowInParis(): string {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("day")}/${get("month")}/${get("year")} à ${get("hour")}:${get("minute")}`;
}

export function buildBookingPdf(data: BookingPayload): string {
  const lines: PdfLine[] = [
    { kind: "title", text: "Bon de commande" },
    { kind: "subtitle", text: "EXPLOITANT" },
    { kind: "row", label: "Société", value: "EDEN DRIVE VTC" },
    { kind: "row", label: "Adresse", value: "3 rue Suzanne Valadon 31850 Montrabé" },
    { kind: "row", label: "Téléphone", value: "0603508950" },
    { kind: "row", label: "SIREN", value: "938872017" },
    { kind: "row", label: "REVTC", value: "EVTC031250058" },
    { kind: "rule" },
    {
      kind: "note",
      text: `Réservation le ${nowInParis()}`,
    },
    { kind: "space" },
    { kind: "rule" },
  ];
  for (const [label, value] of buildBookingRows(data, { plain: true })) {
    lines.push({
      kind: "row",
      label: label === "Date & heure" ? "Date et heure de prise en charge" : label,
      value,
    });
  }
  lines.push(
    { kind: "space" },
    { kind: "rule" },
    {
      kind: "note",
      text: "Course effectuée sur réservation préalable. Arrêté du 6 août 2025 (JORF n°200) · Art. L.3122-9 · Art. L.3120-2 Code des transports",
    },
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

