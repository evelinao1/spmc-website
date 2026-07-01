import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SearchResultsGrouped } from "@/components/search/SearchResultsGrouped";
import { fetchSearchItems, searchItems } from "@/lib/search";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const items = await fetchSearchItems();
  const results = query ? searchItems(items, query, 100) : [];

  return (
    <>
      <Header />

      <PageHero
        title="Paieška"
        description="Ieškokite puslapių, naujienų, programų, darbuotojų ir kitos informacijos."
      />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <form action="/paieska" className="mb-8">
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Paieškos frazė
          </label>

          <div className="flex gap-3">
            <input
              id="search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Įveskite paieškos frazę..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Ieškoti
            </button>
          </div>
        </form>

        {!query && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-8 text-center">
            <p className="text-sm font-semibold text-slate-700">
              Įveskite paieškos frazę
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Rezultatai bus rodomi šiame puslapyje.
            </p>
          </div>
        )}

        {query && (
          <>
            <p className="mb-5 text-sm text-slate-500">
              Rasta rezultatų:{" "}
              <span className="font-semibold text-slate-900">
                {results.length}
              </span>
            </p>

            <SearchResultsGrouped results={results} />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}