import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";

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

    const { data: notifications, error: notificationError } =
      await supabaseServer
        .from("Notification")
        .select("*")
        .eq("user_id", userData.id)
        .order("created_at", { ascending: false });

    if (notificationError) {
      console.error("Database error:", notificationError);
      return NextResponse.json(
        { error: notificationError.message },
        { status: 400 }
      );
    }

    const mappedNotifications =
      notifications?.map((notification) => ({
        ...notification,
        read: notification.is_read,
      })) || [];

    return NextResponse.json({
      success: true,
      data: mappedNotifications,
      count: mappedNotifications.length,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
