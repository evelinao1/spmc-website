import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const linkClassName = "footer-link inline-block";

  return (
    <footer className="bg-blue-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <Link
            href="/"
            aria-label="Grįžti į pagrindinį puslapį"
            className="inline-block"
          >
            <Image
              src="/images/Logo_baltas.png"
              alt="Šilutės profesinio mokymo centras"
              width={210}
              height={180}
              className="h-auto w-36"
            />
          </Link>

          <p className="mt-4 text-sm text-blue-100">
            Kuriame profesinę ateitį kartu.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Kontaktai</h3>

          <div className="mt-4 space-y-2 text-sm">
            <p className="text-blue-100">Mokyklos g. 3, Pagryniai</p>

            <p>
              <a href="tel:+37044153360" className={linkClassName}>
                Tel. +370 441 53360
              </a>
            </p>

            <p>
              <a
                href="mailto:sekretore@silutespmc.lt"
                className={linkClassName}
              >
                El. p. sekretore@silutespmc.lt
              </a>
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Greitos nuorodos</h3>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <Link href="/stojantiesiems" className={linkClassName}>
                Stojantiesiems
              </Link>
            </p>

            <p>
              <Link href="/programos" className={linkClassName}>
                Mokymo programos
              </Link>
            </p>

            <p>
              <Link href="/dokumentai" className={linkClassName}>
                Dokumentai
              </Link>
            </p>

            <p>
              <Link href="/kontaktai" className={linkClassName}>
                Kontaktai
              </Link>
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Padaliniai</h3>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <Link
                href="/padaliniai/centras"
                className={linkClassName}
              >
                Šilutės profesinio mokymo centras
              </Link>
            </p>

            <p>
              <Link
                href="/padaliniai/zuvininkystes-sektorinis-praktinio-mokymo-centras"
                className={linkClassName}
              >
                Žuvininkystės sektorinis praktinio mokymo centras
              </Link>
            </p>

            <p>
              <Link
                href="/padaliniai/turizmo-ir-paslaugu-skyrius"
                className={linkClassName}
              >
                Paslaugų ir turizmo skyrius
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-900">
        <div className="mx-auto max-w-7xl px-6 py-5 text-sm text-blue-100">
          <p>© 2026 Šilutės profesinio mokymo centras</p>
        </div>
      </div>
    </footer>
  );
}