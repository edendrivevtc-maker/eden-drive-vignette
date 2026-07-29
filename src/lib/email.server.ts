const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export const BOOKING_RECIPIENT = "edendrivevtc@gmail.com";

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getBrevoKey(): string {
  const candidates = [process.env.BREVO_SMTP_API_KEY, process.env.BREVO_API_KEY];
  const key = candidates.find((k) => k && k.startsWith("xkeysib-"));
  if (!key) {
    console.error("[email] Missing env: BREVO_SMTP_API_KEY (clé Brevo directe xkeysib-...)");
    throw new Error("Configuration email manquante (clé API Brevo directe).");
  }
  return key;
}

export function rowsToTable(rows: Array<[string, string]>): string {
  return `
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">${escapeHtml(k)}</td><td style="padding:8px;border:1px solid #ddd;">${v}</td></tr>`,
        )
        .join("")}
    </table>`;
}

export async function sendBrevoEmail(opts: {
  subject: string;
  html: string;
  replyTo?: { email: string; name?: string };
  attachments?: Array<{ name: string; content: string }>;
}) {
  // Garde-fou : une seule pièce jointe par nom de fichier (évite les doublons).
  const attachments = opts.attachments?.filter(
    (a, i, all) => all.findIndex((b) => b.name === a.name) === i,
  );

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": getBrevoKey(),
    },
    body: JSON.stringify({
      sender: { name: "Eden Drive VTC", email: BOOKING_RECIPIENT },
      to: [{ email: BOOKING_RECIPIENT }],
      replyTo: opts.replyTo,
      subject: opts.subject,
      htmlContent: opts.html,
      ...(attachments?.length ? { attachment: attachments } : {}),
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(`[email] Brevo API error ${response.status}: ${body}`);
    throw new Error(`Échec de l'envoi de l'e-mail (${response.status}).`);
  }
  return { success: true };
}
