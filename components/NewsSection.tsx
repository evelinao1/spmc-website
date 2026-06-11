import Link from "next/link";
import { news } from "@/data/news";

export function NewsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Naujienos
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-900">
              Kas vyksta centre?
            </h2>
          </div>

          <Link
            href="/naujienos"
            className="hidden text-blue-700 hover:underline md:block"
          >
            Visos naujienos →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <p className="mb-4 text-sm text-slate-500">
                {item.date}
              </p>

              <h3 className="mb-3 text-xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="text-slate-600">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}