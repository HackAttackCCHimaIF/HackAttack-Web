import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";

export async function GET() {
  try {
    const { data: teamData, error: teamErrpr } = await supabaseServer
      .from("Team")
      .select("id, team_name")

      .single();

    if (teamErrpr) {
      return NextResponse.json({ status: 400, error: teamErrpr.message });
    }

    console.log("teamdata : ", teamData);

    return NextResponse.json({
      status: 200,
      data: teamData,
      message: "Team Data found",
    });
  } catch {
    return NextResponse.json({ status: 400, message: "Internal Server Error" });
  }
}
