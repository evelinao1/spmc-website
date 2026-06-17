import Link from "next/link";

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  publishDate?: string;
};

type NewsSectionProps = {
  news: NewsItem[];
};

function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("lt-LT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function NewsSection({ news }: NewsSectionProps) {
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
            <Link
              key={item.id}
              href={`/naujienos/${item.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              {item.publishDate && (
                <p className="mb-4 text-sm text-slate-500">
                  {formatDate(item.publishDate)}
                </p>
              )}

              <h3 className="mb-3 text-xl font-bold text-slate-900">
                {item.title}
              </h3>

              {item.excerpt && (
                <p className="text-slate-600">
                  {item.excerpt}
                </p>
              )}

              <p className="mt-4 font-medium text-blue-700">
                Skaityti daugiau →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}