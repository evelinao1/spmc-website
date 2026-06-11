import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

const aboutItems = [
  {
    title: "Centro pristatymas",
    description:
      "Šilutės profesinio mokymo centras rengia specialistus, pasiruošusius dirbti šiuolaikinėje darbo rinkoje.",
  },
  {
    title: "Misija ir vizija",
    description:
      "Siekiame sudaryti sąlygas mokytis, augti ir įgyti praktinių įgūdžių kiekvienam mokiniui.",
  },
  {
    title: "Bendruomenė",
    description:
      "Centre mokosi, dirba ir bendradarbiauja mokiniai, mokytojai, socialiniai partneriai ir regiono įmonės.",
  },
];

export default function ApiePage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Šilutės profesinio mokymo centras"
        description="Moderni profesinio mokymo įstaiga, kurioje teorija derinama su praktika, o mokymasis siejamas su realiais darbo rinkos poreikiais."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {aboutItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h2>

              <p className="mt-3 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>

        <section className="mt-14 rounded-3xl bg-slate-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Dokumentai ir veiklos informacija
          </h2>

          <p className="mt-4 max-w-3xl text-slate-600">
            Vėliau čia bus pateikiama svarbiausia centro veiklos informacija:
            nuostatai, veiklos ataskaitos, kokybės politika, administracija ir
            kiti dokumentai.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}