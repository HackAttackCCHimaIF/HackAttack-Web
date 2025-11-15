import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { team_name, proposal_url, leaderEmail } = body;

    if (!team_name || !proposal_url || !leaderEmail) {
      return NextResponse.json(
        { error: "Team name, proposal URL, and leader email are required" },
        { status: 400 }
      );
    }

    const { data: teamData, error: teamError } = await supabaseServer
      .from("Team")
      .select("id")
      .eq("team_name", team_name)
      .single();

    if (teamError || !teamData) {
      return NextResponse.json(
        { error: "Team not found for this user" },
        { status: 404 }
      );
    }

    const submissionId = uuidv4();
    const { data, error } = await supabaseServer
      .from("Submission")
      .insert([
        {
          id: submissionId,
          team_id: teamData.id,
          proposal_url: proposal_url,
          status: "Pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data, created: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
