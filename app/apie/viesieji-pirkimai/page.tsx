import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";

export default function ViesiejiPirkimaiPage() {
  return (
    <>
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
          <Link
            href="/apie/viesieji-pirkimai/viesuju-pirkimu-planas"
            className="block"
          >
            <InfoCard title="Viešųjų pirkimų planas">
              Metiniai viešųjų pirkimų planai ir jų pakeitimai.
            </InfoCard>
          </Link>

          <Link
            href="/apie/viesieji-pirkimai/viesuju-pirkimu-taisykles"
            className="block"
          >
            <InfoCard title="Viešųjų pirkimų taisyklės">
              Centro viešųjų pirkimų organizavimo tvarkos ir taisyklės.
            </InfoCard>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}