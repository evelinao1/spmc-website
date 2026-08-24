import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProgramCard } from "@/components/ProgramCard";
import { Breadcrumb } from "@/components/Breadcrumb";

import { getPrograms } from "@/lib/programs";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Profesijos | Įtraukusis ugdymas",
  description:
    "Profesinio mokymo programos specialiųjų ugdymosi poreikių turintiems mokiniams Šilutės profesinio mokymo centre.",
  path: "/itraukusis-ugdymas/profesijos",
  type: "website",
});

export default async function ProfesijosPage() {
  const programs = await getPrograms();

  const supPrograms = programs.filter(
    (program) => program.category === "SUP"
  );

  return (
    <>
      <Header />

      <main>
        <PageHero
          title="Profesijos"
          description="Profesinio mokymo galimybės specialiųjų ugdymosi poreikių turintiems mokiniams."
        />

        <section className="mx-auto max-w-7xl px-6 pb-16 pt-6">
          <Breadcrumb
            items={[
              { label: "Pradžia", href: "/" },
              {
                label: "Įtraukusis ugdymas",
                href: "/itraukusis-ugdymas",
              },
              { label: "Profesijos" },
            ]}
          />

          <div className="mt-10">
            <p className="mb-8 text-sm font-medium text-slate-600">
              Profesijos ({supPrograms.length})
            </p>

            {supPrograms.length === 0 ? (
              <p className="text-slate-600">
                Šiuo metu įtraukiojo ugdymo programų nėra.
              </p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {supPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}