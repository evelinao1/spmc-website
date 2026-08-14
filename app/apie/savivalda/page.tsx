import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function SavivaldaPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Savivalda"
        description="Informacija apie centro savivaldos institucijas ir kolegialius valdymo organus."
      />

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6">
        <Breadcrumb
          items={[
            { label: "Pradžia", href: "/" },
            { label: "Apie centrą", href: "/apie" },
            { label: "Savivalda" },
          ]}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <InfoCard
            title="Įstaigos taryba (kolegialus valdymo organas)"
            href="/apie/savivalda/istaigos-taryba-kolegialus-valdymo-organas"
          >
            Informacija apie kolegialų valdymo organą, jo sudėtį ir veiklą.
          </InfoCard>

          <InfoCard
            title="Įstaigos taryba (savivaldos institucija)"
            href="/apie/savivalda/istaigos-taryba-savivaldos-institucija"
          >
            Informacija apie savivaldos instituciją ir jos funkcijas.
          </InfoCard>

          <InfoCard
            title="Darbo taryba"
            href="/apie/savivalda/darbo-taryba"
          >
            Darbo tarybos sudėtis, veikla ir aktuali informacija darbuotojams.
          </InfoCard>

          <InfoCard
            title="Bendrojo ugdymo dalykų metodinė grupė"
            href="/apie/savivalda/bendrojo-ugdymo-dalyku-metodine-grupe"
          >
            Informacija apie metodinės grupės veiklą ir tikslus.
          </InfoCard>

          <InfoCard
            title="Specialybės dalykų metodinė grupė"
            href="/apie/savivalda/specialybes-dalyku-metodine-grupe"
          >
            Informacija apie profesinio mokymo metodinę veiklą.
          </InfoCard>

          <InfoCard
            title="Mokinių taryba"
            href="/apie/savivalda/mokiniu-taryba"
          >
            Mokinių savivaldos veikla, iniciatyvos ir atstovavimas mokiniams.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </>
  );
}