"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface QuestionColorsProps {
  initialPalette?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  initialMode?: "dark" | "light";
  analyzedColors?: string[];
  autoDetected?: boolean;
  onSubmit: (data: {
    palette: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    mode: "dark" | "light";
  }) => void;
  onSkip: () => void;
}

const predefinedPalettes = {
  darkPremium: {
    name: "Dark Premium",
    primary: "#6366F1",
    secondary: "#8B5CF6",
    accent: "#EC4899",
    background: "#0F172A",
    text: "#F1F5F9",
  },
  lightMinimal: {
    name: "Light Minimal",
    primary: "#18181B",
    secondary: "#52525B",
    accent: "#3B82F6",
    background: "#FFFFFF",
    text: "#18181B",
  },
  colorfulSaas: {
    name: "Coloré SaaS",
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    accent: "#F59E0B",
    background: "#FFFFFF",
    text: "#1F2937",
  },
  neonTech: {
    name: "Néon Tech",
    primary: "#10B981",
    secondary: "#06B6D4",
    accent: "#F59E0B",
    background: "#111827",
    text: "#F9FAFB",
  },
};

export function QuestionColors({
  initialPalette,
  initialMode = "light",
  analyzedColors,
  autoDetected = false,
  onSubmit,
  onSkip,
}: QuestionColorsProps) {
  const [selectedPalette, setSelectedPalette] = useState<string>("lightMinimal");
  const [mode, setMode] = useState<"dark" | "light">(initialMode);
  const [customPalette, setCustomPalette] = useState(
    initialPalette || predefinedPalettes.lightMinimal
  );

  useEffect(() => {
    if (analyzedColors && analyzedColors.length >= 3 && autoDetected) {
      setCustomPalette({
        primary: analyzedColors[0],
        secondary: analyzedColors[1],
        accent: analyzedColors[2],
        background: mode === "dark" ? "#0F172A" : "#FFFFFF",
        text: mode === "dark" ? "#F1F5F9" : "#18181B",
      });
      setSelectedPalette("analyzed");
    }
  }, [analyzedColors, autoDetected, mode]);

  const handlePaletteSelect = (paletteKey: string) => {
    setSelectedPalette(paletteKey);
    if (paletteKey !== "custom" && paletteKey !== "analyzed") {
      setCustomPalette(
        predefinedPalettes[paletteKey as keyof typeof predefinedPalettes]
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ palette: customPalette, mode });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Choisissez votre palette de couleurs</h2>
        <p className="text-muted-foreground">
          Sélectionnez une palette prédéfinie ou personnalisez les couleurs
        </p>
      </div>

      <div className="space-y-6">
        {analyzedColors && analyzedColors.length >= 3 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm font-medium">Palette détectée</label>
              <Badge variant="secondary" className="text-xs">
                Extraite de vos images
              </Badge>
            </div>
            <button
              type="button"
              onClick={() => handlePaletteSelect("analyzed")}
              className={`w-full p-4 border rounded-lg transition-all ${
                selectedPalette === "analyzed"
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex gap-2">
                {analyzedColors.slice(0, 5).map((color, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-md border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-3 block">
            Palettes prédéfinies
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(predefinedPalettes).map(([key, palette]) => (
              <button
                key={key}
                type="button"
                onClick={() => handlePaletteSelect(key)}
                className={`p-4 border rounded-lg transition-all ${
                  selectedPalette === key
                    ? "border-primary bg-primary/5 ring-2 ring-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <p className="text-sm font-medium mb-2">{palette.name}</p>
                <div className="flex gap-2">
                  <div
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: palette.primary }}
                  />
                  <div
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: palette.secondary }}
                  />
                  <div
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: palette.accent }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block">Mode</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMode("light")}
              className={`flex-1 p-4 border rounded-lg transition-all ${
                mode === "light"
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="text-sm font-medium">Mode Clair</p>
            </button>
            <button
              type="button"
              onClick={() => setMode("dark")}
              className={`flex-1 p-4 border rounded-lg transition-all ${
                mode === "dark"
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="text-sm font-medium">Mode Sombre</p>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onSkip}
          className="px-6 py-3 border rounded-md hover:bg-accent transition-colors"
        >
          Passer cette étape
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
        >
          Continuer
        </button>
      </div>
    </form>
  );
}
