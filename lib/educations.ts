import { fetchFromStrapi } from "./strapi";

export type EducationAudience =
  | "Vaikams"
  | "Suaugusiesiems"
  | "Visiems";

export type Education = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  summary?: string;
  content?: unknown[];
  coverImage?: {
    url: string;
    alternativeText?: string | null;
  };
  audience?: EducationAudience;
  duration?: string;
  price?: string;
  order?: number;
  isActive?: boolean;
};

export async function getEducations() {
  const data = await fetchFromStrapi(
    "/edukacijos?populate[0]=coverImage&sort[0]=order:asc&sort[1]=title:asc&filters[isActive][$eq]=true"
  );

  return data.data as Education[];
}

export async function getEducationBySlug(slug: string) {
  const data = await fetchFromStrapi(
    `/edukacijos?populate[0]=coverImage&filters[slug][$eq]=${slug}&filters[isActive][$eq]=true`
  );

  const educations = data.data as Education[];

  return educations[0] ?? null;
}