import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuickLinks } from "@/components/QuickLinks";
import { Programs } from "@/components/Programs";
import { Campuses } from "@/components/Campuses";
import { NewsSection } from "@/components/NewsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <QuickLinks />
      <Programs />
      <Campuses />
      <NewsSection />
      <Footer />
    </>
  );
}