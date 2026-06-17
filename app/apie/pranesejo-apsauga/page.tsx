import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";
import Link from "next/link";

export default function PranesejoApsaugaPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Pranešėjo apsauga"
        description="Informacija apie vidinius informacijos teikimo kanalus ir pranešėjų apsaugą."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          title="Pranešėjų apsauga"
          description="Čia bus pateikiama informacija apie pranešėjų apsaugą, vidinius kanalus ir susijusius dokumentus."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            href="/apie/pranesejo-apsauga/vidinis-informacijos-teikimo-kanalas"
            className="block"
          >
            <InfoCard title="Vidinis informacijos teikimo kanalas">
              Informacija apie pranešimų teikimo tvarką ir atsakingus asmenis.
            </InfoCard>
          </Link>

          <Link
            href="/apie/pranesejo-apsauga/praneseju-apsauga"
            className="block"
          >
            <InfoCard title="Pranešėjų apsauga">
              Teisinė informacija, dokumentai ir apsaugos priemonės pranešėjams.
            </InfoCard>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}