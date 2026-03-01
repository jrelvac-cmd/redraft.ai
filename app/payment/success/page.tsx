"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const projectId = searchParams.get("project_id");
          if (projectId) {
            router.push(`/generator/${projectId}/editor`);
          } else {
            router.push("/dashboard");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Paiement réussi !</h1>
          <p className="text-lg text-muted-foreground">
            Votre landing page a été déverrouillée avec succès
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <p>Redirection dans {countdown} secondes...</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Vous allez être redirigé vers l'éditeur
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Vous pouvez maintenant :
          </p>
          <ul className="text-sm space-y-1">
            <li>✓ Éditer toutes les sections</li>
            <li>✓ Exporter le code Next.js/Tailwind</li>
            <li>✓ Regénérer les sections avec l'IA</li>
          </ul>
        </div>

        <button
          onClick={() => {
            const projectId = searchParams.get("project_id");
            if (projectId) {
              router.push(`/generator/${projectId}/editor`);
            } else {
              router.push("/dashboard");
            }
          }}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Accéder à l'éditeur maintenant
        </button>
      </div>
    </div>
  );
}
