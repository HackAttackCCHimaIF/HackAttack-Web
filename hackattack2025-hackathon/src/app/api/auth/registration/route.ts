import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server"; // Use server instance

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data: existingUser, error: selectError } = await supabaseServer // Changed here
      .from("Users")
      .select("*")
      .eq("email", body.email)
      .maybeSingle();

    if (selectError && selectError.code !== "PGRST116") {
      console.error("Database error:", selectError);
      return NextResponse.json({ error: selectError.message }, { status: 400 });
    }

    if (existingUser) {
      return NextResponse.json({
        success: true,
        data: existingUser,
        existing: true,
        message: "User already exists, proceeding to dashboard",
      });
    }

    const { data, error } = await supabaseServer // Changed here
      .from("Users")
      .insert([{ email: body.email, username: body.username }])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data,
      created: true,
      message: "New user created successfully",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
