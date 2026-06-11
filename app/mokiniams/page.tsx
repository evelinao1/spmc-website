import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

const studentLinks = [
  {
    title: "Tvarkaraščiai",
    description: "Pamokų, praktinio mokymo ir kitų veiklų tvarkaraščiai.",
  },
  {
    title: "Stipendijos",
    description: "Informacija apie stipendijas, paramą ir skatinimo galimybes.",
  },
  {
    title: "Bendrabutis",
    description: "Gyvenimo bendrabutyje sąlygos ir svarbiausia informacija mokiniams.",
  },
  {
    title: "Praktika",
    description: "Praktinio mokymo, praktikos vietų ir bendradarbiavimo su įmonėmis informacija.",
  },
];

export default function MokiniamsPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Mokiniams"
        title="Svarbiausia informacija ŠPMC mokiniams"
        description="Čia rasi informaciją apie mokymąsi, tvarkaraščius, stipendijas, bendrabutį, praktiką ir kasdienį gyvenimą centre."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {studentLinks.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h2>

              <p className="mt-3 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-14 rounded-3xl bg-slate-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Mokinio kasdienybė
          </h2>

          <p className="mt-4 max-w-3xl text-slate-600">
            Vėliau šiame puslapyje bus pateikiama aktuali informacija mokiniams:
            dokumentai, vidaus tvarkos taisyklės, pagalbos galimybės, renginiai
            ir kiti svarbūs pranešimai.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}