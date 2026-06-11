import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { InfoCard } from "@/components/InfoCard";
import { SectionHeader } from "@/components/SectionHeader";

const projectCategories = [
  {
    title: "Erasmus+ projektai",
    description:
      "Tarptautiniai mobilumo, bendradarbiavimo ir profesinio tobulėjimo projektai.",
  },
  {
    title: "ES finansuojami projektai",
    description:
      "Projektai, įgyvendinami Europos Sąjungos struktūrinių fondų ir kitų programų lėšomis.",
  },
  {
    title: "Vykdomi projektai",
    description:
      "Šiuo metu centre įgyvendinami projektai, jų veiklos, partneriai ir rezultatai.",
  },
  {
    title: "Baigti projektai",
    description:
      "Įgyvendinti projektai, sukūrę naujas galimybes mokiniams, mokytojams ir centro bendruomenei.",
  },
];

export default function ProjektaiPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Projektai"
        title="Projektai, kuriantys naujas galimybes"
        description="Šilutės profesinio mokymo centras dalyvauja nacionaliniuose ir tarptautiniuose projektuose, kurie stiprina mokymosi kokybę, tarptautiškumą ir praktinio mokymo galimybes."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <section>
          <SectionHeader
            title="Projektų kryptys"
                description="Susipažinkite su pagrindinėmis projektinėmis veiklomis ir iniciatyvomis."
                />

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {projectCategories.map((project) => (
              <InfoCard key={project.title} title={project.title}>
                <p>{project.description}</p>
                </InfoCard>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-slate-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Projektų sąrašas bus pildomas
          </h2>

          <p className="mt-4 max-w-3xl text-slate-600">
            Vėliau šiame puslapyje bus pateikiami konkretūs vykdomi ir baigti
            projektai su aprašymais, finansavimo šaltiniais, partneriais,
            veiklomis, rezultatais ir projekto laikotarpiu.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}