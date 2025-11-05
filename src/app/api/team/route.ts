import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      teamName,
      institution,
      whatsapp_number,
      paymentproof_url,
      userEmail,
    } = body;

    const { data: userData, error: userError } = await supabaseServer
      .from("Users")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { data: existingTeam, error: selectError } = await supabaseServer
      .from("Team")
      .select("*")
      .eq("created_by", userData.id)
      .maybeSingle();

    if (selectError && selectError.code !== "PGRST116") {
      console.error("Database error:", selectError);
      return NextResponse.json({ error: selectError.message }, { status: 400 });
    }

    if (existingTeam) {
      let newApprovalStatus = existingTeam.approval_status;

      if (existingTeam.approval_status == null) {
        newApprovalStatus = "Pending";
      } else if (existingTeam.approval_status == "Rejected") {
        newApprovalStatus = "Resubmitted";
      }

      const { data, error } = await supabaseServer
        .from("Team")
        .update({
          team_name: teamName,
          institution: institution,
          whatsapp_number: whatsapp_number,
          paymentproof_url: paymentproof_url,
          approvalstatus: newApprovalStatus,
          updated_at: new Date(),
        })
        .eq("created_by", userData.id)
        .select()
        .single();

      if (error) {
        console.error("Update error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, data, updated: true });
    } else {
      const teamId = uuidv4();
      const { data, error } = await supabaseServer
        .from("Team")
        .insert([
          {
            id: teamId,
            created_by: userData.id,
            team_name: teamName,
            institution: institution,
            whatsapp_number: whatsapp_number,
            paymentproof_url: paymentproof_url,
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
      .select("*")
      .eq("created_by", userData.id)
      .maybeSingle();

    if (teamError && teamError.code !== "PGRST116") {
      console.error("Database error:", teamError);
      return NextResponse.json({ error: teamError.message }, { status: 400 });
    }

    if (!teamData) {
      return NextResponse.json({
        success: true,
        data: null,
        message: "No team found",
      });
    }

    return NextResponse.json({ success: true, data: teamData });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
