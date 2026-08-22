"use client";

import * as React from "react";
import { Check, ChevronDown, MapPin, Plane, LocateFixed } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  searchLocations,
  formatLocation,
  type AirportItem,
} from "@/lib/airports";

const EMPTY_LOCATIONS: AirportItem[] = [];

/**
 * Campo de localização com autocomplete: sugere aeroportos (código IATA) e
 * aeródromos/pistas de pouso enquanto o usuário digita. O valor enviado no
 * formulário é sempre o texto digitado/confirmado pelo usuário — as sugestões
 * apenas facilitam o preenchimento, sem travar a digitação livre
 * (helipontos, pistas particulares etc.).
 */
export function LocationInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  focusedOnSelect,
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  /** Ao selecionar uma sugestão, move o foco para o próximo campo (chain). */
  focusedOnSelect?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const query = value.trim();
  const results = React.useMemo(
    () => (query.length >= 2 ? searchLocations(query) : EMPTY_LOCATIONS),
    [query]
  );
  const showDropdown = open && query.length >= 2;

  // Fecha ao clicar fora
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Timer do blur: dá tempo ao clique na sugestão (o mousedown da opção é
  // prevenido, então o input só "perde o foco" quando o document mousedown
  // fechar — aqui tratamos o clique container vs fora)
  const blurTimer = React.useRef<number | null>(null);
  React.useEffect(() => {
    return () => {
      if (blurTimer.current !== null) window.clearTimeout(blurTimer.current);
    };
  }, []);

  // Garante que o item ativo fique visível na lista rolável
  React.useEffect(() => {
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function isSelected(item: AirportItem): boolean {
    return value.trim().toLowerCase() === item.name.toLowerCase();
  }

  function selectItem(item: AirportItem) {
    onChange(formatLocation(item));
    setOpen(false);
    setActiveIndex(-1);
    focusedOnSelect?.();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      const item = results[activeIndex];
      if (item) {
        e.preventDefault();
        selectItem(item);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div className="grid min-w-0 gap-1" ref={rootRef}>
      <label htmlFor={id} className="text-[0.8125rem] font-semibold leading-none text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          autoComplete={id === "origin" || id === "destination" ? "address-level2" : "off"}
          placeholder={placeholder}
          maxLength={120}
          className={cn(
            "h-11 w-full rounded-lg border border-hairline-strong bg-white px-3.5 pr-10 text-base text-ink placeholder:text-ink-muted outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15",
            error && "border-ember-500 ring-2 ring-ember-500/10"
          )}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // Fecha depois do clique na sugestão (mousedown com preventDefault
            // mantém o foco no input durante o clique).
            blurTimer.current = window.setTimeout(() => {
              setOpen(false);
              onBlur?.();
            }, 120);
          }}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={`${id}-listbox`}
          aria-activedescendant={
            showDropdown && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
          }
          aria-autocomplete="list"
          aria-label={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />

        {showDropdown ? (
          <ul
            id={`${id}-listbox`}
            ref={listRef}
            role="listbox"
            aria-label={`Sugestões para ${label}`}
            className="dropdown-panel absolute left-0 right-0 z-30 mt-2 max-h-[min(18rem,calc(100dvh-12rem))] overflow-y-auto rounded-xl border border-hairline bg-white p-1.5 [scrollbar-width:thin]"
          >
            {results.length === 0 ? (
              <li
                  role="option"
                  aria-disabled="true"
                  aria-selected={false}
                  className="cursor-default px-3 py-2.5 text-sm text-ink-muted"
                >
                  Nenhum aeroporto encontrado. Você pode digitar o local livremente.
                </li>
            ) : (
              results.map((item, i) => {
                const active = i === activeIndex;
                const hasCode = item.code.length > 0;
                return (
                  <li
                    key={`${item.code || "pista"}-${item.name}`}
                    id={`${id}-option-${i}`}
                    role="option"
                    tabIndex={-1}
                    aria-selected={active || isSelected(item)}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => selectItem(item)}
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                      active ? "bg-accent-tint" : "hover:bg-paper"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full",
                        item.type === "airport"
                          ? "bg-accent/10 text-accent"
                          : "bg-mist-deep text-ink-muted"
                      )}
                    >
                      {item.type === "airport" ? (
                        hasCode ? (
                          <Plane className="size-3.5" />
                        ) : (
                          <MapPin className="size-3.5" />
                        )
                      ) : (
                        <LocateFixed className="size-3.5" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "truncate text-[0.92rem]",
                            isSelected(item) ? "font-semibold text-accent" : "font-medium text-ink"
                          )}
                        >
                          {item.name}
                        </span>
                        {item.type === "aerodrome" ? (
                          <span className="shrink-0 rounded-full bg-mist px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-ink-muted">
                            Pista
                          </span>
                        ) : null}
                      </span>
                      <span className="block truncate text-xs text-ink-muted">
                        {hasCode ? `${item.code} · ` : ""}
                        {item.city}/{item.state}
                      </span>
                    </span>
                    {isSelected(item) ? (
                      <Check className="ml-auto size-4 shrink-0 text-accent" />
                    ) : null}
                  </li>
                );
              })
            )}
          </ul>
        ) : null}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 min-h-4 text-xs text-ember-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}