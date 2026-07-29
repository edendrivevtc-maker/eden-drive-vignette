// Minimal dependency-free PDF generator (Helvetica / WinAnsi), Worker-safe.

function latin1Escape(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

// WinAnsiEncoding specifics for characters outside Latin-1 (0x80-0x9F range).
const WIN_ANSI: Record<string, number> = {
  "€": 0x80,
  "‚": 0x82,
  "ƒ": 0x83,
  "„": 0x84,
  "…": 0x85,
  "†": 0x86,
  "‡": 0x87,
  "ˆ": 0x88,
  "‰": 0x89,
  "Š": 0x8a,
  "‹": 0x8b,
  "Œ": 0x8c,
  "Ž": 0x8e,
  "‘": 0x91,
  "’": 0x92,
  "“": 0x93,
  "”": 0x94,
  "•": 0x95,
  "–": 0x96,
  "—": 0x97,
  "˜": 0x98,
  "™": 0x99,
  "š": 0x9a,
  "›": 0x9b,
  "œ": 0x9c,
  "ž": 0x9e,
  "Ÿ": 0x9f,
};

function toLatin1Bytes(str: string): Uint8Array {
  const out = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const code = ch.charCodeAt(0);
    out[i] = code < 256 ? code : (WIN_ANSI[ch] ?? 63);
  }
  return out;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  // eslint-disable-next-line no-undef
  return btoa(binary);
}

export type PdfLine =
  | { kind: "title"; text: string }
  | { kind: "subtitle"; text: string }
  | { kind: "row"; label: string; value: string }
  | { kind: "space" }
  | { kind: "rule" }
  | { kind: "note"; text: string };

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 56;

function wrap(text: string, max: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const candidate = current ? `${current} ${w}` : w;
    if (candidate.length > max) {
      if (current) lines.push(current);
      current = w;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

export function buildSimplePdf(lines: PdfLine[]): string {
  const ops: string[] = [];
  let y = PAGE_H - MARGIN;

  const text = (value: string, x: number, size: number, bold: boolean) => {
    ops.push(
      `BT /${bold ? "F2" : "F1"} ${size} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${latin1Escape(value)}) Tj ET`,
    );
  };

  for (const line of lines) {
    if (line.kind === "title") {
      text(line.text, MARGIN, 20, true);
      y -= 30;
    } else if (line.kind === "subtitle") {
      text(line.text, MARGIN, 11, false);
      y -= 22;
    } else if (line.kind === "space") {
      y -= 14;
    } else if (line.kind === "rule") {
      ops.push(
        `0.75 w 0.6 0.6 0.6 RG ${MARGIN} ${y.toFixed(2)} m ${(PAGE_W - MARGIN).toFixed(2)} ${y.toFixed(2)} l S`,
      );
      y -= 20;
    } else if (line.kind === "note") {
      for (const l of wrap(line.text, 82)) {
        text(l, MARGIN, 9, false);
        y -= 13;
      }
    } else {
      const labelLines = wrap(line.label, 24);
      const valueLines = wrap(line.value, 52);
      const startY = y;
      labelLines.forEach((l, i) => {
        y = startY - i * 15;
        text(l, MARGIN, 11, true);
      });
      valueLines.forEach((l, i) => {
        y = startY - i * 15;
        text(l, MARGIN + 170, 11, false);
      });
      y = startY - (Math.max(labelLines.length, valueLines.length) - 1) * 15 - 20;
    }
  }

  const content = ops.join("\n");
  const contentBytes = toLatin1Bytes(content);

  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`,
    `<< /Length ${contentBytes.length} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  for (let i = 0; i < objects.length; i++) {
    offsets.push(toLatin1Bytes(pdf).length);
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefOffset = toLatin1Bytes(pdf).length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return bytesToBase64(toLatin1Bytes(pdf));
}
