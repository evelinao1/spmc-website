"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import { searchItems, type SearchItem } from "@/lib/search";
import { SearchResultsList } from "@/components/search/SearchResultsList";

type SearchDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const popularSearches = [
  "Stipendijos",
  "Priėmimo terminai",
  "Tvarkaraščiai",
  "Programos",
  "Kontaktai",
];

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    async function loadItems() {
      const response = await fetch("/api/search");

      if (!response.ok) {
        throw new Error("Nepavyko užkrauti paieškos duomenų.");
      }

      const searchItemsData = (await response.json()) as SearchItem[];

      if (!cancelled) {
        setItems(searchItemsData);
      }
    }

    loadItems();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Enter" && query.trim()) {
        event.preventDefault();
        showAllResults();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    if (!debouncedQuery) return [];

    return searchItems(items, debouncedQuery, 6);
  }, [items, debouncedQuery]);

  function showAllResults() {
    const cleanQuery = query.trim();

    if (!cleanQuery) return;

    onClose();
    router.push(`/paieska?q=${encodeURIComponent(cleanQuery)}`);
  }

  if (typeof document === "undefined" || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2147483647,
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(6px)",
        padding: "96px 16px 0",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
        className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
          <span className="text-lg text-slate-400">🔍</span>

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ieškokite puslapių, naujienų, programų, darbuotojų..."
            className="w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
          />

          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-50"
          >
            Esc
          </button>
        </div>

        <div className="px-6 py-5">
          {!query.trim() && (
            <div className="py-5">
              <p className="text-sm font-semibold text-slate-700">
                Populiarios paieškos
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <p className="mt-6 text-xs text-slate-400">
                Arba pradėkite rašyti paieškos frazę.
              </p>
            </div>
          )}

          {query.trim() && (
            <>
              <SearchResultsList results={results} onResultClick={onClose} />

              {results.length > 0 && (
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={showAllResults}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    🔎 Rodyti visus rezultatus
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}