// File: app/api/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  // TODO: Fetch from your DB using the email
  // For now, return mock data
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const responseData = {
    elo: 1375,
    rank: 7,
    totalMatches: 24,
    recentBattles: [
      { date: "July 18", opponent: "quizKing", category: "Math", result: "Win", eloChange: 24 },
      { date: "July 17", opponent: "brainyNerd", category: "GK", result: "Loss", eloChange: -17 },
    ],
  };

  return NextResponse.json(responseData);
}
