import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

import { getEducations } from "@/lib/educations";
import { colors } from "@/lib/theme";

function getMediaUrl(url?: string | null) {
  if (!url) {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export default async function EdukacijosPage() {
  const educations = await getEducations();

  return (
    <>
      <Header />

      <main>
        <PageHero
          title="Edukacijos"
          description="Praktinės, pažintinės ir kūrybinės edukacijos įvairioms amžiaus grupėms."
        />

        <section className="mx-auto max-w-7xl px-6 py-16">
          {educations.length === 0 ? (
            <p className="text-slate-600">
              Šiuo metu edukacijų nėra.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {educations.map((education) => {
                const imageUrl = getMediaUrl(education.coverImage?.url);

                return (
                  <Link
                    key={education.id}
                    href={`/edukacijos/${education.slug}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {imageUrl && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={
                            education.coverImage?.alternativeText ||
                            education.title
                          }
                          fill
                          className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {education.audience && (
                        <span
                          className="mb-3 inline-block text-sm font-semibold"
                          style={{ color: colors.primary }}
                        >
                          {education.audience}
                        </span>
                      )}

                      <h2 className="text-xl font-bold text-slate-900">
                        {education.title}
                      </h2>

                      {education.summary && (
                        <p className="mt-3 leading-7 text-slate-600">
                          {education.summary}
                        </p>
                      )}

                      {(education.duration || education.price) && (
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                          {education.duration && (
                            <span>Trukmė: {education.duration}</span>
                          )}

                          {education.price && (
                            <span>Kaina: {education.price}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}