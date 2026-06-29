import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";

const studentLinks = [
  {
    title: "Tvarkaraščiai",
    href: "/mokiniams/tvarkarasciai-mokiniams",
    description: "Pamokų, praktinio mokymo ir kitų veiklų tvarkaraščiai.",
  },
  {
    title: "Stipendijos",
    href: "/mokiniams/stipendijos",
    description: "Informacija apie stipendijas, paramą ir skatinimo galimybes.",
  },
  {
    title: "Bendrabutis",
    href: "/mokiniams/bendrabutis",
    description:
      "Gyvenimo bendrabutyje sąlygos ir svarbiausia informacija mokiniams.",
  },
  {
    title: "Praktika",
    href: "/mokiniams/praktika",
    description:
      "Praktinio mokymo, praktikos vietų ir bendradarbiavimo su įmonėmis informacija.",
  },
  {
    title: "Egzaminai",
    href: "/mokiniams/egzaminai",
    description:
      "Brandos egzaminų, kompetencijų vertinimo ir PUPP informacija.",
  },
  {
    title: "Psichologinė pagalba",
    href: "/mokiniams/psichologine-pagalba",
    description:
      "Informacija, kada ir kaip mokiniai gali kreiptis psichologinės pagalbos.",
  },
  {
    title: "Socialinė pagalba",
    href: "/mokiniams/socialine-pagalba",
    description:
      "Socialinio pedagogo pagalba, konsultacijos ir svarbi informacija mokiniams.",
  },
  {
    title: "Biblioteka",
    href: "/mokiniams/biblioteka",
    description:
      "Bibliotekos informacija, literatūros sąrašai, vadovėliai ir naudingos nuorodos.",
  },
];

export default function MokiniamsPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Mokiniams"
        title="Svarbiausia informacija ŠPMC mokiniams"
        description="Čia rasi informaciją apie mokymąsi, tvarkaraščius, stipendijas, bendrabutį, praktiką, pagalbą ir kasdienį gyvenimą centre."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {studentLinks.map((item) => (
            <Link key={item.title} href={item.href} className="block">
              <InfoCard title={item.title}>{item.description}</InfoCard>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}