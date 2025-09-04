import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/config/supabase";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard/peserta";

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      try {
        await fetch(`${origin}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username:
              data.user.user_metadata?.full_name ||
              data.user.email?.split("@")[0],
            email: data.user.email,
          }),
        });
      } catch (error) {
        console.error("Error saving user data:", error);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
