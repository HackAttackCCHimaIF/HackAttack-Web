"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/config/supabase";

export default function AuthConfirmPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthConfirm = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        console.log("🔥 Auth confirm - session data:", {
          data: !!data.session,
          error,
        });

        if (error) {
          console.error("🔥 Auth confirmation error:", error);
          router.push("/auth/auth-code-error");
          return;
        }

        if (data.session?.user) {
          const user = data.session.user;
          console.log("🔥 User confirmed:", user.email);

          const pendingUsername = localStorage.getItem("pending_username");

          if (pendingUsername) {
            router.push(
              `/auth/complete-registration?email=${encodeURIComponent(
                user.email || ""
              )}`
            );
          } else {
            router.push("/dashboard/peserta");
          }
        } else {
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1)
          );
          const accessToken = hashParams.get("access_token");

          if (accessToken) {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            router.push("/auth/auth-code-error");
          }
        }
      } catch {
        router.push("/auth/auth-code-error");
      }
    };

    handleAuthConfirm();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p>Confirming your email...</p>
      </div>
    </div>
  );
}
