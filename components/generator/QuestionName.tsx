"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface QuestionNameProps {
  initialName?: string;
  initialObjective?: string;
  autoDetected?: boolean;
  onSubmit: (data: { productName: string; objective: string }) => void;
  onSkip?: () => void;
}

export function QuestionName({
  initialName = "",
  initialObjective = "",
  autoDetected = false,
  onSubmit,
  onSkip,
}: QuestionNameProps) {
  const [productName, setProductName] = useState(initialName);
  const [objective, setObjective] = useState(initialObjective);

  useEffect(() => {
    if (initialName) setProductName(initialName);
    if (initialObjective) setObjective(initialObjective);
  }, [initialName, initialObjective]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName.trim() && objective) {
      onSubmit({ productName: productName.trim(), objective });
    }
  };

  const objectives = [
    { value: "email", label: "Capturer des emails (Waitlist)" },
    { value: "sell", label: "Vendre directement" },
    { value: "demo", label: "Obtenir des démos" },
    { value: "inform", label: "Informer" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Quel est le nom de votre produit ?</h2>
        <p className="text-muted-foreground">
          Ce sera le nom principal affiché sur votre landing page
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="productName" className="text-sm font-medium">
              Nom du produit
            </label>
            {autoDetected && (
              <Badge variant="secondary" className="text-xs">
                Détecté automatiquement
              </Badge>
            )}
          </div>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ex: MeetingAI"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Objectif principal de votre landing page
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {objectives.map((obj) => (
              <button
                key={obj.value}
                type="button"
                onClick={() => setObjective(obj.value)}
                className={`p-4 border rounded-lg text-left transition-all ${
                  objective === obj.value
                    ? "border-primary bg-primary/5 ring-2 ring-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="text-sm font-medium">{obj.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={!productName.trim() || !objective}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Continuer
        </button>
      </div>
    </form>
  );
}
