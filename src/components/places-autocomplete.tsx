import { useEffect, useRef, useState } from "react";

const BROWSER_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as
  | string
  | undefined;
const TRACKING_ID = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as
  | string
  | undefined;

declare global {
  interface Window {
    google?: any;
    __edenGmapsPromise?: Promise<void>;
    __edenGmapsInit?: () => void;
  }
}

function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps?.importLibrary) return Promise.resolve();
  if (window.__edenGmapsPromise) return window.__edenGmapsPromise;
  if (!BROWSER_KEY) return Promise.reject(new Error("Missing Google Maps browser key"));

  window.__edenGmapsPromise = new Promise<void>((resolve, reject) => {
    window.__edenGmapsInit = () => resolve();
    const s = document.createElement("script");
    const params = new URLSearchParams({
      key: BROWSER_KEY,
      v: "weekly",
      libraries: "places",
      loading: "async",
      callback: "__edenGmapsInit",
    });
    if (TRACKING_ID) params.set("channel", TRACKING_ID);
    s.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    s.async = true;
    s.defer = true;
    s.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(s);
  });
  return window.__edenGmapsPromise;
}

type Suggestion = {
  placePrediction: any;
  text: string;
};

export function PlacesField({
  label,
  name,
  required,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const sessionTokenRef = useRef<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    loadGoogleMaps()
      .then(() => setReady(true))
      .catch(() => setReady(false));
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const fetchSuggestions = async (input: string) => {
    if (!ready || !window.google?.maps || input.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const { AutocompleteSuggestion, AutocompleteSessionToken } =
        await window.google.maps.importLibrary("places");
      if (!sessionTokenRef.current) {
        sessionTokenRef.current = new AutocompleteSessionToken();
      }
      const { suggestions: sugg } =
        await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
          sessionToken: sessionTokenRef.current,
          language: "fr",
          region: "fr",
          locationBias: {
            center: { lat: 43.6045, lng: 1.4442 },
            radius: 60000,
          },
        });
      const mapped: Suggestion[] = (sugg ?? [])
        .filter((s: any) => s.placePrediction)
        .map((s: any) => ({
          placePrediction: s.placePrediction,
          text: s.placePrediction.text?.toString() ?? "",
        }));
      setSuggestions(mapped);
      setOpen(mapped.length > 0);
    } catch {
      setSuggestions([]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => fetchSuggestions(v), 200);
  };

  const onSelect = async (s: Suggestion) => {
    try {
      const place = s.placePrediction.toPlace();
      await place.fetchFields({ fields: ["formattedAddress", "displayName"] });
      const address =
        place.formattedAddress ||
        (place.displayName ? String(place.displayName) : s.text);
      setValue(address);
    } catch {
      setValue(s.text);
    }
    setOpen(false);
    setSuggestions([]);
    sessionTokenRef.current = null;
  };

  return (
    <div ref={wrapRef} className="relative">
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
        {required && <span className="text-silver"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        required={required}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={onChange}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        className="w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-silver"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 z-50 mt-1 max-h-64 overflow-auto rounded-md border border-border bg-background shadow-lg">
          {suggestions.map((s, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => onSelect(s)}
                className="block w-full px-4 py-2 text-left text-sm text-ivory hover:bg-silver/10"
              >
                {s.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
