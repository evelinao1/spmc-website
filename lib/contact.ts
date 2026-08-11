import { fetchFromStrapi } from "./strapi";
import type { StrapiBlock } from "@/components/RichText";

export type Contact = {
  id: number;
  documentId: string;

  title: string;

  legalName?: string | null;
  legalEntityCode?: string | null;

  address?: string | null;
  streetAddress?: string | null;
  postalCode?: string | null;
  addressLocality?: string | null;
  addressRegion?: string | null;
  addressCountry?: string | null;

  phone?: string | null;
  email?: string | null;

  workingHours?: StrapiBlock[] | null;
  legalInformation?: StrapiBlock[] | null;

  institutionCode?: string | null;
  legalForm?: string | null;
  registryManager?: string | null;
  budgetBank?: string | null;
  budgetAccount?: string | null;
  incomeBank?: string | null;
  incomeAccount?: string | null;

  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;

  googleMapsEmbed?: string | null;
};

export async function getContact(): Promise<Contact | null> {
  const data = await fetchFromStrapi("/contact");

  return data?.data ?? null;
}