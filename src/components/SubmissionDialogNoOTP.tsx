"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

// ===== Validation Schema =====
const submissionSchema = z.object({
  teamName: z.string().min(2, "Team name required"),
  submissionLink: z.string().url("Must be a valid URL"),
  leaderEmail: z.string().email("Invalid email"),
  agree: z.boolean().refine(val => val === true, {
    message: "You must confirm before submitting.",
  }),
});

type SubmissionValues = z.infer<typeof submissionSchema>;

export default function SubmissionDialogNoOTP() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubmissionValues>({
    resolver: zodResolver(submissionSchema),
  });

  const agreeChecked = watch("agree");

  const onSubmit = (data: SubmissionValues) => {
    console.log("SUBMISSION:", data);
    alert("Submission success!");
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
          <EditableInput
            register={register}
            name="teamName"
            label="Team Name"
            placeholder="Enter team name"
            error={errors.teamName?.message}
          />

          <EditableInput
            register={register}
            name="submissionLink"
            label="Submission Link"
            placeholder="https://drive.google.com/..."
            error={errors.submissionLink?.message}
          />

          <EditableInput
            register={register}
            name="leaderEmail"
            label="Leader Email"
            placeholder="leader@email.com"
            error={errors.leaderEmail?.message}
          />

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
              disabled={!agreeChecked}
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
