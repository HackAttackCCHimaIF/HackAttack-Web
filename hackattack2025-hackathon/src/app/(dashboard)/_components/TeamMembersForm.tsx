/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EditableInput } from "./EditableInput";

interface TeamMembersFormProps {
  register: any;
  errors: any;
  isEditMode: boolean;
  inputClassName: string;
}

export function TeamMembersForm({ register, errors, isEditMode, inputClassName }: TeamMembersFormProps) {
  return (
    <div className="space-y-12 pt-6 tracking-wide">
      {/* Leader */}
      <div className="space-y-6 flex flex-col">
        <div className="flex flex-col gap-3">
          <Label>Nama Anggota 1</Label>
          <EditableInput
            register={register}
            name="leaderName"
            placeholder="Input your leader team name"
            disabled={!isEditMode}
            className={inputClassName}
          />
          {errors.leaderName && <p className="text-red-400 text-sm">{errors.leaderName.message}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <Label>Email Anggota</Label>
          <EditableInput
            register={register}
            name="leaderEmail"
            type="email"
            placeholder="Masukan Email Anggota"
            disabled={!isEditMode}
            className={inputClassName}
          />
          {errors.leaderEmail && <p className="text-red-400 text-sm">{errors.leaderEmail.message}</p>}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Label>Link <span className="font-bold">Github*</span></Label>
          <EditableInput
            register={register}
            name="leaderGithub"
            placeholder="Masukan Link Github"
            disabled={!isEditMode}
            className={inputClassName}
          />
          <p className="text-xs text-left text-white/50">*Opsional</p>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Berkas Persyaratan*</Label>
          <EditableInput
            register={register}
            name="requirementLink"
            type="url"
            placeholder="Link Gdrive"
            disabled={!isEditMode}
            className={inputClassName}
          />
          {errors.requirementLink && <p className="text-red-400 text-sm">{errors.requirementLink.message}</p>}
          <p className="text-white/50 text-xs max-w-xs text-end">
            *Masukan Screenshot hasil Persyaratan dalam satu drive, kemudian kumpulkan.
          </p>
        </div>
      </div>

      {/* Anggota 2 & 3 */}
      {[2, 3].map((num) => (
        <div key={num} className="space-y-6 flex flex-col">
          <div className="flex flex-col gap-3">
            <Label>Nama Anggota {num}</Label>
            <EditableInput
              register={register}
              name={`member${num}Name`}
              placeholder="Input your member team name"
              disabled={!isEditMode}
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Email Anggota</Label>
            <EditableInput
              register={register}
              name={`member${num}Email`}
              type="email"
              placeholder="Masukan Email Anggota"
              disabled={!isEditMode}
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Label>Link <span className="font-bold">Github*</span></Label>
            <EditableInput
              register={register}
              name={`member${num}Github`}
              placeholder="Masukan Link Github"
              disabled={!isEditMode}
              className={inputClassName}
            />
            <p className="text-xs text-left text-white/50">*Opsional</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Berkas Persyaratan*</Label>
            <EditableInput
              register={register}
              name={`member${num}RequirementLink`}
              type="url"
              placeholder="Link Gdrive"
              disabled={!isEditMode}
              className={inputClassName}
            />
            <p className="text-white/50 text-xs max-w-xs text-end">
              *Masukan Screenshot hasil Persyaratan dalam satu drive, kemudian kumpulkan.
            </p>
          </div>
        </div>
      ))}

      {isEditMode && (
        <div className="w-full flex items-center justify-center">
          <Button className="bg-white/10 hover:bg-pink-600 text-white flex items-center rounded-full !p-6">
            <Plus className="mr-2" /> Add Team Member
          </Button>
        </div>
      )}
    </div>
  );
}
