import Link from "next/link";

import { ProgramCard } from "@/components/ProgramCard";
import { getPrograms } from "@/lib/programs";
import { colors } from "@/lib/theme";

export async function Programs() {
  const programs = await getPrograms();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <p
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: colors.primary }}
          >
            Mokymo programos
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            Atrask profesiją pagal savo pomėgius
          </h2>

          <p className="mt-4 max-w-2xl text-slate-600">
            Šilutės profesinio mokymo centre siūlomos įvairios profesinio
            mokymo programos skirtingose srityse.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {programs.slice(0, 4).map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
            />
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/programos"
            className="inline-flex rounded-xl px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: colors.primary,
              boxShadow: "0 4px 12px rgba(21, 66, 128, 0.18)",
            }}
          >
            Peržiūrėti visas programas
          </Link>
        </div>
      </div>
    </section>
  );
}