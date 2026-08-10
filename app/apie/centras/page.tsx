import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";

export default function CentrasPage() {
  return (
    <>
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
          <Link
            href="/apie/centras/centro-pristatymas"
            className="block"
          >
            <InfoCard title="Centro pristatymas">
              Šilutės profesinio mokymo centras rengia specialistus,
              pasirengusius šiuolaikinei darbo rinkai.
            </InfoCard>
          </Link>

          <Link
            href="/apie/centras/istorija"
            className="block"
          >
            <InfoCard title="Istorija">
              Čia bus pateikiama centro istorija, svarbiausi veiklos
              etapai ir pokyčiai.
            </InfoCard>
          </Link>

          <Link
            href="/apie/centras/misija-ir-vizija"
            className="block"
          >
            <InfoCard title="Misija ir vizija">
              Siekiame užtikrinti kokybišką profesinį mokymą, ugdyti
              atsakingą ir kūrybingą asmenybę bei stiprinti ryšį su
              darbo rinka.
            </InfoCard>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}