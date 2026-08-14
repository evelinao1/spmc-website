import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function StojantiesiemsPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Stojantiesiems"
        title="Pradėk savo profesinį kelią ŠPMC"
        description="Visa svarbiausia informacija apie priėmimą, dokumentų pateikimą ir profesinio mokymo programas."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Kaip pateikti prašymą?"
            href="/stojantiesiems/kaip-pateikti-prasyma"
          >
            <p>
              Sužinok, kaip pateikti prašymą mokytis ir kokie žingsniai laukia
              stojimo proceso metu.
            </p>
          </InfoCard>

          <InfoCard
            title="Priėmimo terminai"
            href="/stojantiesiems/priemimo-terminai"
          >
            <p>
              Svarbiausios datos ir informacija apie pagrindinį bei papildomą
              priėmimą.
            </p>
          </InfoCard>

          <InfoCard
            title="Reikalingi dokumentai"
            href="/stojantiesiems/reikalingi-dokumentai"
          >
            <p>
              Dokumentų sąrašas ir kita informacija, reikalinga stojant į
              profesinio mokymo programas.
            </p>
          </InfoCard>
        </div>

        <div className="mt-12 rounded-3xl bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Pasiruošęs tapti ŠPMC bendruomenės dalimi?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Susipažink su siūlomomis programomis ir pateik prašymą mokytis.
          </p>

          <div className="mt-6">
            <PrimaryButton href="https://mokausi.lt" external>
              Pildyti prašymą
            </PrimaryButton>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}