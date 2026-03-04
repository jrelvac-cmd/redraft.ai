"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

type Language = "fr" | "en";

interface LanguageToggleProps {
  onLanguageChange: (language: Language) => void;
  variant?: "light" | "dark";
}

export function LanguageToggle({ onLanguageChange, variant = "dark" }: LanguageToggleProps) {
  const [language, setLanguage] = useState<Language>("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "fr" || saved === "en")) {
      setLanguage(saved);
      onLanguageChange(saved);
    }
  }, [onLanguageChange]);

  const handleToggle = () => {
    const newLanguage: Language = language === "fr" ? "en" : "fr";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    onLanguageChange(newLanguage);
  };

  if (!mounted) return null;

  const isDark = variant === "dark";
  const buttonClass = isDark
    ? "flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition text-sm font-medium text-slate-700"
    : "flex items-center gap-2 px-4 py-2 rounded-lg border border-white/40 bg-white/5 hover:bg-white/15 transition text-sm font-semibold text-white";

  return (
    <button
      onClick={handleToggle}
      className={buttonClass}
      aria-label="Toggle language"
      style={variant === "light" ? { boxShadow: "0 0 15px rgba(255,255,255,0.15)" } : undefined}
    >
      <span>{language === "fr" ? "FR" : "EN"}</span>
    </button>
  );
}
