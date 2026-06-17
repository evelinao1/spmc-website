import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";
import Link from "next/link";

export default function VidausKontrolePage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Vidaus kontrolė"
        description="Informacija apie vidaus kontrolės politiką, procedūras ir susijusius dokumentus."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          title="Vidaus kontrolės sistema"
          description="Čia bus pateikiama informacija apie Šilutės profesinio mokymo centro vidaus kontrolės sistemą ir jos dokumentus."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            href="/apie/vidaus-kontrole/vidaus-kontroles-politika"
            className="block"
          >
            <InfoCard title="Vidaus kontrolės politika">
              Vidaus kontrolės tikslai, principai ir pagrindinės nuostatos.
            </InfoCard>
          </Link>

          <Link
            href="/apie/vidaus-kontrole/vidaus-kontroles-dokumentai"
            className="block"
          >
            <InfoCard title="Dokumentai">
              Vidaus kontrolės tvarkos, aprašai ir kita susijusi dokumentacija.
            </InfoCard>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}