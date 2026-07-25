import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { RichText, type StrapiBlock } from "@/components/RichText";

import { getProgramBySlug, getProgramCategoryLabel } from "@/lib/programs";
import { createMetadata } from "@/lib/seo";

type ProgramPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getMediaUrl(url?: string | null) {
  if (!url) {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export async function generateMetadata({
  params,
}: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    return createMetadata({
      title: "Mokymo programa nerasta",
      description:
        "Ieškoma Šilutės profesinio mokymo centro mokymo programa nerasta.",
      path: `/programos/${slug}`,
      noIndex: true,
    });
  }

  const imageUrl = getMediaUrl(program.image?.url);

  const description =
    program.shortDescription ||
    `${program.title} – mokymo programa Šilutės profesinio mokymo centre.`;

  return createMetadata({
    title: program.title,
    description,
    path: `/programos/${program.slug}`,
    image: imageUrl,
    imageAlt: program.image?.alternativeText || program.title,
    type: "website",
  });
}

export default async function ProgramPage({
  params,
}: ProgramPageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const imageUrl = getMediaUrl(program.image?.url);
  const attachmentUrl = getMediaUrl(program.attachment?.url);

  return (
    <>
      <Header />

      <main>
        <PageHero
          title={program.title}
          description={
            program.shortDescription || "Mokymo programos informacija"
          }
        />

        <section className="mx-auto max-w-5xl px-6 py-16">
          <Link
            href="/programos"
            className="mb-8 inline-flex text-sm font-medium text-blue-700 transition hover:text-blue-900"
          >
            ← Visos programos
          </Link>

          {imageUrl && (
            <div className="mb-10 overflow-hidden rounded-2xl">
              <div className="relative h-[420px] w-full">
                <Image
                  src={imageUrl}
                  alt={program.image?.alternativeText || program.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-blue-700">
              {getProgramCategoryLabel(program.category)}
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {program.duration && (
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Trukmė
                  </p>

                  <p className="text-sm text-slate-600">
                    {program.duration}
                  </p>
                </div>
              )}

              {program.qualification && (
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Kvalifikacija
                  </p>

                  <p className="text-sm text-slate-600">
                    {program.qualification}
                  </p>
                </div>
              )}

              {program.targetAudience && (
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Kam skirta
                  </p>

                  <p className="text-sm text-slate-600">
                    {program.targetAudience}
                  </p>
                </div>
              )}
            </div>
          </div>

          {attachmentUrl && (
            <div className="mb-10">
              <a
                href={attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Atsisiųsti programos dokumentą
              </a>
            </div>
          )}

          {program.description && (
            <RichText
              blocks={program.description as StrapiBlock[]}
            />
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}