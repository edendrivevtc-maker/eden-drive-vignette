// Générateur de fichier .ics (RFC 5545), sans dépendance, Worker-safe.
// Compatible Apple Mail / Calendrier iOS : METHOD:REQUEST, UID, DTSTAMP,
// DTSTART/DTEND en UTC (suffixe Z), STATUS:CONFIRMED, SEQUENCE:0.

export type IcsEvent = {
  uid: string;
  start: string; // "YYYY-MM-DDTHH:mm" (heure locale Europe/Paris)
  durationMin: number;
  title: string;
  location: string;
  description: string;
  organizerEmail?: string;
  attendeeEmail?: string;
};

function sanitize(text: string): string {
  // Supprime BOM et caractères de contrôle (hors retours à la ligne).
  return (text ?? "").replace(/\uFEFF/g, "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

function escapeIcs(text: string): string {
  return sanitize(text)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// Pliage RFC 5545 : max 75 octets par ligne, sans couper un caractère
// multi-octets ni une séquence d'échappement ("\n", "\,", "\;", "\\").
function foldLine(line: string): string {
  const encoder = new TextEncoder();
  const chars = Array.from(line);
  const out: string[] = [];
  let current = "";
  let bytes = 0;
  let limit = 75;
  for (let i = 0; i < chars.length; i += 1) {
    let chunk = chars[i]!;
    if (chunk === "\\" && i + 1 < chars.length) {
      chunk += chars[i + 1]!;
      i += 1;
    }
    const size = encoder.encode(chunk).length;
    if (bytes + size > limit) {
      out.push(current);
      current = " ";
      bytes = 1;
      limit = 75;
    }
    current += chunk;
    bytes += size;
  }
  if (current.length) out.push(current);
  return out.join("\r\n");
}


function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function utcStamp(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

// Décalage (en minutes) d'Europe/Paris pour un instant donné.
function parisOffsetMinutes(utcDate: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(utcDate);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? "0");
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") % 24,
    get("minute"),
    get("second"),
  );
  return (asUtc - utcDate.getTime()) / 60000;
}

// Convertit une heure locale Paris "YYYY-MM-DDTHH:mm" en Date UTC.
function parisLocalToUtc(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/.exec(value ?? "");
  if (!m) return null;
  const [, y, mo, d, h, mi] = m.map(Number) as unknown as number[];
  const naive = Date.UTC(y, mo - 1, d, h, mi);
  // Deux passes pour gérer les bascules d'heure d'été.
  let offset = parisOffsetMinutes(new Date(naive));
  offset = parisOffsetMinutes(new Date(naive - offset * 60000));
  return new Date(naive - offset * 60000);
}

export function buildIcs(event: IcsEvent): string {
  const startDate = parisLocalToUtc(event.start) ?? new Date();
  const duration = event.durationMin > 0 ? Math.round(event.durationMin) : 60;
  const endDate = new Date(startDate.getTime() + duration * 60000);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Eden Drive VTC//Reservation//FR",
    "CALSCALE:GREGORIAN",
    // REQUEST + ORGANIZER/ATTENDEE : Gmail et Apple Mail n'affichent le
    // bandeau « Ajouter au calendrier » que pour une véritable invitation.
    // L'organisateur doit être différent du destinataire, sinon Apple Mail
    // considère l'invitation comme émise par nous et n'affiche rien.
    "METHOD:REQUEST",
    "X-WR-CALNAME:EDEN DRIVE VTC",
    "BEGIN:VEVENT",
    `UID:${sanitize(event.uid)}`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(startDate)}`,
    `DTEND:${utcStamp(endDate)}`,
    `SUMMARY:${escapeIcs(event.title) || "Course VTC"}`,
    `LOCATION:${escapeIcs(event.location)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    ...(event.organizerEmail
      ? [
          `ORGANIZER;CN="${escapeIcs(event.organizerName ?? "Client")}":mailto:${sanitize(event.organizerEmail)}`,
        ]
      : []),
    ...(event.attendeeEmail
      ? [
          "ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;" +
            `RSVP=TRUE;CN="EDEN DRIVE VTC":mailto:${sanitize(event.attendeeEmail)}`,
        ]
      : []),
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ];


  return lines.map(foldLine).join("\r\n") + "\r\n";
}

// Lien "Ajouter à Google Agenda" (fallback fiable si Gmail n'affiche pas la carte).
export function buildGoogleCalendarUrl(event: IcsEvent): string {
  const startDate = parisLocalToUtc(event.start) ?? new Date();
  const duration = event.durationMin > 0 ? Math.round(event.durationMin) : 60;
  const endDate = new Date(startDate.getTime() + duration * 60000);
  const fmt = (d: Date) => utcStamp(d).replace(/[-:]/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: sanitize(event.title),
    dates: `${fmt(startDate)}/${fmt(endDate)}`,
    details: sanitize(event.description),
    location: sanitize(event.location),
    ctz: "Europe/Paris",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function toBase64Utf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}
