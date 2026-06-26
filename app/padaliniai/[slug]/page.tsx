import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { RichText, type StrapiBlock } from "@/components/RichText";
import { fetchFromStrapi } from "@/lib/strapi";

type MediaFile = {
  id: number;
  name: string;
  url: string;
  alternativeText?: string | null;
};

type Program = {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string | null;
  category?: string | null;
  image?: MediaFile | null;
};

type Employee = {
  id: number;
  fullName: string;
  slug: string;
  position?: string | null;
  category?: string | null;
  email?: string | null;
  phone?: string | null;
  active?: boolean;
  order?: number | null;
  photo?: MediaFile | null;
};

type Campus = {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string | null;
  content?: StrapiBlock[] | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  image?: MediaFile | null;
  gallery?: MediaFile[];
  attachments?: MediaFile[];
  programos?: Program[];
  darbuotojais?: Employee[];
};

type CampusPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getMediaUrl(url?: string) {
  if (!url) return null;
  if (url.startsWith("http")) return url;

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export default async function CampusPage({ params }: CampusPageProps) {
  const { slug } = await params;

  const data = await fetchFromStrapi(
    `/campuses?filters[slug][$eq]=${slug}&populate[image]=true&populate[gallery]=true&populate[attachments]=true&populate[programos][populate]=image&populate[darbuotojais][populate]=photo`
  );

  const campus: Campus | undefined = data.data?.[0];

  if (!campus) {
    notFound();
  }

  const imageUrl = getMediaUrl(campus.image?.url);
  const mapsUrl = campus.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        campus.address
      )}`
    : null;

  const activeEmployees = (campus.darbuotojais || [])
    .filter((employee) => employee.active !== false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return (
    <>
      <Header />

      <main>
        <PageHero
          title={campus.title}
          description={campus.shortDescription ?? "Padalinio informacija"}
        />

        <section className="mx-auto max-w-5xl px-6 py-16">
          <Link
            href="/padaliniai"
            className="mb-8 inline-flex text-sm font-medium text-blue-700 transition hover:text-blue-900"
          >
            ← Visi padaliniai
          </Link>

          {imageUrl && (
            <div className="mb-10 overflow-hidden rounded-2xl">
              <div className="relative h-[420px] w-full">
                <Image
                  src={imageUrl}
                  alt={campus.image?.alternativeText || campus.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Kontaktai
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              {campus.address && (
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Adresas
                  </p>
                  <p className="text-sm text-slate-600">{campus.address}</p>

                  {mapsUrl && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex text-sm font-medium text-blue-700 hover:underline"
                    >
                      Rodyti žemėlapyje
                    </a>
                  )}
                </div>
              )}

              {campus.phone && (
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Telefonas
                  </p>
                  <p className="text-sm text-slate-600">{campus.phone}</p>
                </div>
              )}

              {campus.email && (
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    El. paštas
                  </p>
                  <a
                    href={`mailto:${campus.email}`}
                    className="text-sm text-blue-700 hover:underline"
                  >
                    {campus.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {campus.content && (
            <RichText blocks={campus.content as StrapiBlock[]} />
          )}

          {campus.programos && campus.programos.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Šiame padalinyje vykdomos programos ({campus.programos.length})
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                {campus.programos.map((program) => {
                  const programImageUrl = getMediaUrl(program.image?.url);

                  return (
                    <Link
                      key={program.id}
                      href={`/programos/${program.slug}`}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      {programImageUrl && (
                        <div className="relative h-44 w-full">
                          <Image
                            src={programImageUrl}
                            alt={
                              program.image?.alternativeText || program.title
                            }
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="p-5">
                        <h3 className="text-lg font-bold text-slate-900">
                          {program.title}
                        </h3>

                        {program.shortDescription && (
                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                            {program.shortDescription}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {activeEmployees.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Padalinio darbuotojai ({activeEmployees.length})
              </h2>

              <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                {activeEmployees.map((employee) => {
                  const employeePhotoUrl = getMediaUrl(employee.photo?.url);

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
                          <p className="mt-1 text-sm font-medium text-blue-700">
                            {employee.category}
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
          )}

          {campus.gallery && campus.gallery.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Galerija
              </h2>

              <div className="grid gap-5 md:grid-cols-3">
                {campus.gallery.map((image) => {
                  const galleryImageUrl = getMediaUrl(image.url);

                  if (!galleryImageUrl) return null;

                  return (
                    <div
                      key={image.id}
                      className="relative h-56 overflow-hidden rounded-2xl"
                    >
                      <Image
                        src={galleryImageUrl}
                        alt={image.alternativeText || image.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {campus.attachments && campus.attachments.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Dokumentai
              </h2>

              <div className="space-y-3">
                {campus.attachments.map((file) => {
                  const fileUrl = getMediaUrl(file.url);

                  if (!fileUrl) return null;

                  return (
                    <a
                      key={file.id}
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl border border-slate-200 bg-white px-5 py-4 font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      {file.name}
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}