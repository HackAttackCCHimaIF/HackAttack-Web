import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("Team")
      .select(
        `
        id,
        team_name,
        Submission(id)
      `
      )
      .order("team_name", { ascending: true });

    if (error) {
      console.error("Failed get Team:", error);
      return NextResponse.json({ status: 400, error: error.message });
    }

    // Filter teams that have NO submission
    const availableTeams = data
      .filter((team) => !team.Submission || team.Submission.length === 0)
      .map((item) => ({
        id: item.id,
        name: item.team_name,
      }));

    return NextResponse.json({
      status: 200,
      data: { teamData: availableTeams },
      message: "Teams without submissions found",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
