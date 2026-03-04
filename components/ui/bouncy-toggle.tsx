"use client"

import { useState } from "react"

interface BoucyToggleProps {
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  leftLabel?: string
  rightLabel?: string
}

export function BoucyToggle({ defaultChecked = false, onChange, leftLabel = "FR", rightLabel = "EN" }: BoucyToggleProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  const handleToggle = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    onChange?.(newValue)
  }

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all font-medium text-sm text-white"
      style={{
        boxShadow: "0 0 15px rgba(255,255,255,0.15)"
      }}
    >
      <span className={isChecked ? "text-white/40" : "text-white"}>
        {leftLabel}
      </span>
      <div className="w-px h-4 bg-white/20" />
      <span className={isChecked ? "text-white" : "text-white/40"}>
        {rightLabel}
      </span>
    </button>
  )
}
