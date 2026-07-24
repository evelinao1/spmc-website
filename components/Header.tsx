"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navigation } from "@/data/navigation";
import { DesktopNavigation } from "@/components/header/DesktopNavigation";
import { SearchButton } from "@/components/header/SearchButton";
import { TamoButton } from "@/components/header/TamoButton";
import { SearchDialog } from "@/components/search/SearchDialog";

function isPathActive(pathname: string, href?: string) {
  if (!href || href === "#") {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function openSearch() {
    setIsOpen(false);
    setIsSearchOpen(true);
  }

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`shrink-0 text-lg font-bold tracking-tight transition-colors ${
              pathname === "/"
                ? "text-blue-700"
                : "text-slate-900 hover:text-blue-700"
            }`}
          >
            ŠPMC
          </Link>

          <DesktopNavigation />

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <SearchButton onClick={() => setIsSearchOpen(true)} />
            </div>

            <div className="hidden lg:block">
              <TamoButton />
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:border-blue-300 hover:text-blue-700 lg:hidden"
            >
              {isOpen ? "Uždaryti" : "Meniu"}
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden"
          >
            <nav
              aria-label="Mobilioji navigacija"
              className="mx-auto flex max-w-7xl flex-col gap-2"
            >
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                aria-current={pathname === "/" ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  pathname === "/"
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-900 hover:bg-slate-50 hover:text-blue-700"
                }`}
              >
                Pradžia
              </Link>

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
                    <div
                      key={item.title}
                      className={`rounded-lg px-3 py-2 ${
                        itemIsActive ? "bg-blue-50" : ""
                      }`}
                    >
                      <p
                        className={`mb-2 text-sm font-semibold ${
                          itemIsActive
                            ? "text-blue-700"
                            : "text-slate-900"
                        }`}
                      >
                        {item.title}
                      </p>

                      <div className="flex flex-col gap-1 border-l border-slate-200 pl-3">
                        {item.children?.map((child) => {
                          const childIsActive = isPathActive(
                            pathname,
                            child.href
                          );

                          return (
                            <Link
                              key={child.href ?? child.title}
                              href={child.href ?? "#"}
                              onClick={() => setIsOpen(false)}
                              aria-current={
                                childIsActive ? "page" : undefined
                              }
                              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                                childIsActive
                                  ? "bg-white font-semibold text-blue-700 shadow-sm"
                                  : "font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                              }`}
                            >
                              {child.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href ?? item.title}
                    href={item.href ?? "#"}
                    onClick={() => setIsOpen(false)}
                    aria-current={itemIsActive ? "page" : undefined}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                      itemIsActive
                        ? "bg-blue-50 font-semibold text-blue-700"
                        : "font-medium text-slate-800 hover:bg-slate-50 hover:text-blue-700"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}

              <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                <SearchButton onClick={openSearch} />
                <TamoButton />
              </div>
            </nav>
          </div>
        )}
      </header>

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}