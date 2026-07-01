import type { SearchResult } from "@/lib/search";
import { SearchResultsList } from "./SearchResultsList";

type Props = {
  results: SearchResult[];
};

const SECTION_ORDER = [
  "page",
  "program",
  "employee",
  "news",
  "project",
  "announcement",
] as const;

const SECTION_LABELS: Record<string, string> = {
  page: "📄 Puslapiai",
  program: "🎓 Programos",
  employee: "👤 Darbuotojai",
  news: "📰 Naujienos",
  project: "📁 Projektai",
  announcement: "📢 Skelbimai",
};

export function SearchResultsGrouped({ results }: Props) {
  const grouped = Object.groupBy(results, (item) => item.type);

  return (
    <div className="space-y-10">
      {SECTION_ORDER.map((type) => {
        const items = grouped[type];

        if (!items?.length) return null;

        return (
          <section key={type}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {SECTION_LABELS[type]}
              </h2>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                {items.length}
              </span>
            </div>

            <SearchResultsList results={items} />
          </section>
        );
      })}
    </div>
  );
}