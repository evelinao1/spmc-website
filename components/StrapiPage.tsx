import { notFound } from "next/navigation";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StrapiBlocks } from "@/components/StrapiBlocks";
import { AttachmentsList } from "@/components/AttachmentsList";
import { DocumentSections } from "@/components/DocumentSections";

import { fetchFromStrapi } from "@/lib/strapi";

type StrapiPageProps = {
  path: string;
  label?: string;
};

const breadcrumbLabels: Record<string, string> = {
  apie: "Apie centrą",
  centras: "Šilutės profesinio mokymo centras",
  mokiniams: "Mokiniams",
  stojantiesiems: "Stojantiesiems",
  "itraukusis-ugdymas": "Įtraukusis ugdymas",
  "korupcijos-prevencija": "Korupcijos prevencija",
};

function formatBreadcrumbLabel(segment: string) {
  if (breadcrumbLabels[segment]) {
    return breadcrumbLabels[segment];
  }

  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function StrapiPage({
  path,
  label,
}: StrapiPageProps) {
  const data = await fetchFromStrapi(
    `/pages?filters[path][$eq]=${path}&filters[active][$eq]=true&populate[attachments]=true&populate[documentSections][populate][attachments]=true`
  );

  const page = data?.data?.[0];

  if (!page) {
    notFound();
  }

  const pathParts = path.split("/");

  const breadcrumbItems = [
    {
      label: "Pradžia",
      href: "/",
    },

    ...pathParts.map((segment, index) => {
      const isLast = index === pathParts.length - 1;

      const href = `/${pathParts
        .slice(0, index + 1)
        .join("/")}`;

      return {
        label: isLast
          ? page.title
          : formatBreadcrumbLabel(segment),
        ...(isLast ? {} : { href }),
      };
    }),
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <PageHero
        label={label || page.section || ""}
        title={page.title}
        description={page.excerpt || ""}
      />

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-16 pt-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-10">
          <StrapiBlocks content={page.content} />

          <DocumentSections
            sections={page.documentSections}
          />

          <AttachmentsList
            attachments={page.attachments}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}