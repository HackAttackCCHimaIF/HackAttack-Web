"use client";

import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";
import { supabase } from "@/lib/config/supabase";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  User as UserIcon,
  Users,
  InfoIcon,
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
import { TeamMember } from "@/types/team";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Team from "@/lib/types/team";
import { Members } from "@/lib/types/teamMember";
import { EditableInput } from "./EditableInput";

// =====================
// Schema
// =====================
const teamMemberSchema = z.object({
  name: z.string(),
  email: z.email("Invalid email").nonempty("Email is required"),
  member_role: z.enum(["Hustler", "Hipster", "Hacker"]).optional(),
  requirementLink: z.url("URL berkas persyaratan wajib diisi"),
  github_url: z.url("URL GitHub tidak valid"),
}) satisfies z.ZodType<TeamMember>;

// Separate schema for member data only
const teamDataSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  institution: z.string().min(1, "Institution is required"),
  leaderName: z.string().min(1, "Nama Ketua wajib diisi"),
  leaderRole: z.enum(["Hustler", "Hipster", "Hacker"]).optional(),
  whatsapp_number: z.string().regex(/^62\d{8,13}$/, "Invalid WhatsApp number"),
  requirementLink: z.url("URL berkas persyaratan wajib diisi"),
  github_url: z.url("URL GitHub tidak valid"),
  members: z
    .array(teamMemberSchema)
    .min(1, "At least one member required")
    .max(5, "Maximum 5 members allowed"),
  paymentproof_url: z.url(),
});

type TeamFormValues = z.infer<typeof teamDataSchema>;

