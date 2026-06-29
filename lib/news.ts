import { fetchFromStrapi } from "@/lib/strapi";
import type { StrapiBlock } from "@/components/RichText";

export type StrapiMedia = {
  id: number;
  url: string;
  name?: string;
  alternativeText?: string | null;
};

export type NewsArticle = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: StrapiBlock[];
  publishDate?: string;
  category?: string | null;
  coverImage?: StrapiMedia | null;
  gallery?: StrapiMedia[];
  attachments?: StrapiMedia[];
};

export function getFileUrl(url?: string) {
  if (!url) return null;
  if (url.startsWith("http")) return url;

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("lt-LT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export async function getNews(category?: string) {
  const categoryFilter = category
    ? `&filters[category][$eq]=${encodeURIComponent(category)}`
    : "";

  const data = await fetchFromStrapi(
    `/news?filters[active][$eq]=true${categoryFilter}&sort=publishDate:desc&populate=coverImage`
  );

  return data.data as NewsArticle[];
}

export async function getNewsArticle(slug: string) {
  const data = await fetchFromStrapi(
    `/news?filters[slug][$eq]=${slug}&filters[active][$eq]=true&populate=*`
  );

  return data.data?.[0] as NewsArticle | undefined;
}

export async function getOtherNews(slug: string) {
  const data = await fetchFromStrapi(
    `/news?filters[active][$eq]=true&filters[slug][$ne]=${slug}&sort=publishDate:desc&pagination[limit]=3&populate=coverImage`
  );

  return data.data as NewsArticle[];
}