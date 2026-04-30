import { NextResponse } from "next/server";
import { fetchGitHubData } from "@/lib/github";

export async function GET() {
  const data = await fetchGitHubData();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
