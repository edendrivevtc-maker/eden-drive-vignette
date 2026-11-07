import { createFileRoute } from "@tanstack/react-router";

async function validSecret(provided: string, expected: string) {
  const encode = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encode.encode(provided)),
    crypto.subtle.digest("SHA-256", encode.encode(expected)),
  ]);
  const left = new Uint8Array(a);
  const right = new Uint8Array(b);
  let difference = 0;
  for (let i = 0; i < left.length; i++) difference |= left[i] ^ right[i];
  return difference === 0;
}

export const Route = createFileRoute("/api/public/google-reviews-refresh")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.GOOGLE_REVIEWS_REFRESH_SECRET;
        const provided = request.headers.get("authorization")?.replace(/^Bearer /, "");
        if (!secret || !provided || !(await validSecret(provided, secret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        try {
          const { refreshGoogleReviews } = await import("@/lib/google-reviews-refresh.server");
          const status = await refreshGoogleReviews({
            serverKey: process.env.GOOGLE_PLACES_API_KEY,
            lovableKey: process.env.LOVABLE_API_KEY,
            mapsKey: process.env.GOOGLE_MAPS_API_KEY,
          });
          return Response.json({ status });
        } catch (error) {
          console.error("[google-reviews] Scheduled refresh failed", error);
          return Response.json({ error: "Refresh failed; previous stats retained" }, { status: 502 });
        }
      },
    },
  },
});