"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HeaderPayment } from "./HeaderPayment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstitutionDropdown } from "./InstituionDropdown";
import { CopyableLink } from "@/components/CopyableLink";
import { WhatsappInput } from "./WhatsappInput";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";

const inputClassName =
  "bg-white/10 text-white placeholder:text-white/50 rounded-full px-6 py-6 border-1 border-white/10 pr-12";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  institution: z.string().min(1, "Institution is required"),
  workshop: z.string().min(1, "Workshop is required"),
  whatsapp: z.string().min(8, "WhatsApp number required"),
  payment_proof: z
    .string()
    .url("Link bukti pembayaran harus berupa URL")
    .refine(
      (val) => val.includes("drive.google.com"),
      "Bukti pembayaran harus berupa link Google Drive"
    ),
});

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    workshop: "",
    whatsapp: "",
    payment_proof: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const parseResult = formSchema.safeParse(formData);

    if (!parseResult.success) {
      parseResult.error.issues.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    try {
      const res = await fetch("/api/workshop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registration success!");
        setFormData({
          name: "",
          email: "",
          institution: "",
          workshop: "",
          whatsapp: "",
          payment_proof: "",
        });
      } else {
        toast.error("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen">
      <HeaderPayment />

      {/* grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 lg:px-20 mt-3 gap-4">
        {/* LEFT CARD */}
        <Card className="col-span-1 lg:col-span-2 bg-white/10 backdrop-blur-md border-3 border-white/10 w-full h-full text-white rounded-2xl pt-0">
          <CardHeader className="bg-white/10 pb-4 pt-6 rounded-t-xl">
            <CardTitle className="text-2xl font-medium leading-none">
              <span className="font-bold">Your Next Big Move Begins Here!</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="overflow-y-auto max-h-[60vh]">
            <div className="space-y-12 pt-6 tracking-wide">
              <div className="space-y-6 flex flex-col">
                {/* Name */}
                <div className="flex flex-col space-y-3">
                  <Label>Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="Input your Name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-3">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="Input your Email"
                  />
                </div>

                {/* Institution */}
                <div className="flex flex-col space-y-3">
                  <Label>Your Institution</Label>
                  <InstitutionDropdown
                    placeholder="Select Your Institution"
                    options={[
                      { label: "Telkom University", value: "telkom" },
                      { label: "Non Telkom University", value: "other" },
                    ]}
                    selected={
                      formData.institution ? [formData.institution] : []
                    }
                    onChange={(val) =>
                      setFormData({ ...formData, institution: val[0] })
                    }
                  />
                </div>

                {/* Workshop */}
                <div className="flex flex-col space-y-3">
                  <Label>Pick Your Workshop</Label>
                  <InstitutionDropdown
                    placeholder="Select Your Workshop"
                    options={[
                      {
                        label: "Workshop 1 (Sunday, 2 November 2025)",
                        value: "workshop1",
                      },
                      {
                        label: "Workshop 2 (Sunday, 16 November 2025)",
                        value: "workshop2",
                      },
                    ]}
                    selected={formData.workshop ? [formData.workshop] : []}
                    onChange={(val) =>
                      setFormData({ ...formData, workshop: val[0] })
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT CARD */}
        <div className="pr-0 lg:pr-4 col-span-1">
          <Card className="bg-white/10 backdrop-blur-md border border-white/10 w-full text-white rounded-2xl pt-0">
            <CardHeader className="bg-white/10 pb-4 pt-6 rounded-t-xl">
              <CardTitle className="text-2xl font-medium leading-none">
                <p>Detail</p>
                <span className="font-bold">Team.</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="overflow-y-auto max-h-[50vh]">
              <div className="space-y-6 flex flex-col">
                {/* Whatsapp Number */}
                <div className="flex flex-col gap-3">
                  <Label>Your Whatsapp</Label>
                  <WhatsappInput
                    name="whatsapp"
                    value={formData.whatsapp}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: { target: { value: any } }) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    placeholder="Input your WhatsApp number"
                    className={inputClassName}
                    defaultValue="62"
                  />
                </div>

                {/* Payment Section */}
                <div className="relative flex flex-col space-y-3">
                  <Label>Paymenyt Method*</Label>
                  <div className="flex flex-col space-y-1 text-center">
                    <p className="text-2xl font-bold">Rp250.000*</p>
                    <p className="text-sm font-medium text-white/50">
                      ( Belum tau )
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <Image
                      src="/qris.jpg"
                      width={340}
                      height={340}
                      alt="QR"
                      className="w-80 p-3 rounded-4xl border-10 border-white/10"
                    />
                  </div>

                  <CopyableLink
                    label="BCA ( a.n. GISELA SESARIA KUSTHIKA  PUTRI )"
                    text="7285451698"
                  />
                  <CopyableLink
                    label="ShopeePay ( a.n. GISELA SESARIA KUSTHIKA PUTRI )"
                    text="081808767771"
                  />
                </div>

                {/* Payment Proof */}
                <div className="flex flex-col gap-3">
                  <Label>Payment Proof Link*</Label>
                  <Input
                    name="payment_proof"
                    value={formData.payment_proof}
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="Masukkan link Google Drive bukti pembayaran"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex items-center w-full justify-center mt-12">
        <Button
          onClick={handleSubmit}
          disabled={!formData.payment_proof}
          className="border !bg-white/10 w-fit !py-6 sm:!py-8 !px-8 sm:!px-12 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <p className="font-semibold text-xl md:text-2xl lg:text-3xl">
            Submit
          </p>
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
