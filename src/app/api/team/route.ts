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
      leaderRole,
      whatsapp_number,
      members,
      paymentproof_url,
      github_url,
    } = body;

    // Validate required fields
    if (
      !leaderEmail ||
      !teamName ||
      !institution ||
      !leaderName ||
      !whatsapp_number
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate member count
    if (!members || members.length === 0 || members.length > 5) {
      return NextResponse.json(
        { error: "Team must have between 1 and 5 members" },
        { status: 400 }
      );
    }

    // Check if leaderEmail exists in Users table
    // eslint-disable-next-line prefer-const
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
        })
        .select()
        .single();

      if (usersError) {
        console.error("Failed to create user:", usersError);
        return NextResponse.json(
          { error: "Failed to create user: " + usersError.message },
          { status: 400 }
        );
      }
      userData = users;
    }

    // Use transaction for atomic team + member operations
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
      console.error("Failed to create team:", teamError);
      return NextResponse.json(
        { error: "Failed to create team: " + teamError.message },
        { status: 400 }
      );
    }

    // Collect all members with team leader
    const allMembers = [
      {
        team_id: teamData.id,
        name: leaderName,
        email: leaderEmail,
        requirementLink: requirementLink || "",
        github_url: github_url || "",
        member_role: leaderRole || "Hustler",
        is_leader: true,
      },
      ...members.map((member: Members) => ({
        team_id: teamData.id,
        name: member.name || "",
        email: member.email || "",
        requirementLink: member.requirementLink || "",
        github_url: member.github_url || "",
        member_role: member.member_role || "Hustler",
        is_leader: false,
      })),
    ];

    // Validate all member emails are provided
    const invalidMembers = allMembers.filter((m) => !m.email);
    if (invalidMembers.length > 0) {
      return NextResponse.json(
        { error: "All team members must have an email address" },
        { status: 400 }
      );
    }

    // Upsert all members with proper conflict handling
    const { data: membersData, error: membersError } = await supabaseServer
      .from("TeamMember")
      .upsert(allMembers, { onConflict: "email" });

    if (membersError) {
      console.error("Failed to create members:", membersError);

      // Attempt to cleanup the team if member creation failed
      await supabaseServer.from("Team").delete().eq("id", teamData.id);

      return NextResponse.json(
        { error: "Failed to create team members: " + membersError.message },
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
      leaderRole,
      github_url,
      whatsapp_number,
      members,
      paymentproof_url,
    } = body;

    // Validate required fields
    if (
      !leaderEmail ||
      !teamName ||
      !institution ||
      !leaderName ||
      !whatsapp_number
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate member count
    if (!members || members.length === 0 || members.length > 5) {
      return NextResponse.json(
        { error: "Team must have between 1 and 5 members" },
        { status: 400 }
      );
    }

    // Check if leaderEmail exists in Users table
    // eslint-disable-next-line prefer-const
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
        console.error("Failed to update user:", usersError);
        return NextResponse.json(
          { error: "Failed to update user: " + usersError.message },
          { status: 400 }
        );
      }
      userData = users;
    }

    // First get existing team to ensure we have the team ID
    const { data: existingTeam, error: existingTeamError } =
      await supabaseServer
        .from("Team")
        .select("id")
        .eq("created_by", userData?.id)
        .single();

    if (existingTeamError && existingTeamError.code !== "PGRST116") {
      console.error("Failed to find existing team:", existingTeamError);
      return NextResponse.json(
        { error: "Failed to find team: " + existingTeamError.message },
        { status: 400 }
      );
    }

    if (!existingTeam) {
      return NextResponse.json(
        { error: "Team not found for update" },
        { status: 404 }
      );
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
      .eq("id", existingTeam.id)
      .select()
      .single();

    if (teamError) {
      console.error("Failed to update team:", teamError);
      return NextResponse.json(
        { error: "Failed to update team: " + teamError.message },
        { status: 400 }
      );
    }

    // Delete existing members first to handle member removals
    const { error: deleteError } = await supabaseServer
      .from("TeamMember")
      .delete()
      .eq("team_id", teamData.id);

    if (deleteError) {
      console.error("Failed to delete existing members:", deleteError);
      return NextResponse.json(
        { error: "Failed to cleanup existing members: " + deleteError.message },
        { status: 400 }
      );
    }

    // Collect all members with team leader
    const allMembers = [
      {
        team_id: teamData.id,
        name: leaderName,
        email: leaderEmail,
        requirementLink: requirementLink || "",
        github_url: github_url || "",
        member_role: leaderRole || "Hustler",
        is_leader: true,
      },
      ...members.map((member: Members) => ({
        team_id: teamData.id,
        name: member.name || "",
        email: member.email || "",
        requirementLink: member.requirementLink || "",
        github_url: member.github_url || "",
        member_role: member.member_role || "Hustler",
        is_leader: false,
      })),
    ];

    // Validate all member emails are provided
    const invalidMembers = allMembers.filter((m) => !m.email);
    if (invalidMembers.length > 0) {
      return NextResponse.json(
        { error: "All team members must have an email address" },
        { status: 400 }
      );
    }

    // Insert all new members
    const { data: membersData, error: membersError } = await supabaseServer
      .from("TeamMember")
      .insert(allMembers);

    if (membersError) {
      console.error("Failed to create members:", membersError);

      return NextResponse.json(
        { error: "Failed to create team members: " + membersError.message },
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
