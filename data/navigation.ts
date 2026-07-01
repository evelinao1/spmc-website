export type NavigationItem = {
  title: string;
  href?: string;
  children?: NavigationItem[];
};

export const navigation: NavigationItem[] = [
  { title: "Stojantiesiems", href: "/stojantiesiems" },
  { title: "Programos", href: "/programos" },
  { title: "Mokiniams", href: "/mokiniams" },
  { title: "Įtraukusis ugdymas", href: "/itraukusis-ugdymas" },
  {
    title: "Veiklos",
    children: [
      { title: "Naujienos", href: "/naujienos" },
      { title: "Skelbimai", href: "/skelbimai" },
      { title: "Projektai", href: "/projektai" },
      { title: "Edukacijos", href: "/edukacijos" },
    ],
  },
  { title: "Apie centrą", href: "/apie" },
  { title: "Kontaktai", href: "/kontaktai" },
];