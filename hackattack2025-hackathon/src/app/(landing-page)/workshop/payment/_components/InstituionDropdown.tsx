"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utility/utils"

interface DropdownOption {
  label: string
  value: string
}

interface InstitutionDropdownProps {
  placeholder?: string
  options: DropdownOption[]
  selected: string[]
  onChange: (values: string[]) => void
}

export function InstitutionDropdown({
  placeholder = "Select an option",
  options,
  selected,
  onChange,
}: InstitutionDropdownProps) {
  const [open, setOpen] = React.useState(false)

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center justify-between text-sm transition-all w-full bg-white/10 text-white placeholder:text-white/50 rounded-full px-6 py-6 border border-white/10 pr-12",
          open ? "rounded-t-4xl rounded-b-none" : "rounded-4xl"
        )}
      >
        <span className="truncate text-white/80">
          {selected.length > 0
            ? options
                .filter((opt) => selected.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ")
            : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "ml-2 h-4 w-4 transition-transform text-white/50",
            open && "rotate-180"
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={cn(
          "w-[var(--radix-dropdown-menu-trigger-width)]",
          "rounded-b-2xl rounded-t-none border-t-0 bg-white/10 text-white border-white/10"
        )}
      >
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selected.includes(option.value)}
            onCheckedChange={() => handleToggle(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
