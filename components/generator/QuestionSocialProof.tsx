"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

interface QuestionSocialProofProps {
  onSubmit: (testimonials: any[] | null) => void;
  onSkip: () => void;
}

export function QuestionSocialProof({
  onSubmit,
  onSkip,
}: QuestionSocialProofProps) {
  const [useAI, setUseAI] = useState(true);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      setUseAI(false);
    } else {
      alert("Veuillez uploader un fichier CSV valide");
    }
  };

  const handleSubmit = () => {
    if (useAI) {
      onSubmit(null);
    } else if (csvFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split("\n").slice(1);
        const testimonials = lines
          .filter((line) => line.trim())
          .map((line) => {
            const [name, role, company, review, avatar_url] = line
              .split(",")
              .map((s) => s.trim());
            return { name, role, company, review, avatar_url };
          });
        onSubmit(testimonials);
      };
      reader.readAsText(csvFile);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Preuve sociale</h2>
        <p className="text-muted-foreground">
          Importez vos vrais témoignages ou laissez l'IA en générer des
          plausibles
        </p>
      </div>

      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setUseAI(true)}
          className={`w-full p-6 border rounded-lg text-left transition-all ${
            useAI
              ? "border-primary bg-primary/5 ring-2 ring-primary"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="space-y-2">
            <p className="font-semibold">Générer avec l'IA</p>
            <p className="text-sm text-muted-foreground">
              L'IA créera des témoignages fictifs mais plausibles basés sur
              votre produit
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setUseAI(false)}
          className={`w-full p-6 border rounded-lg text-left transition-all ${
            !useAI
              ? "border-primary bg-primary/5 ring-2 ring-primary"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="space-y-2">
            <p className="font-semibold">Importer mes témoignages</p>
            <p className="text-sm text-muted-foreground mb-3">
              Uploadez un fichier CSV avec vos vrais témoignages
            </p>
            {!useAI && (
              <div className="mt-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {csvFile ? csvFile.name : "Cliquez pour uploader un CSV"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Colonnes : name, role, company, review, avatar_url
                    </p>
                  </label>
                </div>
              </div>
            )}
          </div>
        </button>
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
          type="button"
          onClick={handleSubmit}
          disabled={!useAI && !csvFile}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
