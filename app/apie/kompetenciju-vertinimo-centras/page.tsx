import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";

export default function KompetencijuVertinimoCentrasPage() {
  return (
    <>
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
          <Link
            href="/apie/kompetenciju-vertinimo-centras/apie-centra"
            className="block"
          >
            <InfoCard title="Apie centrą">
              Centro funkcijos, pasitelktos įstaigos, kontaktinė informacija.
            </InfoCard>
          </Link>

          <Link
            href="/apie/kompetenciju-vertinimo-centras/registracija"
            className="block"
          >
            <InfoCard title="Registracija">
              Čia bus pateikiama registracijos tvarka, terminai ir kontaktinė
              informacija.
            </InfoCard>
          </Link>

          <Link
            href="/apie/kompetenciju-vertinimo-centras/tvarkarasciai"
            className="block"
          >
            <InfoCard title="Tvarkaraščiai">
              Čia bus skelbiami kompetencijų vertinimo tvarkaraščiai.
            </InfoCard>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}