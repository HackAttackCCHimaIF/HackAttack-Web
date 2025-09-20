import { supabase } from "@/lib/config/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, institution, workshop, whatsapp, payment_proof } = body;

    if (!name || !email || !institution || !workshop || !whatsapp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("registrations")
      .insert([{ name, email, institution, workshop, whatsapp, payment_proof }])
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}