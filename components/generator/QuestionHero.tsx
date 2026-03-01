"use client";

import { useState } from "react";

interface QuestionHeroProps {
  initialVariant?: string;
  onSubmit: (variant: string) => void;
}

export function QuestionHero({
  initialVariant = "",
  onSubmit,
}: QuestionHeroProps) {
  const [variant, setVariant] = useState(initialVariant);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (variant) {
      onSubmit(variant);
    }
  };

  const heroVariants = [
    {
      value: "v1",
      name: "Hero Centré",
      description: "Headline + sous-titre + CTAs + mockup en dessous",
      preview: (
        <div className="border rounded-lg p-4 bg-background space-y-3">
          <div className="h-2 bg-muted rounded w-3/4 mx-auto" />
          <div className="h-1.5 bg-muted rounded w-1/2 mx-auto" />
          <div className="flex gap-2 justify-center">
            <div className="h-8 bg-primary/20 rounded w-20" />
            <div className="h-8 bg-muted rounded w-20" />
          </div>
          <div className="h-32 bg-muted rounded mt-4" />
        </div>
      ),
    },
    {
      value: "v2",
      name: "Hero Split",
      description: "Texte à gauche, visuel à droite (50/50)",
      preview: (
        <div className="border rounded-lg p-4 bg-background">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded w-full" />
              <div className="h-1.5 bg-muted rounded w-3/4" />
              <div className="h-8 bg-primary/20 rounded w-24 mt-3" />
            </div>
            <div className="h-32 bg-muted rounded" />
          </div>
        </div>
      ),
    },
    {
      value: "v3",
      name: "Hero Full-Width",
      description: "Gradient background, texte centré, CTA proéminent",
      preview: (
        <div className="border rounded-lg p-4 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="space-y-3">
            <div className="h-2 bg-muted rounded w-2/3 mx-auto" />
            <div className="h-1.5 bg-muted rounded w-1/2 mx-auto" />
            <div className="h-10 bg-primary/30 rounded w-32 mx-auto mt-4" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Choisissez votre style de Hero</h2>
        <p className="text-muted-foreground">
          Le Hero est la première section que vos visiteurs verront
        </p>
      </div>

      <div className="space-y-4">
        {heroVariants.map((hv) => (
          <button
            key={hv.value}
            type="button"
            onClick={() => setVariant(hv.value)}
            className={`w-full p-6 border rounded-lg text-left transition-all ${
              variant === hv.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold">{hv.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {hv.description}
                  </p>
                </div>
                {variant === hv.value && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
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
              {hv.preview}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!variant}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Continuer
        </button>
      </div>
    </form>
  );
}
