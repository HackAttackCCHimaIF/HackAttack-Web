"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";
import { supabase } from "@/lib/config/supabase";
import { User } from "@supabase/supabase-js";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Check, Edit } from "lucide-react";
import { Bs1CircleFill, Bs2CircleFill } from "react-icons/bs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TeamMember, TeamMemberDB, TeamData } from "@/types/team";

import { CopyableLink } from "@/components/CopyableLink";
import Image from "next/image";
import { cn } from "@/lib/utility/utils";
import { HeaderDashboard } from "./HeaderDashboard";
import Link from "next/link";
import { SuccessDialog } from "./SuccessDialog";
import { toast } from "sonner";

// ======================
// Data & Validation Schema
// ======================

const teamMemberSchema = z.object({
  name: z.string(),
  email: z.email(),
  github: z.url().optional(),
  member_role: z.enum(["Hustler", "Hipster", "Hacker"]).optional(),
  requirementLink: z.url("URL berkas persyaratan wajib diisi"),
}) satisfies z.ZodType<TeamMember>;

// Separate schema for team data only
const teamDataSchema = z.object({
  teamName: z.string().min(1, "Nama team wajib diisi"),
  institution: z.string().min(1, "Asal instansi wajib diisi"),
  whatsapp_number: z
    .string()
    .min(1, "Nomor WhatsApp wajib diisi")
    .regex(
      /^62\d{8,13}$/,
      "Nomor WhatsApp harus dimulai dengan 62 dan berisi 10-15 digit"
    )
    .refine(
      (val) => val.startsWith("62"),
      "Nomor WhatsApp harus dimulai dengan 62"
    )
    .refine(
      (val) => /^\d+$/.test(val),
      "Nomor WhatsApp hanya boleh berisi angka"
    ),
  paymentproof_url: z.url().min(1, "URL bukti pembayaran wajib diisi"),
});

// Separate schema for member data only
const memberDataSchema = z.object({
  leaderName: z.string().min(1, "Nama Ketua wajib diisi"),
  leaderEmail: z.email("Email tidak valid"),
  leaderGithub: z.url().optional(),
  leaderRole: z.enum(["Hustler", "Hipster", "Hacker"]).optional(),
  requirementLink: z.url("URL berkas persyaratan wajib diisi"),
  members: z
    .array(teamMemberSchema)
    .max(5, "Maksimal 5 anggota tambahan")
    .superRefine((members, ctx) => {
      members.forEach((member, index) => {
        const hasAnyField =
          member.name ||
          member.email ||
          member.github ||
          member.requirementLink;

        if (hasAnyField) {
          if (!member.name || member.name.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Nama anggota wajib diisi",
              path: [index, "name"],
            });
          }

          if (!member.email || member.email.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Email anggota wajib diisi",
              path: [index, "email"],
            });
          } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(member.email)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Format email tidak valid",
                path: [index, "email"],
              });
            }
          }

          if (!member.requirementLink || member.requirementLink.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "URL berkas persyaratan wajib diisi",
              path: [index, "requirementLink"],
            });
          }
        }
      });
    }),
});

