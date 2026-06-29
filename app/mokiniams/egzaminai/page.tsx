import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";

const examLinks = [
  {
    title: "Brandos egzaminai",
    href: "/mokiniams/egzaminai/brandos-egzaminai",
    description: "Brandos egzaminų tvarkaraščiai, taisyklės ir kita svarbi informacija.",
  },
  {
    title: "Kompetencijų vertinimas",
    href: "/mokiniams/egzaminai/kompetenciju-vertinimas",
    description: "Profesinio mokymo kompetencijų vertinimo informacija mokiniams.",
  },
  {
    title: "PUPP",
    href: "/mokiniams/egzaminai/pupp",
    description: "Pagrindinio ugdymo pasiekimų patikrinimo informacija.",
  },
];

export default function EgzaminaiPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Mokiniams"
        title="Egzaminai"
        description="Svarbiausia informacija apie egzaminus ir pasiekimų vertinimus."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {examLinks.map((item) => (
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