"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Une erreur est survenue</h1>
          <p className="text-muted-foreground">
            Nous sommes désolés, quelque chose s'est mal passé.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-mono">
            {error.message || "Erreur inconnue"}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Réessayer
          </button>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            Retour au dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
