import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatDate,
  getFileUrl,
  getNewsPage,
} from "@/lib/news";

type NewsListProps = {
  category?: string;
  page?: string | string[];
  basePath?: string;
};

export async function NewsList({
  category,
  page,
  basePath = "/naujienos",
}: NewsListProps) {
  const pageValue = Array.isArray(page) ? page[0] : page;
  const parsedPage = Number(pageValue ?? 1);

  const currentPage =
    Number.isSafeInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  const { news, pagination } = await getNewsPage(
    category,
    currentPage
  );

  if (
    currentPage > 1 &&
    currentPage > pagination.pageCount
  ) {
    notFound();
  }

  if (news.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-600">
        Šiuo metu įrašų nėra.
      </div>
    );
  }

  function pageHref(number: number) {
    return number === 1
      ? basePath
      : `${basePath}?page=${number}`;
  }

  const pageNumbers = Array.from(
    { length: pagination.pageCount },
    (_, index) => index + 1
  ).filter(
    (number) =>
      number === 1 ||
      number === pagination.pageCount ||
      Math.abs(number - currentPage) <= 1
  );

  const linkClass =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-[#154280] transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#154280]";

  return (
    <>
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
                    alt={
                      item.coverImage?.alternativeText ||
                      item.title
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

      {pagination.pageCount > 1 && (
        <nav
          aria-label="Naujienų puslapiai"
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
        >
          {currentPage > 1 && (
            <Link
              href={pageHref(currentPage - 1)}
              className={linkClass}
            >
              ← Ankstesnis
            </Link>
          )}

          {pageNumbers.map((number, index) => (
            <span
              key={number}
              className="inline-flex items-center gap-2"
            >
              {index > 0 &&
                number - pageNumbers[index - 1] > 1 && (
                  <span className="px-2 text-slate-500">
                    …
                  </span>
                )}

              <Link
                href={pageHref(number)}
                aria-label={`${number} puslapis`}
                aria-current={
                  number === currentPage ? "page" : undefined
                }
                className={
                  number === currentPage
                    ? "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-[#154280] px-4 py-2 text-sm font-semibold text-white"
                    : linkClass
                }
              >
                {number}
              </Link>
            </span>
          ))}

          {currentPage < pagination.pageCount && (
            <Link
              href={pageHref(currentPage + 1)}
              className={linkClass}
            >
              Kitas →
            </Link>
          )}
        </nav>
      )}
    </>
  );
}