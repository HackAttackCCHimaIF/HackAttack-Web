import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utility/utils";

interface EditableInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  type?: string;
  error?: string;
  label?: string;
}

export const EditableInput = ({
  register,
  name,
  placeholder,
  disabled = false,
  className = "",
  type = "text",
  error,
  label,
  ...props
}: EditableInputProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && <span className="text-white text-sm">{label}</span>}

      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "text-white placeholder:text-white/40 border-white/20 bg-black/40 backdrop-blur-md",
            error && "border-red-500 focus-visible:ring-red-500/40",
            disabled && "opacity-60 cursor-not-allowed",
            className
          )}
          {...register(name)}
          {...props}
        />

        {!disabled && (
          <Pencil
            size={16}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none"
          />
        )}
      </div>

      {error && (
        <span className="text-red-400 text-xs ml-1 animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
};
