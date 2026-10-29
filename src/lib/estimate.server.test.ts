import { describe, expect, it } from "vitest";
import { computePrice, isNightRate } from "./estimate.server";

// Mercredi 21/10/2026 (jour ouvré, non férié)
const at = (hhmm: string) => `2026-10-21T${hhmm}`;

describe("plage de nuit 19h–8h", () => {
  it("18h59 jour", () => expect(isNightRate(at("18:59"))).toBe(false));
  it("19h00 nuit", () => expect(isNightRate(at("19:00"))).toBe(true));
  it("07h59 nuit", () => expect(isNightRate(at("07:59"))).toBe(true));
  it("08h00 jour", () => expect(isNightRate(at("08:00"))).toBe(false));
});

describe("minimum de course", () => {
  it("nuit : 5 km → 30 €", () => expect(computePrice(5, at("22:00"), 0).total).toBe(30));
  it("nuit : 07h59 2 km → 30 €", () => expect(computePrice(2, at("07:59"), 0).total).toBe(30));
  it("nuit : 20 km → 60 € (calcul conservé)", () => expect(computePrice(20, at("19:00"), 0).total).toBe(60));
  it("jour : 5 km → 20 €", () => expect(computePrice(5, at("08:00"), 0).total).toBe(20));
  it("jour 18h59 : 5 km → 20 €", () => expect(computePrice(5, at("18:59"), 0).total).toBe(20));
  it("nuit + 5 passagers : 5 km → 50 €", () => expect(computePrice(5, at("23:00"), 0, 5).total).toBe(50));
});
