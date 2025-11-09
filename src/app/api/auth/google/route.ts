import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";

export async function POST(req: Request) {
  const { email, username } = await req.json();

  const { data, error } = await supabaseServer
    .from("Users")
    .upsert(
      { email: email, username: username },
      { onConflict: "email", ignoreDuplicates: true }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}
