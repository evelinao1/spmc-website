import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex min-h-[70vh] items-center bg-slate-50">
        <section className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Klaida 404
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Puslapis nerastas
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Gali būti, kad puslapio adresas buvo pakeistas, puslapis pašalintas
              arba nuoroda įvesta neteisingai.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
              >
                Grįžti į pradžią
              </Link>

              <Link
                href="/programos"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-300 hover:text-blue-700 sm:w-auto"
              >
                Peržiūrėti programas
              </Link>
            </div>

            <div className="mt-12 border-t border-slate-200 pt-8">
              <p className="text-sm text-slate-500">
                Nerandate reikalingos informacijos?
              </p>

              <Link
                href="/kontaktai"
                className="mt-2 inline-block text-sm font-semibold text-blue-700 transition hover:text-blue-800"
              >
                Susisiekite su mumis →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}