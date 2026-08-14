import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";

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
            <InfoCard
              title="Profesijos"
              href="/itraukusis-ugdymas/profesijos"
            >
              Informacija apie profesinio mokymo galimybes specialiųjų
              ugdymosi poreikių turintiems mokiniams.
            </InfoCard>

            <InfoCard
              title="Nemokamas maitinimas"
              href="/itraukusis-ugdymas/nemokamas-maitinimas"
            >
              Informacija apie mokinių maitinimo organizavimą ir paramos
              galimybes.
            </InfoCard>

            <InfoCard
              title="Dokumentai"
              href="/itraukusis-ugdymas/dokumentai"
            >
              Čia bus skelbiami su įtraukiuoju ugdymu susiję dokumentai ir
              tvarkos aprašai.
            </InfoCard>

            <InfoCard
              title="Socialinių įgūdžių ugdymas"
              href="/itraukusis-ugdymas/socialiniu-igudziu-ugdymas"
            >
              Informacija apie socialinių įgūdžių ugdymo veiklas ir programas.
            </InfoCard>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}