import type { Metadata } from "next";

import { StrapiPage } from "@/components/StrapiPage";
import { fetchFromStrapi } from "@/lib/strapi";
import {
  DEFAULT_OG_IMAGE,
  getAbsoluteUrl,
  getSiteUrl,
  truncateDescription,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{
    path: string[];
  }>;
};

type DynamicPage = {
  title?: string | null;
  excerpt?: string | null;
  section?: string | null;
  path?: string | null;
  active?: boolean;
};

const sectionLabels: Record<string, string> = {
  apie: "Apie centrą",
  mokiniams: "Mokiniams",
  stojantiesiems: "Stojantiesiems",
  "itraukusis-ugdymas": "Įtraukusis ugdymas",
};

async function getPage(path: string): Promise<DynamicPage | null> {
  try {
    const encodedPath = encodeURIComponent(path);

    const response = await fetchFromStrapi(
      `/pages?filters[path][$eq]=${encodedPath}&filters[active][$eq]=true&fields[0]=title&fields[1]=excerpt&fields[2]=section&fields[3]=path`
    );

    return response?.data?.[0] ?? null;
  } catch (error) {
    console.error(`Nepavyko gauti puslapio SEO duomenų (${path}):`, error);

    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { path } = await params;

  const fullPath = path.join("/");
  const page = await getPage(fullPath);

  if (!page) {
    return {
      title: "Puslapis nerastas",
      description: "Ieškomas puslapis nerastas.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const siteUrl = getSiteUrl();
  const canonicalPath = `/${fullPath}`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  const title = page.title || "Šilutės profesinio mokymo centras";

  const description = truncateDescription(
    page.excerpt ||
      `Informacija apie ${title.toLowerCase()} Šilutės profesinio mokymo centro svetainėje.`
  );

  const ogImage = getAbsoluteUrl(DEFAULT_OG_IMAGE);

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      locale: "lt_LT",
      url: canonicalUrl,
      siteName: "Šilutės profesinio mokymo centras",
      title,
      description,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function DynamicPathPage({ params }: PageProps) {
  const { path } = await params;

  const fullPath = path.join("/");
  const section = path[0];

  return (
    <StrapiPage
      path={fullPath}
      label={sectionLabels[section]}
    />
  );
}