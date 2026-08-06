"use client";

import Link from "next/link";

import { colors } from "@/lib/theme";

export function ProgramsButton() {
  return (
    <Link
      href="/programos"
      onMouseEnter={(event) => {
        event.currentTarget.style.backgroundColor = "#0D3263";
        event.currentTarget.style.borderColor = "#0D3263";
        event.currentTarget.style.boxShadow =
          "0 10px 24px rgba(21, 66, 128, 0.32)";
        event.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.backgroundColor = colors.primary;
        event.currentTarget.style.borderColor = colors.primary;
        event.currentTarget.style.boxShadow =
          "0 4px 12px rgba(21, 66, 128, 0.18)";
        event.currentTarget.style.transform = "translateY(0)";
      }}
      style={{
        minHeight: "48px",
        padding: "0 24px",
        borderRadius: "12px",
        backgroundColor: colors.primary,
        color: "#FFFFFF",
        border: `1px solid ${colors.primary}`,
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: 1,
        textDecoration: "none",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(21, 66, 128, 0.18)",
        transition:
          "background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
      }}
      className="
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#154280]
        focus-visible:ring-offset-2
      "
    >
      Peržiūrėti visas programas
    </Link>
  );
}