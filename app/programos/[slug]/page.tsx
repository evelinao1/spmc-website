import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { RichText, type StrapiBlock } from "@/components/RichText";
import { getProgramBySlug, getProgramCategoryLabel } from "@/lib/programs";

type ProgramPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getMediaUrl(url?: string) {
  if (!url) return null;
  if (url.startsWith("http")) return url;

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export default async function ProgramPage({ params }: ProgramPageProps) {
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
            program.shortDescription ?? "Mokymo programos informacija"
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
                  className="object-cover"
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
                  <p className="text-sm font-semibold text-slate-900">Trukmė</p>
                  <p className="text-sm text-slate-600">{program.duration}</p>
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
            <RichText blocks={program.description as StrapiBlock[]} />
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}