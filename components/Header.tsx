"use client";

import { useState } from "react";
import Link from "next/link";
import { navigation } from "@/data/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-slate-900 hover:text-blue-700"
        >
          ŠPMC
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-blue-700">
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://www.tamo.lt"
            className="hidden rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white lg:inline-flex"
          >
            TAMO
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 lg:hidden"
          >
            {isOpen ? "Uždaryti" : "Meniu"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Pradžia
            </Link>

            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                {item.title}
              </Link>
            ))}

            <a
              href="https://www.tamo.lt"
              className="mt-2 rounded-xl bg-blue-900 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              TAMO
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}