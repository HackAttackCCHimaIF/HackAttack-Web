"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CompleteRegistration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const Login = async () => {
      if (email) {
        try {
          await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
              email,
            }),
          });
          router.push("/dashboard/peserta");
        } catch (error) {
          console.error("Error saving user data:", error);
          router.push("/auth/auth-code-error");
        }
      } else {
        router.push("/auth/auth-code-error");
      }
    };

    Login();
  }, [email, router]);

  return <div>Completing registration...</div>;
}
