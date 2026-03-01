"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface QuestionStructureProps {
  initialFramework?: string;
  recommendedFramework?: string;
  autoDetected?: boolean;
  onSubmit: (framework: string) => void;
}

export function QuestionStructure({
  initialFramework = "",
  recommendedFramework,
  autoDetected = false,
  onSubmit,
}: QuestionStructureProps) {
  const [framework, setFramework] = useState(initialFramework || recommendedFramework || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (framework) {
      onSubmit(framework);
    }
  };

  const frameworks = [
    {
      value: "aida",
      name: "AIDA",
      fullName: "Attention - Intérêt - Désir - Action",
      description:
        "Idéal pour capter l'attention et créer le désir. Parfait pour les produits innovants.",
      bestFor: "Produits nouveaux ou disruptifs",
    },
    {
      value: "pas",
      name: "PAS",
      fullName: "Problème - Agitation - Solution",
      description:
        "Met l'accent sur les pain points. Excellent pour les produits qui résolvent un problème clair.",
      bestFor: "Produits qui résolvent un problème spécifique",
    },
    {
      value: "benefit",
      name: "Benefit-First",
      fullName: "Bénéfices d'abord",
      description:
        "Commence directement par les bénéfices. Idéal pour les produits avec une valeur évidente.",
      bestFor: "Produits avec une proposition de valeur claire",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">
          Quelle structure pour votre copywriting ?
        </h2>
        <p className="text-muted-foreground">
          Choisissez le framework qui correspond le mieux à votre produit
        </p>
      </div>

      <div className="space-y-3">
        {frameworks.map((fw) => (
          <button
            key={fw.value}
            type="button"
            onClick={() => setFramework(fw.value)}
            className={`w-full p-6 border rounded-lg text-left transition-all ${
              framework === fw.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">{fw.name}</p>
                  {recommendedFramework === fw.value && (
                    <Badge variant="secondary" className="text-xs">
                      Recommandé par l'IA
                    </Badge>
                  )}
                </div>
                {framework === fw.value && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{fw.fullName}</p>
              <p className="text-sm">{fw.description}</p>
              <p className="text-xs text-muted-foreground mt-2">
                ✓ {fw.bestFor}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!framework}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Continuer
        </button>
      </div>
    </form>
  );
}
