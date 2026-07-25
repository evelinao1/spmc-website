import type { Metadata } from "next";

export const SITE_NAME = "Šilutės profesinio mokymo centras";

export const SITE_SHORT_NAME = "ŠPMC";

export const SITE_DESCRIPTION =
  "Šilutės profesinio mokymo centras – profesinis mokymas po 10 ir 12 klasių, tęstinis bei suaugusiųjų mokymas, mokymo programos, priėmimo informacija ir centro naujienos.";

export const SITE_LOCALE = "lt_LT";

export const SITE_LANGUAGE = "lt";

export const DEFAULT_OG_IMAGE = "/opengraph-image.jpg";

const FALLBACK_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL;

  return siteUrl.replace(/\/$/, "");
}

export function getAbsoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteUrl}${normalizedPath}`;
}

export function stripHtml(value?: string | null): string {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateDescription(
  value?: string | null,
  maxLength = 160
): string {
  const cleanedValue = stripHtml(value);

  if (!cleanedValue) {
    return SITE_DESCRIPTION;
  }

  if (cleanedValue.length <= maxLength) {
    return cleanedValue;
  }

  const shortenedValue = cleanedValue.slice(0, maxLength - 1);
  const lastSpaceIndex = shortenedValue.lastIndexOf(" ");

  if (lastSpaceIndex === -1) {
    return `${shortenedValue.trim()}…`;
  }

  return `${shortenedValue.slice(0, lastSpaceIndex).trim()}…`;
}

export function createPageTitle(title?: string | null): string {
  const cleanedTitle = title?.trim();

  if (!cleanedTitle) {
    return SITE_NAME;
  }

  return `${cleanedTitle} | ${SITE_SHORT_NAME}`;
}

type CreateMetadataOptions = {
  title?: string | null;
  description?: string | null;
  path?: string;
  image?: string | null;
  imageAlt?: string | null;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const metadataTitle = title?.trim() || SITE_NAME;
  const metadataDescription = truncateDescription(description);
  const canonicalUrl = getAbsoluteUrl(path);
  const imageUrl = getAbsoluteUrl(image || DEFAULT_OG_IMAGE);
  const metadataImageAlt = imageAlt?.trim() || metadataTitle;

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          locale: SITE_LOCALE,
          url: canonicalUrl,
          siteName: SITE_NAME,
          title: metadataTitle,
          description: metadataDescription,
          publishedTime: publishedTime || undefined,
          modifiedTime: modifiedTime || undefined,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: metadataImageAlt,
            },
          ],
        }
      : {
          type: "website",
          locale: SITE_LOCALE,
          url: canonicalUrl,
          siteName: SITE_NAME,
          title: metadataTitle,
          description: metadataDescription,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: metadataImageAlt,
            },
          ],
        };

  return {
    title: metadataTitle,
    description: metadataDescription,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph,

    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description: metadataDescription,
      images: [imageUrl],
    },

    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}