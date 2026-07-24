"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/data/navigation";
import { NavigationDropdown } from "./NavigationDropdown";

function isPathActive(pathname: string, href?: string) {
  if (!href || href === "#") {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex"
      aria-label="Pagrindinė navigacija"
    >
      {navigation.map((item) => {
        const hasChildren = Boolean(item.children?.length);

        const childIsActive =
          item.children?.some((child) =>
            isPathActive(pathname, child.href)
          ) ?? false;

        const itemIsActive =
          isPathActive(pathname, item.href) || childIsActive;

        if (hasChildren) {
          return (
            <NavigationDropdown
              key={item.title}
              item={item}
              isActive={itemIsActive}
              pathname={pathname}
            />
          );
        }

        return (
          <Link
            key={item.href ?? item.title}
            href={item.href ?? "#"}
            aria-current={itemIsActive ? "page" : undefined}
            className={`relative py-2 transition-colors ${
              itemIsActive
                ? "font-semibold text-blue-700"
                : "text-slate-700 hover:text-blue-700"
            }`}
          >
            {item.title}

            <span
              className={`absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-blue-700 transition-transform ${
                itemIsActive ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}