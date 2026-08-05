import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProgramCard } from "@/components/ProgramCard";

import {
  getProgramCategoryLabel,
  getPrograms,
  programCategories,
  type ProgramCategory,
} from "@/lib/programs";
import { createMetadata } from "@/lib/seo";

type ProgramosPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

function getActiveCategory(category?: string): ProgramCategory | null {
  return programCategories.includes(category as ProgramCategory)
    ? (category as ProgramCategory)
    : null;
}

export async function generateMetadata({
  searchParams,
}: ProgramosPageProps): Promise<Metadata> {
  const { category } = await searchParams;
  const activeCategory = getActiveCategory(category);

  if (activeCategory) {
    const categoryLabel = getProgramCategoryLabel(activeCategory);

    return createMetadata({
      title: `${categoryLabel} mokymo programos`,
      description: `Atraskite Šilutės profesinio mokymo centro kategorijos „${categoryLabel}“ mokymo programas, jų trukmę, kvalifikacijas ir mokymosi galimybes.`,
      path: "/programos",
      noIndex: true,
    });
  }

  return createMetadata({
    title: "Mokymo programos",
    description:
      "Atraskite Šilutės profesinio mokymo centro profesinio mokymo programas pagal išsilavinimą, poreikius ir karjeros tikslus.",
    path: "/programos",
    type: "website",
  });
}

export default async function ProgramosPage({
  searchParams,
}: ProgramosPageProps) {
  const { category } = await searchParams;
  const programs = await getPrograms();

  const activeCategory = getActiveCategory(category);

  const filteredPrograms = activeCategory
    ? programs.filter((program) => program.category === activeCategory)
    : programs;

  const pageTitle = activeCategory
    ? getProgramCategoryLabel(activeCategory)
    : "Mokymo programos";

  const pageDescription = activeCategory
    ? `Peržiūrėkite kategorijos „${getProgramCategoryLabel(
        activeCategory
      )}“ mokymo programas.`
    : "Atraskite profesinio mokymo programas pagal savo išsilavinimą, poreikius ir karjeros tikslus.";

  return (
    <>
      <Header />

      <main>
        <PageHero title={pageTitle} description={pageDescription} />

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
              ? `${getProgramCategoryLabel(activeCategory)} (${
                  filteredPrograms.length
                })`
              : `Visos programos (${filteredPrograms.length})`}
          </p>

          {filteredPrograms.length === 0 ? (
            <p className="text-slate-600">
              Šioje kategorijoje programų šiuo metu nėra.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}