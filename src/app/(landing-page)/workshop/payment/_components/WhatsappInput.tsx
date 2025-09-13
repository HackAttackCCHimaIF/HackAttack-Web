/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

interface WhatsappInputProps {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  type?: string;
  [key: string]: any;
}

export const WhatsappInput = ({
  placeholder = "xxx xxx xxx", 
  disabled = false,
  className = "",
  type = "text",
  ...props
}: WhatsappInputProps) => {
  return (
    <div className="relative">
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`${className} ${disabled ? "opacity-60" : ""}`}
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
