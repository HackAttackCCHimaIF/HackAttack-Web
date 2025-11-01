"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface LinkableFieldProps {
  label?: string;
  href: string;
  className?: string;
  disabled?: boolean;
  openInNewTab?: boolean;
}

export function LinkableField({
  label,
  href,
  className,
  disabled = false,
  openInNewTab = true,
}: LinkableFieldProps) {
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

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="text-sm font-medium">
          {renderLabel(label)}
        </label>
      )}

      <Link
        href={disabled ? "#" : href}
        target={openInNewTab ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className={`relative max-w-full flex items-center gap-3 py-4 rounded-full px-6 transition-all duration-200 ${
          disabled
            ? "bg-white/5 text-white/40 cursor-not-allowed"
            : "bg-white/10 hover:bg-white/20 cursor-pointer"
        } ${className}`}
        onClick={(e) => disabled && e.preventDefault()}
      >
        <span
          className={`text-sm truncate pr-10 ${
            disabled ? "select-none" : "select-text"
          }`}
        >
          {href}
        </span>

        {/* External link icon */}
        {!disabled && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/20 rounded-lg">
            <ExternalLink className="size-4 text-white" />
          </div>
        )}
      </Link>
    </div>
  );
}
