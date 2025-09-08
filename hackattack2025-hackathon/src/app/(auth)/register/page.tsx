"use client";

import { useState } from "react";
import { supabase } from "@/lib/config/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function RegisterPage() {
  const iconList = ["hima", "telkom", "cci", "hack"];

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) toast.error(error.message);
  };

  const handleRegister = async () => {
    setLoading(true);

    localStorage.setItem("pending_username", username);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/peserta`,
      },
    });

    if (error) {
      toast.error(error.message);
      localStorage.removeItem("pending_username");
    } else {
      toast.success("Check your email for the verification link!");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-3/5 flex flex-col justify-center items-center bg-white p-6 relative">
        <div className="absolute top-6 left-6">
          <div className="flex pb-3 flex-row gap-3">
            <Image
              src="/navbar/Icon.svg"
              alt="Site Logo"
              width={156}
              height={27}
              priority
              className="object-contain w-[100px] sm:w-[130px] lg:w-[156px]"
            />
            <div className="flex items-center gap-3">
              {iconList.map((icon) => (
                <div
                  key={icon}
                  className="flex items-center justify-center"
                  style={{ width: 26, height: 26 }}
                >
                  <Image
                    src={`/icons/${icon}.svg`}
                    alt={`${icon} icon`}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" asChild className="rounded-full">
            <Link href="/">
              <ArrowLeftCircle /> Back
            </Link>
          </Button>
        </div>

        <Card className="w-full max-w-md border shadow-xl rounded-4xl">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-semibold py-6">
              Register
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 ">
            <div className="flex flex-col gap-2">
              <Label>Username</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your Username"
                className="rounded-lg py-6 px-4 bg-[#DBE5F2]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email Address</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="rounded-lg py-6 px-4 bg-[#DBE5F2]"
              />
            </div>

            <p className="text-sm text-start text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-[#E11C1C] hover:underline">
                Login
              </Link>
            </p>

            <div className="flex flex-col gap-2">
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full flex items-center gap-2 rounded-full py-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285f4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34a853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#fbbc05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#ea4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Masuk dengan Google</span>
              </Button>
            </div>

            <div className="w-full flex items-center justify-end">
              <Button
                onClick={handleRegister}
                disabled={loading}
                className=" bg-[#4C82CB] hover:bg-[#4C82CB]/90 text-white z-10"
              >
                {loading ? "Processing..." : "Register"}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Image
          src="/auth/wayang.png"
          alt="Garuda"
          width={382}
          height={180}
          className="absolute m-auto max-w-[242px] object-contain bottom-0 right-0 opacity-100 hidden lg:block"
          priority
        />
        <Image
          src="/auth/wayang1.png"
          alt="Garuda"
          width={382}
          height={180}
          className="absolute m-auto max-w-[192px] object-contain bottom-0 left-0 opacity-100 hidden lg:block"
          priority
        />
      </div>

      <div className="hidden lg:flex w-2/5 text-white relative justify-center items-center overflow-hidden bg-black">
        {/* Bayangan Garuda di tengah */}
        <Image
          src="/auth/garuda.png"
          alt="Garuda"
          width={1000}
          height={1000}
          className="absolute inset-0 m-auto w-[90%] max-w-xl object-contain opacity-100 z-10"
          priority
        />

        <Image
          src="/auth/merah1.png"
          alt="Garuda"
          width={1000}
          height={1000}
          className="absolute bottom-1/2 max-w-3xl object-contain opacity-100 z-0"
          priority
        />

        <Image
          src="/auth/merah1.png"
          alt="Garuda"
          width={1000}
          height={1000}
          className="absolute bottom-0 max-w-3xl object-contain opacity-100 z-0"
          priority
        />

        <Image
          src="/auth/merah1.png"
          alt="Garuda"
          width={1000}
          height={1000}
          className="absolute top-1/2 right-0 max-w-3xl object-contain opacity-100 z-0"
          priority
        />

        <Image
          src="/auth/merah1.png"
          alt="Garuda"
          width={1000}
          height={1000}
          className="absolute bottom-1/2 -right-1/2 max-w-3xl object-contain opacity-100 z-0"
          priority
        />

        {/* Bendera kiri atas */}
        <Image
          src="/auth/benderaatas.png"
          alt="Bendera Atas"
          width={1000}
          height={1000}
          className="absolute top-0 left-0 lg:w-[180px] z-20"
        />

        <Image
          src="/auth/angin2.png"
          alt="Garuda"
          width={1200}
          height={1200}
          className="absolute inset-0 m-auto w-[100%] max-w-3xl object-contain opacity-100 z-0"
          priority
        />

         <Image
          src="/auth/merah.png"
          alt="Garuda"
          width={1200}
          height={1200}
          className="absolute top-0 left-0 lg:w-[240px] z-0"
          priority
        />

        {/* Bendera bawah kanan */}
        <Image
          src="/auth/benderabawah.png"
          alt="Bendera Bawah"
          width={1000}
          height={1000}
          className="absolute bottom-0 right-0 lg:w-[160px] z-10"
        />

        {/* Candi di bawah (tengah) */}
        <Image
          src="/auth/candi.png"
          alt="Candi"
          width={1000}
          height={1000}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 object-contain"
        />

        {/* Kepala Garuda kanan atas */}
        <Image
          src="/auth/kepalagaruda.png"
          alt="Kepala Garuda"
          width={1000}
          height={1000}
          className="absolute top-0 right-0 lg:w-[240px]"
        />

        {/* Overlay Content */}
        <div className="relative z-10 text-center">
          <Image
            src="/navbar/Icon.svg"
            alt="Site Logo"
            width={156}
            height={27}
            priority
            className="object-contain inset-0 top-1/2 left-1/2 lg:w-[90%]"
          />
          <div className="pt-6" />
        </div>
      </div>
    </div>
  );
}
