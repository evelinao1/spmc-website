import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  getPrograms,
  getProgramCategoryLabel,
  programCategories,
  type ProgramCategory,
} from "@/lib/programs";

type ProgramosPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

function getMediaUrl(url?: string) {
  if (!url) return null;
  if (url.startsWith("http")) return url;

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export default async function ProgramosPage({
  searchParams,
}: ProgramosPageProps) {
  const { category } = await searchParams;
  const programs = await getPrograms();

  const activeCategory = programCategories.includes(category as ProgramCategory)
    ? (category as ProgramCategory)
    : null;

  const filteredPrograms = activeCategory
    ? programs.filter((program) => program.category === activeCategory)
    : programs;

  return (
    <>
      <Header />

      <main>
        <PageHero
          title="Mokymo programos"
          description="Atraskite profesinio mokymo programas pagal savo išsilavinimą, poreikius ir karjeros tikslus."
        />

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex flex-wrap gap-3">
            <Link
              href="/programos"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                !activeCategory
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Visos
            </Link>

            {programCategories.map((item) => (
              <Link
                key={item}
                href={`/programos?category=${encodeURIComponent(item)}`}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeCategory === item
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {getProgramCategoryLabel(item)}
              </Link>
            ))}
          </div>

          <p className="mb-8 text-sm font-medium text-slate-600">
            {activeCategory
              ? `${getProgramCategoryLabel(activeCategory)} (${filteredPrograms.length})`
              : `Visos programos (${filteredPrograms.length})`}
          </p>

          {filteredPrograms.length === 0 ? (
            <p className="text-slate-600">
              Šioje kategorijoje programų šiuo metu nėra.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPrograms.map((program) => {
                const imageUrl = getMediaUrl(program.image?.url);

                return (
                  <Link
                    key={program.id}
                    href={`/programos/${program.slug}`}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    {imageUrl && (
                      <div className="relative h-56 w-full">
                        <Image
                          src={imageUrl}
                          alt={program.image?.alternativeText || program.title}
                          fill
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
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}