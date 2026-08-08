import Image from "next/image";
import Link from "next/link";
import { colors } from "@/lib/theme";

import { getFileUrl } from "@/lib/news";

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishDate?: string | null;
  coverImage?: {
    url: string;
    alternativeText?: string | null;
  } | null;
};

type NewsSectionProps = {
  news: NewsItem[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("lt-LT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function NewsSection({ news }: NewsSectionProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: colors.primary }}
            >
              Naujienos
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-900">
              Kas vyksta centre?
            </h2>
          </div>

         <Link
            href="/naujienos"
            className="inline-flex w-fit font-medium transition hover:underline"
            style={{ color: colors.primary }}
          >
            Visos naujienos →
          </Link>
        </div>

        {news.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((item) => {
              const imageUrl = getFileUrl(item.coverImage?.url);

              return (
                <Link
                  key={item.id}
                  href={`/naujienos/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {imageUrl && (
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={
                          item.coverImage?.alternativeText || item.title
                        }
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    {item.publishDate && (
                      <time
                        dateTime={item.publishDate}
                        className="mb-4 block text-sm text-slate-500"
                      >
                        {formatDate(item.publishDate)}
                      </time>
                    )}

                    <h3 className="text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    {item.excerpt && (
                      <p className="mt-3 leading-6 text-slate-600">
                        {item.excerpt}
                      </p>
                    )}

                    <p
                      className="mt-auto pt-5 font-medium"
                      style={{ color: colors.primary }}
                    >
                      Skaityti daugiau →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
            Šiuo metu naujų įrašų nėra.
          </p>
        )}
      </div>
    </section>
  );
}