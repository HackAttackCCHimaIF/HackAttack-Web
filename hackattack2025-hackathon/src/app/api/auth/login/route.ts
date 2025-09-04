import { NextResponse } from "next/server";
import { supabase } from "@/lib/config/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  const { data: existingUser, error } = await supabase
    .from("Users")
    .select("*")
    .eq("email", body.email)
    .single();

  if (existingUser) {
    return NextResponse.json({
      success: true,
      data: existingUser,
      existing: true,
    });
  } else {
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
