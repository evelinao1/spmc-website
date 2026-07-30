import Link from "next/link";

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishDate?: string | null;
};

type NewsSectionProps = {
  news: NewsItem[];
};

function formatDate(date: string) {
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

        {news.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((item) => (
              <Link
                key={item.id}
                href={`/naujienos/${item.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                {item.publishDate && (
                  <time
                    dateTime={item.publishDate}
                    className="mb-4 block text-sm text-slate-500"
                  >
                    {formatDate(item.publishDate)}
                  </time>
                )}

                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                {item.excerpt && (
                  <p className="text-slate-600">{item.excerpt}</p>
                )}

                <p className="mt-4 font-medium text-blue-700">
                  Skaityti daugiau →
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
            Šiuo metu naujų įrašų nėra.
          </p>
        )}

        <Link
          href="/naujienos"
          className="mt-8 inline-flex text-blue-700 hover:underline md:hidden"
        >
          Visos naujienos →
        </Link>
      </div>
    </section>
  );
}