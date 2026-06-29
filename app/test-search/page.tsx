import { fetchSearchItems, searchItems } from "@/lib/search";

type TestSearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function TestSearchPage({
  searchParams,
}: TestSearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const items = await fetchSearchItems();
  const results = searchItems(items, query, 20);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold">Paieškos testas</h1>

      <form className="mb-8 flex gap-3">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Įvesk paieškos žodį..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

        <button
          type="submit"
          className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white"
        >
          Ieškoti
        </button>
      </form>

      <p className="mb-6 text-sm text-slate-600">
        Viso indeksuotų įrašų: {items.length}
      </p>

      {query && (
        <p className="mb-6 text-sm text-slate-600">
          Rasta rezultatų: {results.length}
        </p>
      )}

      <div className="space-y-4">
        {results.map((result) => (
          <div
            key={`${result.type}-${result.id}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
              {result.type} · score: {result.score}
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              {result.title}
            </h2>

            {result.description && (
              <p className="mt-2 text-slate-600">{result.description}</p>
            )}

            <p className="mt-3 text-sm text-slate-500">{result.url}</p>
          </div>
        ))}
      </div>
    </main>
  );
}