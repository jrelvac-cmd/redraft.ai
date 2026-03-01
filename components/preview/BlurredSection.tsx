"use client";

import { Lock } from "lucide-react";
import { ReactNode } from "react";

interface BlurredSectionProps {
  children: ReactNode;
  isLocked: boolean;
  onUnlock: () => void;
}

export function BlurredSection({
  children,
  isLocked,
  onUnlock,
}: BlurredSectionProps) {
  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="blur-md pointer-events-none select-none">{children}</div>
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-card border border-border rounded-xl shadow-lg max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Section verrouillée</h3>
          <p className="text-muted-foreground">
            Déverrouillez votre landing page pour accéder à toutes les sections
            et au code exportable
          </p>
          <button
            onClick={onUnlock}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Déverrouiller pour 19€
          </button>
        </div>
      </div>
    </div>
  );
}
