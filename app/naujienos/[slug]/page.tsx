import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fetchFromStrapi } from "@/lib/strapi";

type StrapiTextChild = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

type StrapiBlock = {
  type: string;
  level?: number;
  format?: string;
  children?: StrapiTextChild[] | StrapiBlock[];
};

type StrapiMedia = {
  id: number;
  url: string;
  name?: string;
  alternativeText?: string | null;
};

type NewsArticle = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: StrapiBlock[];
  publishDate?: string;
  coverImage?: StrapiMedia | null;
  gallery?: StrapiMedia[];
  attachments?: StrapiMedia[];
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
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

async function getArticle(slug: string) {
  const data = await fetchFromStrapi(
    `/news?filters[slug][$eq]=${slug}&filters[active][$eq]=true&populate=*`
  );

  return data.data?.[0] as NewsArticle | undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Naujiena nerasta | Šilutės profesinio mokymo centras",
    };
  }

  const imageUrl = getImageUrl(article.coverImage?.url);

  return {
    title: `${article.title} | Šilutės profesinio mokymo centras`,
    description: article.excerpt || "Šilutės profesinio mokymo centro naujiena.",
    openGraph: {
      title: article.title,
      description: article.excerpt || "Šilutės profesinio mokymo centro naujiena.",
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

function renderText(children?: StrapiTextChild[]) {
  if (!children) return null;

  return children.map((child, index) => {
    let text: ReactNode = child.text;

    if (child.bold) {
      text = <strong>{text}</strong>;
    }

    if (child.italic) {
      text = <em>{text}</em>;
    }

    if (child.underline) {
      text = <u>{text}</u>;
    }

    return <span key={index}>{text}</span>;
  });
}

function BlocksRenderer({ blocks }: { blocks?: StrapiBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-5 text-lg leading-8 text-slate-700">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index}>
              {renderText(block.children as StrapiTextChild[])}
            </p>
          );
        }

        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="pt-6 text-2xl font-semibold text-slate-900"
            >
              {renderText(block.children as StrapiTextChild[])}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-6">
              {(block.children as StrapiBlock[])?.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {renderText(item.children as StrapiTextChild[])}
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const otherNewsResponse = await fetchFromStrapi(
    `/news?filters[active][$eq]=true&filters[slug][$ne]=${slug}&sort=publishDate:desc&pagination[limit]=3&populate=coverImage`
  );

  const otherNews = otherNewsResponse.data as NewsArticle[];
  const imageUrl = getImageUrl(article.coverImage?.url);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <article>
          <h1 className="mb-6 text-4xl font-bold text-slate-950">
            {article.title}
          </h1>

          {article.publishDate && (
            <p className="mb-8 text-sm text-slate-500">
              {formatDate(article.publishDate)}
            </p>
          )}

          {imageUrl && (
            <div className="relative mb-10 h-[420px] w-full overflow-hidden rounded-2xl">
              <Image
                src={imageUrl}
                alt={article.coverImage?.alternativeText || article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <BlocksRenderer blocks={article.content} />

          {article.gallery && article.gallery.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-6 text-2xl font-semibold text-slate-900">
                Nuotraukos
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {article.gallery.map((image) => {
                  const galleryImageUrl = getImageUrl(image.url);
                  if (!galleryImageUrl) return null;

                  return (
                    <div
                      key={image.id}
                      className="relative h-64 overflow-hidden rounded-xl"
                    >
                      <Image
                        src={galleryImageUrl}
                        alt={image.alternativeText || article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {article.attachments && article.attachments.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Priedai
              </h2>

              <div className="space-y-3">
                {article.attachments.map((file) => {
                  const fileUrl = getImageUrl(file.url);
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

        {otherNews.length > 0 && (
          <section className="mt-20 border-t border-slate-200 pt-12">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">
              Kitos naujienos
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {otherNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/naujienos/${item.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  {item.publishDate && (
                    <p className="mb-3 text-sm text-slate-500">
                      {formatDate(item.publishDate)}
                    </p>
                  )}

                  <h3 className="font-semibold text-slate-900">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}