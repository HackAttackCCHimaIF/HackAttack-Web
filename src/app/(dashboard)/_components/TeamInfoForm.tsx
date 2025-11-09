"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";
import { supabase } from "@/lib/config/supabase";
import { User } from "@supabase/supabase-js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  ArrowLeft,
  ArrowRight,
  User as UserIcon,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utility/utils";
import { HeaderDashboard } from "./HeaderDashboard";
import { CopyableLink } from "@/components/CopyableLink";

// =====================
// Schema
// =====================
const teamMemberSchema = z.object({
  name: z.string().min(1, "Member name is required"),
  email: z.string().email("Invalid member email"),
  github: z.string().optional(),
  requirementLink: z.string().optional(),
  member_role: z.enum(["Hustler", "Hipster", "Hacker"]),
});

const teamSchema = z.object({
  leaderName: z.string().min(1, "Leader name is required"),
  leaderEmail: z.string().email("Invalid leader email"),
  leaderGithub: z.string().optional(),
  leaderRole: z.enum(["Hustler", "Hipster", "Hacker"]),
  requirementLink: z.string().url().optional(),
  members: z
    .array(teamMemberSchema)
    .min(1, "At least one member required")
    .max(5, "Maximum 5 members allowed"),
  teamName: z.string().min(1, "Team name is required"),
  institution: z.string().min(1, "Institution is required"),
  whatsapp_number: z
    .string()
    .regex(/^62\d{8,13}$/, "Invalid WhatsApp number"),
  paymentproof_url: z.string().url().optional(),
});

type TeamFormValues = z.infer<typeof teamSchema>;

