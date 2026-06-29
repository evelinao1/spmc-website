import { fetchFromStrapi } from "@/lib/strapi";
import type { StrapiBlock } from "@/components/RichText";

export type CampusMedia = {
  id: number;
  name: string;
  url: string;
  alternativeText?: string | null;
};

export type Campus = {
  id: number;
  title: string;
  slug: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  description?: StrapiBlock[] | null;
  image?: CampusMedia | null;
  active?: boolean;
  order?: number | null;
};

export async function getCampuses() {
  const data = await fetchFromStrapi(
    "/campuses?filters[active][$eq]=true&sort=order:asc&populate=image"
  );

  return data.data as Campus[];
}