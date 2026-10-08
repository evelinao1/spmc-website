import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { NewsList } from "@/components/NewsList";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Naujienos",
  description:
    "Šilutės profesinio mokymo centro naujienos, renginiai, veiklos ir aktuali informacija mokiniams, bendruomenei bei partneriams.",
  path: "/naujienos",
  type: "website",
});

export default async function NewsPage({
    searchParams,
  }: {
    searchParams: Promise<{
      page?: string | string[];
    }>;
  }) {
    const { page } = await searchParams;

    return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="w-full flex-1">
        <PageHero
          title="Naujienos"
          description="Šilutės profesinio mokymo centro naujienos, renginiai ir aktualijos."
        />

        <section className="mx-auto max-w-7xl px-6 py-16">
          <NewsList page={page} basePath="/naujienos" />
        </section>
      </main>

      <Footer />
    </div>
  );
}