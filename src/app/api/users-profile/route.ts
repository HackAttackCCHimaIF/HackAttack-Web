import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");

  try {
    const { data: userData, error: userError } = await supabaseServer
      .from("Users")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (userError) {
      return NextResponse.json({ status: 400, error: userError.message });
    }

    console.log("userdata : ", userData);

    const { data: teamData, error: teamErrpr } = await supabaseServer
      .from("Team")
      .select("id, team_name")
      .eq("created_by", userData.id)
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
