import { fetchFromStrapi } from "./strapi";
import type { StrapiBlock } from "@/components/RichText";

export type Contact = {
  id: number;
  documentId: string;
  title: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  workingHours?: StrapiBlock[] | null;
  legalInformation?: StrapiBlock[] | null;
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  googleMapsEmbed?: string | null;
};

export async function getContact(): Promise<Contact | null> {
  const data = await fetchFromStrapi("/contact");

  return data?.data ?? null;
}