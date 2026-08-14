import type { Metadata } from "next";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { RichText } from "@/components/RichText";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";

import { getContact } from "@/lib/contact";
import { getCampuses } from "@/lib/campuses";
import { getContactEmployees } from "@/lib/employees";
import { createMetadata } from "@/lib/seo";
import {
  createBreadcrumbJsonLd,
  createContactPageJsonLd,
} from "@/lib/schema";

const pageTitle = "Kontaktai";

const pageDescription =
  "Šilutės profesinio mokymo centro kontaktai, adresas, telefonas, el. paštas, darbo laikas ir padalinių informacija.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/kontaktai",
  type: "website",
});

function getPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function getMapsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
}

type EmployeeContactCardProps = {
  employee: Awaited<ReturnType<typeof getContactEmployees>>[number];
};

function EmployeeContactCard({
  employee,
}: EmployeeContactCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h4 className="text-lg font-semibold text-slate-900">
        {employee.fullName}
      </h4>

      {employee.position && (
        <p className="mt-1 text-sm text-slate-500">
          {employee.position}
        </p>
      )}

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        {employee.phone && (
          <p>
            <strong className="text-slate-900">
              Tel.
            </strong>{" "}
            <a
              href={getPhoneHref(employee.phone)}
              className="text-[#154280] transition-colors hover:text-[#10376B] hover:underline"
            >
              {employee.phone}
            </a>
          </p>
        )}

        {employee.email && (
          <p>
            <strong className="text-slate-900">
              El. paštas:
            </strong>{" "}
            <a
              href={`mailto:${employee.email}`}
              className="text-[#154280] transition-colors hover:text-[#10376B] hover:underline"
            >
              {employee.email}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default async function KontaktaiPage() {
  const [contact, campuses, employees] = await Promise.all([
    getContact(),
    getCampuses(),
    getContactEmployees(),
  ]);

  const employeeGroups = campuses
    .map((campus) => ({
      campus,
      employees: employees.filter((employee) =>
        employee.padaliniais?.some(
          (employeeCampus) => employeeCampus.id === campus.id
        )
      ),
    }))
    .filter((group) => group.employees.length > 0);

  const employeesWithoutCampus = employees.filter(
    (employee) =>
      !employee.padaliniais ||
      employee.padaliniais.length === 0
  );

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    {
      label: "Pradžia",
      href: "/",
    },
    {
      label: "Kontaktai",
      href: "/kontaktai",
    },
  ]);

  const streetAddress =
    contact?.streetAddress ||
    contact?.address ||
    null;

  const contactPageJsonLd = createContactPageJsonLd({
    name: "Šilutės profesinio mokymo centro kontaktai",
    description: pageDescription,
    path: "/kontaktai",
    telephone: contact?.phone,
    email: contact?.email,
    streetAddress,
    postalCode: contact?.postalCode,
    addressLocality: contact?.addressLocality,
    addressRegion: contact?.addressRegion,
    addressCountry: contact?.addressCountry,
    socialLinks: [
      contact?.facebook,
      contact?.instagram,
      contact?.youtube,
    ],
  });

  return (
    <>
      <SchemaJsonLd data={breadcrumbJsonLd} />
      <SchemaJsonLd data={contactPageJsonLd} />

      <Header />

      <PageHero
        label="Kontaktai"
        title="Susisiekite su Šilutės profesinio mokymo centru"
        description="Turite klausimų apie priėmimą, mokymo programas ar studijas? Susisiekite su mumis."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <Breadcrumb
          items={[
            {
              label: "Pradžia",
              href: "/",
            },
            {
              label: "Kontaktai",
            },
          ]}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Bendri kontaktai */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              {contact?.title || "Bendri kontaktai"}
            </h2>

            <div className="mt-4 space-y-3 text-slate-600">
              {contact?.address && (
                <p>
                  <strong className="text-slate-900">
                    Adresas:
                  </strong>{" "}
                  <a
                    href={getMapsHref(contact.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#154280] transition-colors hover:text-[#10376B] hover:underline"
                  >
                    {contact.address}
                  </a>
                </p>
              )}

              {contact?.phone && (
                <p>
                  <strong className="text-slate-900">
                    Tel.
                  </strong>{" "}
                  <a
                    href={getPhoneHref(contact.phone)}
                    className="text-[#154280] transition-colors hover:text-[#10376B] hover:underline"
                  >
                    {contact.phone}
                  </a>
                </p>
              )}

              {contact?.email && (
                <p>
                  <strong className="text-slate-900">
                    El. paštas:
                  </strong>{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[#154280] transition-colors hover:text-[#10376B] hover:underline"
                  >
                    {contact.email}
                  </a>
                </p>
              )}

              {contact?.workingHours && (
                <div className="pt-1">
                  <strong className="text-slate-900">
                    Darbo laikas:
                  </strong>

                  <div className="mt-2 [&>div]:space-y-1 [&_p]:leading-6">
                    <RichText blocks={contact.workingHours} />
                  </div>
                </div>
              )}

              {(contact?.facebook ||
                contact?.instagram ||
                contact?.youtube) && (
                <div className="flex gap-3 pt-2">
                  {contact.facebook && (
                    <a
                      href={contact.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      aria-label="Šilutės profesinio mokymo centras Facebook"
                    >
                      <FaFacebookF size={20} />
                    </a>
                  )}

                  {contact.instagram && (
                    <a
                      href={contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-pink-600 hover:bg-pink-50 hover:text-pink-700"
                      aria-label="Šilutės profesinio mokymo centras Instagram"
                    >
                      <FaInstagram size={20} />
                    </a>
                  )}

                  {contact.youtube && (
                    <a
                      href={contact.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-red-600 hover:bg-red-50 hover:text-red-600"
                      aria-label="Šilutės profesinio mokymo centras YouTube"
                    >
                      <FaYoutube size={20} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Rekvizitai */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Rekvizitai
            </h2>

            <div className="mt-4 divide-y divide-slate-100">
              {contact?.institutionCode && (
                <div className="grid gap-1 py-3 sm:grid-cols-[170px_1fr]">
                  <span className="font-medium text-slate-900">
                    Įstaigos kodas
                  </span>

                  <span className="text-slate-600">
                    {contact.institutionCode}
                  </span>
                </div>
              )}

              {contact?.legalForm && (
                <div className="grid gap-1 py-3 sm:grid-cols-[170px_1fr]">
                  <span className="font-medium text-slate-900">
                    Teisinė forma
                  </span>

                  <span className="text-slate-600">
                    {contact.legalForm}
                  </span>
                </div>
              )}

              {contact?.registryManager && (
                <div className="grid gap-1 py-3 sm:grid-cols-[170px_1fr]">
                  <span className="font-medium text-slate-900">
                    Registro tvarkytojas
                  </span>

                  <span className="text-slate-600">
                    {contact.registryManager}
                  </span>
                </div>
              )}

              {(contact?.budgetBank ||
                contact?.budgetAccount) && (
                <div className="grid gap-1 py-3 sm:grid-cols-[170px_1fr]">
                  <span className="font-medium text-slate-900">
                    Biudžetinė sąskaita
                  </span>

                  <div className="text-slate-600">
                    {contact?.budgetBank && (
                      <p>{contact.budgetBank}</p>
                    )}

                    {contact?.budgetAccount && (
                      <p className="mt-1 font-medium text-slate-900">
                        {contact.budgetAccount}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {(contact?.incomeBank ||
                contact?.incomeAccount) && (
                <div className="grid gap-1 py-3 sm:grid-cols-[170px_1fr]">
                  <span className="font-medium text-slate-900">
                    Pajamų įmokų sąskaita
                  </span>

                  <div className="text-slate-600">
                    {contact?.incomeBank && (
                      <p>{contact.incomeBank}</p>
                    )}

                    {contact?.incomeAccount && (
                      <p className="mt-1 font-medium text-slate-900">
                        {contact.incomeAccount}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {contact?.googleMapsEmbed && (
          <section className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div
              className="h-[420px] w-full [&_iframe]:h-full [&_iframe]:w-full"
              dangerouslySetInnerHTML={{
                __html: contact.googleMapsEmbed,
              }}
            />
          </section>
        )}

        {/* Padaliniai */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">
            Padaliniai
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {campuses.map((campus) => (
              <div
                key={campus.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {campus.title}
                </h3>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  {campus.address && (
                    <p>
                      <strong className="text-slate-900">
                        Adresas:
                      </strong>{" "}
                      <a
                        href={getMapsHref(campus.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#154280] transition-colors hover:text-[#10376B] hover:underline"
                      >
                        {campus.address}
                      </a>
                    </p>
                  )}

                  {campus.phone && (
                    <p>
                      <strong className="text-slate-900">
                        Tel.
                      </strong>{" "}
                      <a
                        href={getPhoneHref(campus.phone)}
                        className="text-[#154280] transition-colors hover:text-[#10376B] hover:underline"
                      >
                        {campus.phone}
                      </a>
                    </p>
                  )}

                  {campus.email && (
                    <p>
                      <strong className="text-slate-900">
                        El. paštas:
                      </strong>{" "}
                      <a
                        href={`mailto:${campus.email}`}
                        className="text-[#154280] transition-colors hover:text-[#10376B] hover:underline"
                      >
                        {campus.email}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Darbuotojai */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">
            Administracija ir specialistai
          </h2>

          <div className="mt-8 space-y-12">
            {employeeGroups.map(({ campus, employees }) => (
              <div key={campus.id}>
                <h3 className="text-xl font-semibold text-slate-900">
                  {campus.title}
                </h3>

                <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {employees.map((employee) => (
                    <EmployeeContactCard
                      key={employee.id}
                      employee={employee}
                    />
                  ))}
                </div>
              </div>
            ))}

            {employeesWithoutCampus.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Kiti darbuotojai
                </h3>

                <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {employeesWithoutCampus.map((employee) => (
                    <EmployeeContactCard
                      key={employee.id}
                      employee={employee}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}