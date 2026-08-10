import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichText, type StrapiBlock } from "@/components/RichText";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";

import { getEducationBySlug } from "@/lib/educations";
import { createMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/schema";
import { colors } from "@/lib/theme";

type EducationPageProps = {
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
}: EducationPageProps): Promise<Metadata> {
  const { slug } = await params;

  const education = await getEducationBySlug(slug);

  if (!education) {
    return {};
  }

  const imageUrl = getMediaUrl(education.coverImage?.url);

  return createMetadata({
    title: education.title,
    description:
      education.summary ||
      `Informacija apie edukaciją „${education.title}“ Šilutės profesinio mokymo centre.`,
    path: `/edukacijos/${education.slug}`,
    image: imageUrl || undefined,
  });
}

export default async function EducationPage({
  params,
}: EducationPageProps) {
  const { slug } = await params;

  const education = await getEducationBySlug(slug);

  if (!education) {
    notFound();
  }

  const imageUrl = getMediaUrl(education.coverImage?.url);

  const breadcrumbItems = [
    {
      label: "Pradžia",
      href: "/",
    },
    {
      label: "Edukacijos",
      href: "/edukacijos",
    },
    {
      label: education.title,
    },
  ];

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
  {
    label: "Pradžia",
    href: "/",
  },
  {
    label: "Edukacijos",
    href: "/edukacijos",
  },
  {
    label: education.title,
    href: `/edukacijos/${education.slug}`,
  },
]);
  return (
    <>
      <SchemaJsonLd data={breadcrumbJsonLd} />

      <Header />

      <main>
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <Breadcrumb items={breadcrumbItems} />

            <div className="mt-8 max-w-4xl">
              {education.audience && (
                <p
                  className="mb-3 text-sm font-bold uppercase tracking-wide"
                  style={{ color: colors.primary }}
                >
                  {education.audience}
                </p>
              )}

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                {education.title}
              </h1>

              {education.summary && (
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  {education.summary}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              {imageUrl && (
                <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={imageUrl}
                    alt={
                      education.coverImage?.alternativeText ||
                      education.title
                    }
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              {education.content &&
                Array.isArray(education.content) &&
                education.content.length > 0 && (
                  <RichText
                    content={education.content as StrapiBlock[]}
                  />
                )}
            </div>

            {(education.duration || education.price || education.audience) && (
              <aside>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-950">
                    Informacija
                  </h2>

                  <div className="mt-5 space-y-5">
                    {education.audience && (
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          Skirta
                        </p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {education.audience}
                        </p>
                      </div>
                    )}

                    {education.duration && (
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          Trukmė
                        </p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {education.duration}
                        </p>
                      </div>
                    )}

                    {education.price && (
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          Kaina
                        </p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {education.price}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}