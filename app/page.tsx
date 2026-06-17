import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuickLinks } from "@/components/QuickLinks";
import { Programs } from "@/components/Programs";
import { Campuses } from "@/components/Campuses";
import { NewsSection } from "@/components/NewsSection";
import { Footer } from "@/components/Footer";
import { fetchFromStrapi } from "@/lib/strapi";

export default async function Home() {
  const heroSlidesResponse = await fetchFromStrapi(
  "/hero-slides?filters[active][$eq]=true&sort=order:asc&populate=image"
);

  const heroSlides = heroSlidesResponse.data;

  return (
    <>
      <Header />
      <Hero slides={heroSlides} />
      <QuickLinks />
      <Programs />
      <Campuses />
      <NewsSection />
      <Footer />
    </>
  );
}