"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { EditableInput } from "./SubmissionEditableInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

const submissionSchema = z.object({
  team_name: z.string().min(2, "Team name required"),
  proposal_url: z.url("Must be a valid URL"),
  leader_email: z.email("Invalid email"),
  agree: z.boolean().refine((val) => val === true, {
    message: "You must confirm before submitting.",
  }),
});

type SubmissionValues = z.infer<typeof submissionSchema>;

interface SubmissionDialogNoOTPProps {
  teams: { id: string; name: string }[];
}

export default function SubmissionDialogNoOTP({
  teams,
}: SubmissionDialogNoOTPProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubmissionValues>({
    resolver: zodResolver(submissionSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const agreeChecked = watch("agree");

  // Teams data is now passed as prop from parent component

  const onSubmit = (data: SubmissionValues) => {
    setIsSubmitting(true);
    const submitData = fetch("/api/submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team_name: data.team_name,
        proposal_url: data.proposal_url,
        leader_email: data.leader_email,
      }),
    });

    submitData.then(async (res) => {
      const result = await res.json();

      if (res.ok) {
        toast.success("Submission successful!", { duration: 3000 });
        setTimeout(() => window.location.reload(), 3000);
      } else {
        toast.error(result.error || "Submission failed.", { duration: 3000 });
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full w-full bg-[#EF4B72A3]/50 transition-all duration-200 hover:bg-[#EF4B72A3] backdrop-blur-sm">
          Submission
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm md:max-w-md bg-stone-950/90 backdrop-blur-2xl rounded-xl border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">
            Proposal <span className="text-[#EF4B72A3]">Submission</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-white text-sm font-medium">
                Team Name
              </Label>
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
                  <TooltipContent side="right" className="max-w-xs text-sm">
                    <p>
                      Nama Tim yang sudah mengajukan Submission tidak akan
                      ditampilkan.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Controller
              name="team_name"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="bg-white/10 text-white placeholder:text-white/50 rounded-full py-5 px-5 border border-white/10 w-full">
                    {teams.length === 0 ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading teams...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select team" />
                    )}
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1C1E] text-white border border-white/20 rounded-lg shadow-xl">
                    {teams.map((team: { id: string; name: string }) => (
                      <SelectItem
                        key={team.id}
                        value={team.name}
                        className="hover:bg-pink-500/30 cursor-pointer"
                      >
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.team_name?.message && (
              <p className="text-red-400 text-xs">{errors.team_name.message}</p>
            )}
          </div>

          <EditableInput
            register={register}
            name="proposal_url"
            label="Submission Link"
            placeholder="https://drive.google.com/..."
            error={errors.proposal_url?.message}
          />

          <div className="flex items-center gap-2">
            <EditableInput
              register={register}
              name="leader_email"
              label="Team Leader Email"
              placeholder="leader@email.com"
              error={errors.leader_email?.message}
              tooltip="Gunakan Email Ketua Tim"
            />
          </div>

          {/* AGREEMENT */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1 accent-[#EF4B72A3]"
              {...register("agree")}
            />
            <p className="text-xs text-white leading-tight">
              By submitting this proposal, we confirm that the document is final
              and requires no further revision.
            </p>
          </div>

          {errors.agree && (
            <p className="text-sm text-red-500">{errors.agree.message}</p>
          )}

          {/* SUBMIT */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!agreeChecked || isSubmitting}
              className="w-1/3 flex items-center justify-center gap-2"
            >
              <SendHorizonal className="text-[#EF4B72A3]" />
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
