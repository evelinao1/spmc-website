import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { fetchFromStrapi } from "@/lib/strapi";

export const revalidate = 3600;

type SitemapItem = {
  slug?: string | null;
  path?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
};

type StrapiCollectionResponse = {
  data?: SitemapItem[];
};

function normalizePath(path: string): string {
  const trimmedPath = path.trim();

  if (!trimmedPath) {
    return "/";
  }

  return trimmedPath.startsWith("/") ? trimmedPath : `/${trimmedPath}`;
}

function getLastModified(item: SitemapItem): Date {
  const date = item.updatedAt || item.publishedAt;

  if (!date) {
    return new Date();
  }

  const parsedDate = new Date(date);

  return Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
}

async function fetchCollection(
  endpoint: string
): Promise<SitemapItem[]> {
  try {
    const response = (await fetchFromStrapi(
      `${endpoint}?pagination[pageSize]=1000&fields[0]=slug&fields[1]=path&fields[2]=updatedAt&fields[3]=publishedAt`
    )) as StrapiCollectionResponse;

    return Array.isArray(response?.data) ? response.data : [];
  } catch (error) {
    console.error(`Nepavyko gauti sitemap duomenų iš ${endpoint}:`, error);

    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/programos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/stojantiesiems`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/naujienos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/skelbimai`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projektai`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/padaliniai`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/kontaktai`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/apie`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/apie/darbuotojai`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const [
    pages,
    news,
    announcements,
    projects,
    programs,
    campuses,
    employees,
  ] = await Promise.all([
    fetchCollection("/pages"),
    fetchCollection("/news"),
    fetchCollection("/announcements"),
    fetchCollection("/projects"),
    fetchCollection("/programs"),
    fetchCollection("/campuses"),
    fetchCollection("/employees"),
  ]);

  const pageRoutes: MetadataRoute.Sitemap = pages
    .filter((page) => page.path)
    .map((page) => ({
      url: `${siteUrl}${normalizePath(page.path as string)}`,
      lastModified: getLastModified(page),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const newsRoutes: MetadataRoute.Sitemap = news
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${siteUrl}/naujienos/${item.slug}`,
      lastModified: getLastModified(item),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const announcementRoutes: MetadataRoute.Sitemap = announcements
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${siteUrl}/skelbimai/${item.slug}`,
      lastModified: getLastModified(item),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${siteUrl}/projektai/${item.slug}`,
      lastModified: getLastModified(item),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const programRoutes: MetadataRoute.Sitemap = programs
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${siteUrl}/programos/${item.slug}`,
      lastModified: getLastModified(item),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const campusRoutes: MetadataRoute.Sitemap = campuses
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${siteUrl}/padaliniai/${item.slug}`,
      lastModified: getLastModified(item),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const employeeRoutes: MetadataRoute.Sitemap = employees
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${siteUrl}/apie/darbuotojai/${item.slug}`,
      lastModified: getLastModified(item),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const allRoutes = [
    ...staticRoutes,
    ...pageRoutes,
    ...newsRoutes,
    ...announcementRoutes,
    ...projectRoutes,
    ...programRoutes,
    ...campusRoutes,
    ...employeeRoutes,
  ];

  const uniqueRoutes = new Map(
    allRoutes.map((route) => [route.url, route])
  );

  return Array.from(uniqueRoutes.values());
}