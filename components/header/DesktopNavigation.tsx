"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navigation } from "@/data/navigation";
import { NavigationDropdown } from "./NavigationDropdown";

function isPathActive(pathname: string, href?: string) {
  if (!href || href === "#") {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNavigation() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav
      className="hidden items-center gap-6 text-sm font-medium lg:flex"
      aria-label="Pagrindinė navigacija"
    >
      {navigation.map((item) => {
        const hasChildren = Boolean(item.children?.length);

        const childIsActive =
          item.children?.some((child) =>
            isPathActive(pathname, child.href)
          ) ?? false;

        const itemIsActive =
          isPathActive(pathname, item.href) || childIsActive;

        if (hasChildren) {
          return (
            <NavigationDropdown
              key={item.title}
              item={item}
              isActive={itemIsActive}
              pathname={pathname}
            />
          );
        }

        const isHovered = hoveredItem === item.title;

        return (
          <Link
            key={item.href ?? item.title}
            href={item.href ?? "#"}
            aria-current={itemIsActive ? "page" : undefined}
            onMouseEnter={() => setHoveredItem(item.title)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              color:
                itemIsActive || isHovered
                  ? "#154280"
                  : "#334155",
              fontWeight: itemIsActive ? 600 : 500,
              transition: "color 200ms ease",
            }}
            className="relative py-2"
          >
            {item.title}

            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: "-4px",
                height: "2px",
                borderRadius: "999px",
                backgroundColor: "#154280",
                transform:
                  itemIsActive || isHovered
                    ? "scaleX(1)"
                    : "scaleX(0)",
                transformOrigin: "center",
                transition: "transform 200ms ease",
              }}
            />
          </Link>
        );
      })}
    </nav>
  );
}