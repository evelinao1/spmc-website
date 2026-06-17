import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { fetchFromStrapi } from "@/lib/strapi";

type BlocksContent = {
  type: string;
  children?: {
    type: string;
    text?: string;
  }[];
}[];

function BlocksRenderer({ content }: { content: BlocksContent }) {
  return (
    <div className="space-y-5 text-slate-700">
      {content?.map((block, index) => {
        if (block.type === "paragraph") {
          const text = block.children?.map((child) => child.text).join("");

          if (!text) return null;

          return (
            <p key={index} className="text-base leading-7">
              {text}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}

export default async function KorupcijosPrevencijaPage() {
  const response = await fetchFromStrapi(
    "/pages?filters[slug][$eq]=korupcijos-prevencija&filters[active][$eq]=true&populate=attachments"
  );

  const page = response.data?.[0];

  return (
    <>
      <Header />

      <PageHero
        label="Apie centrą"
        title={page?.title ?? "Korupcijos prevencija"}
        description={
          page?.excerpt ??
          "Informacija apie korupcijos prevencijos priemones, dokumentus ir atsakingus asmenis."
        }
      />

      <main className="mx-auto max-w-4xl px-6 py-16">
        {page?.content ? (
          <BlocksRenderer content={page.content} />
        ) : (
          <p className="text-slate-600">Turinys ruošiamas.</p>
        )}

        {page?.attachments?.length > 0 && (
          <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-slate-900">Dokumentai</h2>

            <ul className="mt-4 space-y-3">
              {page.attachments.map(
                (file: { id: number; name: string; url: string }) => (
                  <li key={file.id}>
                    <a
                      href={`${process.env.NEXT_PUBLIC_STRAPI_URL}${file.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-blue-800 hover:underline"
                    >
                      {file.name}
                    </a>
                  </li>
                )
              )}
            </ul>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}