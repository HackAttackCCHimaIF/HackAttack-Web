import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyableLink } from "@/components/CopyableLink";
import Image from "next/image";
import { EditableInput } from "./EditableInput";

const universities = [
  "Universitas Indonesia", "Institut Teknologi Bandung", "Universitas Gadjah Mada",
  "Institut Teknologi Sepuluh Nopember", "Telkom University", "Universitas Brawijaya",
  "Universitas Padjadjaran", "Universitas Airlangga"
];

interface TeamDetailsFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  isEditMode: boolean;
  inputClassName: string;
}

export function TeamDetailsForm({ register, isEditMode, inputClassName }: TeamDetailsFormProps) {
  return (
    <div className="space-y-6 flex flex-col">
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
          <SelectTrigger className="bg-white/10 w-full text-white placeholder:text-white/50 rounded-full px-6 py-6 border-1 border-white/10">
            <SelectValue placeholder="Pilih Instansi" />
          </SelectTrigger>
          <SelectContent>
            {universities.map((uni) => (
              <SelectItem key={uni} value={uni}>{uni}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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

      <CopyableLink label="Link GDrive (Twibbon Caption, dll)" text="https://drive.google.com/" />

      <div className="flex flex-col">
        <Label>Metode Pembayaran</Label>
        <p className="text-2xl font-bold">Rp250.000*</p>
        <p className="text-sm text-white/50">(Harga pendaftaran tergantung instansi asal Tim)</p>
        <Image src="/dashboard/QR.png" width={340} height={340} alt="QR" className="w-80 rounded-4xl border-10 border-white/10" />
        <CopyableLink label="BCA (Faiq Haqqani)" text="8895558571" />
        <CopyableLink label="BRI (Faiq Haqqani)" text="0131 0104 8271 507" />
      </div>
    </div>
  );
}
