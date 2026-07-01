import type { SearchResult } from "@/lib/search";
import { SearchResultCard } from "./SearchResultCard";

type SearchResultsListProps = {
  results: SearchResult[];
  onResultClick?: () => void;
};

export function SearchResultsList({
  results,
  onResultClick,
}: SearchResultsListProps) {
  if (results.length === 0) {
    return (
      <div className="py-5 text-center">
        <p className="text-sm font-semibold text-slate-700">
          Rezultatų nerasta
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Pabandykite kitą raktažodį.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {results.map((result) => (
        <SearchResultCard
          key={`${result.type}-${result.url}`}
          result={result}
          onClick={onResultClick}
        />
      ))}
    </div>
  );
}