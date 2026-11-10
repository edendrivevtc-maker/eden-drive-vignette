export type CookiebotApi = {
  renew: () => void;
  consent?: { marketing?: boolean };
};

declare global {
  interface Window {
    Cookiebot?: CookiebotApi;
  }
}

export function hasMarketingConsent(cookiebot: Pick<CookiebotApi, "consent"> | undefined): boolean {
  return cookiebot?.consent?.marketing === true;
}

export function observeMarketingConsent(
  target: Pick<Window, "Cookiebot" | "addEventListener" | "removeEventListener">,
  onChange: (allowed: boolean) => void,
) {
  const events = ["CookiebotOnConsentReady", "CookiebotOnAccept", "CookiebotOnDecline"];
  const update = () => onChange(hasMarketingConsent(target.Cookiebot));
  events.forEach(event => target.addEventListener(event, update));
  update();
  return () => events.forEach(event => target.removeEventListener(event, update));
}