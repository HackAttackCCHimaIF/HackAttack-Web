import { InfoIcon, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utility/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  tooltip?: string;
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
  tooltip,
  ...props
}: EditableInputProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex items-center gap-2">
        {label && <span className="text-white text-sm">{label}</span>}
        {tooltip && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-white/60 hover:text-white"
                >
                  <InfoIcon className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs text-sm">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

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