// =====================
// Editable Input
// =====================
const EditableInput = ({
  register,
  name,
  placeholder,
  disabled,
  className = "",
  type = "text",
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => (
  <div className="relative">
    <Input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={`${className} ${disabled ? "opacity-60" : ""}`}
      {...register(name)}
    />
    {!disabled && (
      <Pencil
        size={16}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50"
      />
    )}
  </div>
);

// =====================
// Main Component
// =====================
export default function TeamProfilePage() {
  const [step, setStep] = useState(1);
  const [memberCount, setMemberCount] = useState<number>(2);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    getValues,
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      whatsapp_number: "62",
      members: Array(2).fill({
        name: "",
        email: "",
        github: "",
        requirementLink: "",
        member_role: "Hustler",
      }),
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "members",
  });

  // Auth
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    init();
  }, []);

  const validateLeaderInfo = (values: TeamFormValues) => {
    const { leaderName, leaderEmail, leaderRole, whatsapp_number } = values;
    if (!leaderName || !leaderEmail || !leaderRole || !whatsapp_number) {
      toast.error("Please complete all leader information fields.");
      return false;
    }
    return true;
  };

  const validateMembersInfo = (values: TeamFormValues) => {
    for (let i = 0; i < values.members.length; i++) {
      const member = values.members[i];
      if (!member.name || !member.email || !member.member_role) {
        toast.error(`Please complete all fields for Member ${i + 1}.`);
        return false;
      }
    }
    return true;
  };

  const onSubmit = async (data: TeamFormValues) => {
    // ✅ Final validation before submission
    if (!validateLeaderInfo(data) || !validateMembersInfo(data)) return;

    toast.success("Form submitted successfully!");
    console.log("✅ Submitted data:", data);
  };

  const inputClassName =
    "bg-white/10 text-white placeholder:text-white/50 rounded-full px-5 py-5 border border-white/10 pr-10 w-full";

  const nextStep = () => {
    const currentValues = getValues();

    // ✅ Step 1 validation
    if (step === 1) {
      if (!currentValues.teamName || !currentValues.institution) {
        toast.error("Please fill all required fields before continuing");
        return;
      }
    }

    // ✅ Step 3 validation (leader + members)
    if (step === 3) {
      if (!validateLeaderInfo(currentValues)) return;
      if (!validateMembersInfo(currentValues)) return;
    }

    if (step === 2) {
      replace(
        Array(memberCount)
          .fill(null)
          .map(() => ({
            name: "",
            email: "",
            github: "",
            requirementLink: "",
            member_role: "Hustler",
          }))
      );
    }

    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  if (loading)
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="overflow-y-auto w-full min-h-screen text-white">
      <HeaderDashboard topText="Team" bottomText="Registration" />

      <div className="flex h-full items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-7xl">
          <div className="w-full px-8 py-10">
            {/* Step Indicator */}
            <div className="flex justify-center items-center gap-8 mb-12">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full w-12 h-12 text-lg font-semibold border transition-all duration-300",
                      step === num
                        ? "bg-pink-500/50 border-pink-400/50 text-white scale-110"
                        : step > num
                        ? "bg-pink-500/50 border-pink-400/50 text-white"
                        : "border-white/30 text-white/50"
                    )}
                  >
                    {num}
                  </div>
                  {num !== 4 && (
                    <div
                      className={cn(
                        "h-[2px] w-16 transition-all duration-300",
                        step >= num ? "bg-pink-500/50" : "bg-white/20"
                      )}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-full">
                <CardHeader>
                  <CardTitle className="text-white text-2xl font-semibold">
                    Step 1 — Team Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col gap-y-2">
                    <Label className="text-white text-lg">Team Name</Label>
                    <EditableInput
                      register={register}
                      name="teamName"
                      placeholder="Enter your team name"
                      className={inputClassName}
                    />
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <Label className="text-white text-lg">Institution</Label>
                    <EditableInput
                      register={register}
                      name="institution"
                      placeholder="Enter your institution"
                      className={inputClassName}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* STEP 2 */}
             {step === 2 && ( 
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-full"> 
                <CardHeader> 
                  <CardTitle className="text-white text-2xl font-semibold"> Step 2 — Team Members Count </CardTitle>
                  </CardHeader> 
                  <CardContent className="space-y-6"> <div className="flex flex-col gap-y-2"> 
                    <Label className="text-white text-lg"> Select Total Members </Label> 
                    <Select onValueChange={(val) => setMemberCount(Number(val))} value={memberCount.toString()} > 
                      <SelectTrigger className="bg-white/10 text-white placeholder:text-white/50 rounded-full py-5 px-5 border border-white/10 w-full"> 
                      <SelectValue placeholder="Select number of members" /> </SelectTrigger> <SelectContent className="bg-[#1A1C1E] text-white border border-white/20 rounded-lg shadow-xl"> {[2, 3, 4, 5].map((num) => ( 
                        <SelectItem key={num} value={num.toString()} className="hover:bg-pink-500/30 cursor-pointer" > 
                          {num} Members 
                        </SelectItem> ))} 
                        </SelectContent> 
                        </Select> 
                      </div> 
                    </CardContent> 
                </Card> 
              )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-8 w-full">
                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white text-xl">
                      <UserIcon className="size-6 text-pink-500/50" />
                      Leader Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3">
                    <EditableInput
                      register={register}
                      name="leaderName"
                      placeholder="Leader name"
                      className={inputClassName}
                    />
                    <EditableInput
                      register={register}
                      name="leaderEmail"
                      placeholder="Leader email"
                      className={inputClassName}
                    />
                    <Controller
                      name="leaderRole"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <SelectTrigger className="bg-white/10 text-white placeholder:text-white/50 rounded-full py-5 px-5 border border-white/10 w-full">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1C1E] text-white border border-white/20 rounded-lg shadow-xl">
                            <SelectItem
                              value="Hustler"
                              className="hover:bg-pink-500/30 cursor-pointer"
                            >
                              Hustler
                            </SelectItem>
                            <SelectItem
                              value="Hipster"
                              className="hover:bg-pink-500/30 cursor-pointer"
                            >
                              Hipster
                            </SelectItem>
                            <SelectItem
                              value="Hacker"
                              className="hover:bg-pink-500/30 cursor-pointer"
                            >
                              Hacker
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <EditableInput
                      register={register}
                      name="whatsapp_number"
                      placeholder="62812345678"
                      type="tel"
                      className={inputClassName}
                    />
                  </CardContent>
                </Card>

                {/* Members */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {fields.map((member, index) => (
                    <Card
                      key={member.id}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-full"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg text-white">
                          <Users className="size-5 text-pink-500/50 mr-2 inline" />
                          Member {index + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <EditableInput
                          register={register}
                          name={`members.${index}.name`}
                          placeholder="Member name"
                          className={inputClassName}
                        />
                        <EditableInput
                          register={register}
                          name={`members.${index}.email`}
                          placeholder="Member email"
                          className={inputClassName}
                        />
                        <Controller
                          name={`members.${index}.member_role`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || ""}
                            >
                              <SelectTrigger className="bg-white/10 text-white placeholder:text-white/50 rounded-full py-5 px-5 border border-white/10 w-full">
                                <SelectValue placeholder="Select Role" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1A1C1E] text-white border border-white/20 rounded-lg shadow-xl">
                                <SelectItem
                                  value="Hustler"
                                  className="hover:bg-pink-500/30 cursor-pointer"
                                >
                                  Hustler
                                </SelectItem>
                                <SelectItem
                                  value="Hipster"
                                  className="hover:bg-pink-500/30 cursor-pointer"
                                >
                                  Hipster
                                </SelectItem>
                                <SelectItem
                                  value="Hacker"
                                  className="hover:bg-pink-500/30 cursor-pointer"
                                >
                                  Hacker
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-full">
                <CardHeader>
                  <CardTitle className="text-white text-2xl font-semibold">
                    Step 4 — Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row gap-3">
                  <div className="text-center w-fit">
                    <Image
                      src="/qris.jpg"
                      width={320}
                      height={320}
                      alt="QR Payment"
                      className="mx-auto rounded-lg"
                    />
                  </div>

                  <div className="w-3/4 flex flex-col gap-3">
                    <p className="text-4xl font-bold text-white">Rp150.000</p>
                    <EditableInput
                      register={register}
                      name="paymentproof_url"
                      placeholder="https://drive.google.com/..."
                      className={inputClassName}
                    />
                    <CopyableLink
                      customLabel={
                        <div>
                          <span className="text-white">
                            BCA ( GISELA SESARIA KUSTHIKA PUTRI )
                          </span>
                        </div>
                      }
                      text="7285451698"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 w-full">
              {step > 1 ? (
                <Button
                  type="button"
                  onClick={prevStep}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full !px-8 !py-6 backdrop-blur-sm"
                >
                  <ArrowLeft className="" /> Back
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-pink-500/50 hover:bg-pink-600/50 duration-200 transition-all text-white rounded-full !px-8 !py-6"
                >
                  Next <ArrowRight className="" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-green-500/50 hover:bg-green-600/50 text-white rounded-full px-8 py-6"
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
