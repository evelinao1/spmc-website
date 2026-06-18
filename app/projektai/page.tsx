import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { fetchFromStrapi } from "@/lib/strapi";

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
  "Kiti projektai",
];

export default async function ProjectsPage({ searchParams }: Props) {
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
          title="Projektai"
          description="Šilutės profesinio mokymo centro vykdomi projektai."
        />

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex flex-wrap gap-3">
            {categories.map((item) => {
              const isActive =
                (!category && item === "Visi projektai") || category === item;

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
                      ? "border-blue-700 bg-blue-700 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
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
                    <p className="mb-3 text-sm font-medium text-blue-700">
                      {project.category}
                    </p>
                  )}

                  <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                    {project.title}
                  </h2>

                  {project.summary && (
                    <p className="text-slate-600">{project.summary}</p>
                  )}

                  <p className="mt-4 font-medium text-blue-700">
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