"use client";

import Link from "next/link";
import type { NavigationItem } from "@/data/navigation";

type NavigationDropdownProps = {
  item: NavigationItem;
  isActive: boolean;
  pathname: string;
};

function isPathActive(pathname: string, href?: string) {
  if (!href || href === "#") {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavigationDropdown({
  item,
  isActive,
  pathname,
}: NavigationDropdownProps) {
  if (!item.children?.length) {
    return null;
  }

  return (
    <div className="group relative">
      <button
        type="button"
        className={`relative flex items-center gap-1 py-2 text-sm transition-colors ${
          isActive
            ? "font-semibold text-blue-700"
            : "font-medium text-slate-700 hover:text-blue-700"
        }`}
      >
        {item.title}

        <span
          aria-hidden="true"
          className="text-xs transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
        >
          ▾
        </span>

        <span
          aria-hidden="true"
          className={`absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-blue-700 transition-transform ${
            isActive ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </button>

      <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="min-w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          {item.children.map((child) => {
            const childIsActive = isPathActive(pathname, child.href);

            return (
              <Link
                key={child.href ?? child.title}
                href={child.href ?? "#"}
                aria-current={childIsActive ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  childIsActive
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-slate-700 hover:bg-slate-100 hover:text-blue-700"
                }`}
              >
                {child.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}