import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { RichText } from "@/components/RichText";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";

import {
  getEmployeeBySlug,
  getEmployeeCategoryLabel,
} from "@/lib/employees";
import { createMetadata } from "@/lib/seo";
import {
  createBreadcrumbJsonLd,
  createPersonJsonLd,
} from "@/lib/schema";

type EmployeePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getMediaUrl(url?: string | null) {
  if (!url) {
    return null;
  }

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export async function generateMetadata({
  params,
}: EmployeePageProps): Promise<Metadata> {
  const { slug } = await params;
  const employee = await getEmployeeBySlug(slug);

  if (!employee) {
    return createMetadata({
      title: "Darbuotojas nerastas",
      description:
        "Ieškomas Šilutės profesinio mokymo centro darbuotojas nerastas.",
      path: `/apie/darbuotojai/${slug}`,
      noIndex: true,
    });
  }

  const photoUrl = getMediaUrl(employee.photo?.url);

  const category = employee.category
    ? getEmployeeCategoryLabel(employee.category)
    : null;

  const description =
    employee.position ||
    category ||
    `${employee.fullName} – Šilutės profesinio mokymo centro darbuotojas.`;

  return createMetadata({
    title: employee.fullName,
    description,
    path: `/apie/darbuotojai/${employee.slug}`,
    image: photoUrl,
    imageAlt:
      employee.photo?.alternativeText ||
      employee.fullName,
    type: "website",
  });
}

export default async function EmployeePage({
  params,
}: EmployeePageProps) {
  const { slug } = await params;
  const employee = await getEmployeeBySlug(slug);

  if (!employee) {
    notFound();
  }

  const photoUrl = getMediaUrl(employee.photo?.url);

  const categoryLabel = employee.category
    ? getEmployeeCategoryLabel(employee.category)
    : null;

  const heroDescription =
    employee.position ||
    categoryLabel ||
    "Šilutės profesinio mokymo centro darbuotojas";

  const jobTitle =
    employee.position || categoryLabel;

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    {
      label: "Pradžia",
      href: "/",
    },
    {
      label: "Darbuotojai",
      href: "/apie/darbuotojai",
    },
    {
      label: employee.fullName,
      href: `/apie/darbuotojai/${employee.slug}`,
    },
  ]);

  const personJsonLd = createPersonJsonLd({
    name: employee.fullName,
    path: `/apie/darbuotojai/${employee.slug}`,
    jobTitle,
    imageUrl: photoUrl,
    email: employee.email,
    telephone: employee.phone,
  });

  return (
    <>
      <SchemaJsonLd data={breadcrumbJsonLd} />
      <SchemaJsonLd data={personJsonLd} />

      <Header />

      <main>
        <PageHero
          label="Darbuotojai"
          title={employee.fullName}
          description={heroDescription}
        />

        <section className="mx-auto max-w-5xl px-6 py-16">
          <Breadcrumb
            items={[
              {
                label: "Pradžia",
                href: "/",
              },
              {
                label: "Darbuotojai",
                href: "/apie/darbuotojai",
              },
              {
                label: employee.fullName,
              },
            ]}
          />

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
                    alt={
                      employee.photo?.alternativeText ||
                      employee.fullName
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    className="object-cover"
                    priority
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
                      <p className="font-semibold text-slate-900">
                        Kategorija
                      </p>

                      <p>
                        {getEmployeeCategoryLabel(
                          employee.category
                        )}
                      </p>
                    </div>
                  )}

                  {employee.position && (
                    <div>
                      <p className="font-semibold text-slate-900">
                        Pareigos
                      </p>

                      <p>{employee.position}</p>
                    </div>
                  )}

                  {employee.email && (
                    <div>
                      <p className="font-semibold text-slate-900">
                        El. paštas
                      </p>

                      <a
                        href={`mailto:${employee.email}`}
                        className="break-all text-blue-700 hover:underline"
                      >
                        {employee.email}
                      </a>
                    </div>
                  )}

                  {employee.phone && (
                    <div>
                      <p className="font-semibold text-slate-900">
                        Telefonas
                      </p>

                      <a
                        href={`tel:${employee.phone.replace(
                          /\s+/g,
                          ""
                        )}`}
                        className="text-blue-700 hover:underline"
                      >
                        {employee.phone}
                      </a>
                    </div>
                  )}

                  {employee.padaliniais &&
                    employee.padaliniais.length > 0 && (
                      <div>
                        <p className="font-semibold text-slate-900">
                          Padaliniai
                        </p>

                        <div className="mt-2 space-y-1">
                          {employee.padaliniais.map(
                            (campus) => (
                              <Link
                                key={campus.id}
                                href={`/padaliniai/${campus.slug}`}
                                className="block text-blue-700 hover:underline"
                              >
                                {campus.title}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </aside>

            <div>
              {employee.description &&
                employee.description.length > 0 && (
                  <section>
                    <h2 className="mb-6 text-2xl font-bold text-slate-900">
                      Aprašymas
                    </h2>

                    <RichText
                      blocks={employee.description}
                    />
                  </section>
                )}

              {employee.workingHours &&
                employee.workingHours.length > 0 && (
                  <section className="mt-12">
                    <h2 className="mb-6 text-2xl font-bold text-slate-900">
                      Darbo laikas
                    </h2>

                    <RichText
                      blocks={employee.workingHours}
                    />
                  </section>
                )}

              {employee.attachments &&
                employee.attachments.length > 0 && (
                  <section className="mt-12">
                    <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                      Priedai
                    </h2>

                    <div className="space-y-3">
                      {employee.attachments.map(
                        (file) => {
                          const fileUrl = getMediaUrl(
                            file.url
                          );

                          if (!fileUrl) {
                            return null;
                          }

                          return (
                            <a
                              key={file.id}
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-xl border border-slate-200 p-4 text-slate-700 transition hover:bg-slate-50"
                            >
                              {file.name ||
                                "Atsisiųsti failą"}
                            </a>
                          );
                        }
                      )}
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