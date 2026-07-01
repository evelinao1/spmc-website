"use client";

import Link from "next/link";
import { useState } from "react";

import { navigation } from "@/data/navigation";
import { DesktopNavigation } from "@/components/header/DesktopNavigation";
import { SearchButton } from "@/components/header/SearchButton";
import { TamoButton } from "@/components/header/TamoButton";
import { SearchDialog } from "@/components/search/SearchDialog";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold tracking-tight text-slate-900 hover:text-blue-700"
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
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 lg:hidden"
            >
              {isOpen ? "Uždaryti" : "Meniu"}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Pradžia
              </Link>

              {navigation.map((item) =>
                item.children?.length ? (
                  <div key={item.title} className="rounded-lg px-3 py-2">
                    <p className="mb-2 text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>

                    <div className="flex flex-col gap-1 border-l border-slate-200 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href ?? child.title}
                          href={child.href ?? "#"}
                          onClick={() => setIsOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href ?? item.title}
                    href={item.href ?? "#"}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  >
                    {item.title}
                  </Link>
                )
              )}

              <div className="mt-2 flex items-center justify-between">
                <SearchButton onClick={() => setIsSearchOpen(true)} />
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