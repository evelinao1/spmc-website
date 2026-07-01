import Link from "next/link";
import { navigation } from "@/data/navigation";
import { NavigationDropdown } from "./NavigationDropdown";

export function DesktopNavigation() {
  return (
    <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
      {navigation.map((item) =>
        item.children?.length ? (
          <NavigationDropdown key={item.title} item={item} />
        ) : (
          <Link
            key={item.href ?? item.title}
            href={item.href ?? "#"}
            className="transition hover:text-blue-700"
          >
            {item.title}
          </Link>
        )
      )}
    </nav>
  );
}