"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

type HeroSliderProps = {
  slides: HeroSlide[];
};

function getImageUrl(url?: string) {
  if (!url) return null;
  if (url.startsWith("http")) return url;

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[currentIndex];
  const imageUrl = getImageUrl(slide.image?.url);

  return (
    <section className="bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {imageUrl ? (
          <Link href={slide.buttonLink || "#"} className="block">
            <Image
              src={imageUrl}
              alt={
                slide.image?.alternativeText ||
                slide.title ||
                "Aktuali informacija"
              }
              width={1302}
              height={521}
              className="h-auto w-full object-cover"
              priority
            />
          </Link>
        ) : (
          <div className="p-8 md:p-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-700">
              Aktualu
            </p>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {slide.title}
            </h1>

            {slide.subtitle && (
              <p className="mt-5 max-w-2xl text-lg leading-7 text-slate-600">
                {slide.subtitle}
              </p>
            )}

            {slide.buttonText && slide.buttonLink && (
              <Link
                href={slide.buttonLink}
                className="mt-8 inline-flex rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
              >
                {slide.buttonText}
              </Link>
            )}
          </div>
        )}

        {slides.length > 1 && (
          <div className="flex justify-center gap-2 bg-white px-4 py-4">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  index === currentIndex
                    ? "w-8 bg-blue-700"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Rodyti skaidrę ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}