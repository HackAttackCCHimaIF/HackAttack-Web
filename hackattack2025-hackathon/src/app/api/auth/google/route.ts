import { NextResponse } from "next/server";
import { supabase } from "@/lib/config/supabase";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();
  const id = uuidv4();

  const { data, error } = await supabase
    .from("Users")
    .insert([{ id, email: body.email, username: body.username }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}
