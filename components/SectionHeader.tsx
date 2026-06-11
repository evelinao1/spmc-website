type SectionHeaderProps = {
  title: string;
  description?: string;
};

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}