import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { fetchFromStrapi } from "@/lib/strapi";

type Announcement = {
  id: number;
  title: string;
  slug: string;
  shortText?: string;
  publishDate?: string;
  validUntil?: string;
  important?: boolean;
};

function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("lt-LT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function AnnouncementsPage() {
  const data = await fetchFromStrapi(
    "/announcements?filters[active][$eq]=true&sort=important:desc,publishDate:desc"
  );

  const announcements = data.data as Announcement[];

  return (
    <>
      <Header />

      <main>
        <PageHero
          title="Skelbimai"
          description="Svarbi informacija mokiniams, darbuotojams ir bendruomenei."
        />

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="space-y-6">
            {announcements.map((item) => (
              <Link
                key={item.id}
                href={`/skelbimai/${item.slug}`}
                className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  {item.important && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                      Svarbu
                    </span>
                  )}

                  {item.publishDate && (
                    <span className="text-sm text-slate-500">
                      {formatDate(item.publishDate)}
                    </span>
                  )}
                </div>

                <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                  {item.title}
                </h2>

                {item.shortText && (
                  <p className="text-slate-600">
                    {item.shortText}
                  </p>
                )}

                {item.validUntil && (
                  <p className="mt-4 text-sm text-slate-500">
                    Galioja iki: {formatDate(item.validUntil)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}