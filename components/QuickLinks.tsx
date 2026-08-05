import Link from "next/link";

const quickLinks = [
  {
    title: "Priėmimas",
    description: "Informacija stojantiesiems",
    href: "/stojantiesiems",
  },
  {
    title: "Mokymo programos",
    description: "Rask sau tinkamą profesiją",
    href: "/programos",
  },
  {
    title: "Mokiniams",
    description: "Tvarkaraščiai ir kita svarbi informacija",
    href: "/mokiniams",
  },
  {
    title: "Apie centrą",
    description: "Dokumentai ir centro veiklos informacija",
    href: "/apie",
  },
  {
    title: "Kontaktai",
    description: "Padaliniai ir susisiekimas",
    href: "/kontaktai",
  },
];

export function QuickLinks() {
  return (
    <section className="bg-white py-2">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 md:grid-cols-5">
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="border-b border-slate-200 p-6 transition-colors duration-200 hover:bg-blue-50 active:bg-blue-100 md:border-b-0 md:border-r last:md:border-r-0"
            >
              <p className="font-bold text-slate-900">{item.title}</p>

              <p className="mt-2 text-sm text-slate-600">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}