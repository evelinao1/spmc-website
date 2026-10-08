import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function CentrasPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <PageHero
        label="Apie centrą"
        title="Šilutės profesinio mokymo centras"
        description="Centro pristatymas, istorija, misija ir vizija."
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-16">
        <Breadcrumb
          items={[
            { label: "Pradžia", href: "/" },
            { label: "Apie centrą", href: "/apie" },
            { label: "Šilutės profesinio mokymo centras" },
          ]}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Centro pristatymas"
            href="/apie/centras/centro-pristatymas"
          >
            Centro veikla, mokymo kryptys ir padaliniai.
          </InfoCard>

          <InfoCard
            title="Istorija"
            href="/apie/centras/istorija"
          >
            Centro įkūrimas, raida ir svarbiausi veiklos etapai.
          </InfoCard>

          <InfoCard
            title="Misija ir vizija"
            href="/apie/centras/misija-ir-vizija"
          >
            Centro paskirtis, vertybės ir ateities siekiai.
          </InfoCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}