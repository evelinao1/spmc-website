import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";

export default function FinansiniaiDokumentaiPage() {
  return (
    <>
      <PageHero
        label="Apie centrą"
        title="Finansiniai dokumentai"
        description="Biudžeto vykdymo, finansinių ataskaitų ir kita finansinė informacija."
      />

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6">
        <Breadcrumb
          items={[
            { label: "Pradžia", href: "/" },
            { label: "Apie centrą", href: "/apie" },
            { label: "Finansiniai dokumentai" },
          ]}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            href="/apie/finansiniai-dokumentai/biudzeto-vykdymo-ataskaitu-rinkiniai"
            className="block"
          >
            <InfoCard title="Biudžeto vykdymo ataskaitų rinkiniai">
              Biudžeto vykdymo ataskaitų rinkiniai ir susijusi informacija.
            </InfoCard>
          </Link>

          <Link
            href="/apie/finansiniai-dokumentai/finansiniu-ataskaitu-rinkiniai"
            className="block"
          >
            <InfoCard title="Finansinių ataskaitų rinkiniai">
              Finansinių ataskaitų rinkiniai ir kita finansinė dokumentacija.
            </InfoCard>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}