import { fetchFromStrapi } from "@/lib/strapi";
import type { StrapiBlock } from "@/components/RichText";

export const employeeCategories = [
  "Administracija",
  "Mokytojai",
  "Psichologas",
  "Socialinis pedagogas",
  "Specialusis pedagogas",
  "Karjeros specialistas",
  "Sveikatos priežiūros specialistas",
  "Kitas darbuotojas",
] as const;

export type EmployeeCategory = (typeof employeeCategories)[number];

export type EmployeeMedia = {
  id: number;
  name: string;
  url: string;
  alternativeText?: string | null;
};

export type EmployeeCampus = {
  id: number;
  title: string;
  slug: string;
};

export type Employee = {
  id: number;
  fullName: string;
  slug: string;
  position?: string | null;
  email?: string | null;
  phone?: string | null;
  category?: EmployeeCategory | null;
  photo?: EmployeeMedia | null;
  description?: StrapiBlock[] | null;
  workingHours?: StrapiBlock[] | null;
  attachments?: EmployeeMedia[];
  padaliniais?: EmployeeCampus[];
  active?: boolean;
  order?: number | null;
  sortOrder?: number | null;
  showOnContacts?: boolean | null;
};

export function getEmployeeCategoryLabel(category?: string | null) {
  return category || "Darbuotojas";
}

export async function getEmployees() {
  const data = await fetchFromStrapi(
    "/employees?filters[active][$eq]=true&sort=order:asc&populate[photo]=true&populate[padaliniais]=true"
  );

  return data.data as Employee[];
}

export async function getEmployeeBySlug(slug: string) {
  const data = await fetchFromStrapi(
    `/employees?filters[slug][$eq]=${slug}&filters[active][$eq]=true&populate=*`
  );

  return data.data?.[0] as Employee | undefined;
}
export async function getContactEmployees() {
  const data = await fetchFromStrapi(
    "/employees?filters[active][$eq]=true&filters[showOnContacts][$eq]=true&sort=sortOrder:asc&populate[photo]=true&populate[padaliniais]=true"
  );

  return data.data as Employee[];
}