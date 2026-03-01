"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Zap, DollarSign, Award, Smile, Shield, Sparkles } from "lucide-react";

interface QuestionMarketingProps {
  initialAngle?: string;
  initialHeadline?: string;
  suggestedHeadlines?: string[];
  autoDetected?: boolean;
  onSubmit: (data: { marketingAngle: string; headline: string }) => void;
  onSkip?: () => void;
}

export function QuestionMarketing({
  initialAngle = "",
  initialHeadline = "",
  suggestedHeadlines = [],
  autoDetected = false,
  onSubmit,
  onSkip,
}: QuestionMarketingProps) {
  const [marketingAngle, setMarketingAngle] = useState(initialAngle);
  const [headline, setHeadline] = useState(initialHeadline);
  const [customHeadline, setCustomHeadline] = useState("");

  useEffect(() => {
    if (initialAngle) setMarketingAngle(initialAngle);
    if (initialHeadline) setHeadline(initialHeadline);
  }, [initialAngle, initialHeadline]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalHeadline = headline === "custom" ? customHeadline : headline;
    if (marketingAngle && finalHeadline) {
      onSubmit({ marketingAngle, headline: finalHeadline });
    }
  };

  const angles = [
    {
      value: "time",
      label: "Gain de temps",
      icon: Zap,
      description: "Votre produit fait gagner du temps",
    },
    {
      value: "money",
      label: "Économie d'argent",
      icon: DollarSign,
      description: "Votre produit réduit les coûts",
    },
    {
      value: "status",
      label: "Status/Prestige",
      icon: Award,
      description: "Votre produit améliore l'image",
    },
    {
      value: "simplicity",
      label: "Simplicité",
      icon: Smile,
      description: "Votre produit est facile à utiliser",
    },
    {
      value: "security",
      label: "Sécurité",
      icon: Shield,
      description: "Votre produit protège les données",
    },
    {
      value: "fun",
      label: "Fun",
      icon: Sparkles,
      description: "Votre produit est agréable",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Quel est votre angle marketing principal ?</h2>
        <p className="text-muted-foreground">
          Choisissez le bénéfice principal que vous souhaitez mettre en avant
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <label className="text-sm font-medium">Angle marketing</label>
            {autoDetected && (
              <Badge variant="secondary" className="text-xs">
                Détecté automatiquement
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {angles.map((angle) => {
              const Icon = angle.icon;
              return (
                <button
                  key={angle.value}
                  type="button"
                  onClick={() => setMarketingAngle(angle.value)}
                  className={`p-4 border rounded-lg text-left transition-all ${
                    marketingAngle === angle.value
                      ? "border-primary bg-primary/5 ring-2 ring-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{angle.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {angle.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {marketingAngle && (
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Choisissez votre headline (H1)
            </label>
            {suggestedHeadlines.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Suggestions générées par IA :
                </p>
                {suggestedHeadlines.map((suggested, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setHeadline(suggested)}
                    className={`w-full p-4 border rounded-lg text-left transition-all ${
                      headline === suggested
                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="text-sm">{suggested}</p>
                  </button>
                ))}
              </div>
            )}
            <div>
              <button
                type="button"
                onClick={() => setHeadline("custom")}
                className={`w-full p-4 border rounded-lg text-left transition-all mb-2 ${
                  headline === "custom"
                    ? "border-primary bg-primary/5 ring-2 ring-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <p className="text-sm font-medium">Écrire mon propre H1</p>
              </button>
              {headline === "custom" && (
                <input
                  type="text"
                  value={customHeadline}
                  onChange={(e) => setCustomHeadline(e.target.value)}
                  placeholder="Entrez votre headline..."
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="px-6 py-3 border rounded-md hover:bg-accent transition-colors"
          >
            Passer cette étape
          </button>
        )}
        <button
          type="submit"
          disabled={
            !marketingAngle ||
            !headline ||
            (headline === "custom" && !customHeadline.trim())
          }
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium ml-auto"
        >
          Continuer
        </button>
      </div>
    </form>
  );
}
