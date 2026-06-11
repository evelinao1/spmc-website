import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <h2 className="text-lg font-bold">
            Šilutės profesinio mokymo centras
          </h2>
          <p className="mt-4 text-sm text-blue-100">
            Kuriame profesinę ateitį kartu.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Kontaktai</h3>
          <div className="mt-4 space-y-2 text-sm text-blue-100">
            <p>Klaipėdos g. 72, Šilutė</p>
            <p>Tel. +370 441 60500</p>
            <p>El. p. info@silutespmc.lt</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Greitos nuorodos</h3>
          <div className="mt-4 space-y-2 text-sm text-blue-100">
            <p><Link href="/stojantiesiems">Stojantiesiems</Link></p>
            <p><Link href="/programos">Mokymo programos</Link></p>
            <p><Link href="/dokumentai">Dokumentai</Link></p>
            <p><Link href="/kontaktai">Kontaktai</Link></p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Padaliniai</h3>
          <div className="mt-4 space-y-2 text-sm text-blue-100">
            <p>Šilutės profesinio mokymo centras</p>
            <p>Žuvininkystės praktinio mokymo centras</p>
            <p>Prekybos ir paslaugų skyrius</p>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-sm text-blue-100 md:flex-row md:justify-between">
          <p>© 2026 Šilutės profesinio mokymo centras</p>
          <p>Svetainės prototipas</p>
        </div>
      </div>
    </footer>
  );
}