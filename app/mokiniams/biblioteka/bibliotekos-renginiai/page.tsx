import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { NewsList } from "@/components/NewsList";

export default function BibliotekosRenginiaiPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          label="Biblioteka"
          title="Bibliotekos renginiai"
          description="Šilutės profesinio mokymo centro bibliotekos renginių archyvas."
        />

        <section className="mx-auto max-w-7xl px-6 py-16">
          <NewsList category="Bibliotekos renginiai" />
        </section>
      </main>

      <Footer />
    </>
  );
}