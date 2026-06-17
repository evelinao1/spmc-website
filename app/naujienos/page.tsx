import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { fetchFromStrapi } from "@/lib/strapi";

type StrapiImage = {
  url: string;
  alternativeText?: string | null;
};

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  publishDate?: string;
  coverImage?: StrapiImage | null;
};

function getImageUrl(url?: string) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("lt-LT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function NewsPage() {
  const data = await fetchFromStrapi(
    "/news?filters[active][$eq]=true&sort=publishDate:desc&populate=coverImage"
  );

  const news: NewsItem[] = data.data;

  return (
    <>
      <Header />

      <main>
        <PageHero
          title="Naujienos"
          description="Šilutės profesinio mokymo centro naujienos, renginiai ir aktualijos."
        />

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => {
              const imageUrl = getImageUrl(item.coverImage?.url);
              
              return (
                <Link
                  key={item.id}
                  href={`/naujienos/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {imageUrl && (
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.coverImage?.alternativeText || item.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {item.publishDate && (
                      <p className="mb-3 text-sm text-slate-500">
                        {formatDate(item.publishDate)}
                      </p>
                    )}

                    <h2 className="text-xl font-semibold text-slate-900">
                      {item.title}
                    </h2>

                    {item.excerpt && (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}