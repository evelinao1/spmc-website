import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function ViesiejiPirkimaiPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Viešieji pirkimai"
        description="Viešųjų pirkimų planai, taisyklės ir kita su pirkimais susijusi informacija."
      />

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6">
        <Breadcrumb
          items={[
            { label: "Pradžia", href: "/" },
            { label: "Apie centrą", href: "/apie" },
            { label: "Viešieji pirkimai" },
          ]}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <InfoCard
            title="Viešųjų pirkimų planas"
            href="/apie/viesieji-pirkimai/viesuju-pirkimu-planas"
          >
            Metiniai viešųjų pirkimų planai ir jų pakeitimai.
          </InfoCard>

          <InfoCard
            title="Viešųjų pirkimų taisyklės"
            href="/apie/viesieji-pirkimai/viesuju-pirkimu-taisykles"
          >
            Centro viešųjų pirkimų organizavimo tvarkos ir taisyklės.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </>
  );
}