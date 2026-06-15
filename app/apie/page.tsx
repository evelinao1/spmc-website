import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

const aboutItems = [
  {
    title: "Apie centrą",
    description:
      "Centro pristatymas, istorija, misija, vizija ir pagrindinė informacija apie įstaigą.",
    href: "/apie/centras",
  },
  {
    title: "Kompetencijų vertinimo centras",
    description:
      "Informacija apie kompetencijų vertinimą, kvalifikacijų suteikimą, registraciją ir dokumentus.",
    href: "/apie/kompetenciju-vertinimo-centras",
  },
  {
    title: "Darbuotojai",
    description:
      "Administracijos, specialistų ir kitų darbuotojų kontaktinė informacija.",
    href: "/apie/darbuotojai",
  },
  {
    title: "Dokumentai",
    description:
      "Svarbiausi centro dokumentai, tvarkos, planai ir veiklos informacija.",
    href: "/apie/dokumentai",
  },
  {
    title: "Savivalda",
    description:
      "Centro tarybos, metodinės grupės ir mokinių tarybos informacija.",
    href: "/apie/savivalda",
  },
  {
    title: "Finansiniai dokumentai",
    description:
      "Biudžeto vykdymo ir finansinių ataskaitų informacija.",
    href: "/apie/finansiniai-dokumentai",
  },
  {
    title: "Viešieji pirkimai",
    description:
      "Viešųjų pirkimų planai, taisyklės ir kita susijusi informacija.",
    href: "/apie/viesieji-pirkimai",
  },
  {
    title: "Korupcijos prevencija",
    description:
      "Korupcijos prevencijos dokumentai ir atsakinga informacija.",
    href: "/apie/korupcijos-prevencija",
  },
  {
    title: "Pranešėjo apsauga",
    description:
      "Informacija apie pranešėjų apsaugą ir vidinius pranešimų kanalus.",
    href: "/apie/pranesejo-apsauga",
  },
  {
    title: "Vidaus kontrolė",
    description:
      "Vidaus kontrolės politika ir susiję dokumentai.",
    href: "/apie/vidaus-kontrole",
  },
];

export default function ApiePage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Informacija apie centrą"
        description="Darbuotojai, dokumentai, kompetencijų vertinimas, savivalda, finansinė informacija ir kita aktuali informacija apie Šilutės profesinio mokymo centrą."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aboutItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h2>

              <p className="mt-3 text-slate-600">
                {item.description}
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-blue-700">
                Atverti →
              </span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}