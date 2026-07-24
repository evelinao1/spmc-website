"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { StrapiMedia } from "@/lib/news";
import { getFileUrl } from "@/lib/news";

type LightboxGalleryProps = {
  images: StrapiMedia[];
};

export function LightboxGallery({ images }: LightboxGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isReady = typeof document !== "undefined";


  if (!images || images.length === 0) return null;

  const activeImage = activeIndex !== null ? images[activeIndex] : null;
  const activeImageUrl = activeImage ? getFileUrl(activeImage.url) : null;

  function close() {
    setActiveIndex(null);
  }

  function next() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  }

  function previous() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  }

  const modal =
    activeImage && activeImageUrl ? (
      <div
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999999,
          background: "rgba(2, 6, 23, 0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <button
          type="button"
          onClick={close}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 1000000,
            background: "white",
            color: "#0f172a",
            padding: "10px 16px",
            borderRadius: 999,
            fontWeight: 600,
          }}
        >
          Uždaryti
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                previous();
              }}
              style={{
                position: "fixed",
                left: 20,
                top: "50%",
                zIndex: 1000000,
                background: "white",
                color: "#0f172a",
                padding: "10px 18px",
                borderRadius: 999,
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              ‹
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                next();
              }}
              style={{
                position: "fixed",
                right: 20,
                top: "50%",
                zIndex: 1000000,
                background: "white",
                color: "#0f172a",
                padding: "10px 18px",
                borderRadius: 999,
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              ›
            </button>
          </>
        )}

        <div
          onClick={(event) => event.stopPropagation()}
          style={{
            position: "relative",
            width: "90vw",
            height: "82vh",
            maxWidth: 1200,
          }}
        >
          <Image
            src={activeImageUrl}
            alt={
              activeImage.alternativeText ||
              activeImage.name ||
              "Galerijos nuotrauka"
            }
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
      </div>
    ) : null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => {
          const imageUrl = getFileUrl(image.url);
          if (!imageUrl) return null;

          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block h-64 w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md sm:h-72"
            >
              <Image
                src={imageUrl}
                alt={
                  image.alternativeText || image.name || "Galerijos nuotrauka"
                }
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </button>
          );
        })}
      </div>

      {isReady && modal ? createPortal(modal, document.body) : null}
    </>
  );
}