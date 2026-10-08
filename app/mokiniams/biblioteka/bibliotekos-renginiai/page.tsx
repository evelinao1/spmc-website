import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { NewsList } from "@/components/NewsList";

export default async function BibliotekosRenginiaiPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string | string[];
  }>;
}) {
  const { page } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="w-full flex-1">
        <PageHero
          label="Biblioteka"
          title="Bibliotekos renginiai"
          description="Šilutės profesinio mokymo centro bibliotekos renginių archyvas."
        />

        <section className="mx-auto max-w-7xl px-6 py-16">
          <NewsList
            category="Bibliotekos renginiai"
            page={page}
            basePath="/mokiniams/biblioteka/bibliotekos-renginiai"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}