type PageHeroProps = {
  label?: string;
  title: string;
  description: string;
};

export function PageHero({
  label,
  title,
  description,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      {/* Dekoratyvinis ŠPMC raštas */}
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[58%] bg-contain bg-right bg-no-repeat opacity-[0.10] md:block"
        style={{
          backgroundImage: "url('/brand/fonas.svg')",
          maskImage:
            "linear-gradient(to right, transparent 0%, transparent 8%, black 65%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, transparent 8%, black 65%, black 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {label && (
          <p
            className="text-sm font-bold uppercase tracking-wide"
            style={{ color: "#154280" }}
          >
            {label}
          </p>
        )}

        <h1 className="mt-3 max-w-3xl text-4xl font-bold text-slate-950">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          {description}
        </p>
      </div>
    </section>
  );
}