import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/config/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard/peserta";

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("🔥 EXCHANGE RESULT:", { data: !!data.user, error });

    if (!error && data.user) {
      try {
        await fetch(`/api/auth/registration`, {
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
        console.error("ERROR:", error);
      }

      return NextResponse.redirect(`${next}`);
    }
  } else {
    return NextResponse.redirect(`/auth/callback-handler`);
  }

  console.log("🔥 REDIRECTING TO ERROR PAGE");
  return NextResponse.redirect(`/auth/auth-code-error`);
}
