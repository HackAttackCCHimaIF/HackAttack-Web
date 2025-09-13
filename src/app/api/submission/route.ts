import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { proposal_url, userEmail } = body;

    if (!proposal_url || !userEmail) {
      return NextResponse.json(
        { error: "Proposal URL and user email are required" },
        { status: 400 }
      );
    }

    const { data: userData, error: userError } = await supabaseServer
      .from("Users")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { data: teamData, error: teamError } = await supabaseServer
      .from("Team")
      .select("id")
      .eq("created_by", userData.id)
      .single();

    if (teamError || !teamData) {
      return NextResponse.json(
        { error: "Team not found for this user" },
        { status: 404 }
      );
    }

    const { data: existingSubmission, error: selectError } =
      await supabaseServer
        .from("Submission")
        .select("*")
        .eq("team_id", teamData.id)
        .maybeSingle();

    if (selectError && selectError.code !== "PGRST116") {
      console.error("Database error:", selectError);
      return NextResponse.json({ error: selectError.message }, { status: 400 });
    }

    if (existingSubmission) {
      const { data, error } = await supabaseServer
        .from("Submission")
        .update({
          proposal_url: proposal_url,
          status: "Pending",
          updated_at: new Date(),
        })
        .eq("team_id", teamData.id)
        .select()
        .single();

      if (error) {
        console.error("Update error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, data, updated: true });
    } else {
      const submissionId = uuidv4();
      const { data, error } = await supabaseServer
        .from("Submission")
        .insert([
          {
            id: submissionId,
            proposal_url: proposal_url,
            status: "Pending",
            team_id: teamData.id,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Insert error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, data, created: true });
    }
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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get team ID
    const { data: teamData, error: teamError } = await supabaseServer
      .from("Team")
      .select("id, team_name")
      .eq("created_by", userData.id)
      .single();

    if (teamError || !teamData) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Get submission data
    const { data: submissionData, error: submissionError } =
      await supabaseServer
        .from("Submission")
        .select("*")
        .eq("team_id", teamData.id)
        .maybeSingle();

    if (submissionError && submissionError.code !== "PGRST116") {
      console.error("Database error:", submissionError);
      return NextResponse.json(
        { error: submissionError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        submission: submissionData,
        team: teamData,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
