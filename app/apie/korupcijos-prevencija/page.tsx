import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { InfoCard } from "@/components/InfoCard";

const sections = [
  {
    title: "Pranešėjų apsauga",
    description:
      "Informacija apie pranešėjų teises, konfidencialumą ir taikomas apsaugos priemones.",
    href: "/apie/korupcijos-prevencija/praneseju-apsauga",
  },
  {
    title: "Pranešti apie pažeidimą",
    description:
      "Informacija apie tai, kaip pateikti pranešimą apie galimą pažeidimą ar korupcinio pobūdžio veiką.",
    href: "/apie/korupcijos-prevencija/pranesti-apie-pazeidima",
  },
  {
    title: "Atsakingi asmenys",
    description:
      "Darbuotojai, atsakingi už korupcijos prevenciją ir korupcijai atsparios aplinkos kūrimą.",
    href: "/apie/korupcijos-prevencija/atsakingi-asmenys",
  },
  {
    title: "Korupcijos prevencijos dokumentai",
    description:
      "Centro tvarkos, planai, ataskaitos ir kiti su korupcijos prevencija susiję dokumentai.",
    href: "/apie/korupcijos-prevencija/korupcijos-prevencijos-dokumentai",
  },
  {
    title: "Dovanų politika",
    description:
      "Informacija apie Centro taikomas dovanų priėmimo, registravimo ir vertinimo taisykles.",
    href: "/apie/korupcijos-prevencija/dovanu-politika",
  },
  {
    title: "Interesų konfliktų prevencija",
    description:
      "Informacija apie privačių interesų deklaravimą, nusišalinimą ir interesų konfliktų valdymą.",
    href: "/apie/korupcijos-prevencija/interesu-konfliktu-prevencija",
  },
  {
    title: "AKL ir rizikų vertinimai",
    description:
      "Atsparumo korupcijai lygio nustatymas, korupcijos pasireiškimo tikimybės ir rizikų vertinimai.",
    href: "/apie/korupcijos-prevencija/akl-ir-riziku-vertinimai",
  },
];

export default function KorupcijosPrevencijaPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title="Korupcijos prevencija"
        description="Informacija apie Šilutės profesinio mokymo centro vykdomas korupcijos prevencijos, skaidrumo ir pranešėjų apsaugos priemones."
      />

      <main className="mx-auto max-w-7xl px-6 pb-20 pt-6">
        <Breadcrumb
          items={[
            { label: "Pradžia", href: "/" },
            { label: "Apie centrą", href: "/apie" },
            { label: "Korupcijos prevencija" },
          ]}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <InfoCard
              key={section.href}
              title={section.title}
              href={section.href}
            >
              {section.description}
            </InfoCard>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}