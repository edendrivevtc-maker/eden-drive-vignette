import { beforeEach, describe, expect, it, vi } from "vitest";
const send = vi.hoisted(() => vi.fn());
vi.mock("./booking.server", () => ({ sendBookingEmail: send }));
import { deliverDisposalQuote } from "./disposal-quote.server";

const request = { name: "Test devis", phone: "0635585823", email: "test@example.com", from: "Toulouse Capitole", to: "Toulouse centre", datetime: "2026-11-20T10:00", pax: "2", luggage: "1", message: "Demi-journée, 4 heures, rendez-vous." };
describe("Personalized disposal quote", () => {
  beforeEach(() => { send.mockReset(); send.mockResolvedValue({ success: true }); });
  it("sends the requested programme to the owner without a computed price or booking attachments", async () => {
    const result = await deliverDisposalQuote({ ...request, quote: { total: 20, ridePrice: 20, distanceKm: 2, durationMin: 5, tolls: 0 } });
    expect(send).toHaveBeenCalledExactlyOnceWith("Demande de devis — Mise à disposition d'un chauffeur", request);
    expect(result).toEqual({ success: true });
    expect(result).not.toHaveProperty("total");
  });
  it("does not acknowledge a request when owner notification fails", async () => {
    send.mockRejectedValue(new Error("Provider unavailable"));
    await expect(deliverDisposalQuote(request)).rejects.toThrow("Provider unavailable");
  });
});