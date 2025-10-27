"use client";

import { Button } from "@/components/ui/button";
import { Check, Edit } from "lucide-react";

interface EditButtonProps {
  isEditMode: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const EditButton = ({ isEditMode, onToggle, disabled = false }: EditButtonProps) => {
  return (
    <Button
      onClick={onToggle}
      disabled={disabled}
      size="sm"
      className={`flex items-center gap-2 rounded-full px-3 py-2 ${
        isEditMode
          ? "bg-pink-600/50 hover:bg-pink-700/80 text-white"
          : "bg-white/10 hover:bg-white/20 text-white"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isEditMode ? (
        <div className="flex items-center gap-2">
          <Check size={14} className="text-white" />
          <span className="text-sm">Save</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Edit size={14} className="text-white" />
          <span className="text-sm">Edit</span>
        </div>
      )}
    </Button>
  );
};