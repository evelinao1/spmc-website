import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";

const libraryLinks = [
  {
    title: "Privaloma literatūra",
    href: "/mokiniams/biblioteka/privaloma-literatura",
    description: "Privalomos literatūros sąrašai ir mokiniams aktuali informacija.",
  },
  {
    title: "Vadovėliai",
    href: "/mokiniams/biblioteka/vadoveliai",
    description: "Vadovėlių sąrašai ir informacija apie naujausius įsigytus vadovėlius.",
  },
  {
    title: "Naudingos nuorodos",
    href: "/mokiniams/biblioteka/naudingos-nuorodos",
    description: "Bibliotekos rekomenduojamos nuorodos mokiniams ir mokytojams.",
  },
  {
    title: "Bibliotekos renginiai",
    href: "/mokiniams/biblioteka/bibliotekos-renginiai",
    description: "Bibliotekoje vykusių renginių archyvas.",
  },
];

export default function BibliotekaPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Mokiniams"
        title="Biblioteka"
        description="Bibliotekos informacija, literatūros sąrašai, vadovėliai ir renginiai."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {libraryLinks.map((item) => (
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