import { describe, expect, it } from "vitest";
import { hasMarketingConsent, observeMarketingConsent } from "./cookiebot-consent";

describe("Google reviews marketing consent", () => {
  it("blocks reviews without explicit marketing consent, including an acceptance without marketing", () => {
    expect(hasMarketingConsent(undefined)).toBe(false);
    expect(hasMarketingConsent({ consent: {} })).toBe(false);
    expect(hasMarketingConsent({ consent: { marketing: false } })).toBe(false);
    expect(hasMarketingConsent({ consent: { marketing: true } })).toBe(true);
  });

  it("restores existing consent and responds to acceptance, readiness and withdrawal", () => {
    const target = Object.assign(new EventTarget(), { Cookiebot: { renew() {}, consent: { marketing: true } } });
    const states: boolean[] = [];
    const stop = observeMarketingConsent(target, value => states.push(value));
    expect(states).toEqual([true]);
    target.Cookiebot.consent.marketing = false;
    target.dispatchEvent(new Event("CookiebotOnDecline"));
    expect(states.at(-1)).toBe(false);
    target.Cookiebot.consent.marketing = true;
    target.dispatchEvent(new Event("CookiebotOnAccept"));
    expect(states.at(-1)).toBe(true);
    target.Cookiebot.consent.marketing = false;
    target.dispatchEvent(new Event("CookiebotOnConsentReady"));
    expect(states.at(-1)).toBe(false);
    stop();
    target.Cookiebot.consent.marketing = true;
    target.dispatchEvent(new Event("CookiebotOnAccept"));
    expect(states.at(-1)).toBe(false);
  });
});