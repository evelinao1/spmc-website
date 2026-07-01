"use client";

import Link from "next/link";
import type { NavigationItem } from "@/data/navigation";

type NavigationDropdownProps = {
  item: NavigationItem;
};

export function NavigationDropdown({ item }: NavigationDropdownProps) {
  if (!item.children?.length) return null;

  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-blue-700"
      >
        {item.title}
        <span className="text-xs transition group-hover:rotate-180">▾</span>
      </button>

      <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
        <div className="min-w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          {item.children.map((child) => (
            <Link
              key={child.href ?? child.title}
              href={child.href ?? "#"}
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-blue-700"
            >
              {child.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}