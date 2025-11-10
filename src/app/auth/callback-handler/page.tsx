"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/config/supabase";

export default function CallbackHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth error:", error);
          router.push("/auth/auth-code-error");
          return;
        }

        if (data.session?.user) {
          await fetch("/api/auth/registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username:
                data.session.user.user_metadata?.full_name ||
                data.session.user.email?.split("@")[0],
              email: data.session.user.email,
            }),
          });

          router.push("/dashboard/peserta");
        } else {
          router.push("/auth/auth-code-error");
        }
      } catch (error) {
        console.error("Callback error:", error);
        router.push("/auth/auth-code-error");
      }
    };

    handleAuthCallback();
  }, [router]);

  return <div>Processing authentication...</div>;
}
