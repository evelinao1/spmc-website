import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export default function KontaktaiPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Kontaktai"
        title="Susisiekite su Šilutės profesinio mokymo centru"
        description="Turite klausimų apie priėmimą, mokymo programas ar studijas? Susisiekite su mumis."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Bendri kontaktai
            </h2>

            <div className="mt-4 space-y-3 text-slate-600">
              <p>Šilutės profesinio mokymo centras</p>
              <p>Lietuvininkų g. 74, Šilutė</p>
              <p>Tel. +370 441 XXXXX</p>
              <p>El. paštas: info@spmc.lt</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Priėmimo informacija
            </h2>

            <div className="mt-4 space-y-3 text-slate-600">
              <p>Klausimai dėl priėmimo ir mokymo programų.</p>
              <p>Tel. +370 441 XXXXX</p>
              <p>El. paštas: priemimas@spmc.lt</p>
            </div>
          </div>
        </div>

        <section className="mt-14 rounded-3xl bg-slate-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Darbuotojų kontaktai
          </h2>

          <p className="mt-4 max-w-3xl text-slate-600">
            Vėliau šiame puslapyje bus pateikiamas darbuotojų katalogas,
            administracijos kontaktai ir kontaktinė forma. Visa informacija
            bus valdoma per Strapi.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}