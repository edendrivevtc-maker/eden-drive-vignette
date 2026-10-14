import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { resolveAddress, suggestAddresses } from "@/lib/estimate.functions";

type Suggestion = { placeId: string; text: string };

function newToken() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

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
  const suggest = useServerFn(suggestAddresses);
  const resolve = useServerFn(resolveAddress);
  const [value, setValue] = useState(defaultValue ?? "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const tokenRef = useRef<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | null>(null);
  const reqIdRef = useRef(0);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const fetchSuggestions = async (input: string) => {
    if (input.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    if (!tokenRef.current) tokenRef.current = newToken();
    const id = ++reqIdRef.current;
    try {
      const res = await suggest({ data: { input: input.trim().slice(0, 120), sessionToken: tokenRef.current } });
      if (id !== reqIdRef.current) return;
      setSuggestions(res ?? []);
      setOpen((res ?? []).length > 0);
    } catch (err) {
      console.error("[places] autocomplete failed", err);
      setSuggestions([]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => fetchSuggestions(v), 300);
  };

  const onSelect = async (s: Suggestion) => {
    reqIdRef.current++;
    setValue(s.text);
    setOpen(false);
    setSuggestions([]);
    const token = tokenRef.current ?? newToken();
    tokenRef.current = null;
    try {
      const place = await resolve({ data: { placeId: s.placeId, sessionToken: token } });
      if (!place) return;
      const { name: n, formatted } = place;
      let address = s.text;
      if (formatted && n && !formatted.toLowerCase().includes(n.toLowerCase())) {
        address = `${n}, ${formatted}`;
      } else if (formatted) {
        address = formatted;
      }
      setValue(address);
    } catch {
      /* garde le texte de la suggestion */
    }
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
          {suggestions.map((s) => (
            <li key={s.placeId}>
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
