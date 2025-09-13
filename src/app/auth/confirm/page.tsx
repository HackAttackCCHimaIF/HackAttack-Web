"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/config/supabase";
import { useUserStore } from "@/lib/stores/userStore";
import { Suspense } from "react";

function AuthConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUserStore();

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  useEffect(() => {
    const handleAuthConfirm = async () => {
      try {
        console.log("🔥 Auth confirm started", { token_hash, type });

        if (token_hash && type) {
          // Verify the OTP token
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: type as any,
          });

          console.log("🔥 OTP verification result:", {
            data: !!data.session,
            error,
          });

          if (error) {
            console.error("🔥 OTP verification error:", error);
            router.push("/auth/auth-code-error");
            return;
          }

          if (data.session?.user) {
            const user = data.session.user;
            console.log("🔥 User verified:", user.email);

            // Update user store
            setUser(user);

            // Check if this is registration or login
            const pendingUsername = localStorage.getItem("pending_username");

            if (pendingUsername) {
              console.log("🔥 Registration flow - completing registration");
              // This is a registration - complete it
              router.push(
                `/auth/complete-registration?email=${encodeURIComponent(
                  user.email || ""
                )}`
              );
            } else {
              console.log("🔥 Login flow - going to dashboard");
              // This is a login - go to dashboard
              router.push("/dashboard/peserta");
            }
          } else {
            console.log("🔥 No session after OTP verification");
            router.push("/auth/auth-code-error");
          }
        } else {
          console.log("🔥 Missing token_hash or type");
          // Try to get existing session
          const { data, error } = await supabase.auth.getSession();

          if (error) {
            console.error("🔥 Session error:", error);
            router.push("/auth/auth-code-error");
            return;
          }

          if (data.session?.user) {
            console.log("🔥 Found existing session");
            setUser(data.session.user);
            router.push("/dashboard/peserta");
          } else {
            console.log("🔥 No session found");
            router.push("/auth/auth-code-error");
          }
        }
      } catch (error) {
        console.error("🔥 Auth confirmation error:", error);
        router.push("/auth/auth-code-error");
      }
    };

    handleAuthConfirm();
  }, [router, token_hash, type, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p>Confirming your email...</p>
      </div>
    </div>
  );
}

export default function AuthConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <AuthConfirmContent />
    </Suspense>
  );
}
