import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";

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
  <Link
    href="/stojantiesiems/kaip-pateikti-prasyma"
    className="block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
  >
    <h2 className="text-xl font-semibold text-slate-900">
      Kaip pateikti prašymą?
    </h2>

    <p className="mt-3 text-slate-600">
      Sužinok, kaip pateikti prašymą mokytis ir kokie žingsniai laukia
      stojimo proceso metu.
    </p>
  </Link>

  <Link
    href="/stojantiesiems/priemimo-terminai"
    className="block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
  >
    <h2 className="text-xl font-semibold text-slate-900">
      Priėmimo terminai
    </h2>

    <p className="mt-3 text-slate-600">
      Svarbiausios datos ir informacija apie pagrindinį bei papildomą
      priėmimą.
    </p>
  </Link>

  <Link
    href="/stojantiesiems/reikalingi-dokumentai"
    className="block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
  >
    <h2 className="text-xl font-semibold text-slate-900">
      Reikalingi dokumentai
    </h2>

    <p className="mt-3 text-slate-600">
      Dokumentų sąrašas ir kita informacija, reikalinga stojant į
      profesinio mokymo programas.
    </p>
  </Link>
</div>

        <div className="mt-12 rounded-3xl bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Pasiruošęs tapti ŠPMC bendruomenės dalimi?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Susipažink su siūlomomis programomis ir pateik prašymą mokytis.
          </p>

          <button className="mt-6 rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800">
            Pildyti prašymą
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}