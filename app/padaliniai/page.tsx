import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { fetchFromStrapi } from "@/lib/strapi";

type Campus = {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string | null;
  address?: string | null;
  image?: {
    url: string;
    alternativeText?: string | null;
  } | null;
};

export default async function PadaliniaiPage() {
  const data = await fetchFromStrapi(
    "/campuses?populate=image&sort=order:asc&filters[active][$eq]=true"
  );

  const campuses: Campus[] = data.data;

  return (
    <>
      <Header />

      <PageHero
        label="Padaliniai"
        title="Mokykis modernioje ir praktiškoje aplinkoje"
        description="Šilutės profesinio mokymo centrą sudaro keli padaliniai, kuriuose mokiniai mokosi ir įgyja profesinių įgūdžių."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {campuses.map((campus) => {
            const imageUrl = campus.image?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${campus.image.url}`
              : null;

            return (
              <Link
                key={campus.id}
                href={`/padaliniai/${campus.slug}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                {imageUrl && (
                  <div className="relative h-52 w-full">
                    <Image
                      src={imageUrl}
                      alt={campus.image?.alternativeText || campus.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {campus.title}
                  </h2>

                  {campus.shortDescription && (
                    <p className="mt-3 text-slate-600">
                      {campus.shortDescription}
                    </p>
                  )}

                  {campus.address && (
                    <p className="mt-4 text-sm font-medium text-slate-500">
                      {campus.address}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}