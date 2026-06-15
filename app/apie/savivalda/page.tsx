import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";

export default function SavivaldaPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Savivalda"
        description="Informacija apie centro savivaldos institucijas ir kolegialius valdymo organus."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          title="Savivaldos institucijos"
          description="Čia bus pateikiama informacija apie centro tarybas, metodines grupes ir mokinių savivaldą."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <InfoCard title="Įstaigos taryba (kolegialus valdymo organas)">
            Informacija apie kolegialų valdymo organą, jo sudėtį ir veiklą.
          </InfoCard>

          <InfoCard title="Įstaigos taryba (savivaldos institucija)">
            Informacija apie savivaldos instituciją ir jos funkcijas.
          </InfoCard>

          <InfoCard title="Darbo taryba">
            Darbo tarybos sudėtis, veikla ir aktuali informacija darbuotojams.
          </InfoCard>

          <InfoCard title="Bendrojo ugdymo dalykų metodinė grupė">
            Informacija apie metodinės grupės veiklą ir tikslus.
          </InfoCard>

          <InfoCard title="Specialybės dalykų metodinė grupė">
            Informacija apie profesinio mokymo metodinę veiklą.
          </InfoCard>

          <InfoCard title="Mokinių taryba">
            Mokinių savivaldos veikla, iniciatyvos ir atstovavimas mokiniams.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </>
  );
}