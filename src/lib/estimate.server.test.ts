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

describe("minimum de jour selon la distance", () => {
  const day = at("10:00");
  it("2 km → 20 €", () => expect(computePrice(2, day, 0).total).toBe(20));
  it("5 km → 20 €", () => expect(computePrice(5, day, 0).total).toBe(20));
  it("5,01 km → 25 €", () => expect(computePrice(5.01, day, 0).total).toBe(25));
  it("7 km → 25 €", () => expect(computePrice(7, day, 0).total).toBe(25));
  it("10 km → 25 €", () => expect(computePrice(10, day, 0).total).toBe(25));
  it("15 km → 35 € (calcul conservé)", () => expect(computePrice(15, day, 0).total).toBe(35));
  it("nuit 10 km reste 30 €", () => expect(computePrice(10, at("19:00"), 0).total).toBe(30));
});

describe("dimanche et jour férié = tarif nuit toute la journée", () => {
  // Dimanche 25/10/2026 ; vendredi 25/12/2026 (Noël, férié)
  const sunday = (hhmm: string) => `2026-10-25T${hhmm}`;
  const holiday = (hhmm: string) => `2026-12-25T${hhmm}`;
  it("dimanche 10h : tarif nuit", () => expect(isNightRate(sunday("10:00"))).toBe(true));
  it("férié 14h : tarif nuit", () => expect(isNightRate(holiday("14:00"))).toBe(true));
  it("dimanche 10h : 2 km → 30 €", () => expect(computePrice(2, sunday("10:00"), 0).total).toBe(30));
  it("dimanche 14h : 5 km → 30 €", () => expect(computePrice(5, sunday("14:00"), 0).total).toBe(30));
  it("férié 09h : 5 km → 30 €", () => expect(computePrice(5, holiday("09:00"), 0).total).toBe(30));
  it("férié 16h : 3 km → 30 €", () => expect(computePrice(3, holiday("16:00"), 0).total).toBe(30));
  it("dimanche 20 km → 60 € (3 €/km)", () => expect(computePrice(20, sunday("12:00"), 0).total).toBe(60));
  it("férié 20 km → 60 € (3 €/km)", () => expect(computePrice(20, holiday("12:00"), 0).total).toBe(60));
});
