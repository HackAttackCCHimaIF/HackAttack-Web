"use client";

import { HeaderDashboard } from "@/app/(dashboard)/_components/HeaderDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/config/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { SubmissionFormValues } from "@/types/submission";
import { EditableInput } from "@/app/(dashboard)/_components/EditableInput";

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
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [submissionData, setSubmissionData] = useState<{
    id?: number;
    proposal_url?: string;
  }>({});
  const [teamData, setTeamData] = useState<{
    id?: string;
    team_name?: string;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
  });

  // Load user and submission data
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user?.email) {
        try {
          // Get team and submission data
          const response = await fetch(
            `/api/submission?userEmail=${encodeURIComponent(
              session.user.email
            )}`
          );

          if (response.ok) {
            const result = await response.json();

            // Set team data if available
            console.log("result.data : ", result.data);
            if (result.data?.teamData) {
              setTeamData({
                id: result.data.teamData.id,
                team_name: result.data.teamData.team_name,
              });
              console.log("result.data.teamData : ", result.data.teamData);
              console.log("teamData : ", teamData);
              console.log("nama tim : ", result.data.teamData.team_name);
            }

            // Set submission data if available
            if (result.data?.submissionData) {
              setSubmissionData({
                id: result.data.submissionData.id,
                proposal_url: result.data.submissionData.proposal_url,
              });
              console.log("result.data.submission : ", result.data.submission);
              console.log("submission : ", submissionData);
              console.log(
                "proposal URL : ",
                result.data.submissionData.proposal_url
              );
              setIsConfirmed(true);
            }
          }
        } catch (error) {
          console.error("Error loading data:", error);
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          team_name: teamData.team_name,
          proposal_url: data.proposal_url,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(
          result.updated
            ? "Proposal updated successfully!"
            : "Proposal submitted successfully!"
        );
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

  if (loading) {
    return (
      <div className="min-h-1/2 h-full flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-1/2 h-full flex flex-col pt-16 md:pt-0">
      <HeaderDashboard bottomText="Submission" />

      <div className="flex-1 w-full overflow-y-auto px-4 pb-5">
        <Card className="bg-white/10 backdrop-blur-md border-3 border-white/10 w-full text-white rounded-2xl flex flex-col h-fit md:h-full">
          <CardHeader className="py-4 lg:pt-12 lg:pb-3">
            <CardTitle className="text-2xl font-medium leading-none">
              <p className="">
                Halo, Team{" "}
                <span className="font-bold">{teamData.team_name}</span>
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
                <EditableInput
                  register={register}
                  disabled={saving || !!submissionData.proposal_url}
                  name="proposal_url"
                  value={submissionData.proposal_url}
                  className={`bg-white/10 text-white placeholder:text-white/50 rounded-full px-6 py-6 border-1 border-white/10 pr-12 opacity-60`}
                  placeholder="e.g., https://drive.google.com/file/d/abc123"
                />
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
                  disabled={saving || !!submissionData.proposal_url}
                />
                <p className="text-sm text-white/50">
                  By submitting this proposal, we confirm that the document is
                  final and requires no further revision. Any missing
                  information is the responsibility of the submitter.
                </p>
              </div>
              <div className="flex flex-row gap-3 pt-6 items-center justify-end">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={
                    !submissionData.proposal_url || isConfirmed || saving
                  }
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
