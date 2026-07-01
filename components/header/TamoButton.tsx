import Link from "next/link";

export function TamoButton() {
  return (
    <Link
      href="https://dienynas.tamo.lt/"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
    >
      TAMO
    </Link>
  );
}