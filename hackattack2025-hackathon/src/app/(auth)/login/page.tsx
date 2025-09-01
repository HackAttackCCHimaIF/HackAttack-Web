"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftCircle, Github } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const iconList = ["hima", "telkom", "cci", "hack"];

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-6 relative">
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
            <Link href="/"><ArrowLeftCircle/> Back</Link>
          </Button>
        </div>

        <Card className="w-full max-w-md border shadow-xl rounded-4xl">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-semibold py-6">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 ">
            <div className="flex flex-col gap-2">
                <Label>Username</Label>
              <Input placeholder="Enter your Username" className="rounded-lg py-6 px-4 bg-[#DBE5F2]"/>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Email Address</Label>
              <Input placeholder="Enter your Email" className="rounded-lg py-6 px-4 bg-[#DBE5F2]"/>
            </div>

            <p className="text-sm text-start text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-[#E11C1C] hover:underline">
                Login
              </Link>
            </p>

            <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full flex items-center gap-2 rounded-full py-6">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                <span>Masuk dengan Google</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2 rounded-full py-6">
                    <Github size={20} className="text-gray-700 group-hover:text-gray-900" />
                    <span>Lanjut dengan GitHub</span>
                </Button>
            </div>

            <div className="w-full flex items-center justify-end">
                <Button className=" bg-[#4C82CB] hover:bg-[#4C82CB]/90 text-white">Login</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:flex w-1/2 bg-black text-white relative flex-col justify-center items-center">
        <div className="absolute inset-0">
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-6">
          <h1 className="text-4xl font-bold">HackAttack 2025</h1>
          <p className="text-lg">Register / Login</p>
        </div>
      </div>
    </div>
  );
}
