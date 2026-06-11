import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

const campuses = [
  {
    title: "Paslaugų ir turizmo skyrius",
    description:
      "Profesinio mokymo programos, praktinis mokymas ir mokinių veiklos Paslaugų ir turizmo skyriuje.",
  },
  {
    title: "Pagrynių skyrius",
    description:
      "Mokymo programos, praktinis rengimas ir bendruomenės veiklos Pagrynių skyriuje.",
  },
  {
    title: "Žuvininkystės sektorinis praktinio mokymo centras",
    description:
      "Moderni praktinio mokymo bazė žuvininkystės ir susijusių sričių specialistams rengti.",
  },
];

export default function PadaliniaiPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Padaliniai"
        title="Mokykis modernioje ir praktiškoje aplinkoje"
        description="Šilutės profesinio mokymo centrą sudaro keli padaliniai, kuriuose mokiniai mokosi ir įgyja profesinių įgūdžių."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {campuses.map((campus) => (
            <div
              key={campus.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {campus.title}
              </h2>

              <p className="mt-3 text-slate-600">
                {campus.description}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-14 rounded-3xl bg-slate-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Daugiau informacijos apie padalinius
          </h2>

          <p className="mt-4 max-w-3xl text-slate-600">
            Ateityje kiekvienas padalinys turės savo puslapį su nuotraukomis,
            kontaktais, mokymo programomis ir virtualiu pristatymu.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}