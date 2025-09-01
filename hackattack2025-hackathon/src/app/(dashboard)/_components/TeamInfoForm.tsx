"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CopyableLink } from "@/components/CopyableLink";
import Image from "next/image";
import { cn } from "@/lib/utility/utils";
import { HeaderDashboard } from "./HeaderDashboard";

// ======================
// Data & Validation Schema
// ======================

const universities = [
  "Universitas Indonesia",
  "Institut Teknologi Bandung",
  "Universitas Gadjah Mada",
  "Institut Teknologi Sepuluh Nopember",
  "Telkom University",
  "Universitas Brawijaya",
  "Universitas Padjadjaran",
  "Universitas Airlangga",
];

const teamSchema = z.object({
  leaderName: z.string().min(1, "Nama Anggota 1 wajib diisi"),
  leaderEmail: z.string().email("Email tidak valid"),
  leaderGithub: z.string().optional(),
  requirementLink: z.string().url("Masukkan link GDrive yang valid"),
  members: z.array(
    z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      github: z.string().optional(),
      requirementLink: z.string().optional(),
    })
  ).max(3, "Maksimal 2 anggota tambahan"),
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
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
// Main Component
// ======================

export default function TeamProfilePage() {
  const [isEditMode, setEditMode] = useState(false);
  const [userProfile] = useState({ name: "John Doe", isLoggedIn: false });

  const {
    register,
    // handleSubmit,
    control,
    formState: { errors },
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
  });

  // const onSubmit = (data: TeamFormValues) => {
  //   console.log("Form Data:", data);
  //   setEditMode(false);
  // };

  const { fields, append, remove } = useFieldArray({
        control,
        name: "members",
    });

  // const handleFormSubmit = () => {
  //   // e.preventDefault();
  //   // handleSubmit(onSubmit)(e);
  // };

  const inputClassName =
    "bg-white/10 text-white placeholder:text-white/50 rounded-full px-6 py-6 border-1 border-white/10 pr-12";



  return (
    <div className="overflow-y-auto w-full h-full">
      <HeaderDashboard
        isEdit
        topText="Team"
        bottomText="Profile"
        isEditMode={isEditMode}
        setEditMode={setEditMode}
        userProfile={userProfile}
        // onSave={handleFormSubmit}
      />

      <div className="w-full h-full overflow-y-auto gap-4 grid grid-cols-1 lg:grid-cols-3">
        <div className="px-4 pb-8 col-span-1 md:col-span-2 w-full">
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
                    <Label>Nama Ketua</Label>
                    <EditableInput
                      register={register}
                      name="leaderName"
                      placeholder="Input your leader team name"
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
                    <Label>Email Anggota</Label>
                    <EditableInput
                      register={register}
                      name="leaderEmail"
                      type="email"
                      placeholder="Input Email Anggota"
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
                      Link <span className="font-bold">Github*</span>
                    </Label>
                    <div>
                      <EditableInput
                        register={register}
                        name="leaderGithub"
                        placeholder="Input Link Github"
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
                    <Label>Berkas Persyaratan* (Twibbon, Follow IG, Pap muka)</Label>
                    <div>
                      <EditableInput
                        register={register}
                        name="requirementLink"
                        type="url"
                        placeholder="Link Gdrive"
                        disabled={!isEditMode}
                        className={inputClassName}
                      />
                      {errors.requirementLink && (
                        <p className="text-red-400 text-sm">
                          {errors.requirementLink.message}
                        </p>
                      )}
                      <div className="w-full flex justify-end pt-2">
                        <p className="text-white/50 text-xs max-w-xs text-end">
                          *Input Screenshot hasil Persyaratan dalam satu drive, kemudian kumpulkan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {fields.map((member, index) => (
                    <div key={member.id} className="space-y-6 flex flex-col border-t border-white/20 pt-6">
                        <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-white">Member {index + 1}</h3>
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
                        <Label>Nama Anggota</Label>
                        <EditableInput
                            register={register}
                            name={`members.${index}.name`}
                            placeholder="Input member name"
                            disabled={!isEditMode}
                            className={inputClassName}
                        />
                        </div>
                        <div className="flex flex-col gap-3">
                        <Label>Email Anggota</Label>
                        <EditableInput
                            register={register}
                            name={`members.${index}.email`}
                            placeholder="Input Email Anggota"
                            disabled={!isEditMode}
                            className={inputClassName}
                        />
                        </div>
                        <div className="flex flex-col gap-3">
                        <Label>Github*</Label>
                        <EditableInput
                            register={register}
                            name={`members.${index}.github`}
                            placeholder="Input Link Github"
                            disabled={!isEditMode}
                            className={inputClassName}
                        />
                        </div>
                        <div className="flex flex-col gap-2">
                        <Label>Berkas Persyaratan*</Label>
                        <EditableInput
                            register={register}
                            name={`members.${index}.requirementLink`}
                            placeholder="Link GDrive"
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
                        onClick={() => append({ name: "", email: "", github: "", requirementLink: "" })}
                        className={cn(`bg-white/10 hover:bg-pink-600 text-white flex items-center rounded-full !p-6`, fields.length === 3 ? "hidden" : "")}
                        >
                        <Plus className="mr-2" /> Add Team Member
                        </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="px-4 pb-8 col-span-1">
          <Card className="bg-white/10 backdrop-blur-md border border-white/10 w-full text-white rounded-2xl pt-0">
            <CardHeader className="bg-white/10 pb-4 pt-6 rounded-t-xl">
              <CardTitle className="text-2xl font-medium leading-none">
                <p>Detail</p>
                <span className="font-bold">Team.</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="overflow-y-auto max-h-[67vh]">
              <div className="space-y-6 flex flex-col">
                {/* Nama Team */}
                <div className="flex flex-col gap-3">
                  <Label>Nama Team</Label>
                  <EditableInput
                    register={register}
                    name="teamName"
                    placeholder="Input your team name"
                    disabled={!isEditMode}
                    className={inputClassName}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label>Asal Instansi</Label>
                  <Select disabled={!isEditMode}>
                    <SelectTrigger className="bg-white/10 w-full text-white placeholder:text-white/50 rounded-full px-6 py-6 border-1 border-white/10 ">
                      <SelectValue placeholder="Pilih Instansi" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((uni) => (
                        <SelectItem key={uni} value={uni}>
                          {uni}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <RadioGroup
                    defaultValue=""
                    className="flex items-center gap-3 mt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Telkom University" id="telkom" />
                      <Label htmlFor="telkom">Telkom University</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex flex-col gap-3">
                  <Label>Whatsapp Perwakilan</Label>
                  <EditableInput
                    register={register}
                    name="whatsapp"
                    placeholder="Input your WhatsApp number"
                    disabled={!isEditMode}
                    className={inputClassName}
                    defaultValue="62"
                  />
                </div>

                <CopyableLink
                  disabled={!isEditMode}
                  label="Link GDrive (Twibbon Caption, dll)"
                  text="https://www.figma.com/design/OoZALSutXFS9ePSXclSJmy/draft-hackatton?node-id=0-1&p=f&t=0eRQB5Z4751onv0d-0"
                />

                <div className="relative flex flex-col">
                  <div className="relative w-full flex flex-col space-y-3 justify-center">
                    <Label>Metode Pembayaran.</Label>
                    <div className="flex flex-col space-y-1 text-center">
                      <p className="text-2xl font-bold">Rp250.000*</p>
                      <p className="text-sm font-medium text-white/50">
                        ( Harga pendaftaran tergantung instansi asal Tim )
                      </p>
                    </div>
                    <div className="before:content-[''] flex items-center justify-center ">
                      <Image
                        src="/dashboard/QR.png"
                        width={340}
                        height={340}
                        alt="QR"
                        className="w-80 rounded-4xl border-10 border-white/10"
                      />
                    </div>
                    <CopyableLink
                      disabled={!isEditMode}
                      label="BCA ( Faiq Haqqani )"
                      text="8895558571"
                    />
                    <CopyableLink
                      disabled={!isEditMode}
                      label="BRI ( Faiq Haqqani )"
                      text="0131 0104 8271 507"
                    />
                    <div className="flex flex-col gap-3">
                      <Label>Whatsapp Perwakilan</Label>
                      <EditableInput
                        register={register}
                        name="leaderGithub"
                        placeholder="Input Link Bukti Pembayaran"
                        disabled={!isEditMode}
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

