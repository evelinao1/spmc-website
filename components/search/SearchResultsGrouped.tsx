import type { IconType } from "react-icons";
import {
  FiBookOpen,
  FiFileText,
  FiFolder,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";

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

const SECTION_INFO: Record<
  string,
  {
    label: string;
    icon: IconType;
  }
> = {
  page: {
    label: "Puslapiai",
    icon: FiFileText,
  },
  program: {
    label: "Programos",
    icon: FiBookOpen,
  },
  employee: {
    label: "Darbuotojai",
    icon: FiUser,
  },
  news: {
    label: "Naujienos",
    icon: FiFileText,
  },
  project: {
    label: "Projektai",
    icon: FiFolder,
  },
  announcement: {
    label: "Skelbimai",
    icon: FiMessageSquare,
  },
};

export function SearchResultsGrouped({ results }: Props) {
  const grouped = Object.groupBy(results, (item) => item.type);

  return (
    <div className="space-y-10">
      {SECTION_ORDER.map((type) => {
        const items = grouped[type];

        if (!items?.length) return null;

        const sectionInfo = SECTION_INFO[type];
        const Icon = sectionInfo.icon;

        return (
          <section key={type}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <Icon className="h-5 w-5 text-[#154280]" />
                <span>{sectionInfo.label}</span>
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