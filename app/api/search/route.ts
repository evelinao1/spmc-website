import { NextResponse } from "next/server";
import { fetchSearchItems } from "@/lib/search";

export async function GET() {
  try {
    const items = await fetchSearchItems();

    return NextResponse.json(items);
  } catch (error) {
    console.error("Search API error:", error);

    return NextResponse.json(
      { error: "Nepavyko užkrauti paieškos duomenų." },
      { status: 500 }
    );
  }
}