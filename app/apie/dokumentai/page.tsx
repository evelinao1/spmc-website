import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCard } from "@/components/InfoCard";

const documentCategories = [
  {
    title: "Strateginiai ir veiklos dokumentai",
    items: "Strateginis planas, ugdymo planas, metinės veiklos programos, veiklos ataskaitos.",
  },
  {
    title: "Tvarkos ir taisyklės",
    items: "Vidaus tvarkos taisyklės, darbo apmokėjimo sistema, mokinio elgesio taisyklės, bendrabučio taisyklės.",
  },
  {
    title: "Mokiniams aktualūs dokumentai",
    items: "Nemokamas maitinimas, valgiaraščiai, stipendijos, praktika, bendrabutis.",
  },
  {
    title: "Saugumas ir gerovė",
    items: "Smurto ir priekabiavimo prevencija, vaiko gerovės komisija, ekstremalių situacijų valdymas.",
  },
  {
    title: "Duomenų apsauga ir IT",
    items: "BDAR taisyklės, elektroninio dienyno nuostatai, naudojimosi kompiuterių tinklais taisyklės.",
  },
];

export default function DokumentaiPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Dokumentai"
        description="Svarbiausi Šilutės profesinio mokymo centro dokumentai, tvarkos, planai ir ataskaitos."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          title="Dokumentų kategorijos"
          description="Dokumentai vėliau bus valdomi per turinio valdymo sistemą ir rūšiuojami pagal kategorijas."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {documentCategories.map((category) => (
            <InfoCard key={category.title} title={category.title}>
              {category.items}
            </InfoCard>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}