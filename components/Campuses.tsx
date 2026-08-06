import Image from "next/image";
import Link from "next/link";
import { colors } from "@/lib/theme";

import { campuses } from "@/data/campuses";

export function Campuses() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <p
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: colors.primary }}
          >
            Padaliniai
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            Trys erdvės mokytis, augti ir kurti ateitį
          </h2>

          <p className="mt-4 max-w-2xl text-slate-600">
            Šilutės profesinio mokymo centras veikia keliuose padaliniuose,
            kuriuose vyksta teorinis ir praktinis mokymas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {campuses.map((campus) => (
            <Link
              key={campus.title}
              href={campus.href}
              className="block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={campus.image}
                  alt={campus.title}
                  fill
                  sizes="(max-width: 1023px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  {campus.title}
                </h3>

                <p className="mt-3 text-slate-600">
                  {campus.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}