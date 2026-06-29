import { NextResponse } from "next/server";
import { fetchSearchItems } from "@/lib/search";

export async function GET() {
  const items = await fetchSearchItems();

  return NextResponse.json(items);
}