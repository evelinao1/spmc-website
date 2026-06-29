import Link from "next/link";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { RichText } from "@/components/RichText";
import { getContact } from "@/lib/contact";
import { getCampuses } from "@/lib/campuses";
import { getContactEmployees } from "@/lib/employees";

function getPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function getMapsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
}

export default async function KontaktaiPage() {
  const [contact, campuses, employees] = await Promise.all([
    getContact(),
    getCampuses(),
    getContactEmployees(),
  ]);

  return (
    <>
      <Header />

      <PageHero
        label="Kontaktai"
        title="Susisiekite su Šilutės profesinio mokymo centru"
        description="Turite klausimų apie priėmimą, mokymo programas ar studijas? Susisiekite su mumis."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              {contact?.title || "Bendri kontaktai"}
            </h2>

            <div className="mt-4 space-y-3 text-slate-600">
              {contact?.address && (
                <p>
                  <strong className="text-slate-900">Adresas:</strong>{" "}
                  <a
                    href={getMapsHref(contact.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {contact.address}
                  </a>
                </p>
              )}

              {contact?.phone && (
                <p>
                  <strong className="text-slate-900">Tel.</strong>{" "}
                  <a
                    href={getPhoneHref(contact.phone)}
                    className="text-blue-700 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </p>
              )}

              {contact?.email && (
                <p>
                  <strong className="text-slate-900">El. paštas:</strong>{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-blue-700 hover:underline"
                  >
                    {contact.email}
                  </a>
                </p>
              )}

              {contact?.workingHours && (
                <div>
                  <strong className="text-slate-900">Darbo laikas:</strong>
                  <div className="mt-2">
                    <RichText blocks={contact.workingHours} />
                  </div>
                </div>
              )}

              {(contact?.facebook || contact?.youtube) && (
                <div className="flex gap-3 pt-2">
                  {contact?.facebook && (
                    <a
                      href={contact.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      aria-label="Facebook"
                    >
                      <FaFacebookF size={20} />
                    </a>
                  )}

                  {contact?.youtube && (
                    <a
                      href={contact.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-red-600 hover:bg-red-50 hover:text-red-600"
                      aria-label="YouTube"
                    >
                      <FaYoutube size={20} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Rekvizitai
            </h2>

            <div className="mt-4">
              {contact?.legalInformation ? (
                <RichText blocks={contact.legalInformation} />
              ) : (
                <p className="text-slate-600">Rekvizitai ruošiami.</p>
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

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">Padaliniai</h2>

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
                      <strong className="text-slate-900">Adresas:</strong>{" "}
                      <a
                        href={getMapsHref(campus.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        {campus.address}
                      </a>
                    </p>
                  )}

                  {campus.phone && (
                    <p>
                      <strong className="text-slate-900">Tel.</strong>{" "}
                      <a
                        href={getPhoneHref(campus.phone)}
                        className="text-blue-700 hover:underline"
                      >
                        {campus.phone}
                      </a>
                    </p>
                  )}

                  {campus.email && (
                    <p>
                      <strong className="text-slate-900">El. paštas:</strong>{" "}
                      <a
                        href={`mailto:${campus.email}`}
                        className="text-blue-700 hover:underline"
                      >
                        {campus.email}
                      </a>
                    </p>
                  )}
                </div>

                <Link
                  href={`/padaliniai/${campus.slug}`}
                  className="mt-5 inline-flex text-sm font-semibold text-blue-700 hover:underline"
                >
                  Plačiau apie padalinį →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-slate-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Administracija ir specialistai
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {employee.fullName}
                </h3>

                {employee.position && (
                  <p className="mt-1 text-sm text-slate-500">
                    {employee.position}
                  </p>
                )}

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  {employee.phone && (
                    <p>
                      <strong className="text-slate-900">Tel.</strong>{" "}
                      <a
                        href={getPhoneHref(employee.phone)}
                        className="text-blue-700 hover:underline"
                      >
                        {employee.phone}
                      </a>
                    </p>
                  )}

                  {employee.email && (
                    <p>
                      <strong className="text-slate-900">El. paštas:</strong>{" "}
                      <a
                        href={`mailto:${employee.email}`}
                        className="text-blue-700 hover:underline"
                      >
                        {employee.email}
                      </a>
                    </p>
                  )}

                  {employee.padaliniais && employee.padaliniais.length > 0 && (
                    <p>
                      <strong className="text-slate-900">Padalinys:</strong>{" "}
                      {employee.padaliniais
                        .map((campus) => campus.title)
                        .join(", ")}
                    </p>
                  )}
                </div>

                <Link
                  href={`/apie/darbuotojai/${employee.slug}`}
                  className="mt-5 inline-flex text-sm font-semibold text-blue-700 hover:underline"
                >
                  Plačiau →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}