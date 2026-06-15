import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";

export default function KorupcijosPrevencijaPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Korupcijos prevencija"
        description="Informacija apie korupcijos prevencijos priemones, dokumentus ir atsakingus asmenis."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          title="Korupcijos prevencijos informacija"
          description="Čia bus skelbiami korupcijos prevencijos dokumentai, priemonės ir aktuali informacija."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <InfoCard title="Korupcijos prevencijos dokumentai">
            Politika, tvarkos aprašai, planai ir kita su korupcijos prevencija susijusi informacija.
          </InfoCard>

          <InfoCard title="Atsakinga informacija">
            Kontaktai ir informacija, kur kreiptis dėl korupcijos prevencijos klausimų.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </>
  );
}