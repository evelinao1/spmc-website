import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";

export default function SuaugusiujuMokymasPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          title="Suaugusiųjų mokymas"
          description="Mokymosi galimybės suaugusiesiems, Užimtumo tarnybos klientams ir norintiems kelti kvalifikaciją."
        />

        <section className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeader
            title="Mokymosi galimybės"
            description="Čia bus pateikiama informacija apie formalųjį ir neformalųjį suaugusiųjų mokymą, edukacijas bei programas Užimtumo tarnybos klientams."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <InfoCard title="Užimtumo tarnybos klientams">
              Informacija apie mokymo programas ir galimybes mokytis pagal Užimtumo tarnybos priemones.
            </InfoCard>

            <InfoCard title="Neformalus suaugusiųjų mokymas">
              Trumpi mokymai, kursai ir kvalifikacijos tobulinimo galimybės.
            </InfoCard>

            <InfoCard title="Edukacijos">
              Edukacinės veiklos, praktiniai užsiėmimai ir mokymai įvairioms tikslinėms grupėms.
            </InfoCard>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}