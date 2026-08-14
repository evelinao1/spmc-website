"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type MediaFile = {
  id: number;
  name: string;
  url: string;
  alternativeText?: string | null;
};

type Employee = {
  id: number;
  fullName: string;
  slug: string;
  position?: string | null;
  category?: string | null;
  email?: string | null;
  phone?: string | null;
  photo?: MediaFile | null;
};

type CampusEmployeesProps = {
  employees: Employee[];
  strapiUrl?: string;
};

function getMediaUrl(
  url?: string | null,
  strapiUrl?: string
) {
  if (!url) {
    return null;
  }

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `${strapiUrl}${url}`;
}

export function CampusEmployees({
  employees,
  strapiUrl,
}: CampusEmployeesProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleEmployees = showAll
    ? employees
    : employees.slice(0, 4);

  const hasMoreEmployees = employees.length > 4;

  return (
    <section className="mt-14">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Padalinio darbuotojai ({employees.length})
      </h2>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-200">
          {visibleEmployees.map((employee) => {
            const employeePhotoUrl = getMediaUrl(
              employee.photo?.url,
              strapiUrl
            );

            return (
              <Link
                key={employee.id}
                href={`/apie/darbuotojai/${employee.slug}`}
                className="flex items-center gap-5 p-5 transition hover:bg-slate-50"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
                  {employeePhotoUrl ? (
                    <Image
                      src={employeePhotoUrl}
                      alt={
                        employee.photo?.alternativeText ||
                        employee.fullName
                      }
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xl font-bold text-slate-400">
                      {employee.fullName.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {employee.fullName}
                  </h3>

                  {employee.position && (
                    <p className="mt-1 text-sm text-slate-600">
                      {employee.position}
                    </p>
                  )}

                  {employee.category && (
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      {employee.category}
                    </p>
                  )}
                </div>

                <div className="hidden text-right text-sm text-slate-600 md:block">
                  {employee.email && (
                    <p>{employee.email}</p>
                  )}

                  {employee.phone && (
                    <p>{employee.phone}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {hasMoreEmployees && (
          <div className="border-t border-slate-200 p-4 text-center">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="text-sm font-semibold text-[#154280] transition hover:text-[#10376B]"
            >
              {showAll
                ? "Rodyti mažiau ↑"
                : `Rodyti visus darbuotojus (${employees.length}) ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}