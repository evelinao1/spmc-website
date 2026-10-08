import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function KompetencijuVertinimoCentrasPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <PageHero
        label="Apie centrą"
        title="Kompetencijų vertinimo centras"
        description="Informacija apie asmens įgytų kompetencijų vertinimą, kvalifikacijų suteikimą ir registraciją."
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-16">
        <Breadcrumb
          items={[
            { label: "Pradžia", href: "/" },
            { label: "Apie centrą", href: "/apie" },
            { label: "Kompetencijų vertinimo centras" },
          ]}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Apie centrą"
            href="/apie/kompetenciju-vertinimo-centras/apie-centra"
          >
            Kompetencijų vertinimo centro veikla, pasitelktos įstaigos ir kontaktai.
          </InfoCard>

          <InfoCard
            title="Registracija"
            href="/apie/kompetenciju-vertinimo-centras/registracija"
          >
            Registracijos į kompetencijų vertinimą tvarka, terminai ir kontaktai.
          </InfoCard>

          <InfoCard
            title="Tvarkaraščiai"
            href="/apie/kompetenciju-vertinimo-centras/tvarkarasciai"
          >
            Kompetencijų vertinimo datos, laikas ir vietos.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}