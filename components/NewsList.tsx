import Image from "next/image";
import Link from "next/link";
import { formatDate, getFileUrl, getNews } from "@/lib/news";

type NewsListProps = {
  category?: string;
};

export async function NewsList({ category }: NewsListProps) {
  const news = await getNews(category);

  if (news.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-600">
        Šiuo metu įrašų nėra.
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {news.map((item) => {
        const imageUrl = getFileUrl(item.coverImage?.url);

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
  );
}