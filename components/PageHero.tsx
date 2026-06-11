type PageHeroProps = {
  label?: string;
  title: string;
  description: string;
};

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="bg-slate-50 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {label && (
          <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
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