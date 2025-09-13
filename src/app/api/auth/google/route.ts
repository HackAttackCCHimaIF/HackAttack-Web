import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseServer
    .from("Users")
    .insert([{ email: body.email, username: body.username }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}
