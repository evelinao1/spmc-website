import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";
import Link from "next/link";

export default function KompetencijuVertinimoCentrasPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Kompetencijų vertinimo centras"
        description="Informacija apie asmens įgytų kompetencijų vertinimą, kvalifikacijų suteikimą ir registraciją."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          title="Kompetencijų vertinimas"
          description="Šiame puslapyje bus pateikiama aktuali informacija asmenims, norintiems įsivertinti turimas kompetencijas ar įgyti kvalifikaciją."
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