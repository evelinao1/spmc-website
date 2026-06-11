import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

const newsItems = [
  {
    date: "2026 m. gegužės 20 d.",
    title: "ŠPMC bendruomenės naujienos",
    description:
      "Čia bus skelbiamos svarbiausios centro naujienos, renginiai ir mokinių pasiekimai.",
  },
  {
    date: "2026 m. balandžio 8 d.",
    title: "Mokinių veiklos ir renginiai",
    description:
      "Informacija apie mokinių veiklas, konkursus, projektus ir profesinio mokymo patirtis.",
  },
  {
    date: "2026 m. kovo 15 d.",
    title: "Aktuali informacija stojantiesiems",
    description:
      "Svarbūs pranešimai apie priėmimą, mokymo programas ir mokymosi galimybes.",
  },
];

export default function NaujienosPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Naujienos"
        title="ŠPMC naujienos ir aktualijos"
        description="Sekite svarbiausias Šilutės profesinio mokymo centro naujienas, renginius, projektus ir mokinių pasiekimus."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {newsItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <p className="text-sm font-semibold text-blue-700">
                {item.date}
              </p>

              <h2 className="mt-3 text-xl font-semibold text-slate-900">
                {item.title}
              </h2>

              <p className="mt-3 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-14 rounded-3xl bg-slate-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Naujienos bus valdomos per Strapi
          </h2>

          <p className="mt-4 max-w-3xl text-slate-600">
            Vėliau naujienos bus keliamos per turinio valdymo sistemą: su
            nuotraukomis, kategorijomis, paskelbimo data, autoriais ir detaliu
            naujienos puslapiu.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}