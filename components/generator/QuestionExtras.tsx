"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface QuestionExtrasProps {
  initialCompetitors?: string[];
  initialVideoUrl?: string;
  initialEmailIntegration?: string;
  autoDetected?: boolean;
  onSubmit: (data: {
    competitors: string[];
    videoUrl: string;
    emailIntegration: string;
  }) => void;
  onSkip: () => void;
}

export function QuestionExtras({
  initialCompetitors = [],
  initialVideoUrl = "",
  initialEmailIntegration = "none",
  autoDetected = false,
  onSubmit,
  onSkip,
}: QuestionExtrasProps) {
  const [competitors, setCompetitors] = useState(initialCompetitors.join(", "));
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
  const [emailIntegration, setEmailIntegration] = useState(initialEmailIntegration);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      competitors: competitors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      videoUrl: videoUrl.trim(),
      emailIntegration,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Informations complémentaires</h2>
        <p className="text-muted-foreground">
          Ces informations aideront l'IA à mieux positionner votre produit
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="competitors" className="text-sm font-medium">
              Concurrents (optionnel)
            </label>
            {autoDetected && initialCompetitors.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                Détectés automatiquement
              </Badge>
            )}
          </div>
          <input
            id="competitors"
            type="text"
            value={competitors}
            onChange={(e) => setCompetitors(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ex: Notion, Asana, Monday"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Séparez les noms par des virgules
          </p>
        </div>

        <div>
          <label htmlFor="videoUrl" className="text-sm font-medium block mb-2">
            URL de vidéo démo (optionnel)
          </label>
          <input
            id="videoUrl"
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://youtube.com/watch?v=..."
          />
          <p className="text-xs text-muted-foreground mt-1">
            YouTube ou Loom uniquement
          </p>
        </div>

        <div>
          <label className="text-sm font-medium block mb-3">
            Intégration email (optionnel)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setEmailIntegration("none")}
              className={`p-4 border rounded-lg text-left transition-all ${
                emailIntegration === "none"
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="text-sm font-medium">Aucune</p>
            </button>
            <button
              type="button"
              onClick={() => setEmailIntegration("mailchimp")}
              className={`p-4 border rounded-lg text-left transition-all ${
                emailIntegration === "mailchimp"
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="text-sm font-medium">Mailchimp</p>
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
