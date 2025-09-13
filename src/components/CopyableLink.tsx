"use client";

import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import { Copy } from "lucide-react";

interface CopyableLinkProps {
  label?: string;
  text: string;
  className?: string;
  disabled?: boolean; // ✅ Optional prop
}

export function CopyableLink({ label, text, className, disabled = false }: CopyableLinkProps) {
  const { isCopying, copy } = useCopyToClipboard();

  // Split label into bold part and normal part
  const renderLabel = (labelText: string) => {
    const [boldPart, ...rest] = labelText.split("(");
    return (
      <span>
        <span className="font-bold">{boldPart.trim()}</span>
        {rest.length > 0 && ` (${rest.join("(")}`}
      </span>
    );
  };

  const handleCopy = (e?: React.MouseEvent) => {
    if (disabled) return;
    if (e) e.stopPropagation();
    copy(text);
  };

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="text-sm font-medium">
          {renderLabel(label)}
        </label>
      )}
      <div
        className={`relative max-w-full flex items-center gap-3 py-4 rounded-full px-6 ${
          disabled
            ? "bg-white/5 text-white/40 cursor-not-allowed"
            : "bg-white/10 hover:bg-white/20 cursor-pointer"
        } ${className}`}
        onClick={handleCopy}
      >
        <span className={`text-sm truncate select-text pr-10 ${disabled ? "select-none" : ""}`}>
          {text}
        </span>

        {/* Copy Button */}
        {!disabled && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/20 rounded-lg"
            onClick={handleCopy}
          >
            {isCopying ? (
              <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Copy className="size-4 text-white" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
