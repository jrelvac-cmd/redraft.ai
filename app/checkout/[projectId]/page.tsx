"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Check, Loader2 } from "lucide-react";
import type { Project } from "@/types";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const supabase = createClient();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, [projectId]);

  const loadData = async () => {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    if (!currentUser) {
      router.push(`/auth/login?next=/checkout/${projectId}`);
      return;
    }

    setUser(currentUser);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", currentUser.id)
      .single();

    if (error || !data) {
      router.push("/dashboard");
      return;
    }

    setProject(data as Project);

    if (data.status === "unlocked") {
      router.push(`/generator/${projectId}/editor`);
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          type: "unlock",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout");
      }

      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating checkout:", error);
      alert("Erreur lors de la création du paiement. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  if (!project || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Déverrouillez votre landing page
          </h1>
          <p className="text-lg text-muted-foreground">
            Accédez à toutes les sections et au code exportable
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Votre projet</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Nom du projet</p>
                <p className="font-semibold">{project.name}</p>
              </div>
              {project.input_data?.productName && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    Nom du produit
                  </p>
                  <p className="font-semibold">
                    {project.input_data.productName}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Statut</p>
                <p className="font-semibold">Preview (verrouillé)</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Paiement unique
              </p>
              <p className="text-5xl font-bold mb-1">19€</p>
              <p className="text-sm text-muted-foreground">
                Déverrouillage à vie
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Accès complet à toutes les sections de votre landing page
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Code Next.js/Tailwind/TypeScript exportable
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Éditeur visuel pour personnaliser</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Regénération illimitée des sections</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Propriété complète du code généré</p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Redirection...
                </>
              ) : (
                "Payer 19€"
              )}
            </button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Paiement sécurisé par Lemon Squeezy
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => router.push(`/generator/${projectId}/preview`)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Retour à la preview
          </button>
        </div>
      </div>
    </div>
  );
}
