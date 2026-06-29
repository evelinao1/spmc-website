"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { searchItems } from "@/lib/search/search";
import type { SearchItem } from "@/lib/search/types";

const typeLabels: Record<SearchItem["type"], string> = {
  page: "Puslapis",
  news: "Naujiena",
  program: "Programa",
  project: "Projektas",
  employee: "Darbuotojas",
  campus: "Padalinys",
  announcement: "Skelbimas",
};

export function SearchBox() {
  const [items, setItems] = useState<SearchItem[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/search")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => setItems([]));
  }, []);

  const results = useMemo(() => {
    return searchItems(items, query, 6);
  }, [items, query]);

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Ieškoti..."
        className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      {isOpen && query.length >= 2 && (
        <div className="absolute right-0 top-12 z-50 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto py-2">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={result.url}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="block px-4 py-3 hover:bg-slate-50"
                >
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                    {typeLabels[result.type]}
                  </div>

                  <div className="font-medium text-slate-900">
                    {result.title}
                  </div>

                  {result.description && (
                    <div className="mt-1 line-clamp-2 text-sm text-slate-600">
                      {result.description}
                    </div>
                  )}
                </Link>
              ))}

              <Link
                href={`/paieska?q=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="block border-t border-slate-100 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                Rodyti visus rezultatus →
              </Link>
            </div>
          ) : (
            <div className="px-4 py-4 text-sm text-slate-600">
              Rezultatų nerasta.
            </div>
          )}
        </div>
      )}
    </div>
  );
}