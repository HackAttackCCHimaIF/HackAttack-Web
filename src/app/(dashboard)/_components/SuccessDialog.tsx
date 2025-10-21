"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SuccessDialog({ open, onClose }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-neutral-800 to-neutral-900 border-none text-white rounded-2xl shadow-xl p-8 max-w-md text-center w-[320px] md:w-auto">
        <DialogHeader className="flex flex-col items-center justify-center gap-4">
          <div className="relative flex items-center justify-center w-full max-w-[220px] sm:max-w-[280px] aspect-square mx-auto">
              {/* Glow effect */}
              <div className="absolute w-32 h-32 sm:w-40 sm:h-40 bg-pink-500/20 blur-3xl rounded-full z-0"></div>
              
              {/* Responsive Image */}
              <Image
                src="/dashboard/success.svg"
                alt="Success"
                width={500}
                height={500}
                className="w-full h-auto z-10"
              />
            </div>

          {/* Title */}
          <h2 className="text-xl font-extrabold uppercase leading-tight text-center">
            Awesome! You’ve successfully registered for the HackAttack 2025
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-sm text-center">
            Your data is being reviewed. We will contact you soon via email or website.
          </p>
        </DialogHeader>

        {/* Tombol */}
        <div className="mt-6">
          <Button
            onClick={onClose}
            className="w-full py-6 text-lg font-semibold rounded-md bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 shadow-md"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
