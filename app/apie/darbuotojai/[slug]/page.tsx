import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { RichText, type StrapiBlock } from "@/components/RichText";
import { getEmployeeBySlug, getEmployeeCategoryLabel } from "@/lib/employees";

type EmployeePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getMediaUrl(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export default async function EmployeePage({ params }: EmployeePageProps) {
  const { slug } = await params;
  const employee = await getEmployeeBySlug(slug);

  if (!employee) {
    notFound();
  }

  const photoUrl = getMediaUrl(employee.photo?.url);

  return (
    <>
      <Header />

      <main>
        <PageHero
          label="Darbuotojai"
          title={employee.fullName}
          description={employee.position ?? getEmployeeCategoryLabel(employee.category)}
        />

        <section className="mx-auto max-w-5xl px-6 py-16">
          <Link
            href="/apie/darbuotojai"
            className="mb-8 inline-flex text-sm font-medium text-blue-700 transition hover:text-blue-900"
          >
            ← Visi darbuotojai
          </Link>

          <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
            <aside>
              {photoUrl && (
                <div className="relative h-[420px] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={photoUrl}
                    alt={employee.photo?.alternativeText || employee.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-slate-900">
                  Kontaktai
                </h2>

                <div className="space-y-4 text-sm text-slate-600">
                  {employee.category && (
                    <div>
                      <p className="font-semibold text-slate-900">Kategorija</p>
                      <p>{getEmployeeCategoryLabel(employee.category)}</p>
                    </div>
                  )}

                  {employee.position && (
                    <div>
                      <p className="font-semibold text-slate-900">Pareigos</p>
                      <p>{employee.position}</p>
                    </div>
                  )}

                  {employee.email && (
                    <div>
                      <p className="font-semibold text-slate-900">El. paštas</p>
                      <a
                        href={`mailto:${employee.email}`}
                        className="text-blue-700 hover:underline"
                      >
                        {employee.email}
                      </a>
                    </div>
                  )}

                  {employee.phone && (
                    <div>
                      <p className="font-semibold text-slate-900">Telefonas</p>
                      <p>{employee.phone}</p>
                    </div>
                  )}

                  {employee.padaliniais && employee.padaliniais.length > 0 && (
                    <div>
                      <p className="font-semibold text-slate-900">Padaliniai</p>
                      <div className="mt-2 space-y-1">
                        {employee.padaliniais.map((campus) => (
                          <Link
                            key={campus.id}
                            href={`/padaliniai/${campus.slug}`}
                            className="block text-blue-700 hover:underline"
                          >
                            {campus.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>

            <div>
              {employee.description && (
                <section>
                  <h2 className="mb-6 text-2xl font-bold text-slate-900">
                    Aprašymas
                  </h2>
                  <RichText blocks={employee.description} />
                </section>
              )}

              {employee.workingHours && (
                <section className="mt-12">
                  <h2 className="mb-6 text-2xl font-bold text-slate-900">
                    Darbo laikas
                  </h2>
                  <RichText blocks={employee.workingHours} />
                </section>
              )}

              {employee.attachments && employee.attachments.length > 0 && (
                <section className="mt-12">
                  <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                    Priedai
                  </h2>

                  <div className="space-y-3">
                    {employee.attachments.map((file) => {
                      const fileUrl = getMediaUrl(file.url);
                      if (!fileUrl) return null;

                      return (
                        <a
                          key={file.id}
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-xl border border-slate-200 p-4 text-slate-700 transition hover:bg-slate-50"
                        >
                          {file.name}
                        </a>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}