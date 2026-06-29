import { fetchFromStrapi } from "@/lib/strapi";
import { SearchItem } from "./types";

type StrapiSearchItem = {
  id: number;
  title?: string;
  description?: string;
  content?: string;
  keywords?: string;
  url?: string;
  type?: SearchItem["type"];
};

type StrapiSearchResponse = {
  data: StrapiSearchItem[];
};

export async function fetchSearchItems(): Promise<SearchItem[]> {
  const response = (await fetchFromStrapi(
    "/search-items?pagination[pageSize]=1000"
  )) as StrapiSearchResponse;

  return response.data
  .filter((item) => item.title && item.url && item.type)
  .map((item) => ({
    id: item.id,
    title: item.title || "",
    description: item.description || "",
    content: item.content || "",
    keywords: item.keywords || "",
    url: item.url || "#",
    type: item.type || "page",
  }));
}