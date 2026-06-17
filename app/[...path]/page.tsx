import { StrapiPage } from "@/components/StrapiPage";

type PageProps = {
  params: Promise<{
    path: string[];
  }>;
};

const sectionLabels: Record<string, string> = {
  apie: "Apie centrą",
  mokiniams: "Mokiniams",
  stojantiesiems: "Stojantiesiems",
  "itraukusis-ugdymas": "Įtraukusis ugdymas",
  "suaugusiuju-mokymas": "Suaugusiųjų mokymas",
};

export default async function DynamicPathPage({ params }: PageProps) {
  const { path } = await params;

  const fullPath = path.join("/");
  const section = path[0];

  return (
    <StrapiPage
      path={fullPath}
      label={sectionLabels[section]}
    />
  );
}