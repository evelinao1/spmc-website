import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";

export default function DarbuotojaiPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Darbuotojai"
        description="Administracijos, specialistų, mokytojų ir kitų darbuotojų kontaktinė informacija."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          title="Centro darbuotojai"
          description="Čia bus pateikiama darbuotojų kontaktinė informacija ir pareigos."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <InfoCard title="Administracija">
            Direktorius, direktoriaus pavaduotojai ir administracijos darbuotojai.
          </InfoCard>

          <InfoCard title="Pagalbos mokiniui specialistai">
            Psichologas, socialinis pedagogas, specialusis pedagogas,
            karjeros specialistas ir sveikatos priežiūros specialistas.
          </InfoCard>

          <InfoCard title="Mokytojai">
            Profesijos mokytojai ir bendrojo ugdymo dalykų mokytojai.
          </InfoCard>

          <InfoCard title="Kiti darbuotojai">
            Bibliotekos, bendrabučio, administravimo ir techninio personalo darbuotojai.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </>
  );
}