const teamSchema = z
  .object({
    leaderName: z.string().min(1, "Nama Ketua wajib diisi"),
    leaderEmail: z.email("Email tidak valid"),
    leaderGithub: z.url().optional(),
    leaderRole: z.enum(["Hustler", "Hipster", "Hacker"]).optional(),
    requirementLink: z.url("URL berkas persyaratan wajib diisi"),

    members: z
      .array(teamMemberSchema)
      .max(5, "Maksimal 5 anggota tambahan")
      .superRefine((members, ctx) => {
        members.forEach((member, index) => {
          const hasAnyField =
            member.name ||
            member.email ||
            member.github ||
            member.requirementLink;

          if (hasAnyField) {
            if (!member.name || member.name.trim() === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Nama anggota wajib diisi",
                path: [index, "name"],
              });
            }

            if (!member.email || member.email.trim() === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Email anggota wajib diisi",
                path: [index, "email"],
              });
            } else {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(member.email)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: "Format email tidak valid",
                  path: [index, "email"],
                });
              }
            }

            if (
              !member.requirementLink ||
              member.requirementLink.trim() === ""
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Link berkas persyaratan wajib diisi",
                path: [index, "requirementLink"],
              });
            } else {
              try {
                new URL(member.requirementLink);
              } catch {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message:
                    "Link berkas persyaratan harus berupa URL yang valid",
                  path: [index, "requirementLink"],
                });
              }
            }
          }
        });
      }),

    teamName: z.string().min(1, "Nama team wajib diisi"),
    institution: z.string().min(1, "Asal instansi wajib diisi"),
    whatsapp_number: z
      .string()
      .min(1, "Nomor WhatsApp wajib diisi")
      .regex(
        /^62\d{8,13}$/,
        "Nomor WhatsApp harus dimulai dengan 62 dan berisi 10-15 digit"
      )
      .refine(
        (val) => val.startsWith("62"),
        "Nomor WhatsApp harus dimulai dengan 62"
      )
      .refine(
        (val) => /^\d+$/.test(val),
        "Nomor WhatsApp hanya boleh berisi angka"
      ),
    paymentproof_url: z.url().min(1, "URL bukti pembayaran wajib diisi"),
  })
  .superRefine((data, ctx) => {
    const roleCounts: Record<string, number> = {
      Hustler: 0,
      Hipster: 0,
      Hacker: 0,
    };

    // Count leader role
    if (data.leaderRole && roleCounts.hasOwnProperty(data.leaderRole)) {
      roleCounts[data.leaderRole]++;
    }

    // Count member roles
    data.members.forEach((member) => {
      if (member.member_role && roleCounts.hasOwnProperty(member.member_role)) {
        roleCounts[member.member_role]++;
      }
    });

    // Check for role violations
    Object.entries(roleCounts).forEach(([role, count]) => {
      if (count > 2) {
        if (data.leaderRole === role) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Maksimal 2 orang per role ${role}`,
            path: ["leaderRole"],
          });
        }

        data.members.forEach((member, index) => {
          if (member.member_role === role) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Maksimal 2 orang per role ${role}`,
              path: ["members", index, "member_role"],
            });
          }
        });
      }
    });
  });

type TeamFormValues = z.infer<typeof teamSchema>;

// Validation helper functions
const validateTeamDataOnly = (data: TeamFormValues) => {
  const teamDataOnly = {
    teamName: data.teamName,
    institution: data.institution,
    whatsapp_number: data.whatsapp_number,
    paymentproof_url: data.paymentproof_url,
  };
  return teamDataSchema.parse(teamDataOnly);
};

const validateMemberDataOnly = (data: TeamFormValues) => {
  const memberDataOnly = {
    leaderName: data.leaderName,
    leaderEmail: data.leaderEmail,
    leaderRole: data.leaderRole,
    requirementLink: data.requirementLink,

    members: data.members,
  };
  return memberDataSchema.parse(memberDataOnly);
};

// ======================
// Header Component
// ======================

// ======================
// Editable Input Component
// ======================

const EditableInput = ({
  register,
  name,
  placeholder,
  disabled,
  className = "",
  type = "text",
  ...props
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  return (
    <div className="relative">
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`${className} ${disabled ? "opacity-60" : ""}`}
        {...register(name)}
        {...props}
      />
      {!disabled && (
        <Pencil
          size={16}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50"
        />
      )}
    </div>
  );
};

// ======================
// Helper Functions
// ======================

// Add separate validation functions around line 275
const isTeamDetailsComplete = (values: TeamFormValues) => {
  return (
    values.teamName &&
    values.institution &&
    values.whatsapp_number &&
    values.whatsapp_number !== "62"
  );
};

const isAllInfoComplete = (values: TeamFormValues) => {
  return isTeamDetailsComplete(values);
};

// ======================
// Main Component
// ======================

