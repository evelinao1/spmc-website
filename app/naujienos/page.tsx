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

export default function NewsPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          title="Naujienos"
          description="Šilutės profesinio mokymo centro naujienos, renginiai ir aktualijos."
        />

        <section className="mx-auto max-w-7xl px-6 py-16">
          <NewsList />
        </section>
      </main>

      <Footer />
    </>
  );
}