import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";

export default function ViesiejiPirkimaiPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Viešieji pirkimai"
        description="Viešųjų pirkimų planai, taisyklės ir kita su pirkimais susijusi informacija."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          title="Viešųjų pirkimų informacija"
          description="Čia bus skelbiama aktuali informacija apie Šilutės profesinio mokymo centro vykdomus viešuosius pirkimus."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <InfoCard title="Viešųjų pirkimų planas">
            Metiniai viešųjų pirkimų planai ir jų pakeitimai.
          </InfoCard>

          <InfoCard title="Viešųjų pirkimų taisyklės">
            Centro viešųjų pirkimų organizavimo tvarkos ir taisyklės.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </>
  );
}