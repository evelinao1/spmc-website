import Link from "next/link";
import type { SearchItem, SearchResult } from "@/lib/search";

type SearchResultCardProps = {
  result: SearchResult;
  onClick?: () => void;
};

function getTypeLabel(type: SearchItem["type"]) {
  switch (type) {
    case "program":
      return "🎓 Programa";
    case "news":
      return "📰 Naujiena";
    case "employee":
      return "👤 Darbuotojas";
    case "project":
      return "📁 Projektas";
    case "announcement":
      return "📢 Skelbimas";
    default:
      return "📄 Puslapis";
  }
}

export function SearchResultCard({ result, onClick }: SearchResultCardProps) {
  return (
    <Link
      href={result.url}
      onClick={onClick}
      className="block rounded-xl border border-slate-100 px-4 py-3 transition hover:border-blue-200 hover:bg-blue-50"
    >
      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-600">
        {getTypeLabel(result.type)}
      </div>

      <p className="text-sm font-semibold text-slate-900">{result.title}</p>

      {result.description && (
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {result.description}
        </p>
      )}

      <p className="mt-2 text-xs text-slate-400">{result.url}</p>
    </Link>
  );
}