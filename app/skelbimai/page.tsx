import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";

export default function SkelbimaiPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          title="Skelbimai"
          description="Aktuali informacija, kvietimai, konkursai ir svarbūs pranešimai bendruomenei."
        />

        <section className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeader
            title="Naujausi skelbimai"
            description="Čia bus pateikiami centro skelbimai, kvietimai ir kita trumpalaikė aktuali informacija."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <InfoCard title="Priėmimo informacija">
              Svarbūs pranešimai stojantiesiems ir jų tėvams.
            </InfoCard>

            <InfoCard title="Konkursai">
              Informacija apie vykdomus konkursus ir atrankas.
            </InfoCard>

            <InfoCard title="Kiti pranešimai">
              Bendruomenei aktualūs centro pranešimai.
            </InfoCard>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}