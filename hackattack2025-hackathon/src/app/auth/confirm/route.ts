import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/config/supabase";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: type as any,
    });

    if (!error && data.user) {
      return NextResponse.redirect(
        `${origin}/auth/complete-registration?email=${encodeURIComponent(
          data.user.email || ""
        )}`
      );
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
