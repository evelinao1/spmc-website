import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  employeeCategories,
  getEmployeeCategoryLabel,
  getEmployees,
  type EmployeeCategory,
} from "@/lib/employees";

type DarbuotojaiPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

function getMediaUrl(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export default async function DarbuotojaiPage({
  searchParams,
}: DarbuotojaiPageProps) {
  const { category } = await searchParams;
  const employees = await getEmployees();

  const activeCategory = employeeCategories.includes(
    category as EmployeeCategory
  )
    ? (category as EmployeeCategory)
    : null;

  const filteredEmployees = activeCategory
    ? employees.filter((employee) => employee.category === activeCategory)
    : employees;

  return (
    <>
      <Header />

      <main>
        <PageHero
          label="Apie centrą"
          title="Darbuotojai"
          description="Šilutės profesinio mokymo centro administracija, mokytojai ir pagalbos specialistai."
        />

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex flex-wrap gap-3">
            <Link
              href="/apie/darbuotojai"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                !activeCategory
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Visi
            </Link>

            {employeeCategories.map((item) => (
              <Link
                key={item}
                href={`/apie/darbuotojai?category=${encodeURIComponent(item)}`}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeCategory === item
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {getEmployeeCategoryLabel(item)}
              </Link>
            ))}
          </div>

          <p className="mb-8 text-sm font-medium text-slate-600">
            {activeCategory
              ? `${getEmployeeCategoryLabel(activeCategory)} (${filteredEmployees.length})`
              : `Visi darbuotojai (${filteredEmployees.length})`}
          </p>

          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {filteredEmployees.map((employee) => {
              const photoUrl = getMediaUrl(employee.photo?.url);

              return (
                <Link
                  key={employee.id}
                  href={`/apie/darbuotojai/${employee.slug}`}
                  className="flex items-center gap-5 p-5 transition hover:bg-slate-50"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-slate-100">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={
                          employee.photo?.alternativeText ||
                          employee.fullName
                        }
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-2xl font-bold text-slate-400">
                        {employee.fullName.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {employee.fullName}
                    </h2>

                    {employee.position && (
                      <p className="mt-1 text-slate-600">
                        {employee.position}
                      </p>
                    )}

                    {employee.category && (
                      <p className="mt-1 text-sm font-medium text-blue-700">
                        {getEmployeeCategoryLabel(employee.category)}
                      </p>
                    )}

                    {employee.padaliniais &&
                      employee.padaliniais.length > 0 && (
                        <p className="mt-2 text-sm text-slate-500">
                          {employee.padaliniais
                            .map((campus) => campus.title)
                            .join(", ")}
                        </p>
                      )}
                  </div>

                  <div className="hidden text-right text-sm text-slate-600 md:block">
                    {employee.email && <p>{employee.email}</p>}
                    {employee.phone && <p>{employee.phone}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}