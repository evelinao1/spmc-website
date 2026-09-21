"use client";

import { useRef } from "react";

type PartnerLogo = {
  url: string;
  alternativeText?: string | null;
};

type Partner = {
  id: number;
  name: string;
  website?: string | null;
  logo?: PartnerLogo | null;
};

type PartnersCarouselProps = {
  partners: Partner[];
};

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.silutespmc.lt";

export function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const visiblePartners = partners.filter((partner) => partner.logo?.url);

  if (visiblePartners.length === 0) {
    return null;
  }

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section
    className="bg-slate-50 py-14 sm:py-16"
    aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#154280]">
            Bendradarbiaujame
          </p>

          <h2
            id="partners-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Mūsų partneriai
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Ankstesni partneriai"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#154280] shadow-sm transition hover:bg-slate-50"
          >
            <span className="text-2xl leading-none">‹</span>
          </button>

          <div
            ref={scrollRef}
            className="partners-scroll mx-12 flex items-center gap-10 overflow-x-auto px-2 py-4"
          >
            {visiblePartners.map((partner) => {
              const logoUrl = partner.logo!.url.startsWith("http")
                ? partner.logo!.url
                : `${STRAPI_URL}${partner.logo!.url}`;

              return (
                <div
                  key={partner.id}
                  className="flex h-24 min-w-[220px] items-center justify-center px-5 sm:min-w-[250px]"
                >
                  <a
                    href={partner.website || undefined}
                    target={partner.website ? "_blank" : undefined}
                    rel={partner.website ? "noopener noreferrer" : undefined}
                    aria-label={
                      partner.website
                        ? `${partner.name} svetainė`
                        : partner.name
                    }
                    className="flex h-full w-full items-center justify-center"
                  >
                    <img
                      src={logoUrl}
                      alt={partner.logo?.alternativeText || partner.name}
                      className="partner-logo max-h-16 max-w-[190px] object-contain sm:max-h-20 sm:max-w-[220px]"
                      loading="lazy"
                    />
                  </a>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Kiti partneriai"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#154280] shadow-sm transition hover:bg-slate-50"
          >
            <span className="text-2xl leading-none">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}