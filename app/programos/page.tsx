import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

const programCategories = [
  {
    title: "Baigusiems 10 klasių",
    description: "Programos mokiniams, norintiems įgyti profesiją kartu su viduriniu išsilavinimu.",
  },
  {
    title: "Baigusiems 12 klasių",
    description: "Profesinio mokymo programos jau turintiems vidurinį išsilavinimą.",
  },
  {
    title: "Suaugusiesiems",
    description: "Mokymosi galimybės norintiems persikvalifikuoti ar įgyti naujų įgūdžių.",
  },
];

const fields = [
  "Inžinerija ir technologijos",
  "Paslaugos ir turizmas",
  "Žuvininkystė",
  "Socialinė sritis",
];

export default function ProgramosPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Mokymo programos"
        title="Atrask sau tinkamą profesinio mokymo programą"
        description="Šilutės profesinio mokymo centre gali rinktis programas pagal turimą išsilavinimą, interesus ir norimą profesinį kelią."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Programos pagal mokymosi kelią
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {programCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="text-xl font-semibold text-slate-900">
                  {category.title}
                </h3>

                <p className="mt-3 text-slate-600">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900">
            Mokymo sritys
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {fields.map((field) => (
              <span
                key={field}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {field}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-slate-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Programų sąrašas bus pildomas
          </h2>

          <p className="mt-4 max-w-3xl text-slate-600">
            Vėliau čia bus rodomos konkrečios profesinio mokymo programos su aprašymais,
            trukme, mokymosi forma, priėmimo sąlygomis ir galimybėmis po mokslų.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}