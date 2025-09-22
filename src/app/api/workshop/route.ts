import { supabase } from "@/lib/config/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Variabel ini datang dari frontend (form)
    const { name, email, institution, workshop, whatsapp, payment_proof } = body;

    // Validasi input disesuaikan, payment_proof sekarang wajib
    if (!name || !email || !institution || !workshop || !whatsapp || !payment_proof) {
      return NextResponse.json(
        { error: "Semua field wajib diisi, termasuk bukti pembayaran." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("registrations")
      // Penyesuaian utama ada di sini:
      .insert([
        {
          full_name: name, // Kolom 'full_name' di DB diisi dengan variabel 'name'
          email: email,
          institution: institution,
          workshop: workshop,
          whatsapp_number: whatsapp, // Kolom 'whatsapp_number' di DB diisi dengan variabel 'whatsapp'
          payment_proof_link: payment_proof, // Kolom 'payment_proof_link' di DB diisi dengan variabel 'payment_proof'
          // Kolom 'status' tidak perlu dikirim, karena DB akan otomatis mengisinya dengan 'pending'
        },
      ])
      .select("*")
      .single();

    // Jika ada error dari Supabase (misal: email duplikat, link tidak valid)
    if (error) throw error;

    return NextResponse.json({ success: true, data });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Memberikan pesan error yang lebih spesifik jika ada
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}