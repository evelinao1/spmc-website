import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function KompetencijuVertinimoCentrasPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Kompetencijų vertinimo centras"
        description="Informacija apie asmens įgytų kompetencijų vertinimą, kvalifikacijų suteikimą ir registraciją."
      />

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6">
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
            Centro funkcijos, pasitelktos įstaigos, kontaktinė informacija.
          </InfoCard>

          <InfoCard
            title="Registracija"
            href="/apie/kompetenciju-vertinimo-centras/registracija"
          >
            Čia bus pateikiama registracijos tvarka, terminai ir kontaktinė
            informacija.
          </InfoCard>

          <InfoCard
            title="Tvarkaraščiai"
            href="/apie/kompetenciju-vertinimo-centras/tvarkarasciai"
          >
            Čia bus skelbiami kompetencijų vertinimo tvarkaraščiai.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </>
  );
}