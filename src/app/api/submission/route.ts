import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { team_name, proposal_url, leader_email } = body;

    if (!team_name || !proposal_url || !leader_email) {
      return NextResponse.json(
        { error: "team_name, proposal_url, and leader_email are required" },
        { status: 400 }
      );
    }
    const { data: userData, error: userError } = await supabaseServer
      .from("Users")
      .select("id")
      .eq("email", leader_email)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        {
          error: "Email Leader tidak ditemukan, gunakan email yang sesuai",
        },
        { status: 404 }
      );
    }

    const userId = userData.id;

    const { data: teamData, error: teamError } = await supabaseServer
      .from("Team")
      .select("id, created_by")
      .eq("team_name", team_name)
      .eq("created_by", userId)
      .single();

    if (teamError || !teamData) {
      return NextResponse.json(
        {
          error:
            "Email Leader tidak sesuai dengan data Tim yang dipilih, gunakan email yang sesuai",
        },
        { status: 404 }
      );
    }

    const submissionId = uuidv4();

    const insertRes = await supabaseServer
      .from("Submission")
      .insert([
        {
          id: submissionId,
          team_id: teamData.id,
          proposal_url,
        },
      ])
      .select();

    if (insertRes.error) {
      return NextResponse.json(
        { error: insertRes.error.message },
        { status: 400 }
      );
    }

    const inserted = insertRes.data;

    if (inserted && inserted.length > 0) {
      return NextResponse.json({
        success: true,
        data: inserted[0],
        created: true,
      });
    }

    const { data: existing, error: existingError } = await supabaseServer
      .from("Submission")
      .select("id, team_id, proposal_url, status")
      .eq("team_id", teamData.id)
      .single();

    if (existingError) {
      return NextResponse.json(
        { error: existingError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: existing, created: false });
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
