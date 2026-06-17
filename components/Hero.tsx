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

type HeroProps = {
  slides?: HeroSlide[];
};

const campuses = [
  {
    title: "Šilutės profesinio mokymo centras",
    subtitle: "Pagrindinis padalinys",
    image: "/images/campus-main.jpg",
  },
  {
    title: "Žuvininkystės sektorinis praktinio mokymo centras",
    subtitle: "Sektorinis centras",
    image: "/images/campus-fishery.jpg",
  },
  {
    title: "Paslaugų ir turizmo skyrius",
    subtitle: "Skyrius",
    image: "/images/campus-services.jpg",
  },
];

export function Hero({ slides = [] }: HeroProps) {
  const slide = slides[0];

  if (slide) {
  const imageUrl = slide.image?.url
    ? slide.image.url.startsWith("http")
      ? slide.image.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.image.url}`
    : null;

  return (
    <section className="bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {imageUrl ? (
          <Link href={slide.buttonLink || "#"} className="block">
            <Image
              src={imageUrl}
              alt={slide.image?.alternativeText || slide.title || "Aktuali informacija"}
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

            {slide.title && (
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {slide.title}
              </h1>
            )}

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
      </div>
    </section>
  );
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

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Kuriame profesinę ateitį kartu
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Modernus profesinis mokymas, praktinės žinios ir galimybė augti
            pasirinktoje srityje.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/stojantiesiems"
              className="rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Stojantiesiems
            </Link>

            <Link
              href="/programos"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 hover:border-blue-900"
            >
              Mokymo programos
            </Link>
          </div>
        </div>

        <div className="hidden gap-4 lg:grid">
          {campuses.map((campus) => (
            <article
              key={campus.title}
              className="grid grid-cols-[140px_1fr] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
            >
              <div className="relative h-32">
                <Image
                  src={campus.image}
                  alt={campus.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center p-5">
                <p className="mb-2 text-xs font-bold uppercase text-blue-700">
                  {campus.subtitle}
                </p>
                <h2 className="text-lg font-bold text-slate-900">
                  {campus.title}
                </h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}