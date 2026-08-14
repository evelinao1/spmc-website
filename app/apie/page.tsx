import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";

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
      "Korupcijos prevencija, pranešėjų apsauga, interesų konfliktų valdymas ir kita skaidrumo informacija.",
    href: "/apie/korupcijos-prevencija",
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
            <InfoCard
              key={item.title}
              title={item.title}
              href={item.href}
            >
              {item.description}
            </InfoCard>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}