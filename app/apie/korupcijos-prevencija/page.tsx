import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StrapiBlocks } from "@/components/StrapiBlocks";
import { AttachmentsList } from "@/components/AttachmentsList";

import { fetchFromStrapi } from "@/lib/strapi";

export default async function KorupcijosPrevencijaPage() {
  const response = await fetchFromStrapi(
    "/pages?filters[slug][$eq]=korupcijos-prevencija&filters[active][$eq]=true&populate=attachments"
  );

  const page = response.data?.[0];

  return (
    <>
      <PageHero
        label="Apie centrą"
        title={page?.title ?? "Korupcijos prevencija"}
        description={
          page?.excerpt ??
          "Informacija apie korupcijos prevencijos priemones, dokumentus ir atsakingus asmenis."
        }
      />

      <main className="mx-auto max-w-4xl px-6 pb-16 pt-6">
        <Breadcrumb
          items={[
            { label: "Pradžia", href: "/" },
            { label: "Apie centrą", href: "/apie" },
            { label: "Korupcijos prevencija" },
          ]}
        />

        <div className="mt-10">
          {page?.content ? (
            <StrapiBlocks content={page.content} />
          ) : (
            <p className="text-slate-600">Turinys ruošiamas.</p>
          )}

          <AttachmentsList attachments={page?.attachments} />
        </div>
      </main>

      <Footer />
    </>
  );
}