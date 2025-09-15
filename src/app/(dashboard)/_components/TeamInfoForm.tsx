"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";
import { supabase } from "@/lib/config/supabase";
import { User } from "@supabase/supabase-js";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { TeamMember, TeamMemberDB } from "@/types/team";

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
  email: z.string(),
  github: z.string().optional(),
  requirementLink: z.string(),
}) satisfies z.ZodType<TeamMember>;

const teamSchema = z.object({
  leaderName: z.string().min(1, "Nama Ketua wajib diisi"),
  leaderEmail: z.string().email("Email tidak valid"),
  leaderGithub: z.string().optional(),
  requirementLink: z.string().url("Link berkas persyaratan wajib diisi"),

  // Team members (conditional validation)
  members: z
    .array(teamMemberSchema)
    .max(3, "Maksimal 3 anggota tambahan")
    .superRefine((members, ctx) => {
      // Validate each member that exists
      members.forEach((member, index) => {
        const hasAnyField =
          member.name ||
          member.email ||
          member.github ||
          member.requirementLink;

        if (hasAnyField) {
          // Name is mandatory if member exists
          if (!member.name || member.name.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Nama anggota wajib diisi",
              path: [index, "name"],
            });
          }

          // Email is mandatory if member exists
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

          // RequirementLink is mandatory if member exists
          if (!member.requirementLink || member.requirementLink.trim() === "") {
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
                message: "Link berkas persyaratan harus berupa URL yang valid",
                path: [index, "requirementLink"],
              });
            }
          }
        }
      });
    }),

  // Team Detail fields (existing)
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
  paymentproof_url: z
    .string()
    .url("Link bukti pembayaran harus valid")
    .optional(),
});

type TeamFormValues = z.infer<typeof teamSchema>;

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

