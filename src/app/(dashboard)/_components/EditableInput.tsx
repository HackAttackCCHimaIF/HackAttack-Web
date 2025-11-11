/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utility/utils";

interface EditableInputProps {
  register: any;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  type?: string;
  error?: string; 
  [key: string]: any;
}

export const EditableInput = ({
  register,
  name,
  placeholder,
  disabled = false,
  className = "",
  type = "text",
  error,
  ...props
}: EditableInputProps) => {
  return (
    <div className="relative flex flex-col w-full">
      {/* === Input Field === */}
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          className,
          "transition-all duration-200",
          disabled && "opacity-60 cursor-not-allowed",
          error && "border-red-500/70 focus-visible:ring-red-500/40"
        )}
        {...register(name)}
        {...props}
      />

      {/* === Pencil Icon === */}
      {!disabled && (
        <Pencil
          size={16}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none"
        />
      )}

      {/* === Error Message === */}
      {error && (
        <span className="text-red-400 text-xs mt-1 ml-1 animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
};
