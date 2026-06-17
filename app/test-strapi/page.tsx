import { fetchFromStrapi } from "@/lib/strapi";

export default async function TestStrapiPage() {
  const data = await fetchFromStrapi("/pages?populate=attachments");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Strapi Pages testas</h1>
      <pre className="mt-4 whitespace-pre-wrap rounded bg-slate-100 p-4 text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}