import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";

export default function ItraukusisUgdymasPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          title="Įtraukusis ugdymas"
          description="Informacija mokiniams, tėvams ir specialistams apie įtraukiojo ugdymo galimybes Šilutės profesinio mokymo centre."
        />

        <section className="mx-auto max-w-6xl px-4 pb-16 pt-6">
          <Breadcrumb
            items={[
              { label: "Pradžia", href: "/" },
              { label: "Įtraukusis ugdymas" },
            ]}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Link
              href="/itraukusis-ugdymas/profesijos"
              className="block"
            >
              <InfoCard title="Profesijos">
                Informacija apie profesinio mokymo galimybes specialiųjų
                ugdymosi poreikių turintiems mokiniams.
              </InfoCard>
            </Link>

            <Link
              href="/itraukusis-ugdymas/nemokamas-maitinimas"
              className="block"
            >
              <InfoCard title="Nemokamas maitinimas">
                Informacija apie mokinių maitinimo organizavimą ir paramos
                galimybes.
              </InfoCard>
            </Link>

            <Link
              href="/itraukusis-ugdymas/dokumentai"
              className="block"
            >
              <InfoCard title="Dokumentai">
                Čia bus skelbiami su įtraukiuoju ugdymu susiję dokumentai ir
                tvarkos aprašai.
              </InfoCard>
            </Link>

            <Link
              href="/itraukusis-ugdymas/socialiniu-igudziu-ugdymas"
              className="block"
            >
              <InfoCard title="Socialinių įgūdžių ugdymas">
                Informacija apie socialinių įgūdžių ugdymo veiklas ir
                programas.
              </InfoCard>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}