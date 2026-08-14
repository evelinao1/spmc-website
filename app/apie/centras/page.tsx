import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function CentrasPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Šilutės profesinio mokymo centras"
        description="Centro pristatymas, istorija, misija ir vizija."
      />

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6">
        <Breadcrumb
          items={[
            { label: "Pradžia", href: "/" },
            { label: "Apie centrą", href: "/apie" },
            { label: "Šilutės profesinio mokymo centras" },
          ]}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Centro pristatymas"
            href="/apie/centras/centro-pristatymas"
          >
            Šilutės profesinio mokymo centras rengia specialistus,
            pasirengusius šiuolaikinei darbo rinkai.
          </InfoCard>

          <InfoCard
            title="Istorija"
            href="/apie/centras/istorija"
          >
            Čia bus pateikiama centro istorija, svarbiausi veiklos etapai ir
            pokyčiai.
          </InfoCard>

          <InfoCard
            title="Misija ir vizija"
            href="/apie/centras/misija-ir-vizija"
          >
            Siekiame užtikrinti kokybišką profesinį mokymą, ugdyti atsakingą ir
            kūrybingą asmenybę bei stiprinti ryšį su darbo rinka.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </>
  );
}