import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";
import Link from "next/link";

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
          <Link
            href="/apie/savivalda/istaigos-taryba-kolegialus-valdymo-organas"
            className="block"
          >
            <InfoCard title="Įstaigos taryba (kolegialus valdymo organas)">
              Informacija apie kolegialų valdymo organą, jo sudėtį ir veiklą.
            </InfoCard>
          </Link>

          <Link
            href="/apie/savivalda/istaigos-taryba-savivaldos-institucija"
            className="block"
          >
            <InfoCard title="Įstaigos taryba (savivaldos institucija)">
              Informacija apie savivaldos instituciją ir jos funkcijas.
            </InfoCard>
          </Link>

          <Link
            href="/apie/savivalda/darbo-taryba"
            className="block"
          >
            <InfoCard title="Darbo taryba">
              Darbo tarybos sudėtis, veikla ir aktuali informacija darbuotojams.
            </InfoCard>
          </Link>

          <Link
            href="/apie/savivalda/bendrojo-ugdymo-dalyku-metodine-grupe"
            className="block"
          >
            <InfoCard title="Bendrojo ugdymo dalykų metodinė grupė">
              Informacija apie metodinės grupės veiklą ir tikslus.
            </InfoCard>
          </Link>

          <Link
            href="/apie/savivalda/specialybes-dalyku-metodine-grupe"
            className="block"
          >
            <InfoCard title="Specialybės dalykų metodinė grupė">
              Informacija apie profesinio mokymo metodinę veiklą.
            </InfoCard>
          </Link>

          <Link
            href="/apie/savivalda/mokiniu-taryba"
            className="block"
          >
            <InfoCard title="Mokinių taryba">
              Mokinių savivaldos veikla, iniciatyvos ir atstovavimas mokiniams.
            </InfoCard>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}