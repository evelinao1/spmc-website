import type { Metadata } from "next";
import Link from "next/link";

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
    category?: string;
  }>;
};

const categories = [
  "Visi projektai",
  "Erasmus+",
  "ES finansuojami projektai",
  "LR valstybės finansuojami projektai",
];

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { category } = await searchParams;

  if (category && category !== "Visi projektai") {
    return createMetadata({
      title: `${category} projektai`,
      description: `Šilutės profesinio mokymo centro kategorijos „${category}“ projektai.`,
      path: "/projektai",
      noIndex: true,
    });
  }

  return createMetadata({
    title: "Projektai",
    description:
      "Šilutės profesinio mokymo centro vykdomi projektai, partnerystės, Erasmus+ iniciatyvos ir Europos Sąjungos finansuojamos veiklos.",
    path: "/projektai",
    type: "website",
  });
}

export default async function ProjectsPage({
  searchParams,
}: Props) {
  const { category } = await searchParams;

  const categoryFilter =
    category && category !== "Visi projektai"
      ? `&filters[category][$eq]=${encodeURIComponent(category)}`
      : "";

  const data = await fetchFromStrapi(
    `/projects?filters[active][$eq]=true${categoryFilter}&sort=order:asc`
  );

  const projects = data.data as Project[];

  return (
    <>
      <Header />

      <main>
        <PageHero
          title={
            category && category !== "Visi projektai"
              ? category
              : "Projektai"
          }
          description="Šilutės profesinio mokymo centro vykdomi projektai."
        />

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex flex-wrap gap-3">
            {categories.map((item) => {
              const isActive =
                (!category && item === "Visi projektai") ||
                category === item;

              const href =
                item === "Visi projektai"
                  ? "/projektai"
                  : `/projektai?category=${encodeURIComponent(item)}`;

              return (
                <Link
                  key={item}
                  href={href}
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
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}