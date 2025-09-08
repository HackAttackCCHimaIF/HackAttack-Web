"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CompleteRegistrationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const completeRegistration = async () => {
      const username = localStorage.getItem("pending_username");

      if (email && username) {
        try {
          const response = await fetch("/api/auth/registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username }),
          });

          const result = await response.json();

          if (response.ok && result.success) {
            localStorage.removeItem("pending_username");
            router.push("/dashboard/peserta");
          } else {
            console.error("Registration failed:", result.error);
            router.push("/auth/auth-code-error");
          }
        } catch (error) {
          console.error("Error saving user data:", error);
          router.push("/auth/auth-code-error");
        }
      } else {
        router.push("/auth/auth-code-error");
      }
    };

    completeRegistration();
  }, [email, router]);

  return <div>Completing registration...</div>;
}

export default function CompleteRegistration() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteRegistrationContent />
    </Suspense>
  );
}
