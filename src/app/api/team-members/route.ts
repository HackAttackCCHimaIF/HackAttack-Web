import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { teamId, leader, members } = body;

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    // Delete existing team members for this team
    const { error: deleteError } = await supabaseServer
      .from("TeamMember")
      .delete()
      .eq("team_id", teamId);

    if (deleteError) {
      console.error("Error deleting existing members:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    // Prepare all members (leader + additional members)
    const allMembers = [];

    // Add leader
    if (leader) {
      allMembers.push({
        id: uuidv4(),
        team_id: teamId,
        name: leader.name,
        email: leader.email,
        github_url: leader.github_url || null,
        data_url: leader.data_url,
        is_leader: true,
      });
    }

    // Add additional members
    if (members && Array.isArray(members)) {
      members.forEach((member) => {
        if (member.name && member.name.trim() !== "") {
          allMembers.push({
            id: uuidv4(),
            team_id: teamId,
            name: member.name,
            email: member.email || null,
            github_url: member.github || null,
            data_url: member.requirementLink || null,
            is_leader: false,
          });
        }
      });
    }

    if (allMembers.length === 0) {
      return NextResponse.json(
        { error: "At least leader information is required" },
        { status: 400 }
      );
    }

    // Insert all members
    const { data, error } = await supabaseServer
      .from("TeamMember")
      .insert(allMembers)
      .select();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data,
      message: `Successfully saved ${allMembers.length} team members`,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET method to fetch existing team members
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    const { data: members, error } = await supabaseServer
      .from("TeamMember")
      .select("*")
      .eq("team_id", teamId)
      .order("is_leader", { ascending: false }); // Leader first

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
