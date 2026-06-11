import Link from "next/link";
import { programs } from "@/data/programs";

export function Programs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <article
              key={program.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="mb-3 text-sm font-semibold text-blue-700">
                {program.category}
              </p>

              <h3 className="text-xl font-bold text-slate-900">
                {program.title}
              </h3>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/programos"
            className="inline-flex rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white"
          >
            Peržiūrėti visas programas
          </Link>
        </div>
      </div>
    </section>
  );
}