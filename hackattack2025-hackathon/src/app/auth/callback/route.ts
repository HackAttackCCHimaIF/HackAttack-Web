import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/config/supabase";

export async function GET(request: NextRequest) {
  console.log("🔥 CALLBACK ROUTE HIT");
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard/peserta";
  
  console.log("🔥 CODE:", code);
  console.log("🔥 SEARCH PARAMS:", Object.fromEntries(searchParams));

  if (code) {
    // Authorization code flow
    console.log("🔥 CODE FOUND, EXCHANGING");
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    console.log("🔥 EXCHANGE RESULT:", { data: !!data.user, error });

    if (!error && data.user) {
      try {
        console.log("🔥 CALLING /api/auth/registration");
        await fetch(`${origin}/api/auth/registration`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.user.user_metadata?.full_name || data.user.email?.split("@")[0],
            email: data.user.email,
          }),
        });
        console.log("🔥 API CALL COMPLETED");
      } catch (error) {
        console.error("🔥 ERROR:", error);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  } else {
    // Check if this is implicit flow (tokens in hash)
    // For implicit flow, we need to handle this client-side
    console.log("🔥 NO CODE FOUND - CHECKING FOR IMPLICIT FLOW");
    
    // Return a page that handles hash fragments
    return NextResponse.redirect(`${origin}/auth/callback-handler`);
  }

  console.log("🔥 REDIRECTING TO ERROR PAGE");
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
