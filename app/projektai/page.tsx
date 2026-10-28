import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

import { fetchFromStrapi } from "@/lib/strapi";
import { createMetadata } from "@/lib/seo";
import { colors } from "@/lib/theme";

type Project = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  category?: string;
};

type Props = {
  searchParams: Promise<{
    category?: string | string[];
    page?: string | string[];
  }>;
};

const PAGE_SIZE = 12;

const categories = [
  "Visi projektai",
  "Erasmus+",
  "ES finansuojami projektai",
  "LR valstybės finansuojami projektai",
];

function getActiveCategory(value?: string | string[]): string | null {
  if (
    typeof value !== "string" ||
    value === "Visi projektai" ||
    !categories.includes(value)
  ) {
    return null;
  }

  return value;
}

function getPageNumber(value?: string | string[]): number {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) {
    return 1;
  }

  const page = Number(value);

  return Number.isSafeInteger(page) ? page : 1;
}

function getPageHref(page: number, category: string | null): string {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query ? `/projektai?${query}` : "/projektai";
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const activeCategory = getActiveCategory(params.category);
  const currentPage = getPageNumber(params.page);

  const baseTitle = activeCategory
    ? `${activeCategory} projektai`
    : "Projektai";

  return createMetadata({
    title:
      currentPage > 1
        ? `${baseTitle} – ${currentPage} puslapis`
        : baseTitle,
    description: activeCategory
      ? `Šilutės profesinio mokymo centro kategorijos „${activeCategory}“ projektai.`
      : "Šilutės profesinio mokymo centro vykdomi projektai, partnerystės, Erasmus+ iniciatyvos ir Europos Sąjungos finansuojamos veiklos.",
    path: getPageHref(currentPage, activeCategory),
    type: "website",
    noIndex: Boolean(activeCategory),
  });
}

export default async function ProjectsPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  const activeCategory = getActiveCategory(params.category);
  const currentPage = getPageNumber(params.page);

  const categoryFilter = activeCategory
    ? `&filters[category][$eq]=${encodeURIComponent(activeCategory)}`
    : "";

  const response = await fetchFromStrapi(
    `/projects?filters[active][$eq]=true${categoryFilter}&sort[0]=order:asc&sort[1]=id:asc&pagination[page]=${currentPage}&pagination[pageSize]=${PAGE_SIZE}&pagination[withCount]=true`
  );

  if (!Array.isArray(response.data)) {
    throw new Error("Nepavyko gauti projektų sąrašo.");
  }

  const pagination = response.meta?.pagination;

  if (
    !pagination ||
    !Number.isInteger(pagination.pageCount) ||
    !Number.isInteger(pagination.total)
  ) {
    throw new Error(
      "Projektų atsakyme nėra puslapiavimo informacijos."
    );
  }

  const projects = response.data as Project[];
  const pageCount: number = pagination.pageCount;
  const total: number = pagination.total;

  if (currentPage > Math.max(1, pageCount)) {
    notFound();
  }

  const firstProject = (currentPage - 1) * PAGE_SIZE + 1;
  const lastProject = firstProject + projects.length - 1;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="w-full flex-1">
        <PageHero
          title={activeCategory || "Projektai"}
          description="Šilutės profesinio mokymo centro vykdomi projektai."
        />

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex flex-wrap gap-3">
            {categories.map((item) => {
              const itemCategory =
                item === "Visi projektai" ? null : item;

              const isActive = activeCategory === itemCategory;

              return (
                <Link
                  key={item}
                  href={getPageHref(1, itemCategory)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: colors.primary,
                          borderColor: colors.primary,
                        }
                      : undefined
                  }
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {projects.length === 0 ? (
            <p className="text-slate-600">
              Šioje kategorijoje projektų nėra.
            </p>
          ) : (
            <>
              <p className="mb-6 text-sm text-slate-600">
                Rodomi {firstProject}–{lastProject} iš {total} projektų
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projektai/${project.slug}`}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    {project.category && (
                      <p
                        className="mb-3 text-sm font-medium"
                        style={{ color: colors.primary }}
                      >
                        {project.category}
                      </p>
                    )}

                    <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                      {project.title}
                    </h2>

                    {project.summary && (
                      <p className="text-slate-600">
                        {project.summary}
                      </p>
                    )}

                    <p
                      className="mt-4 font-medium"
                      style={{ color: colors.primary }}
                    >
                      Skaityti daugiau →
                    </p>
                  </Link>
                ))}
              </div>

              {pageCount > 1 && (
                <nav
                  aria-label="Projektų puslapiai"
                  className="mt-10 flex flex-wrap items-center justify-center gap-2"
                >
                  {currentPage > 1 && (
                    <Link
                      href={getPageHref(
                        currentPage - 1,
                        activeCategory
                      )}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      ← Ankstesnis
                    </Link>
                  )}

                  {Array.from(
                    { length: pageCount },
                    (_, index) => index + 1
                  ).map((page) => {
                    const isActive = page === currentPage;

                    return (
                      <Link
                        key={page}
                        href={getPageHref(page, activeCategory)}
                        aria-label={`${page} puslapis`}
                        aria-current={
                          isActive ? "page" : undefined
                        }
                        className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition ${
                          isActive
                            ? "text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                        style={
                          isActive
                            ? {
                                backgroundColor: colors.primary,
                                borderColor: colors.primary,
                              }
                            : undefined
                        }
                      >
                        {page}
                      </Link>
                    );
                  })}

                  {currentPage < pageCount && (
                    <Link
                      href={getPageHref(
                        currentPage + 1,
                        activeCategory
                      )}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Kitas →
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}