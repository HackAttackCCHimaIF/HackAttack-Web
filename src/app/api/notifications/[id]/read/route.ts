import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { userEmail } = body;

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

    const { data, error } = await supabaseServer
      .from("Notification")
      .update({
        is_read: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", userData.id)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json(
        { error: "Notification not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Notification marked as read",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
