import { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  children: ReactNode;
};

export function InfoCard({ title, children }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-md">
      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <div className="mt-3 text-slate-600">
        {children}
      </div>
    </div>
  );
}