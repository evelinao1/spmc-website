import Link from "next/link";
import {
  FiBookOpen,
  FiBriefcase,
  FiFileText,
  FiFolder,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";

import type { SearchItem, SearchResult } from "@/lib/search";

type SearchResultCardProps = {
  result: SearchResult;
  onClick?: () => void;
};

function getTypeInfo(type: SearchItem["type"]) {
  switch (type) {
    case "program":
      return {
        label: "Programa",
        icon: FiBookOpen,
      };

    case "news":
      return {
        label: "Naujiena",
        icon: FiFileText,
      };

    case "employee":
      return {
        label: "Darbuotojas",
        icon: FiUser,
      };

    case "project":
      return {
        label: "Projektas",
        icon: FiFolder,
      };

    case "announcement":
      return {
        label: "Skelbimas",
        icon: FiMessageSquare,
      };

    default:
      return {
        label: "Puslapis",
        icon: FiFileText,
      };
  }
}

export function SearchResultCard({
  result,
  onClick,
}: SearchResultCardProps) {
  const typeInfo = getTypeInfo(result.type);
  const Icon = typeInfo.icon;

  return (
    <Link
      href={result.url}
      onClick={onClick}
      className="block rounded-xl border border-slate-100 px-4 py-3 transition hover:border-[#154280]/25 hover:bg-[#154280]/5"
    >
      <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#154280]">
        <Icon className="h-3.5 w-3.5" />
        <span>{typeInfo.label}</span>
      </div>

      <p className="text-sm font-semibold text-slate-900">
        {result.title}
      </p>

      {result.description && (
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {result.description}
        </p>
      )}

      <p className="mt-2 text-xs text-slate-400">
        {result.url}
      </p>
    </Link>
  );
}