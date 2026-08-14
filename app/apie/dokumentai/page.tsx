import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";

const documentCategories = [
  {
    title: "Strateginiai ir veiklos dokumentai",
    href: "/apie/dokumentai/strateginiai-ir-veiklos-dokumentai",
    items:
      "Strateginis planas, ugdymo planas, metinės veiklos programos, veiklos ataskaitos.",
  },
  {
    title: "Tvarkos ir taisyklės",
    href: "/apie/dokumentai/tvarkos-ir-taisykles",
    items:
      "Vidaus tvarkos taisyklės, darbo apmokėjimo sistema, mokinio elgesio taisyklės, bendrabučio taisyklės.",
  },
  {
    title: "Mokiniams aktualūs dokumentai",
    href: "/apie/dokumentai/mokiniams-aktualus-dokumentai",
    items:
      "Nemokamas maitinimas, valgiaraščiai, stipendijos, praktika, bendrabutis.",
  },
  {
    title: "Saugumas ir gerovė",
    href: "/apie/dokumentai/saugumas-ir-gerove",
    items:
      "Smurto ir priekabiavimo prevencija, vaiko gerovės komisija, ekstremalių situacijų valdymas.",
  },
  {
    title: "Duomenų apsauga ir IT",
    href: "/apie/dokumentai/duomenu-apsauga-ir-it",
    items:
      "BDAR taisyklės, elektroninio dienyno nuostatai, naudojimosi kompiuterių tinklais taisyklės.",
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

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6">
        <Breadcrumb
          items={[
            { label: "Pradžia", href: "/" },
            { label: "Apie centrą", href: "/apie" },
            { label: "Dokumentai" },
          ]}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {documentCategories.map((category) => (
            <InfoCard
              key={category.title}
              title={category.title}
              href={category.href}
            >
              {category.items}
            </InfoCard>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}