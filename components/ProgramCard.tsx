import Image from "next/image";
import Link from "next/link";

import {
  getProgramCategoryLabel,
  type Program,
} from "@/lib/programs";

type ProgramCardProps = {
  program: Program;
};

function getMediaUrl(url?: string | null) {
  if (!url) {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const imageUrl = getMediaUrl(program.image?.url);

  return (
    <Link
      href={`/programos/${program.slug}`}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {imageUrl && (
        <div className="relative h-56 w-full">
          <Image
            src={imageUrl}
            alt={program.image?.alternativeText || program.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <p className="mb-3 text-sm font-semibold text-blue-700">
          {getProgramCategoryLabel(program.category)}
        </p>

        <h2 className="mb-3 text-xl font-bold text-slate-900">
          {program.title}
        </h2>

        {program.shortDescription && (
          <p className="line-clamp-3 text-sm leading-6 text-slate-600">
            {program.shortDescription}
          </p>
        )}
      </div>
    </Link>
  );
}