// =====================
// Main Component
// =====================
export default function TeamProfilePage() {
  const [step, setStep] = useState(1);
  const [memberCount, setMemberCount] = useState<number>(2);
  const [, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [institutionPrice, setInstitutionPrice] = useState<string | null>(null);
  const [, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setSubmittedData] = useState<TeamFormValues | null>(null);
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [teamMembers, setTeamMembers] = useState<Members[]>([]);
  const [editRejected, setEditRejected] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamDataSchema),
    defaultValues: {
      whatsapp_number: "62",
      members: Array(2).fill({
        name: "",
        email: "",
        requirementLink: "",
        member_role: null,
        github_url: "",
      }),
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "members",
  });

  // Auth and team data fetch
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const init = async (attempt = 1) => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);

        // Fetch team data if user is authenticated
        if (session?.user?.email) {
          try {
            // Add cache-busting parameter to prevent stale data
            const cacheBuster = Date.now();
            const response = await fetch(
              `/api/team?userEmail=${encodeURIComponent(
                session.user.email
              )}&_=${cacheBuster}`,
              {
                signal: abortController.signal,
                headers: {
                  "Cache-Control": "no-cache, no-store, must-revalidate",
                  Pragma: "no-cache",
                },
              }
            );

            if (!isMounted) return;

            if (response.ok) {
              const result = await response.json();
              if (result.data?.teamData) {
                setTeamData(result.data.teamData);
                setTeamMembers(result.data.membersData || []);

                // If the team already submitted, set as submitted
                if (
                  result.data.teamData.approvalstatus &&
                  ["Approved", "Rejected", "Submitted", "Resubmitted"].includes(
                    result.data.teamData.approvalstatus
                  )
                ) {
                  setIsSubmitted(true);
                } else {
                  setIsSubmitted(false);
                }
              } else {
                // No team data found, ensure we're in edit mode
                setIsSubmitted(false);
              }
            } else {
              console.error("Failed to fetch team data:", response.status);

              // Retry logic for transient failures
              if (attempt < 3 && isMounted) {
                setTimeout(() => init(attempt + 1), 1000 * attempt);
                return;
              }
            }
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
              console.log("Fetch aborted");
            } else {
              console.error("Error fetching team data:", error);

              // Retry logic for transient failures
              if (attempt < 3 && isMounted) {
                setTimeout(() => init(attempt + 1), 1000 * attempt);
                return;
              }
            }
          }
        }
      } catch (error) {
        console.error("Error in init function:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [setIsSubmitted]);

  // // Verify that data was actually saved to database
  // const verifyDataSaved = async (
  //   leaderEmail: string,
  //   submittedData: TeamFormValues
  // ): Promise<boolean> => {
  //   try {
  //     // Wait a moment for database to commit
  //     await new Promise((resolve) => setTimeout(resolve, 1500));

  //     const response = await fetch(
  //       `/api/team?userEmail=${encodeURIComponent(leaderEmail)}}`
  //     );

  //     if (!response.ok) {
  //       console.error("Verification fetch failed:", response.status);
  //       return false;
  //     }

  //     const result = await response.json();

  //     // Check if team data exists
  //     if (!result.data?.teamData) {
  //       console.error("No team data found in verification response");
  //       return false;
  //     }

  //     const savedTeam = result.data.teamData;
  //     const savedMembers = result.data.membersData || [];

  //     console.log("Verification debug - Submitted:", {
  //       teamName: submittedData.teamName,
  //       memberCount: submittedData.members.length,
  //     });

  //     console.log("Verification debug - Saved:", {
  //       teamName: savedTeam.team_name,
  //       memberCount: savedMembers.length,
  //       savedTeam: savedTeam,
  //       savedMembers: savedMembers,
  //     });

  //     // More lenient verification - check if we have any team data at all
  //     const hasTeamData = !!savedTeam && !!savedTeam.team_name;
  //     const hasMembers = savedMembers.length > 0;

  //     // If we have team data and at least some members, consider it successful
  //     return hasTeamData && hasMembers;
  //   } catch (error) {
  //     console.error("Data verification failed:", error);
  //     return false;
  //   }
  // };

  const refreshTeamData = async (leaderEmail: string, attempt = 1) => {
    try {
      // Add cache-busting parameter to prevent stale data
      const cacheBuster = Date.now();
      const response = await fetch(
        `/api/team?userEmail=${encodeURIComponent(
          leaderEmail
        )}&_=${cacheBuster}`,
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        if (result.data?.teamData) {
          setTeamData(result.data.teamData);
          setTeamMembers(result.data.membersData || []);
          setEditRejected(false);

          // Update isSubmitted state based on approval status
          if (
            result.data.teamData.approvalstatus &&
            ["Approved", "Rejected", "Submitted", "Resubmitted"].includes(
              result.data.teamData.approvalstatus
            )
          ) {
            setIsSubmitted(true);
          } else {
            setIsSubmitted(false);
          }
        }
      }
    } catch (error) {
      console.error("Error refreshing team data:", error);

      // Retry logic for refresh
      if (attempt < 2) {
        setTimeout(() => refreshTeamData(leaderEmail, attempt + 1), 1000);
      }
    }
  };

  const handleRejectionClick = () => {
    setIsSubmitting(false);

    if (teamData && teamMembers.length > 0) {
      const leader = teamMembers.find((member) => member.is_leader);
      const regularMembers = teamMembers.filter((member) => !member.is_leader);

      const formData = {
        teamName: teamData.team_name || "",
        institution: teamData.institution || "",
        leaderName: leader?.name || "",
        leaderRole: leader?.member_role || undefined,
        whatsapp_number: teamData.whatsapp_number?.toString() || "62",
        requirementLink: leader?.requirementLink || "",
        paymentproof_url: teamData.paymentproof_url || undefined,
      };

      reset(formData);

      replace(
        regularMembers.map((member) => ({
          name: member.name || "",
          email: member.email || "",
          requirementLink: member.requirementLink || "",
          member_role: member.member_role || undefined,
          github_url: member.github_url,
        }))
      );

      setMemberCount(regularMembers.length);

      // Set institution price based on institution name
      const price = teamData.institution?.toLowerCase().includes("telkom")
        ? "Rp 200.000"
        : "Rp 220.000";
      setInstitutionPrice(price);
    }

    setEditRejected(true);
  };

  const onSubmitRejected = async () => {
    setIsSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const leaderEmail = user?.email;
    if (!leaderEmail) {
      toast.error("User not authenticated.");
      setIsSubmitting(false);

      return;
    }

    const paymentProof = getValues("paymentproof_url");

    if (!paymentProof) {
      toast.error("Please upload payment proof.");
      setIsSubmitting(false);

      return;
    }

    const currentValues = getValues();

    try {
      const submitData = await fetch("/api/team", {
        method: "PUT",
        body: JSON.stringify({ leaderEmail, ...currentValues }),
      });

      if (!submitData.ok) {
        throw new Error("Failed to submit form");
      }

      const res = await submitData.json();
      if (res.error) {
        toast.error(res.error);
        return;
      }

      // Check if the response indicates success
      if (res.status !== 201 && res.status !== 200) {
        toast.error("Submission failed: " + (res.message || "Unknown error"));
        return;
      }
      toast.success("Form resubmitted successfully!");
      setSubmittedData(currentValues);
      setIsSubmitted(true);

      await refreshTeamData(leaderEmail);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const leaderEmail = user?.email;
    if (!leaderEmail) {
      toast.error("User not authenticated.");
      setIsSubmitting(false);
      return;
    }

    const paymentProof = getValues("paymentproof_url");

    if (!paymentProof) {
      toast.error("Please upload payment proof.");
      setIsSubmitting(false);
      return;
    }

    const currentValues = getValues();

    try {
      const submitData = await fetch("/api/team", {
        method: "POST",
        body: JSON.stringify({ leaderEmail, ...currentValues }),
      });

      if (!submitData.ok) {
        throw new Error("Failed to submit form");
      }

      const res = await submitData.json();

      if (res.error) {
        toast.error(res.error);
        return;
      }

      // // Verify data was actually saved to database
      // const verificationSuccess = await verifyDataSaved(
      //   leaderEmail,
      //   currentValues
      // );

      // if (!verificationSuccess) {
      //   toast.error("Failed to verify data save. Please check your team data.");
      //   setIsSubmitting(false);
      //   return;
      // }

      toast.success("Form submitted successfully!");
      setSubmittedData(currentValues);
      setIsSubmitted(true);

      await refreshTeamData(leaderEmail);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "bg-white/10 text-white placeholder:text-white/50 rounded-full px-5 py-5 border border-white/10 pr-10 w-full";

  const nextStep = async () => {
    let fieldsToValidate: (keyof TeamFormValues)[] = [];

    if (step === 1) fieldsToValidate = ["teamName", "institution"];
    if (step === 2) fieldsToValidate = []; // tidak ada field input manual
    if (step === 3)
      fieldsToValidate = [
        "leaderName",
        "leaderRole",
        "whatsapp_number",
        "requirementLink",
        "members",
      ];
    if (step === 4) fieldsToValidate = ["paymentproof_url"];

    const isValid = await trigger(fieldsToValidate);

    if (!isValid) {
      toast.error("Please fix the errors before continuing.");
      return;
    }

    if (step === 1) {
      const inst = getValues("institution");
      setInstitutionPrice(
        inst.toLowerCase().includes("telkom") ? "Rp 200.000" : "Rp 220.000"
      );
    }

    if (step === 2) {
      replace(
        Array(memberCount)
          .fill(null)
          .map(() => ({
            name: "",
            email: "",
            github_url: "",
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

  // Read-only team information display if team data existed
  const renderReadOnlyTeamInfo = () => (
    <div className="overflow-y-auto w-full min-h-screen text-white pt-12 md:pt-0">
      <HeaderDashboard topText="Team" bottomText="Information" />

      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-7xl px-3">
          {/* Team Information */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-full mb-6">
            <CardHeader className="grid grid-cols-2 w-full">
              <CardTitle className="text-white text-2xl font-semibold justify-self-start">
                Team Information
              </CardTitle>
              <button
                disabled={teamData?.approvalstatus !== "Rejected"}
                onClick={() => handleRejectionClick()}
                className={cn(
                  "px-6 py-2 rounded-full text-lg font-semibold transition-colors justify-self-end",
                  teamData?.approvalstatus === "Accepted"
                    ? "bg-green-600 text-white cursor-default"
                    : teamData?.approvalstatus === "Rejected"
                    ? "bg-red-600 hover:bg-red-800 text-white"
                    : "bg-blue-600 text-white cursor-default",
                  teamData?.approvalstatus !== "Rejected"
                )}
              >
                Status: {teamData?.approvalstatus}
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/70 text-sm">Team Name</Label>
                  <p className="text-white text-lg">{teamData?.team_name}</p>
                </div>
                <div>
                  <Label className="text-white/70 text-sm">Institution</Label>
                  <p className="text-white text-lg">{teamData?.institution}</p>
                </div>
              </div>
              {teamData?.paymentproof_url && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/70 text-sm">
                      Payment Proof
                    </Label>
                    <a
                      href={teamData.paymentproof_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 underline"
                    >
                      View Payment Proof
                    </a>
                  </div>
                  {teamData?.reject_message &&
                    teamData?.approvalstatus === "Rejected" && (
                      <div>
                        <Label className="text-white/70 text-sm">
                          Rejection Message
                        </Label>
                        <p className="text-white text-lg">
                          {teamData?.reject_message}
                        </p>
                      </div>
                    )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Leader Information */}
          {teamMembers
            .filter((member) => member.is_leader)
            .map((leader) => (
              <Card
                key={leader.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-full mb-6"
              >
                <CardHeader>
                  <CardTitle className="text-white text-xl font-semibold flex items-center gap-2">
                    <UserIcon className="size-5 text-pink-500/50" />
                    Team Leader
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/70 text-sm">Name</Label>
                    <p className="text-white text-lg">{leader.name}</p>
                  </div>
                  <div>
                    <Label className="text-white/70 text-sm">Email</Label>
                    <p className="text-white text-lg">{leader.email}</p>
                  </div>
                  <div>
                    <Label className="text-white/70 text-sm">Role</Label>
                    <p className="text-white text-lg">{leader.member_role}</p>
                  </div>
                  <div>
                    <Label className="text-white/70 text-sm">
                      Requirement Document
                    </Label>
                    <a
                      href={leader.requirementLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 underline"
                    >
                      View Document
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}

          {/* Team Members */}
          {teamMembers.filter((member) => !member.is_leader).length > 0 && (
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-full">
              <CardHeader>
                <CardTitle className="text-white text-xl font-semibold">
                  Team Members (
                  {teamMembers.filter((member) => !member.is_leader).length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers
                    .filter((member) => !member.is_leader)
                    .map((member, index) => (
                      <Card
                        key={member.id}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
                      >
                        <CardHeader>
                          <CardTitle className="text-white text-lg">
                            Member {index + 1}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <Label className="text-white/70 text-sm">
                              Name
                            </Label>
                            <p className="text-white">{member.name}</p>
                          </div>
                          <div>
                            <Label className="text-white/70 text-sm">
                              Email
                            </Label>
                            <p className="text-white">{member.email}</p>
                          </div>
                          <div>
                            <Label className="text-white/70 text-sm">
                              Role
                            </Label>
                            <p className="text-white">{member.member_role}</p>
                          </div>
                          <div>
                            <Label className="text-white/70 text-sm">
                              Requirement
                            </Label>
                            <a
                              href={member.requirementLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-400 hover:text-pink-300 underline text-sm"
                            >
                              View Document
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );

  // Conditional rendering based on approval status and edit state
  const shouldShowReadOnly =
    !loading &&
    teamData?.approvalstatus &&
    ["Submitted", "Resubmitted", "Accepted", "Rejected"].includes(
      teamData.approvalstatus
    ) &&
    !editRejected;

  // Show read-only view if team is submitted/accepted and not in edit mode
  if (shouldShowReadOnly) {
    return renderReadOnlyTeamInfo();
  }

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading team information...
      </div>
    );
  }

  return (
    <div className="overflow-y-auto w-full min-h-screen text-white">
      <HeaderDashboard topText="Team" bottomText="Registration" />

      <div className="flex h-full items-center justify-center">
        <form
          onSubmit={handleSubmit(
            editRejected ? onSubmitRejected : onSubmit,
            (errors) => {
              console.log("Form submission errors:", errors);
            }
          )}
          className="w-full max-w-7xl"
        >
          <div className="w-full px-8 py-10">
            {/* Step Indicator */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mb-12">
              {[1, 2, 3, 4].map((num, idx) => (
                <div
                  key={num}
                  className={cn(
                    "flex items-center relative",
                    "flex-col sm:flex-row"
                  )}
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-semibold border transition-all duration-300 z-10",
                      step === num
                        ? "bg-pink-500/70 border-pink-400/60 text-white scale-110"
                        : step > num
                        ? "bg-pink-500/50 border-pink-400/50 text-white"
                        : "border-white/30 text-white/50"
                    )}
                  >
                    {num}
                  </div>

                  {/* === Vertical line for mobile === */}
                  {idx !== 4 && (
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-6",
                        "bg-white/20 sm:hidden",
                        step > num ? "bg-pink-500/50" : "bg-white/20"
                      )}
                    ></div>
                  )}

                  {/* === Horizontal line for desktop === */}
                  {idx !== 3 && (
                    <div
                      className={cn(
                        "hidden sm:block transition-all duration-300",
                        "w-16 h-[2px]",
                        step > num ? "bg-pink-500/50" : "bg-white/20",
                        "mx-4"
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
                      error={errors.teamName?.message}
                      className={inputClassName}
                    />
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <Label className="text-white text-lg">Institution</Label>
                    <EditableInput
                      register={register}
                      name="institution"
                      placeholder="Enter your institution"
                      error={errors.institution?.message}
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
                  <CardTitle className="text-white text-2xl font-semibold">
                    {" "}
                    Step 2 — Team Members Count{" "}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {" "}
                  <div className="flex flex-col gap-y-2">
                    <Label className="text-white text-lg">
                      {" "}
                      Select Total Members{" "}
                    </Label>
                    <Select
                      onValueChange={(val) => setMemberCount(Number(val))}
                      value={memberCount.toString()}
                    >
                      <SelectTrigger className="bg-white/10 text-white placeholder:text-white/50 rounded-full py-5 px-5 border border-white/10 w-full">
                        <SelectValue placeholder="Select number of members" />{" "}
                      </SelectTrigger>{" "}
                      <SelectContent className="bg-[#1A1C1E] text-white border border-white/20 rounded-lg shadow-xl">
                        {" "}
                        {[2, 3, 4, 5].map((num) => (
                          <SelectItem
                            key={num}
                            value={num.toString()}
                            className="hover:bg-pink-500/30 cursor-pointer"
                          >
                            {num} Members
                          </SelectItem>
                        ))}
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
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="text-white/60 hover:text-white"
                            >
                              <InfoIcon className="size-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="max-w-xs text-sm"
                          >
                            <p>
                              Pemberitahuan terkait data Tim akan dikirimkan ke
                              email yang digunakan untuk Login/Signin.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3">
                    <EditableInput
                      register={register}
                      name="leaderName"
                      placeholder="Leader name"
                      className={inputClassName}
                      error={errors.leaderName?.message}
                    />
                    <Controller
                      name="leaderRole"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col w-full">
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <SelectTrigger
                              className={cn(
                                "bg-white/10 text-white placeholder:text-white/50 rounded-full py-5 px-5 border w-full transition-all duration-200",
                                errors.leaderRole?.message
                                  ? "border-red-500/70 focus-visible:ring-red-500/40"
                                  : "border-white/10"
                              )}
                            >
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

                          {errors.leaderRole?.message && (
                            <span className="text-red-400 text-xs mt-1 ml-1 animate-fadeIn">
                              {errors.leaderRole.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </CardContent>
                  <CardContent className="grid grid-cols-3 gap-3">
                    <EditableInput
                      register={register}
                      name="github_url"
                      placeholder="Github URL"
                      className={inputClassName}
                      error={errors.github_url?.message}
                    />
                    <EditableInput
                      register={register}
                      name="requirementLink"
                      placeholder="Requirement URL"
                      className={inputClassName}
                      error={errors.requirementLink?.message}
                    />
                    <EditableInput
                      register={register}
                      name="whatsapp_number"
                      placeholder="62812345678"
                      type="tel"
                      className={inputClassName}
                      error={errors.whatsapp_number?.message}
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
                        {/* === Member Name === */}
                        <EditableInput
                          register={register}
                          name={`members.${index}.name`}
                          placeholder="Member name"
                          className={inputClassName}
                          error={errors.members?.[index]?.name?.message}
                        />

                        {/* === Member Email === */}
                        <EditableInput
                          register={register}
                          name={`members.${index}.email`}
                          placeholder="Member email"
                          className={inputClassName}
                          error={errors.members?.[index]?.email?.message}
                        />

                        {/* === Requirement Link === */}
                        <EditableInput
                          register={register}
                          name={`members.${index}.requirementLink`}
                          placeholder="Requirement URL"
                          className={inputClassName}
                          error={
                            errors.members?.[index]?.requirementLink?.message
                          }
                        />

                        {/* === Github URL === */}
                        <EditableInput
                          register={register}
                          name={`members.${index}.github_url`}
                          placeholder="Github URL"
                          className={inputClassName}
                          error={errors.members?.[index]?.github_url?.message}
                        />

                        {/* === Member Role (Dropdown) === */}
                        <Controller
                          name={`members.${index}.member_role`}
                          control={control}
                          render={({ field }) => (
                            <div className="flex flex-col w-full">
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                              >
                                <SelectTrigger
                                  className={cn(
                                    "bg-white/10 text-white placeholder:text-white/50 rounded-full py-5 px-5 border w-full transition-all duration-200",
                                    errors.members?.[index]?.member_role
                                      ?.message
                                      ? "border-red-500/70 focus-visible:ring-red-500/40"
                                      : "border-white/10"
                                  )}
                                >
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

                              {/* Error message for dropdown */}
                              {errors.members?.[index]?.member_role
                                ?.message && (
                                <span className="text-red-400 text-xs mt-1 ml-1 animate-fadeIn">
                                  {errors.members[index]?.member_role?.message}
                                </span>
                              )}
                            </div>
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

                <CardContent
                  className="
                    flex flex-col md:flex-row 
                    items-center md:items-start 
                    gap-6 md:gap-8
                  "
                >
                  {/* === QR Image === */}
                  <div className="w-full md:w-fit flex justify-center">
                    <Image
                      src="/qris.jpg"
                      width={320}
                      height={320}
                      alt="QR Payment"
                      className="rounded-xl w-64 md:w-80 h-auto"
                    />
                  </div>

                  {/* === Right Side (Text + Input + Copyable Link) === */}
                  <div className="w-full md:w-3/4 flex flex-col gap-4 text-center md:text-left">
                    <p className="text-3xl md:text-4xl font-bold text-white">
                      {institutionPrice}
                    </p>

                    <EditableInput
                      register={register}
                      name="paymentproof_url"
                      placeholder="https://drive.google.com/..."
                      className={inputClassName}
                      onKeyDown={(e: KeyboardEvent) => {
                        if (e.key === "Enter") e.preventDefault();
                      }}
                    />

                    <CopyableLink
                      customLabel={
                        <div>
                          <span className="text-white font-medium">
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
                  disabled={isSubmitting}
                  className="bg-green-500/50 hover:bg-green-600/50 text-white rounded-full px-8 py-6"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
