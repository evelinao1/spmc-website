import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

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
  children?: StrapiTextChild[] | StrapiBlock[];
};

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

function renderText(children?: StrapiTextChild[]) {
  if (!children) return null;

  return children.map((child, index) => {
    let text: ReactNode = child.text;

    if (child.bold) text = <strong>{text}</strong>;
    if (child.italic) text = <em>{text}</em>;
    if (child.underline) text = <u>{text}</u>;

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
            <h2 key={index} className="pt-6 text-2xl font-semibold text-slate-900">
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

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const data = await fetchFromStrapi(
    `/projects?filters[slug][$eq]=${slug}&filters[active][$eq]=true&populate=*`
  );

  const project = data.data?.[0] as Project | undefined;

  if (!project) {
    notFound();
  }

  const imageUrl = getFileUrl(project.coverImage?.url);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-16">
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
                className="object-cover"
              />
            </div>
          )}

          <BlocksRenderer blocks={project.content} />

          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-6 text-2xl font-semibold text-slate-900">
                Nuotraukos
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((image) => {
                  const galleryImageUrl = getFileUrl(image.url);
                  if (!galleryImageUrl) return null;

                  return (
                    <div
                      key={image.id}
                      className="relative h-64 overflow-hidden rounded-xl"
                    >
                      <Image
                        src={galleryImageUrl}
                        alt={image.alternativeText || project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
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