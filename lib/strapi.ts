const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchFromStrapi(path: string) {
  if (!STRAPI_URL) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not set");
  }

  if (!STRAPI_API_TOKEN) {
    throw new Error("STRAPI_API_TOKEN is not set");
  }

  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status}`);
  }

  return res.json();
}