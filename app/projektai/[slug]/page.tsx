import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichText, type StrapiBlock } from "@/components/RichText";
import { LightboxGallery } from "@/components/LightboxGallery";
import { Breadcrumb } from "@/components/Breadcrumb";

import { fetchFromStrapi } from "@/lib/strapi";
import { createMetadata } from "@/lib/seo";

type StrapiMedia = {
  id: number;
  url: string;
  name?: string;
  alternativeText?: string | null;
};

type Project = {
  id: number;
  title: string;
  slug: string;
  category?: string;
  summary?: string;
  content?: StrapiBlock[];
  coverImage?: StrapiMedia | null;
  gallery?: StrapiMedia[];
  attachments?: StrapiMedia[];
  projectLink?: string;
  updatedAt?: string;
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function getFileUrl(url?: string | null) {
  if (!url) {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

async function getProject(slug: string): Promise<Project | undefined> {
  const encodedSlug = encodeURIComponent(slug);

  const data = await fetchFromStrapi(
    `/projects?filters[slug][$eq]=${encodedSlug}&filters[active][$eq]=true&populate=*`
  );

  return data?.data?.[0] as Project | undefined;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return createMetadata({
      title: "Projektas nerastas",
      description:
        "Ieškomas Šilutės profesinio mokymo centro projektas nerastas.",
      path: `/projektai/${slug}`,
      noIndex: true,
    });
  }

  const imageUrl = getFileUrl(project.coverImage?.url);

  const description =
    project.summary ||
    `${project.title} – Šilutės profesinio mokymo centro projektas.`;

  return createMetadata({
    title: project.title,
    description,
    path: `/projektai/${project.slug}`,
    image: imageUrl,
    imageAlt:
      project.coverImage?.alternativeText ||
      project.title,
    type: "website",
    modifiedTime: project.updatedAt,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const imageUrl = getFileUrl(project.coverImage?.url);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <Breadcrumb
          items={[
            {
              label: "Pradžia",
              href: "/",
            },
            {
              label: "Projektai",
              href: "/projektai",
            },
            {
              label: project.title,
            },
          ]}
        />

        <article>
          {project.category && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-700">
              {project.category}
            </p>
          )}

          <h1 className="mb-6 text-4xl font-bold text-slate-950">
            {project.title}
          </h1>

          {project.summary && (
            <p className="mb-8 text-xl leading-8 text-slate-600">
              {project.summary}
            </p>
          )}

          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition hover:bg-blue-800"
            >
              Aplankyti projekto svetainę
            </a>
          )}

          {imageUrl && (
            <div className="relative mb-10 h-[420px] w-full overflow-hidden rounded-2xl">
              <Image
                src={imageUrl}
                alt={project.coverImage?.alternativeText || project.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {project.content && (
            <RichText blocks={project.content} />
          )}

          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-6 text-2xl font-semibold text-slate-900">
                Nuotraukos
              </h2>

              <LightboxGallery images={project.gallery} />
            </section>
          )}

          {project.attachments && project.attachments.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Priedai
              </h2>

              <div className="space-y-3">
                {project.attachments.map((file) => {
                  const fileUrl = getFileUrl(file.url);

                  if (!fileUrl) {
                    return null;
                  }

                  return (
                    <a
                      key={file.id}
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl border border-slate-200 p-4 text-slate-700 transition hover:bg-slate-50"
                    >
                      {file.name || "Atsisiųsti failą"}
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