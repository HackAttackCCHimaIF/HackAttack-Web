import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { userEmail } = body;

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    // Get user ID from email
    const { data: userData, error: userError } = await supabaseServer
      .from("Users")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Mark all unread notifications as read for the user
    const { data, error } = await supabaseServer
      .from("Notification")
      .update({
        is_read: true,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userData.id)
      .eq("is_read", false)
      .select();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data,
      count: data?.length || 0,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
