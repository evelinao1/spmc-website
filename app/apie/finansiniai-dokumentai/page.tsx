import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";

export default function FinansiniaiDokumentaiPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Finansiniai dokumentai"
        description="Biudžeto vykdymo, finansinių ataskaitų ir kita finansinė informacija."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          title="Finansinė informacija"
          description="Čia bus skelbiami centro finansiniai dokumentai ir ataskaitų rinkiniai."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <InfoCard title="Biudžeto vykdymo ataskaitų rinkiniai">
            Biudžeto vykdymo ataskaitų rinkiniai ir susijusi informacija.
          </InfoCard>

          <InfoCard title="Finansinių ataskaitų rinkiniai">
            Finansinių ataskaitų rinkiniai ir kita finansinė dokumentacija.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </>
  );
}