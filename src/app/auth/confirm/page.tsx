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
        if (token_hash && type) {
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: type as any,
          });

          if (error) {
            router.push("/auth/auth-code-error");
            return;
          }

          if (data.session?.user) {
            const user = data.session.user;

            const username = localStorage.getItem("username");
            const email = localStorage.getItem("email");

            if (!email || !username) {
              router.push("/auth/auth-code-error");
              return;
            }

            setUser(user);

            if (email && username) {
              router.push(
                `/auth/complete-registration?email=${encodeURIComponent(email)}`
              );
            } else {
              router.push("/dashboard/peserta");
            }
          } else {
            router.push("/auth/auth-code-error");
          }
        }
      } catch {
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
