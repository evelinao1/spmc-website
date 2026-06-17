import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { StrapiBlocks } from "@/components/StrapiBlocks";
import { AttachmentsList } from "@/components/AttachmentsList";
import { fetchFromStrapi } from "@/lib/strapi";

type StrapiPageProps = {
  path: string;
  label?: string;
};

export async function StrapiPage({ path, label }: StrapiPageProps) {
  const data = await fetchFromStrapi(
    `/pages?filters[path][$eq]=${path}&filters[active][$eq]=true&populate=attachments`
  );

  const page = data?.data?.[0];

  if (!page) {
    notFound();
  }

  return (
    <>
      <Header />

      <PageHero
        label={label || page.section || ""}
        title={page.title}
        description={page.excerpt || ""}
      />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <StrapiBlocks content={page.content} />

        <AttachmentsList attachments={page.attachments} />
      </main>

      <Footer />
    </>
  );
}