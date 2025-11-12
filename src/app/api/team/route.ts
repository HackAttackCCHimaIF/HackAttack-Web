import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";
import { Members } from "@/lib/types/teamMember";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      leaderEmail,
      teamName,
      institution,
      leaderName,
      requirementLink,
      github_url,
      leaderRole,
      whatsapp_number,
      members,
      paymentproof_url,
    } = body;

    // Check if leaderEmail exists in Users table
    let { data: userData, error: userError } = await supabaseServer
      .from("Users")
      .select("id")
      .eq("email", leaderEmail)
      .single();

    if (userError || !userData) {
      const { data: users, error: usersError } = await supabaseServer
        .from("Users")
        .upsert({
          email: leaderEmail,
          username: leaderName,
          role: "TeamLeader",
        })
        .select()
        .single();

      if (usersError) {
        console.error("Failed add User:", usersError);
        return NextResponse.json(
          { error: usersError.message },
          { status: 400 }
        );
      }
      userData = users;
      userError = null;
    }

    // Insert team data into the database
    const { data: teamData, error: teamError } = await supabaseServer
      .from("Team")
      .upsert({
        created_by: userData?.id,
        team_name: teamName,
        institution: institution,
        whatsapp_number: whatsapp_number,
        paymentproof_url: paymentproof_url,
      })
      .select()
      .single();

    if (teamError) {
      console.error("Failed add Team:", teamError);
      return NextResponse.json({ error: teamError.message }, { status: 400 });
    }

    // Collect all members with team leader
    const allMembers = [
      {
        team_id: teamData.id,
        name: leaderName,
        email: leaderEmail,
        requirementLink: requirementLink,
        github_url: github_url,
        member_role: leaderRole,
        is_leader: true,
      },
      ...members.map((member: Members) => ({
        team_id: teamData.id,
        name: member.name,
        email: member.email,
        requirementLink: member.requirementLink,
        github_url: member.github_url,
        member_role: member.member_role,
        is_leader: false,
      })),
    ];

    // Upsert all members into the database
    const { data: membersData, error: membersError } = await supabaseServer
      .from("TeamMember")
      .upsert(allMembers);

    if (membersError) {
      console.error("Failed add Member:", membersError);
      return NextResponse.json(
        { error: membersError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 201,
      data: { teamData, membersData },
      message: "Team and members created successfully",
    });
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
      console.error("Failed get Team:", teamError);
      return NextResponse.json({ error: teamError.message }, { status: 400 });
    }

    if (!teamData) {
      return NextResponse.json({
        status: 404,
        data: null,
        message: "No team found",
      });
    }

    const { data: membersData, error: membersError } = await supabaseServer
      .from("TeamMember")
      .select("*")
      .eq("team_id", teamData.id)
      .order("is_leader", { ascending: false });

    if (membersError) {
      console.error("Failed get Members:", membersError);
      return NextResponse.json(
        { error: membersError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 200,
      data: { teamData, membersData },
      message: "Team found",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      leaderEmail,
      teamName,
      institution,
      leaderName,
      requirementLink,
      github_url,
      leaderRole,
      whatsapp_number,
      members,
      paymentproof_url,
    } = body;

    // Check if leaderEmail exists in Users table
    let { data: userData, error: userError } = await supabaseServer
      .from("Users")
      .select("id")
      .eq("email", leaderEmail)
      .single();

    if (userError || !userData) {
      const { data: users, error: usersError } = await supabaseServer
        .from("Users")
        .upsert({
          email: leaderEmail,
          name: leaderName,
          updated_at: new Date(),
        })
        .select()
        .single();

      if (usersError) {
        console.error("Failed add User:", usersError);
        return NextResponse.json(
          { error: usersError.message },
          { status: 400 }
        );
      }
      userData = users;
      userError = null;
    }

    // Update team data
    const { data: teamData, error: teamError } = await supabaseServer
      .from("Team")
      .update({
        created_by: userData?.id,
        team_name: teamName,
        institution: institution,
        whatsapp_number: whatsapp_number,
        paymentproof_url: paymentproof_url,
        approvalstatus: "Resubmitted",
        updated_at: new Date(),
      })
      .eq("created_by", userData?.id)
      .select()
      .single();

    if (teamError) {
      console.error("Failed Update Team:", teamError);
      return NextResponse.json({ error: teamError.message }, { status: 400 });
    }

    // Collect all members with team leader
    const allMembers = [
      {
        team_id: teamData.id,
        name: leaderName,
        email: leaderEmail,
        requirementLink: requirementLink,
        github_url: github_url,
        member_role: leaderRole,
        is_leader: true,
      },
      ...members.map((member: Members) => ({
        team_id: teamData.id,
        name: member.name,
        email: member.email,
        requirementLink: member.requirementLink,
        github_url: member.github_url,
        member_role: member.member_role,
        is_leader: false,
      })),
    ];

    // --- Upsert members ---
    const { data: membersData, error: membersError } = await supabaseServer
      .from("TeamMember")
      .upsert(allMembers, { onConflict: "email" })
      .select();

    if (membersError) {
      console.error("Failed Update Member:", membersError);
      return NextResponse.json(
        { error: membersError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 201,
      data: { teamData, membersData },
      message: "Team and members updated successfully",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
