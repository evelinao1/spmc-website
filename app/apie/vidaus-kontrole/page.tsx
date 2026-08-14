import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function VidausKontrolePage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Vidaus kontrolė"
        description="Informacija apie vidaus kontrolės politiką, procedūras ir susijusius dokumentus."
      />

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6">
        <Breadcrumb
          items={[
            { label: "Pradžia", href: "/" },
            { label: "Apie centrą", href: "/apie" },
            { label: "Vidaus kontrolė" },
          ]}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <InfoCard
            title="Vidaus kontrolės politika"
            href="/apie/vidaus-kontrole/vidaus-kontroles-politika"
          >
            Vidaus kontrolės tikslai, principai ir pagrindinės nuostatos.
          </InfoCard>

          <InfoCard
            title="Dokumentai"
            href="/apie/vidaus-kontrole/vidaus-kontroles-dokumentai"
          >
            Vidaus kontrolės tvarkos, aprašai ir kita susijusi dokumentacija.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </>
  );
}