export default function TeamProfilePage() {
  const [isMemberEditMode, setMemberEditMode] = useState(false);
  const [isTeamEditMode, setTeamEditMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [saving, setSaving] = useState(false);
  const [teamDataLoaded, setTeamDataLoaded] = useState(false);
  const [memberDataLoaded, setMemberDataLoaded] = useState(false);
  const [institution, setInstitution] = useState("");
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmDialogType, setConfirmDialogType] = useState<
    "team" | "member" | null
  >(null);
  const [userProfile, setUserProfile] = useState({
    name: "User",
    isLoggedIn: false,
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user?.email) {
        try {
          const { data: userData, error } = await supabase
            .from("Users")
            .select("username")
            .eq("email", session.user.email)
            .single();

          if (!error && userData) {
            setUserProfile({
              name:
                userData.username || session.user.email.split("@")[0] || "User",
              isLoggedIn: true,
            });
          } else {
            setUserProfile({
              name:
                session.user.user_metadata?.username ||
                session.user.email.split("@")[0] ||
                "User",
              isLoggedIn: true,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserProfile({
            name:
              session.user.user_metadata?.username ||
              session.user.email.split("@")[0] ||
              "User",
            isLoggedIn: true,
          });
        }
      } else {
        setUserProfile({
          name: "User",
          isLoggedIn: false,
        });
      }

      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user?.email) {
        try {
          const { data: userData, error } = await supabase
            .from("Users")
            .select("username")
            .eq("email", session.user.email)
            .single();

          if (!error && userData) {
            setUserProfile({
              name:
                userData.username || session.user.email.split("@")[0] || "User",
              isLoggedIn: true,
            });
          } else {
            setUserProfile({
              name:
                session.user.user_metadata?.username ||
                session.user.email.split("@")[0] ||
                "User",
              isLoggedIn: true,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserProfile({
            name:
              session.user.user_metadata?.username ||
              session.user.email.split("@")[0] ||
              "User",
            isLoggedIn: true,
          });
        }
      } else {
        setUserProfile({
          name: "User",
          isLoggedIn: false,
        });
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      whatsapp_number: "62",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const teamDetailsCompleted = isTeamDetailsComplete(getValues());
  const allInfoCompleted = isAllInfoComplete(getValues());

  const loadTeamData = useCallback(
    async (forceReload = false) => {
      if (!user?.email || (!forceReload && teamDataLoaded)) return;

      try {
        const response = await fetch(
          `/api/team?userEmail=${encodeURIComponent(user.email)}`
        );

        if (response.ok) {
          const result = await response.json();

          if (result.data) {
            setTeamData(result.data);
            setValue("teamName", result.data.team_name || "");
            setValue("institution", result.data.institution || "");
            setValue("whatsapp_number", result.data.whatsapp_number || "62");
            setValue("paymentproof_url", result.data.paymentproof_url || "");

            if (result.data.institution === "Telkom University") {
              setInstitution("telkom");
            } else if (result.data.institution) {
              setInstitution("nontelkom");
            }
          }
        }
      } catch (error) {
        console.error("Error loading team data:", error);
      } finally {
        if (!forceReload) {
          setTeamDataLoaded(true);
        }
      }
    },
    [user?.email, setValue, teamDataLoaded, setTeamData, setInstitution]
  );

  useEffect(() => {
    loadTeamData();
  }, [loadTeamData]);

  useEffect(() => {
    const loadMemberData = async () => {
      if (!user?.email || !teamDataLoaded || memberDataLoaded) return;

      try {
        const teamResponse = await fetch(
          `/api/team?userEmail=${encodeURIComponent(user.email)}`
        );

        if (!teamResponse.ok) {
          setMemberDataLoaded(true);
          return;
        }

        const teamResult = await teamResponse.json();
        const teamId = teamResult.data?.id;

        if (!teamId) {
          setMemberDataLoaded(true);
          return;
        }

        const membersResponse = await fetch(
          `/api/team-members?teamId=${teamId}`
        );

        if (membersResponse.ok) {
          const membersResult = await membersResponse.json();

          if (membersResult.data && membersResult.data.length > 0) {
            const members = membersResult.data;
            const leader = members.find(
              (member: TeamMemberDB) => member.is_leader
            );
            const teamMembers = members.filter(
              (member: TeamMemberDB) => !member.is_leader
            );

            if (leader) {
              setValue("leaderName", leader.name || "");
              setValue("leaderEmail", leader.email || "");
              setValue("leaderGithub", leader.github_url || "");
              setValue("requirementLink", leader.data_url || "");
              setValue("leaderRole", leader.member_role || "");
            }

            for (let i = fields.length - 1; i >= 0; i--) {
              remove(i);
            }

            teamMembers.forEach((member: TeamMemberDB) => {
              append({
                name: member.name || "",
                email: member.email || "",
                github: member.github_url || "",
                requirementLink: member.data_url || "",
                member_role: member.member_role || undefined,
              });
            });
          }
        }
      } catch (error) {
        console.error("Error loading member data:", error);
      } finally {
        setMemberDataLoaded(true);
      }
    };

    loadMemberData();
  }, [
    user?.email,
    teamDataLoaded,
    memberDataLoaded,
    setValue,
    append,
    remove,
    fields.length,
  ]);

  const onSubmitTeam = async (data: TeamFormValues) => {
    if (!user?.email) {
      toast.error("User email not found");
      return;
    }
    setSaving(true);
    try {
      const teamResponse = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: data.teamName,
          institution: data.institution,
          whatsapp_number: data.whatsapp_number,
          paymentproof_url: data.paymentproof_url,
          userEmail: user.email,
        }),
      });

      if (teamResponse.ok) {
        toast.success("Team data saved successfully!");
        await loadTeamData(true);
      } else {
        const teamError = await teamResponse.json();
        console.error("Failed to save team data:", teamError);
        toast.error(
          `Failed to save team: ${teamError.error || "Unknown error"}`
        );
        return;
      }
    } catch {
      toast.error("Network error occurred");
    } finally {
      setSaving(false);
    }
  };

  const onSubmitMember = async (data: TeamFormValues) => {
    if (!user?.email) {
      toast.error("User email not found");
      return;
    }

    setSaving(true);
    try {
      const teamResponse = await fetch(
        `/api/team?userEmail=${encodeURIComponent(user.email)}`
      );

      if (!teamResponse.ok) {
        const teamError = await teamResponse.json();
        console.error("Team Data Not Found:", teamError);
        toast.error(`Team Data Not Found"}`);
        return;
      }

      const teamResult = await teamResponse.json();
      const teamId = teamResult.data?.id;

      if (!teamId) {
        toast.error("Could not get team ID");
        return;
      }

      const membersResponse = await fetch("/api/team-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId: teamId,
          leader: {
            name: data.leaderName,
            email: data.leaderEmail,
            github_url: data.leaderGithub || null,
            member_role: data.leaderRole || null,
            data_url: data.requirementLink,
          },
          members:
            data.members?.filter(
              (member) => member.name && member.name.trim() !== ""
            ) || [],
        }),
      });

      if (membersResponse.ok) {
        toast.success("Member data saved successfully!");
        await loadTeamData(true);
      } else {
        const membersError = await membersResponse.json();
        toast.error(
          `Failed to save members: ${membersError.error || "Unknown error"}`
        );
        return;
      }
    } catch (error) {
      console.error("Member Save:", error);
      toast.error("Network error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleMemberEditModeChange = async (newEditMode: boolean) => {
    if (isMemberEditMode && !newEditMode) {
      const currentValues = getValues();
      try {
        validateMemberDataOnly(currentValues);
        setConfirmDialogType("member");
        setShowConfirmDialog(true);
      } catch (error) {
        if (error instanceof z.ZodError) {
          toast.error("Please fill the complete member data before saving.");
          return;
        }
        throw error;
      }
    } else {
      setMemberEditMode(newEditMode);
    }
  };

  const handleTeamEditModeChange = async (newEditMode: boolean) => {
    if (isTeamEditMode && !newEditMode) {
      // Validate only team data before showing confirmation dialog
      const currentValues = getValues();
      try {
        validateTeamDataOnly(currentValues);
        setConfirmDialogType("team");
        setShowConfirmDialog(true);
      } catch (error) {
        if (error instanceof z.ZodError) {
          toast.error("Please fill the complete team data before saving.");
          return;
        }
        throw error;
      }
    } else {
      setTeamEditMode(newEditMode);
    }
  };

  const handleConfirmSaveTeam = async () => {
    // Team data has already been validated in handleTeamEditModeChange
    const currentValues = getValues();
    await onSubmitTeam(currentValues);
    setShowConfirmDialog(false);
    setTeamEditMode(false);
    setConfirmDialogType(null);
  };

  const handleConfirmSaveMember = async () => {
    // Member data has already been validated in handleMemberEditModeChange
    const currentValues = getValues();
    await onSubmitMember(currentValues);
    setShowConfirmDialog(false);
    setMemberEditMode(false);
    setConfirmDialogType(null);
  };

  const isEditMemberDisabled = () => {
    if (!teamData) return false;
    const status = teamData.approvalstatus;
    return status != null && status != "Rejected" && status != "Pending";
  };

  const isEditTeamDisabled = () => {
    if (!teamData) return false;
    const status = teamData.approvalstatus;
    return status != null && status != "Rejected";
  };

  const inputClassName =
    "bg-white/10 text-white placeholder:text-white/50 rounded-full px-6 py-6 border-1 border-white/10 pr-12";

  if (loading) {
    return (
      <div className="overflow-y-auto w-full min-h-full flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto w-full min-h-full pt-16 md:pt-0">
      <SuccessDialog open={false} onClose={() => null} />

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onOpenChange={(open) => {
          setShowConfirmDialog(open);
          if (!open) setConfirmDialogType(null);
        }}
      >
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription className="text-gray-300">
              {confirmDialogType === "team"
                ? "Are you sure you want to save these team changes? Once submitted, you won't be able to make changes unless your submission is rejected by the admin."
                : "Are you sure you want to save these member changes? Once submitted, you won't be able to make changes unless your submission is rejected by the admin."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowConfirmDialog(false);
                setConfirmDialogType(null);
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={
                confirmDialogType === "team"
                  ? handleConfirmSaveTeam
                  : handleConfirmSaveMember
              }
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              Confirm Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <HeaderDashboard topText="Team" bottomText="Profile" />

      {userProfile.isLoggedIn ? (
        <div className="w-full h-full overflow-y-auto lg:gap-x-4 grid grid-cols-1 lg:grid-cols-3">
          <div className="px-4 lg:pr-0 pb-8 col-span-1 md:col-span-2 w-full">
            <Card className="bg-white/10 backdrop-blur-md border-3 border-white/10 w-full text-white rounded-2xl pt-0">
              <CardHeader className="bg-white/10 pb-4 pt-6 rounded-t-xl relative">
                <Bs2CircleFill className="inline-block text-white mr-2" />
                <CardTitle className="text-2xl font-medium leading-none">
                  <p>Team</p>
                  <span className="font-bold">Information.</span>
                </CardTitle>

                {/* Member Edit Button */}
                <Button
                  onClick={() => {
                    if (isMemberEditMode) {
                      handleMemberEditModeChange(false);
                    } else {
                      handleMemberEditModeChange(true);
                    }
                  }}
                  size="sm"
                  disabled={!isMemberEditMode && isEditMemberDisabled()}
                  className={`absolute top-4 right-4 flex items-center gap-2 rounded-full px-3 py-2 ${
                    isMemberEditMode
                      ? "bg-pink-600/50 hover:bg-pink-700/80 text-white"
                      : isEditMemberDisabled()
                      ? "bg-gray-500/50 text-gray-400 cursor-not-allowed"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {isMemberEditMode ? (
                    <>
                      <Check size={14} className="text-white" />
                      <span className="text-sm">Save</span>
                    </>
                  ) : (
                    <>
                      <Edit size={14} className="text-white" />
                      <span className="text-sm">Edit</span>
                    </>
                  )}
                </Button>
              </CardHeader>

              <CardContent className="max-h-[67vh] overflow-y-auto">
                <div className="space-y-12 pt-6 tracking-wide">
                  {isMemberEditMode && !teamDetailsCompleted && (
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                      <p className="text-yellow-200 font-medium">
                        Fill in Team Data First
                      </p>
                      <p className="text-yellow-200/80 text-sm mt-1">
                        Complete your Team Name, Institution of Origin, and
                        WhatsApp to continue.
                      </p>
                    </div>
                  )}

                  {isEditMemberDisabled() && (
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                      <p className="text-blue-200 font-medium">
                        Team Data Submitted
                      </p>
                      <p className="text-blue-200/80 text-sm mt-1">
                        Your team data has been submitted and is under review.
                        You cannot make changes unless your submission is
                        rejected.
                      </p>
                    </div>
                  )}

                  <div className="space-y-6 flex flex-col">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                        Team Lead
                        {isMemberEditMode && !teamDetailsCompleted && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">
                            Fill in the team data first
                          </span>
                        )}
                        {isEditMemberDisabled() && (
                          <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded">
                            Submitted - Under Review
                          </span>
                        )}
                      </h3>

                      {/* Leader Name */}

                      <Label>Leader Name*</Label>

                      <EditableInput
                        register={register}
                        name="leaderName"
                        placeholder={
                          teamDetailsCompleted
                            ? "Input your leader team name"
                            : "Fill in the team data first"
                        }
                        disabled={!isMemberEditMode || !teamDetailsCompleted}
                        className={inputClassName}
                      />
                      {errors.leaderName && (
                        <p className="text-red-400 text-sm">
                          {errors.leaderName.message}
                        </p>
                      )}
                    </div>

                    {/* Leader Email */}
                    <div className="flex flex-col gap-3">
                      <Label>Leader Email*</Label>
                      <EditableInput
                        register={register}
                        name="leaderEmail"
                        type="email"
                        placeholder={
                          teamDetailsCompleted
                            ? "Enter the Leader's Email"
                            : "Fill in the team data first"
                        }
                        disabled={!isMemberEditMode || !teamDetailsCompleted}
                        className={inputClassName}
                      />
                      {errors.leaderEmail && (
                        <p className="text-red-400 text-sm">
                          {errors.leaderEmail.message}
                        </p>
                      )}
                    </div>

                    {/* Leader Role */}
                    <div className="flex flex-col gap-3">
                      <Label>Leader Role*</Label>
                      <Controller
                        name="leaderRole"
                        control={control}
                        render={({ field }) => (
                          <Select
                            disabled={
                              !isMemberEditMode || !teamDetailsCompleted
                            }
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className={inputClassName}>
                              <SelectValue
                                placeholder={
                                  teamDetailsCompleted
                                    ? "Select Role"
                                    : "Fill in the team data first"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hustler">
                                Hustler (Business)
                              </SelectItem>
                              <SelectItem value="Hipster">
                                Hipster (Design)
                              </SelectItem>
                              <SelectItem value="Hacker">
                                Hacker (Tech)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.leaderRole && (
                        <p className="text-red-400 text-sm">
                          {errors.leaderRole.message}
                        </p>
                      )}
                    </div>

                    {/* Leader GitHub */}
                    <div className="flex flex-col gap-3 w-full">
                      <Label>Leader Github URL</Label>
                      <div>
                        <EditableInput
                          register={register}
                          name="leaderGithub"
                          placeholder={
                            teamDetailsCompleted
                              ? "Input Link Github"
                              : "Fill in the team data first"
                          }
                          disabled={!isMemberEditMode || !teamDetailsCompleted}
                          className={inputClassName}
                        />
                        <div className="w-full flex justify-end pt-2">
                          <p className="text-xs text-left text-white/50">
                            *Opsional
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Leader Requirements */}
                    <div className="flex flex-col gap-2">
                      <Label>Required Documents*</Label>
                      <div>
                        <EditableInput
                          register={register}
                          name="requirementLink"
                          type="url"
                          placeholder={
                            teamDetailsCompleted
                              ? "(Please upload your requirement documents in link format)"
                              : "Fill in the team data first"
                          }
                          disabled={!isMemberEditMode || !teamDetailsCompleted}
                          className={inputClassName}
                        />
                        {errors.requirementLink && (
                          <p className="text-red-400 text-sm">
                            {errors.requirementLink.message}
                          </p>
                        )}
                        <div className="w-full flex justify-end pt-2">
                          <p className="text-white/50 text-xs max-w-xs text-end">
                            Upload screenshots of all required documents into
                            one Google Drive folder, then submit the link here.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {fields.map((member, index) => (
                    <div
                      key={member.id}
                      className={`space-y-6 flex flex-col border-t border-white/20 pt-6 ${
                        isMemberEditMode && !allInfoCompleted
                          ? "opacity-60"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-white">
                          Member {index + 1}
                        </h3>
                        {isMemberEditMode && allInfoCompleted && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => remove(index)}
                            className="text-red-400"
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      {/* All member inputs disabled if not all info complete */}
                      <div className="flex flex-col gap-3">
                        <Label>Member&apos;s name</Label>
                        <EditableInput
                          register={register}
                          name={`members.${index}.name`}
                          placeholder={
                            allInfoCompleted
                              ? "Enter the Member's Name"
                              : "Complete the team and leader data first"
                          }
                          disabled={!isMemberEditMode || !allInfoCompleted}
                          className={inputClassName}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label>Member&apos;s Email</Label>
                        <EditableInput
                          register={register}
                          name={`members.${index}.email`}
                          placeholder={
                            allInfoCompleted
                              ? "Enter the Member's Email"
                              : "Complete the team and leader data first"
                          }
                          disabled={!isMemberEditMode || !allInfoCompleted}
                          className={inputClassName}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label>Role</Label>
                        <Controller
                          name={`members.${index}.member_role`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              disabled={!isMemberEditMode || !allInfoCompleted}
                              value={field.value || ""}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className={inputClassName}>
                                <SelectValue
                                  placeholder={
                                    allInfoCompleted
                                      ? "Select Role"
                                      : "Complete the team and leader data first"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Hustler">
                                  Hustler (Business)
                                </SelectItem>
                                <SelectItem value="Hipster">
                                  Hipster (Design)
                                </SelectItem>
                                <SelectItem value="Hacker">
                                  Hacker (Tech)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.members?.[index]?.member_role && (
                          <p className="text-red-400 text-sm">
                            {errors.members[index]?.member_role?.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label>Member Github URL*</Label>
                        <EditableInput
                          register={register}
                          name={`members.${index}.github`}
                          placeholder={
                            allInfoCompleted
                              ? "Input Link Github"
                              : "Fill in the team data first"
                          }
                          disabled={!isMemberEditMode || !allInfoCompleted}
                          className={inputClassName}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Required Documents*</Label>
                        <EditableInput
                          register={register}
                          name={`members.${index}.requirementLink`}
                          placeholder={
                            allInfoCompleted
                              ? "(Please upload your requirement documents in link format)"
                              : "Complete the team and leader data first"
                          }
                          disabled={!isMemberEditMode || !allInfoCompleted}
                          className={inputClassName}
                        />
                      </div>
                    </div>
                  ))}

                  {isMemberEditMode && (
                    <div className="w-full flex items-center justify-center pt-6">
                      {allInfoCompleted ? (
                        <Button
                          type="button"
                          onClick={() =>
                            append({
                              name: "",
                              email: "",
                              github: "",
                              requirementLink: "",
                              member_role: undefined,
                            })
                          }
                          className={cn(
                            `bg-white/10 hover:bg-pink-600 text-white flex items-center rounded-full !p-6`,
                            fields.length === 5 ? "hidden" : ""
                          )}
                        >
                          <Plus className="mr-2" /> Add Team Member
                        </Button>
                      ) : (
                        <div className="bg-white/5 border border-white/20 rounded-full px-6 py-3 text-white/50 text-sm">
                          Complete the team and leader data to add members.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="px-4 lg:pl-0 lg:pr-4 pb-8 lg:col-span-1 w-full">
            <Card className="bg-white/10 backdrop-blur-md border border-white/10 w-full text-white rounded-2xl pt-0">
              <CardHeader className="bg-white/10 pb-4 pt-6 rounded-t-xl relative">
                <Bs1CircleFill className="inline-block text-white mr-2" />
                <CardTitle className="text-2xl font-medium leading-none">
                  <p>Detail</p>
                  <span className="font-bold">Team.</span>
                </CardTitle>

                {/* Approval Status Indicator */}
                {teamData?.approvalstatus && (
                  <div className="absolute top-16 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        teamData.approvalstatus === "Pending"
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          : teamData.approvalstatus === "Accepted"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : teamData.approvalstatus === "Rejected"
                          ? "bg-red-500/20 text-red-300 border border-red-500/30"
                          : teamData.approvalstatus === "Resubmitted"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : teamData.approvalstatus === "Submitted"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                      }`}
                    >
                      {teamData.approvalstatus}
                    </span>
                  </div>
                )}

                {/* Team Edit Button */}
                <Button
                  onClick={() => {
                    if (isTeamEditMode) {
                      handleTeamEditModeChange(false);
                    } else {
                      handleTeamEditModeChange(true);
                    }
                  }}
                  size="sm"
                  disabled={!isTeamEditMode && isEditTeamDisabled()}
                  className={`absolute top-4 right-4 flex items-center gap-2 rounded-full px-3 py-2 ${
                    isTeamEditMode
                      ? "bg-pink-600/50 hover:bg-pink-700/80 text-white"
                      : isEditTeamDisabled()
                      ? "bg-gray-500/50 text-gray-400 cursor-not-allowed"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {isTeamEditMode ? (
                    <>
                      <Check size={14} className="text-white" />
                      <span className="text-sm">Save</span>
                    </>
                  ) : (
                    <>
                      <Edit size={14} className="text-white" />
                      <span className="text-sm">Edit</span>
                    </>
                  )}
                </Button>
              </CardHeader>

              <CardContent className="overflow-y-auto max-h-[67vh]">
                <div className="space-y-6 flex flex-col">
                  {/* Nama Team */}
                  <div className="flex flex-col gap-3">
                    <Label>Team Name*</Label>
                    <EditableInput
                      register={register}
                      name="teamName"
                      placeholder="Input your team name"
                      disabled={!isTeamEditMode}
                      className={inputClassName}
                    />
                    {errors.teamName && (
                      <p className="text-red-400 text-sm">
                        {errors.teamName.message}
                      </p>
                    )}
                  </div>

                  {/* Asal Instansi */}
                  <div className="flex flex-col gap-3">
                    <Label>Institution*</Label>
                    <RadioGroup
                      disabled={!isTeamEditMode}
                      value={institution}
                      onValueChange={(value: string) => {
                        setInstitution(value as "telkom" | "nontelkom");

                        if (value === "telkom") {
                          setValue("institution", "Telkom University");
                        } else {
                          const currentValue = getValues("institution");
                          if (currentValue === "Telkom University") {
                            setValue("institution", "");
                          }
                        }
                      }}
                      className="flex flex-col gap-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="telkom"
                          id="telkom"
                          className="border-white text-white"
                          disabled={!isTeamEditMode}
                        />
                        <Label
                          htmlFor="telkom"
                          className={`cursor-pointer ${
                            !isTeamEditMode ? "opacity-60" : ""
                          }`}
                        >
                          Telkom University
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="nontelkom"
                          id="lainnya"
                          className="border-white text-white"
                          disabled={!isTeamEditMode}
                        />
                        <Label
                          htmlFor="lainnya"
                          className={`cursor-pointer ${
                            !isTeamEditMode ? "opacity-60" : ""
                          }`}
                        >
                          Non Telkom
                        </Label>
                      </div>
                    </RadioGroup>

                    {institution === "nontelkom" && (
                      <div className="mt-3">
                        <EditableInput
                          register={register}
                          name="institution"
                          placeholder="Masukkan nama instansi"
                          disabled={!isTeamEditMode}
                          className={inputClassName}
                        />
                      </div>
                    )}

                    {institution === "telkom" && !isTeamEditMode && (
                      <div className="mt-3">
                        <div
                          className={`${inputClassName} opacity-60 flex items-center`}
                        >
                          Telkom University
                        </div>
                      </div>
                    )}

                    {errors.institution && (
                      <p className="text-red-400 text-sm">
                        {errors.institution.message}
                      </p>
                    )}
                  </div>

                  {/* Whatsapp Perwakilan */}
                  <div className="flex flex-col gap-3">
                    <Label>Leader&apos;s WhatsApp</Label>
                    <EditableInput
                      register={register}
                      name="whatsapp_number"
                      placeholder="62812345678"
                      disabled={!isTeamEditMode}
                      className={inputClassName}
                      type="tel"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onInput={(e: any) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (!value.startsWith("62")) {
                          value = "62" + value.replace(/^62*/, "");
                        }
                        if (value.length > 15) {
                          value = value.substring(0, 15);
                        }
                        e.target.value = value;
                      }}
                    />
                    {errors.whatsapp_number && (
                      <p className="text-red-400 text-sm">
                        {errors.whatsapp_number.message}
                      </p>
                    )}
                  </div>

                  {/* Payment Proof */}
                  <div className="flex flex-col gap-3">
                    <Label>Payment Proof Link*</Label>
                    <EditableInput
                      register={register}
                      name="paymentproof_url"
                      placeholder="e.g., https://drive.google.com/abc123"
                      disabled={!isTeamEditMode}
                      className={inputClassName}
                    />
                    {errors.paymentproof_url && (
                      <p className="text-red-400 text-sm">
                        {errors.paymentproof_url.message}
                      </p>
                    )}
                  </div>

                  {/* CopyableLink */}
                  <CopyableLink
                    disabled={!isTeamEditMode}
                    label="Publication Materials "
                    text="https://drive.google.com/drive/folders/1_gu143PSRpXapjxORRrsk4ed5CCzadMr"
                  />

                  {/* Metode Pembayaran */}
                  <div className="relative flex flex-col">
                    <div className="relative w-full flex flex-col space-y-3 justify-center">
                      <Label>Payment Method</Label>
                      <div className="flex flex-col space-y-1 text-center">
                        <p className="text-2xl font-bold">
                          {institution === "telkom"
                            ? "Rp150.000*"
                            : institution === "nontelkom"
                            ? "Rp170.000*"
                            : "Rp-*"}
                        </p>
                        <p className="text-sm font-medium text-white/50">
                          {institution === "telkom"
                            ? "( Harga khusus untuk mahasiswa Telkom University )"
                            : institution === "nontelkom"
                            ? "( Harga pendaftaran untuk instansi lainnya )"
                            : "( Pilih instansi untuk melihat harga pendaftaran )"}
                        </p>
                      </div>
                      <div className="before:content-[''] flex items-center justify-center ">
                        {institution === "telkom" ? (
                          <Image
                            src="/qris.jpg"
                            width={340}
                            height={340}
                            alt="QR Telkom"
                            className="w-80 p-4 rounded-4xl border-10 border-white/10"
                          />
                        ) : institution === "nontelkom" ? (
                          <Image
                            src="/qris.jpg"
                            width={340}
                            height={340}
                            alt="QR Telkom"
                            className="w-80 p-4 rounded-4xl border-10 border-white/10"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <CopyableLink
                        disabled={!isTeamEditMode}
                        label="BCA ( GISELA SESARIA KUSTHIKA  PUTRI )"
                        text="7285451698"
                      />
                      <CopyableLink
                        disabled={!isTeamEditMode}
                        label="ShopeePay ( GISELA SESARIA KUSTHIKA PUTRI )"
                        text="081808767771"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col pb-5 px-4 h-full">
          <Card className="flex flex-col md:flex-1 bg-white/10 backdrop-blur-md border-3 border-white/10 rounded-2xl text-white h-full md:min-h-[calc(100vh-8.5rem)]">
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="max-w-xl text-center px-4">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide">
                  Welcome Participants
                </p>
                <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
                  HACKATTACK
                  <br />
                  2025
                </h2>
                <p className="text-sm sm:text-base mt-4">
                  Feel Free to{" "}
                  <Link
                    href={"/sign-in"}
                    className="font-bold hover:text-[#EF4B72] duration-200"
                  >
                    Login
                  </Link>{" "}
                  First
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
