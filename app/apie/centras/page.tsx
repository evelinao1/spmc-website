import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";

export default function CentrasPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Šilutės profesinio mokymo centras"
        description="Centro pristatymas, istorija, misija ir vizija."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          title="Apie ŠPMC"
          description="Šiame puslapyje bus pateikiama pagrindinė informacija apie centro veiklą, istoriją ir veiklos kryptis."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <InfoCard title="Centro pristatymas">
            Šilutės profesinio mokymo centras rengia specialistus, pasirengusius šiuolaikinei darbo rinkai.
          </InfoCard>

          <InfoCard title="Istorija">
            Čia bus pateikiama centro istorija, svarbiausi veiklos etapai ir pokyčiai.
          </InfoCard>

          <InfoCard title="Misija ir vizija">
            Siekiame užtikrinti kokybišką profesinį mokymą, ugdyti atsakingą ir kūrybingą asmenybę bei stiprinti ryšį su darbo rinka.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </>
  );
}