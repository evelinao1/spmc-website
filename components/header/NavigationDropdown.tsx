"use client";

import Link from "next/link";
import { useState } from "react";

import type { NavigationItem } from "@/data/navigation";

type NavigationDropdownProps = {
  item: NavigationItem;
  isActive: boolean;
  pathname: string;
};

function isPathActive(pathname: string, href?: string) {
  if (!href || href === "#") {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavigationDropdown({
  item,
  isActive,
  pathname,
}: NavigationDropdownProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredChild, setHoveredChild] = useState<string | null>(null);

  if (!item.children?.length) {
    return null;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredChild(null);
      }}
    >
      <button
        type="button"
        style={{
          color: isActive || isHovered ? "#154280" : "#334155",
          fontWeight: isActive ? 600 : 500,
          transition: "color 200ms ease",
        }}
        className="relative flex items-center gap-1 py-2 text-sm"
      >
        {item.title}

        <span
          aria-hidden="true"
          style={{
            transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
          }}
          className="text-base leading-none"
        >
          ▾
        </span>

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
              isActive || isHovered
                ? "scaleX(1)"
                : "scaleX(0)",
            transformOrigin: "center",
            transition: "transform 200ms ease",
          }}
        />
      </button>

      <div
        style={{
          visibility: isHovered ? "visible" : "hidden",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
        className="absolute left-0 top-full z-50 pt-3"
      >
        <div
          style={{
            minWidth: "190px",
            padding: "10px",
            borderRadius: "14px",
            border: "1px solid rgba(148, 163, 184, 0.28)",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 14px 36px rgba(15, 23, 42, 0.12)",
          }}
        >
          <div className="flex flex-col gap-1">
            {item.children.map((child) => {
              const childIsActive = isPathActive(
                pathname,
                child.href
              );

              const childKey = child.href ?? child.title;
              const childIsHovered = hoveredChild === childKey;

              return (
                <Link
                  key={childKey}
                  href={child.href ?? "#"}
                  aria-current={childIsActive ? "page" : undefined}
                  onMouseEnter={() => setHoveredChild(childKey)}
                  onMouseLeave={() => setHoveredChild(null)}
                  style={{
                    minHeight: "42px",
                    padding: "0 16px",
                    borderRadius: "9px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor:
                      childIsActive || childIsHovered
                        ? "rgba(21, 66, 128, 0.10)"
                        : "transparent",
                    color:
                      childIsActive || childIsHovered
                        ? "#154280"
                        : "#334155",
                    fontWeight: childIsActive ? 600 : 500,
                    transform: childIsHovered
                      ? "translateX(3px)"
                      : "translateX(0)",
                    transition:
                      "background-color 200ms ease, color 200ms ease, transform 200ms ease",
                  }}
                  className="text-sm"
                >
                  {child.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}