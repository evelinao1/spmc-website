"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";

type HeroSlide = {
  id: number;
  title: string;
  subtitle?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  image?: {
    url: string;
    alternativeText?: string | null;
  } | null;
};

type HeroProps = {
  slides?: HeroSlide[];
};

const campuses = [
  {
    title: "Šilutės profesinio mokymo centras",
    subtitle: "Pagrindinis padalinys",
    image: "/images/campus-main.jpg",
    href: "/padaliniai/centras",
  },
  {
    title: "Žuvininkystės sektorinis praktinio mokymo centras",
    subtitle: "Sektorinis centras",
    image: "/images/campus-fishery.jpg",
    href: "/padaliniai/zuvininkystes-sektorinis-praktinio-mokymo-centras",
  },
  {
    title: "Paslaugų ir turizmo skyrius",
    subtitle: "Skyrius",
    image: "/images/campus-services.jpg",
    href: "/padaliniai/turizmo-ir-paslaugu-skyrius",
  },
];

export function Hero({ slides = [] }: HeroProps) {
  if (slides.length > 0) {
    return <HeroSlider slides={slides} />;
  }

  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0">
        <Image
          src="/images/campus-main.jpg"
          alt="ŠPMC"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-white via-white/85 to-white/40" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-16">
        <div>
          <div className="mb-8">
            <Image
              src="/images/logo.png"
              alt="Šilutės profesinio mokymo centras"
              width={220}
              height={160}
              className="h-20 w-auto md:h-44"
              priority
            />
          </div>

          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Kuriame profesinę ateitį kartu
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Modernus profesinis mokymas, praktinės žinios ir galimybė augti
            pasirinktoje srityje.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/stojantiesiems"
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = "#0D3263";
                event.currentTarget.style.borderColor = "#0D3263";
                event.currentTarget.style.boxShadow =
                  "0 10px 24px rgba(21, 66, 128, 0.32)";
                event.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = "#154280";
                event.currentTarget.style.borderColor = "#154280";
                event.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(21, 66, 128, 0.18)";
                event.currentTarget.style.transform = "translateY(0)";
              }}
              style={{
                minHeight: "48px",
                padding: "0 24px",
                borderRadius: "12px",
                backgroundColor: "#154280",
                color: "#FFFFFF",
                border: "1px solid #154280",
                boxSizing: "border-box",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: 1,
                textDecoration: "none",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(21, 66, 128, 0.18)",
                transition:
                  "background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
              }}
              className="
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#154280]
                focus-visible:ring-offset-2
              "
            >
              Stojantiesiems
            </Link>

            <Link
              href="/programos"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition-colors duration-200 hover:border-blue-900"
            >
              Mokymo programos
            </Link>
          </div>
        </div>

        <div className="hidden gap-4 lg:grid">
          {campuses.map((campus) => (
            <Link
              key={campus.title}
              href={campus.href}
              className="
                group
                grid
                grid-cols-[140px_1fr]
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-sm
                ring-1
                ring-slate-200
                transition-all
                duration-300
                ease-out
                hover:-translate-y-1
                hover:shadow-xl
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#154280]
                focus-visible:ring-offset-2
              "
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={campus.image}
                  alt={campus.title}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-105
                  "
                />
              </div>

              <div className="flex flex-col justify-center p-5">
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#154280" }}
                >
                  {campus.subtitle}
                </p>

                <h2 className="text-lg font-bold text-slate-900">
                  {campus.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}