"use client";

import Link from "next/link";
import { colors } from "@/lib/theme";

export function TamoButton() {
  return (
    <Link
      href="https://dienynas.tamo.lt/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Atidaryti TAMO dienyną"
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
        event.currentTarget.style.boxShadow = "none";
        event.currentTarget.style.transform = "translateY(0)";
      }}
      style={{
        width: "94px",
        height: "40px",
        minWidth: "94px",
        minHeight: "40px",
        padding: "0 18px",
        borderRadius: "10px",
        backgroundColor: colors.primary,
        color: "#FFFFFF",
        border: `1px solid ${colors.primary}`,
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: 1,
        textDecoration: "none",
        cursor: "pointer",
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
      TAMO
    </Link>
  );
}