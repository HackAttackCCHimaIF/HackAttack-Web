"use client";

import { useState } from "react";
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
import { Loader2, Send, SendHorizonal, Check } from "lucide-react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { EditableInput } from "./SubmissionEditableInput";
import { Label } from "./ui/label";

// ===== Validation Schema =====
const submissionSchema = z.object({
  teamName: z.string().min(2, "Team name required"),
  submissionLink: z.string().url("Must be a valid URL"),
  leaderEmail: z.string().email("Invalid email"),
  otp: z.string().min(6, "OTP required"),
  agree: z.boolean().refine(val => val === true, {
    message: "You must confirm before submitting.",
  }),
});

type SubmissionValues = z.infer<typeof submissionSchema>;

export default function SubmissionDialog() {
  const [otpValue, setOtpValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SubmissionValues>({
    resolver: zodResolver(submissionSchema),
  });

  const leaderEmail = watch("leaderEmail");
  const agreementChecked = watch("agree");

  // ===== API CALLS =====
  const sendOTP = async () => {
    if (!leaderEmail) return alert("Please enter leader email first.");

    setIsSending(true);

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leaderEmail }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setOtpSent(true);
      setOtpVerified(false);

      alert("OTP sent to leader email!");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP.");
    }

    setIsSending(false);
  };

  const verifyOTP = async () => {
    setIsVerifying(true);

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: leaderEmail,
          otp: otpValue,
        }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setOtpVerified(true);
      alert("OTP Verified!");
    } catch (err) {
      console.log(err);
      alert("Invalid or expired OTP");
    }

    setIsVerifying(false);
  };

  const onSubmit = (data: SubmissionValues) => {
    if (!otpVerified) return alert("Please verify your OTP first.");

    console.log("SUBMISSION:", data);
    alert("Submission success!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-[#EF4B72A3]/50 transition-all duration-200 hover:bg-[#EF4B72A3] backdrop-blur-sm">
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

          {/* ==== LEADER EMAIL WITH RECEIVE OTP BUTTON ==== */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <EditableInput
                  register={register}
                  name="leaderEmail"
                  label="Leader Email"
                  placeholder="leader@email.com"
                  error={errors.leaderEmail?.message}
                />
              </div>

              <Button
                type="button"
                disabled={isSending}
                onClick={sendOTP}
                className="bg-[#EF4B72A3] text-white px-3"
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : otpSent ? (
                  "Resend"
                ) : (
                  "Receive"
                )}
              </Button>
            </div>
          </div>

          {/* ==== OTP VERIFY SECTION ==== */}
          <div className="flex flex-col gap-2">
            <Label className="text-white">OTP Verification</Label>

            <div className="flex items-center gap-3">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={(val) => {
                  setOtpValue(val);
                  setValue("otp", val);
                  setOtpVerified(false);
                }}
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} className="text-white" />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <Button
                type="button"
                disabled={otpValue.length < 6 || isVerifying}
                className={`px-3 ${
                  otpVerified
                    ? "bg-green-600"
                    : "bg-[#EF4B72A3]"
                } text-white`}
                onClick={verifyOTP}
              >
                {isVerifying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : otpVerified ? (
                  <Check className="w-4 h-4" />
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
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
              disabled={!otpVerified || !agreementChecked}
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
