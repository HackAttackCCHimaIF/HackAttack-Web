"use client";

import { HeaderDashboard } from "@/app/(dashboard)/_components/HeaderDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/config/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { SubmissionFormValues } from "@/types/submission";

// Validation Schema
const submissionSchema = z.object({
  proposal_url: z
    .string()
    .url("Link proposal harus berupa URL yang valid")
    .min(1, "Link proposal wajib diisi"),
});

const SubmissionPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [teamName, setTeamName] = useState("JuaraHackAttack 2025");
  const [userProfile, setUserProfile] = useState({
    name: "User",
    isLoggedIn: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
  });

  const proposalUrl = watch("proposal_url");

  // Load user and submission data
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user?.email) {
        try {
          // Get user profile
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

          // Load existing submission data
          const response = await fetch(
            `/api/submission?userEmail=${encodeURIComponent(
              session.user.email
            )}`
          );
          if (response.ok) {
            const result = await response.json();
            if (result.data?.submission) {
              setValue(
                "proposal_url",
                result.data.submission.proposal_url || ""
              );
            }
            if (result.data?.team) {
              setTeamName(result.data.team.team_name || "JuaraHackAttack 2025");
            }
          }
        } catch (error) {
          console.error("Error loading data:", error);
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
      if (!session?.user) {
        setUserProfile({ name: "User", isLoggedIn: false });
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue]);

  const onSubmit = async (data: SubmissionFormValues) => {
    if (!user?.email) {
      toast.error("User not authenticated");
      return;
    }

    if (!isConfirmed) {
      toast.error("Please confirm that your proposal is correct");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposal_url: data.proposal_url,
          userEmail: user.email,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(
          result.updated
            ? "Proposal updated successfully!"
            : "Proposal submitted successfully!"
        );
        setIsEditMode(false);
      } else {
        const error = await response.json();
        toast.error(`Failed to submit: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting proposal:", error);
      toast.error("Network error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleEditModeChange = () => {
    if (isEditMode && proposalUrl && isConfirmed) {
      // Auto-submit when exiting edit mode
      handleSubmit(onSubmit)();
    } else {
      setIsEditMode(!isEditMode);
    }
  };

  if (loading) {
    return (
      <div className="min-h-1/2 h-full flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!userProfile.isLoggedIn) {
    return (
      <div className="min-h-1/2 h-full flex items-center justify-center">
        <div className="text-white text-xl">
          Please log in to access this page.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-1/2 h-full flex flex-col">
      <HeaderDashboard bottomText="Submission" />

      <div className="flex-1 w-full overflow-y-auto px-4 pb-5">
        <Card className="bg-white/10 backdrop-blur-md border-3 border-white/10 w-full text-white rounded-2xl flex flex-col h-fit md:h-full">
          <CardHeader className="py-4 lg:pt-12 lg:pb-3">
            <CardTitle className="text-2xl font-medium leading-none">
              <p className="">
                Halo, Team <span className="font-bold">{teamName}</span>
              </p>
              <span className="text-sm">Submit your proposal here!</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex px-6 flex-col h-full justify-between">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 w-full"
            >
              <Label className="text-[16px]">
                Link <span className="font-bold">Proposal*</span>
              </Label>
              <div className="relative">
                <Input
                  {...register("proposal_url")}
                  disabled={!isEditMode || saving}
                  className={`bg-white/10 text-white placeholder:text-white/50 rounded-full px-6 py-6 border-1 border-white/10 pr-12 ${
                    !isEditMode ? "opacity-60" : ""
                  }`}
                  placeholder="e.g., https://drive.google.com/file/d/abc123"
                />
                {isEditMode && (
                  <Pencil
                    size={16}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50"
                  />
                )}
              </div>
              {errors.proposal_url && (
                <p className="text-red-400 text-sm">
                  {errors.proposal_url.message}
                </p>
              )}

              <div className="flex flex-row w-full items-start gap-3">
                <Checkbox
                  checked={isConfirmed}
                  onCheckedChange={(checked) =>
                    setIsConfirmed(checked as boolean)
                  }
                  disabled={!isEditMode || saving}
                />
                <p className="text-sm text-white/50">
                  By submitting this proposal, we confirm that the document is final and requires no further revision. Any missing information is the responsibility of the submitter.
                </p>
              </div>
                <div className="flex flex-row gap-3 pt-6 items-center justify-end">
                  <Button
                    type="button"
                    onClick={handleEditModeChange}
                    disabled={saving}
                    size={"lg"}
                    className={`flex items-center gap-2 rounded-full pl-2 !py-6 bg-white/10 hover:bg-white/20 text-white pr-6`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full md:bg-white/10">
                        <Pencil size={8} className="text-white" />
                      </div>
                      <p>{isEditMode ? "Cancel" : "Edit"}</p>
                    </div>
                  </Button>

                  <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={!isEditMode || !proposalUrl || !isConfirmed || saving}
                    className="bg-white/10 hover:bg-pink-600 text-white flex items-center rounded-full !p-6"
                  >
                    {saving ? "Submitting..." : "Submit"}
                  </Button>
                </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmissionPage;
