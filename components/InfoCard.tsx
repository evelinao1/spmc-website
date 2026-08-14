"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { colors } from "@/lib/theme";

type InfoCardProps = {
  title: string;
  children: ReactNode;
  href?: string;
};

export function InfoCard({
  title,
  children,
  href,
}: InfoCardProps) {
  const card = (
    <div
      className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      onMouseEnter={(event) => {
        const title = event.currentTarget.querySelector("h3");

        if (title) {
          title.style.color = colors.primary;
        }
      }}
      onMouseLeave={(event) => {
        const title = event.currentTarget.querySelector("h3");

        if (title) {
          title.style.color = colors.text;
        }
      }}
    >
      <h3
        className="text-xl font-semibold transition-colors duration-200"
        style={{ color: colors.text }}
      >
        {title}
      </h3>

      <div className="mt-3 text-slate-600">
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {card}
      </Link>
    );
  }

  return card;
}