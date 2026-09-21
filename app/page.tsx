import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuickLinks } from "@/components/QuickLinks";
import { Programs } from "@/components/Programs";
import { Campuses } from "@/components/Campuses";
import { NewsSection } from "@/components/NewsSection";
import { Footer } from "@/components/Footer";
import { fetchFromStrapi } from "@/lib/strapi";
import { PartnersCarousel } from "@/components/PartnersCarousel";

export default async function Home() {
  const [heroSlidesResponse, newsResponse, partnersResponse] =
    await Promise.all([
      fetchFromStrapi(
        "/hero-slides?filters[active][$eq]=true&sort=order:asc&populate=image"
      ),
      fetchFromStrapi(
        "/news?filters[active][$eq]=true&sort=publishDate:desc&pagination[limit]=3&populate=coverImage"
      ),
      fetchFromStrapi(
        "/partners?populate=logo&sort=order:asc"
      ),
    ]);

  const heroSlides = heroSlidesResponse?.data ?? [];
  const news = newsResponse?.data ?? [];
  const partners = partnersResponse?.data ?? [];

  return (
    <>
      <Header />
      <Hero slides={heroSlides} />
      <QuickLinks />
      <Programs />
      <Campuses />
      <NewsSection news={news} />
      <PartnersCarousel partners={partners} />
      <Footer />
    </>
  );
}