import { fetchFromStrapi } from "./strapi";

export type ProgramCategory =
  | "Po 10 klasių"
  | "Po 12 klasių"
  | "Tęstinis mokymas"
  | "SUP"
  | "UŽT klientams"
  | "Neformalus mokymas";

export type Program = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  category: ProgramCategory;
  shortDescription?: string;
  description?: unknown[];
  duration?: string;
  qualification?: string;
  targetAudience?: string;
  active?: boolean;
  order?: number;
  image?: {
  url: string;
  alternativeText?: string | null;
    };

    attachment?: {
    url: string;
    name?: string;
    };
  padaliniai?: unknown[];
};

export const programCategories: ProgramCategory[] = [
  "Po 10 klasių",
  "Po 12 klasių",
  "Tęstinis mokymas",
  "SUP",
  "UŽT klientams",
  "Neformalus mokymas",
];

export function getProgramCategoryLabel(category: ProgramCategory) {
  if (category === "SUP") return "Įtraukusis ugdymas";
  return category;
}

export async function getPrograms() {
  const data = await fetchFromStrapi(
    "/programs?populate[0]=image&populate[1]=attachment&populate[2]=padaliniai&sort[0]=order:asc&sort[1]=title:asc&filters[active][$eq]=true"
  );

  return data.data as Program[];
}

export async function getProgramBySlug(slug: string) {
  const data = await fetchFromStrapi(
    `/programs?populate[0]=image&populate[1]=attachment&populate[2]=padaliniai&filters[slug][$eq]=${slug}&filters[active][$eq]=true`
  );

  const programs = data.data as Program[];

  return programs[0] ?? null;
}