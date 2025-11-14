import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { team_name, proposal_url } = body;

    if (!team_name || !proposal_url) {
      return NextResponse.json(
        { error: "Team name and proposal URL are required" },
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

// GET method to fetch existing submission
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    // Get user ID
    const { data: userData, error: userError } = await supabaseServer
      .from("Users")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ status: 404, error: "User not found" });
    }

    // Get team ID
    const { data: teamData, error: teamError } = await supabaseServer
      .from("Team")
      .select("id, team_name")
      .eq("created_by", userData.id)
      .single();

    if (teamError || !teamData) {
      return NextResponse.json({ status: 404, error: "Team not found" });
    }

    // Get submission data
    const { data: submissionData, error: submissionError } =
      await supabaseServer
        .from("Submission")
        .select("id, proposal_url")
        .eq("team_id", teamData.id)
        .maybeSingle();

    if (submissionError && submissionError.code !== "PGRST116") {
      console.error("Database error:", submissionError);
      return NextResponse.json({ status: 400, error: submissionError.message });
    }

    if (!submissionData) {
      return NextResponse.json({
        status: 200,
        data: teamData,
        message: "No submission found for this team",
      });
    }

    return NextResponse.json({
      status: 200,
      data: {
        submissionData,
        teamData,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