const WhatsAppInput = ({
  register,
  name,
  placeholder,
  disabled,
  className = "",
  ...props
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const [value, setValue] = useState("62");
  const { onChange, ...registerProps } = register(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Always ensure it starts with 62
    if (!inputValue.startsWith("62")) {
      inputValue = "62" + inputValue.replace(/^62*/, "");
    }

    // Only allow numbers
    inputValue = inputValue.replace(/\D/g, "");

    // Ensure it starts with 62
    if (!inputValue.startsWith("62")) {
      inputValue = "62";
    }

    // Limit length (62 + max 13 digits = 15 total)
    if (inputValue.length > 15) {
      inputValue = inputValue.substring(0, 15);
    }

    setValue(inputValue);
    onChange({ target: { value: inputValue } });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const cursorPosition = input.selectionStart || 0;

    if ((e.key === "Backspace" || e.key === "Delete") && cursorPosition <= 2) {
      e.preventDefault();
    }

    if (
      !/\d/.test(e.key) &&
      ![
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Enter",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Set cursor after "62" when focused
    setTimeout(() => {
      if (e.target.value === "62") {
        e.target.setSelectionRange(2, 2);
      }
    }, 0);
  };

  return (
    <div className="relative">
      <Input
        {...registerProps}
        type="tel"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className={`${className} ${disabled ? "opacity-60" : ""}`}
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
// Main Component
// ======================

export default function TeamProfilePage() {
  const [isEditMode, setEditMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [teamDataLoaded, setTeamDataLoaded] = useState(false);
  const [memberDataLoaded, setMemberDataLoaded] = useState(false);
  const [institution, setInstitution] = useState("");
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

  useEffect(() => {
    const loadTeamData = async () => {
      if (!user?.email || teamDataLoaded) return;

      try {
        const response = await fetch(
          `/api/team?userEmail=${encodeURIComponent(user.email)}`
        );

        if (response.ok) {
          const result = await response.json();

          if (result.data) {
            setValue("teamName", result.data.team_name || "");

            const institution = result.data.institution || "";
            setValue("institution", institution);

            if (institution === "Telkom University") {
              setInstitution("telkom");
            } else if (institution) {
              setInstitution("lainnya");
            }

            // Handle WhatsApp number - ensure it starts with 62
            let whatsappNumber = result.data.whatsapp_number || "62";
            if (!whatsappNumber.startsWith("62")) {
              whatsappNumber = "62" + whatsappNumber;
            }
            setValue("whatsapp_number", whatsappNumber);
            setValue("paymentproof_url", result.data.paymentproof_url || "");
          }
        } else {
        }
      } catch {
        toast.error("Error loading team data:");
      } finally {
        setTeamDataLoaded(true);
      }
    };

    loadTeamData();
  }, [user?.email, setValue, teamDataLoaded]);

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
            const members: TeamMemberDB[] = membersResult.data;
            const leader = members.find((member) => member.is_leader);
            const teamMembers = members.filter((member) => !member.is_leader);

            if (leader) {
              setValue("leaderName", leader.name || "");
              setValue("leaderEmail", leader.email || "");
              setValue("leaderGithub", leader.github_url || "");
              setValue("requirementLink", leader.data_url || "");
            }

            console.log(fields.length);

            for (let i = fields.length - 1; i >= 0; i--) {
              remove(i);
            }

            if (teamMembers.length > 0) {
              teamMembers.forEach((member) => {
                const memberData: TeamMember = {
                  name: member.name || "",
                  email: member.email || "",
                  github: member.github_url || "",
                  requirementLink: member.data_url || "",
                };

                console.log("🔥 Appending member:", memberData);
                append(memberData);
              });
            }
          }
        } else {
          toast.error("No member data available");
        }
      } catch {
        toast.error("Error loading member data");
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

  const onSubmit = async (data: TeamFormValues) => {
    if (!user?.email) return;

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

      if (!teamResponse.ok) {
        const teamError = await teamResponse.json();
        console.error("Failed to save team data:", teamError);
        toast.error(
          `Failed to save team: ${teamError.error || "Unknown error"}`
        );
        return;
      }

      const teamResult = await teamResponse.json();

      let teamId = teamResult.data?.id;

      if (!teamId) {
        const teamFetchResponse = await fetch(
          `/api/team?userEmail=${encodeURIComponent(user.email)}`
        );
        if (teamFetchResponse.ok) {
          const teamData = await teamFetchResponse.json();
          teamId = teamData.data?.id;
        }
      }

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
            data_url: data.requirementLink,
          },
          members:
            data.members?.filter(
              (member) => member.name && member.name.trim() !== ""
            ) || [],
        }),
      });

      if (membersResponse.ok) {
        toast.success("Team and member data saved successfully!");
      } else {
        const membersError = await membersResponse.json();
        toast.error(
          `Failed to save members: ${membersError.error || "Unknown error"}`
        );
      }
    } catch {
      toast.error("Network error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleEditModeChange = async (newEditMode: boolean) => {
    console.log("🔥 Edit mode changing:", {
      from: isEditMode,
      to: newEditMode,
    });

    if (isEditMode && !newEditMode) {
      const currentValues = getValues();

      await onSubmit(currentValues);
    }
    setEditMode(newEditMode);
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
    <div className="overflow-y-auto w-full min-h-full">
      <SuccessDialog open={false} onClose={() => null} />
      <HeaderDashboard
        isEdit
        topText="Team"
        bottomText="Profile"
        isEditMode={isEditMode}
        setEditMode={handleEditModeChange}
      />

      {userProfile.isLoggedIn ? (
        <div>
          <div className="w-full h-full overflow-y-auto grid grid-cols-1 lg:grid-cols-3">
            <div className="px-4 lg:pl-4 pb-8 col-span-1 md:col-span-2 w-full">
              <Card className="bg-white/10 backdrop-blur-md border-3 border-white/10 w-full text-white rounded-2xl pt-0">
                <CardHeader className="bg-white/10 pb-4 pt-6 rounded-t-xl">
                  <CardTitle className="text-2xl font-medium leading-none">
                    <p>Team</p>
                    <span className="font-bold">Information.</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="max-h-[67vh] overflow-y-auto">
                  <div className="space-y-12 pt-6 tracking-wide">
                    <div className="space-y-6 flex flex-col">
                      <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-white mb-3">Leader</h3>
                        <Label>Leader Name*</Label>
                        <EditableInput
                          register={register}
                          name="leaderName"
                          placeholder="e.g., John Doe"
                          disabled={!isEditMode}
                          className={inputClassName}
                        />
                        {errors.leaderName && (
                          <p className="text-red-400 text-sm">
                            {errors.leaderName.message}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-3">
                        <Label>Leader Email*</Label>
                        <EditableInput
                          register={register}
                          name="leaderEmail"
                          type="email"
                          placeholder="e.g., johndoe@email.com"
                          disabled={!isEditMode}
                          className={inputClassName}
                        />
                        {errors.leaderEmail && (
                          <p className="text-red-400 text-sm">
                            {errors.leaderEmail.message}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 w-full">
                        <Label>
                          Leader Portfolio
                        </Label>
                        <div>
                          <EditableInput
                            register={register}
                            name="leaderGithub"
                            placeholder="(Please provide your portfolio link  optional / can be "
                            disabled={!isEditMode}
                            className={inputClassName}
                          />
                          <div className="w-full flex justify-end pt-2">
                            <p className="text-xs text-left text-white/50">
                              *Opsional
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label>
                          Required Documents*
                        </Label>
                        <div>
                          <EditableInput
                            register={register}
                            name="requirementLink"
                            type="url"
                            placeholder="(Please upload your requirement documents in link format)"
                            disabled={!isEditMode}
                            className={inputClassName}
                          />
                          {errors.requirementLink && (
                            <p className="text-red-400 text-sm">
                              {errors.requirementLink.message}
                            </p>
                          )}
                          <div className="w-full flex justify-end pt-2">
                            <p className="text-white/50 text-xs max-w-sm text-end">
                              Upload screenshots of all required documents into one Google Drive folder, then submit the link here.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {fields.map((member, index) => (
                      <div
                        key={member.id}
                        className="space-y-6 flex flex-col border-t border-white/20 pt-6"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-white">
                            Member {index + 1}
                          </h3>
                          {isEditMode && (
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
                        <div className="flex flex-col gap-3">
                          <Label>Member Name</Label>
                          <EditableInput
                            register={register}
                            name={`members.${index}.name`}
                            placeholder="e.g., John Doe"
                            disabled={!isEditMode}
                            className={inputClassName}
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <Label>Member Email</Label>
                          <EditableInput
                            register={register}
                            name={`members.${index}.email`}
                            placeholder="e.g., johndoe@email.com"
                            disabled={!isEditMode}
                            className={inputClassName}
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <Label>Member Portfolio</Label>
                          <EditableInput
                            register={register}
                            name={`members.${index}.github`}
                            placeholder="(Please provide your portfolio link  optional / can be NULL)"
                            disabled={!isEditMode}
                            className={inputClassName}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>Required Documents*</Label>
                          <EditableInput
                            register={register}
                            name={`members.${index}.requirementLink`}
                            placeholder="(Please upload your requirement documents in link format)"
                            disabled={!isEditMode}
                            className={inputClassName}
                          />
                        </div>
                      </div>
                    ))}

                    {isEditMode && (
                      <div className="w-full flex items-center justify-center">
                        <Button
                          type="button"
                          onClick={() =>
                            append({
                              name: "",
                              email: "",
                              github: "",
                              requirementLink: "",
                            })
                          }
                          className={cn(
                            `bg-white/10 hover:bg-pink-600 text-white flex items-center rounded-full !p-6`,
                            fields.length === 3 ? "hidden" : ""
                          )}
                        >
                          <Plus className="mr-2" /> Add Team Member
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="px-4 xl:pl-0 pb-8 col-span-1">
              <Card className="bg-white/10 backdrop-blur-md border border-white/10 w-full text-white rounded-2xl pt-0">
                <CardHeader className="bg-white/10 pb-4 pt-6 rounded-t-xl">
                  <CardTitle className="text-2xl font-medium leading-none">
                    <p>Team</p>
                    <span className="font-bold">Detail</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="overflow-y-auto max-h-[67vh]">
                  <div className="space-y-6 flex flex-col">
                    {/* Nama Team */}
                    <div className="flex flex-col gap-3">
                      <Label>Team Name*</Label>
                      <EditableInput
                        register={register}
                        name="teamName"
                        placeholder="e.g., HackAttack2025"
                        disabled={!isEditMode}
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
                      <Label>Institution</Label>
                      <RadioGroup
                        disabled={!isEditMode}
                        value={institution}
                        onValueChange={(value: string) => {
                          setInstitution(value as "telkom" | "lainnya");

                          if (value === "telkom") {
                            setValue("institution", "Telkom University");
                          } else {
                            setValue("institution", "");
                          }
                        }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="telkom"
                            id="telkom"
                            className="border-white text-white"
                            disabled={!isEditMode}
                          />
                          <Label
                            htmlFor="telkom"
                            className={`cursor-pointer ${
                              !isEditMode ? "opacity-60" : ""
                            }`}
                          >
                            Telkom University
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="lainnya"
                            id="lainnya"
                            className="border-white text-white"
                            disabled={!isEditMode}
                          />
                          <Label
                            htmlFor="lainnya"
                            className={`cursor-pointer ${
                              !isEditMode ? "opacity-60" : ""
                            }`}
                          >
                            Lainnya
                          </Label>
                        </div>
                      </RadioGroup>

                      {institution === "lainnya" && (
                        <div className="mt-3">
                          <EditableInput
                            register={register}
                            name="institution"
                            placeholder="Input your institution"
                            disabled={!isEditMode}
                            className={inputClassName}
                          />
                        </div>
                      )}

                      {institution === "telkom" && !isEditMode && (
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
                      <Label>Leader WhatsApp Number</Label>
                      <WhatsAppInput
                        register={register}
                        name="whatsapp_number"
                        placeholder="e.g., 081245878653"
                        disabled={!isEditMode}
                        className={inputClassName}
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
                        disabled={!isEditMode}
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
                      disabled={!isEditMode}
                      label="Publication Materials (Twibbon, Caption, Poster, etc. will be provided by committee. All materials can be accessed here.)"
                      text="https://www.figma.com/design/OoZALSutXFS9ePSXclSJmy/draft-hackatton?node-id=0-1&p=f&t=0eRQB5Z4751onv0d-0"
                    />

                    {/* Metode Pembayaran */}
                    <div className="relative flex flex-col">
                      <div className="relative w-full flex flex-col space-y-3 justify-center">
                        <Label>Payment Method</Label>
                        <div className="flex flex-col space-y-1 text-center">
                          <p className="text-2xl font-bold">
                            {institution === "telkom"
                              ? "Rp150.000*"
                              : institution === "others"
                              ? "Rp170.000*"
                              : "Rp-*"}
                          </p>
                          <p className="text-sm font-medium text-white/50">
                            {institution === "telkom"
                              ? "( Harga khusus untuk mahasiswa Telkom University )"
                              : institution === "lainnya"
                              ? "( Harga pendaftaran untuk instansi lainnya )"
                              : "( Pilih instansi untuk melihat harga pendaftaran )"}
                          </p>
                        </div>
                        <div className="before:content-[''] flex items-center justify-center ">
                          {institution === "telkom" ? (
                            <Image
                              src="/dashboard/QR.png"
                              width={340}
                              height={340}
                              alt="QR Telkom"
                              className="w-80 rounded-4xl border-10 border-white/10"
                            />
                          ) : institution === "lainnya" ? (
                            <Image
                              src="/dashboard/QR.png"
                              width={340}
                              height={340}
                              alt="QR Telkom"
                              className="w-80 rounded-4xl border-10 border-white/10"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <CopyableLink
                          disabled={!isEditMode}
                          label="BCA ( GISELA SESARIA KUSTHIKA  PUTRI )"
                          text="7285451698"
                        />
                        <CopyableLink
                          disabled={!isEditMode}
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
        </div>
      ) : (
        <div className="flex-1 flex flex-col pb-5 px-4 h-full">
          <Card className="flex flex-col md:flex-1 bg-white/10 backdrop-blur-md border-3 border-white/10 rounded-2xl text-white h-full md:min-h-[calc(100vh-8.5rem)]">
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="max-w-xl text-center px-4">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide">
                  Selamat Datang Peserta
                </p>
                <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
                  HACKATTACK
                  <br />
                  2025
                </h2>
                <p className="text-sm sm:text-base mt-4">
                  Silahkan untuk{" "}
                  <Link
                    href={"/sign-in"}
                    className="font-bold hover:text-pink-400 duration-200"
                  >
                    login
                  </Link>{" "}
                  terlebih dahulu
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
      )}
    </div>
  );
}
