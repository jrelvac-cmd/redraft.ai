"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Zap, Code, Check } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleStart = () => {
    if (description.trim()) {
      localStorage.setItem("initial_description", description);
      router.push("/generator");
    } else {
      router.push("/generator");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Redraft.AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Propulsé par Claude 3.5 Sonnet + GPT-4o
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Créez des landing pages{" "}
            <span className="text-primary">haute performance</span> en quelques
            minutes
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Décrivez votre SaaS, et notre IA génère une landing page
            professionnelle avec copywriting optimisé + code Next.js/Tailwind
            prêt à déployer.
          </p>

          <div className="max-w-2xl mx-auto bg-card border rounded-lg p-6 shadow-lg">
            <label className="block text-left text-sm font-medium mb-3">
              Décrivez votre SaaS en quelques phrases
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Un outil qui transforme les réunions Zoom en résumés actionnables pour les managers. On analyse automatiquement les conversations, extrait les points clés et génère des todo lists..."
              className="w-full h-32 px-4 py-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleStart}
              className="mt-4 w-full py-3 px-6 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Créer ma landing page
            </button>
            <p className="mt-2 text-xs text-muted-foreground text-center">
              Gratuit pour voir le Hero • 19€ pour débloquer la page complète
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 border-t">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi Redraft.AI ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Design professionnel</h3>
              <p className="text-muted-foreground">
                Jamais de look générique IA. Chaque page est unique, moderne et
                optimisée pour la conversion.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Code propre exportable</h3>
              <p className="text-muted-foreground">
                Obtenez du code Next.js/Tailwind prêt à coller dans Cursor.
                Aucun lock-in propriétaire.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Copywriting optimisé</h3>
              <p className="text-muted-foreground">
                Claude analyse votre idée et génère un copywriting qui
                convertit, basé sur les frameworks AIDA, PAS, Benefit-First.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 border-t">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">
                Puis-je modifier la page générée ?
              </h3>
              <p className="text-muted-foreground">
                Oui ! Après génération, vous accédez à un éditeur visuel pour
                ajuster les textes, couleurs et espacements. Le code exporté
                reflète vos modifications.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">
                Quel est le format du code exporté ?
              </h3>
              <p className="text-muted-foreground">
                Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer
                Motion. Chaque section est un composant indépendant, prêt à
                être collé dans votre projet.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">
                Les images sont-elles générées par IA ?
              </h3>
              <p className="text-muted-foreground">
                Non. Vous uploadez vos propres images (logo, screenshots,
                mockups). L'IA analyse leur style pour harmoniser le design.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Redraft.AI. Tous droits réservés.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
