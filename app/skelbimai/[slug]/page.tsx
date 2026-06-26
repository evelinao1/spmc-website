import { notFound } from "next/navigation";
import Image from "next/image";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichText, type StrapiBlock } from "@/components/RichText";
import { fetchFromStrapi } from "@/lib/strapi";

type StrapiMedia = {
  id: number;
  url: string;
  name?: string;
  alternativeText?: string | null;
};

type Announcement = {
  id: number;
  title: string;
  slug: string;
  shortText?: string;
  content?: StrapiBlock[];
  image?: StrapiMedia | null;
  attachments?: StrapiMedia[];
  publishDate?: string;
  validUntil?: string;
  important?: boolean;
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function getFileUrl(url?: string) {
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

export default async function AnnouncementDetailPage({ params }: Props) {
  const { slug } = await params;

  const data = await fetchFromStrapi(
    `/announcements?filters[slug][$eq]=${slug}&filters[active][$eq]=true&populate=*`
  );

  const announcement = data.data?.[0] as Announcement | undefined;

  if (!announcement) {
    notFound();
  }

  const imageUrl = getFileUrl(announcement.image?.url);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <article>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {announcement.important && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                Svarbu
              </span>
            )}

            {announcement.publishDate && (
              <span className="text-sm text-slate-500">
                {formatDate(announcement.publishDate)}
              </span>
            )}
          </div>

          <h1 className="mb-6 text-4xl font-bold text-slate-950">
            {announcement.title}
          </h1>

          {announcement.validUntil && (
            <p className="mb-8 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">
              Galioja iki: {formatDate(announcement.validUntil)}
            </p>
          )}

          {imageUrl && (
            <div className="relative mb-10 h-[420px] w-full overflow-hidden rounded-2xl">
              <Image
                src={imageUrl}
                alt={announcement.image?.alternativeText || announcement.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {announcement.content && (
            <RichText blocks={announcement.content as StrapiBlock[]} />
          )}

          {announcement.attachments && announcement.attachments.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Priedai
              </h2>

              <div className="space-y-3">
                {announcement.attachments.map((file) => {
                  const fileUrl = getFileUrl(file.url);
                  if (!fileUrl) return null;

                  return (
                    <a
                      key={file.id}
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl border border-slate-200 p-4 text-slate-700 transition hover:bg-slate-50"
                    >
                      {file.name}
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}