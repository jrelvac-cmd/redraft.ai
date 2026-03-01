"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

interface QuestionLogoProps {
  initialLogo?: string;
  onSubmit: (logo: File | null) => void;
  onSkip: () => void;
}

export function QuestionLogo({
  initialLogo,
  onSubmit,
  onSkip,
}: QuestionLogoProps) {
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialLogo || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Le fichier ne doit pas dépasser 5 MB");
        return;
      }

      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setLogo(null);
    setPreview(null);
  };

  const handleSubmit = () => {
    onSubmit(logo);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Avez-vous un logo ?</h2>
        <p className="text-muted-foreground">
          Uploadez votre logo ou passez cette étape. Nous utiliserons la
          première lettre de votre produit si vous n'en avez pas.
        </p>
      </div>

      <div className="space-y-4">
        {!preview ? (
          <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/png,image/svg+xml,image/jpeg"
              onChange={handleFileChange}
              className="hidden"
              id="logo-upload"
            />
            <label htmlFor="logo-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">
                Cliquez pour uploader votre logo
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, SVG ou JPEG • Max 5 MB
              </p>
            </label>
          </div>
        ) : (
          <div className="relative border rounded-lg p-8 flex items-center justify-center bg-muted/20">
            <img
              src={preview}
              alt="Logo preview"
              className="max-h-32 max-w-full object-contain"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
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
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
