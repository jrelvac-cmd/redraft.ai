"use client";

import { useState } from "react";

interface QuestionTypographyProps {
  initialFont?: string;
  onSubmit: (font: string) => void;
  onSkip: () => void;
}

const fonts = [
  {
    name: "Inter",
    description: "Moderne et polyvalente",
    className: "font-sans",
  },
  {
    name: "Cal Sans",
    description: "Géométrique et distinctive",
    className: "font-sans",
  },
  {
    name: "DM Sans",
    description: "Élégante et lisible",
    className: "font-sans",
  },
  {
    name: "Syne",
    description: "Audacieuse et contemporaine",
    className: "font-sans",
  },
  {
    name: "Plus Jakarta Sans",
    description: "Douce et professionnelle",
    className: "font-sans",
  },
];

export function QuestionTypography({
  initialFont = "Inter",
  onSubmit,
  onSkip,
}: QuestionTypographyProps) {
  const [selectedFont, setSelectedFont] = useState(initialFont);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedFont);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Choisissez votre typographie</h2>
        <p className="text-muted-foreground">
          La police principale qui sera utilisée sur votre landing page
        </p>
      </div>

      <div className="space-y-3">
        {fonts.map((font) => (
          <button
            key={font.name}
            type="button"
            onClick={() => setSelectedFont(font.name)}
            className={`w-full p-6 border rounded-lg text-left transition-all ${
              selectedFont === font.name
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className={`text-xl font-semibold ${font.className}`}>
                  {font.name}
                </p>
                {selectedFont === font.name && (
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
              <p className="text-sm text-muted-foreground">
                {font.description}
              </p>
              <p className={`text-base ${font.className}`}>
                Aa Bb Cc 123 — The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </button>
        ))}
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
