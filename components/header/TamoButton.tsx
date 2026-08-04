import Link from "next/link";

export function TamoButton() {
  return (
    <Link
      href="https://dienynas.tamo.lt/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Atidaryti TAMO dienyną"
      onMouseEnter={(event) => {
        event.currentTarget.style.backgroundColor = "#10376B";
        event.currentTarget.style.boxShadow =
          "0 4px 12px rgba(21, 66, 128, 0.18)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.backgroundColor = "#154280";
        event.currentTarget.style.boxShadow = "none";
      }}
      style={{
        height: "40px",
        minHeight: "40px",
        padding: "0 18px",
        borderRadius: "10px",
        backgroundColor: "#154280",
        color: "#FFFFFF",
        border: "1px solid #154280",
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
          "background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
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