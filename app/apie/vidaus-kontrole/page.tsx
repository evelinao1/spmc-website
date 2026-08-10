import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";

export default function VidausKontrolePage() {
  return (
    <>
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