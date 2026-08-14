"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type MediaFile = {
  id: number;
  name: string;
  url: string;
  alternativeText?: string | null;
};

type Program = {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string | null;
  category?: string | null;
  image?: MediaFile | null;
};

type CampusProgramsProps = {
  programs: Program[];
  strapiUrl?: string;
};

function getMediaUrl(
  url?: string | null,
  strapiUrl?: string
) {
  if (!url) {
    return null;
  }

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `${strapiUrl}${url}`;
}

export function CampusPrograms({
  programs,
  strapiUrl,
}: CampusProgramsProps) {
  const [showAll, setShowAll] = useState(false);

  const visiblePrograms = showAll
    ? programs
    : programs.slice(0, 6);

  const hasMorePrograms = programs.length > 6;

  return (
    <section className="mt-14">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Šiame padalinyje vykdomos programos ({programs.length})
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePrograms.map((program) => {
          const programImageUrl = getMediaUrl(
            program.image?.url,
            strapiUrl
          );

          return (
            <Link
              key={program.id}
              href={`/programos/${program.slug}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {programImageUrl && (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={programImageUrl}
                    alt={
                      program.image?.alternativeText ||
                      program.title
                    }
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  {program.title}
                </h3>

                {program.shortDescription && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {program.shortDescription}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {hasMorePrograms && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() =>
              setShowAll((current) => !current)
            }
            className="text-sm font-semibold text-[#154280] transition hover:text-[#10376B]"
          >
            {showAll
              ? "Rodyti mažiau ↑"
              : `Rodyti visas programas (${programs.length}) ↓`}
          </button>
        </div>
      )}
    </section>
  );
}