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
  descriptionHtml?: string | null;
  workingHours?: StrapiBlock[] | null;
  attachments?: EmployeeMedia[];
  padaliniais?: EmployeeCampus[];
  active?: boolean;
  order?: number | null;
  sortOrder?: number | null;
  showOnContacts?: boolean | null;
};

export function getEmployeeCategoryLabel(category?: string | null) {
  if (category === "Kitas darbuotojas") {
    return "Kiti darbuotojai";
  }

  return category || "Darbuotojas";
}

// Paimami visi Strapi puslapiai ir sujungiami į vieną sąrašą.
async function getAllEmployees(query: string): Promise<Employee[]> {
  const employees: Employee[] = [];
  let page = 1;
  let pageCount = 1;

  do {
    const response = await fetchFromStrapi(
      `${query}&pagination[page]=${page}&pagination[pageSize]=25&pagination[withCount]=true`
    );

    if (!Array.isArray(response.data)) {
      throw new Error("Nepavyko gauti darbuotojų sąrašo.");
    }

    const pagination = response.meta?.pagination;

    if (!pagination || typeof pagination.pageCount !== "number") {
      throw new Error(
        "Darbuotojų atsakyme nėra puslapiavimo informacijos."
      );
    }

    employees.push(...(response.data as Employee[]));

    pageCount = pagination.pageCount;
    page += 1;
  } while (page <= pageCount);

  return employees;
}

// Visi aktyvūs darbuotojai darbuotojų puslapiui.
export async function getEmployees(): Promise<Employee[]> {
  return getAllEmployees(
    "/employees?filters[active][$eq]=true&sort[0]=order:asc&sort[1]=id:asc&populate[photo]=true&populate[padaliniais]=true"
  );
}

// Vieno darbuotojo informacija pagal jo nuorodą.
export async function getEmployeeBySlug(
  slug: string
): Promise<Employee | undefined> {
  const data = await fetchFromStrapi(
    `/employees?filters[slug][$eq]=${encodeURIComponent(slug)}&filters[active][$eq]=true&populate=*`
  );

  return data.data?.[0] as Employee | undefined;
}

// Visi aktyvūs darbuotojai, pažymėti rodyti kontaktų puslapyje.
export async function getContactEmployees(): Promise<Employee[]> {
  return getAllEmployees(
    "/employees?filters[active][$eq]=true&filters[showOnContacts][$eq]=true&sort[0]=sortOrder:asc&sort[1]=id:asc&populate[photo]=true&populate[padaliniais]=true"
  );
}