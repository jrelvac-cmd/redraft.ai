"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BlurredSection } from "@/components/preview/BlurredSection";
import {
  HeroCentered,
  HeroSplit,
  HeroFullWidth,
  Features,
  PainPoints,
  SocialProof,
  FAQ,
  CTASection,
  FooterSection,
} from "@/components/puzzle-pieces";
import { Sparkles, Loader2, Edit } from "lucide-react";
import type { Project, AIGeneratedData } from "@/types";

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const supabase = createClient();

  const [project, setProject] = useState<Project | null>(null);
  const [aiData, setAiData] = useState<AIGeneratedData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (error || !data) {
      router.push("/dashboard");
      return;
    }

    setProject(data as Project);
    setIsLocked(data.status !== "unlocked");

    if (data.ai_data) {
      setAiData(data.ai_data as AIGeneratedData);
    } else {
      generatePage();
    }
  };

  const generatePage = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => Math.min(prev + 10, 90));
    }, 1000);

    try {
      const response = await fetch("/api/generate-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error("Failed to generate page");
      }

      const { aiData: newAiData } = await response.json();
      setAiData(newAiData);
      setGenerationProgress(100);
    } catch (error) {
      console.error("Error generating page:", error);
      clearInterval(progressInterval);
      alert("Erreur lors de la génération. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUnlock = () => {
    router.push(`/checkout/${projectId}`);
  };

  const handleEdit = () => {
    router.push(`/generator/${projectId}/editor`);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative">
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
            <Sparkles className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Génération en cours...</h2>
            <p className="text-muted-foreground">
              L'IA crée votre landing page professionnelle
            </p>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${generationProgress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {generationProgress}% complété
          </p>
        </div>
      </div>
    );
  }

  if (!aiData || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const HeroComponent =
    project.input_data?.heroVariant === "v2"
      ? HeroSplit
      : project.input_data?.heroVariant === "v3"
      ? HeroFullWidth
      : HeroCentered;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">{project.name}</h1>
            {isLocked && (
              <span className="px-3 py-1 bg-muted text-sm rounded-full">
                Preview
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {!isLocked && (
              <button
                onClick={handleEdit}
                className="px-6 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Éditer
              </button>
            )}
            {isLocked && (
              <button
                onClick={handleUnlock}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Déverrouiller pour 19€
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <HeroComponent
          headline={aiData.hero.headline}
          subheadline={aiData.hero.subheadline}
          ctaPrimary={aiData.hero.cta_primary}
          ctaSecondary={aiData.hero.cta_secondary}
          badge={aiData.hero.badge}
          mockupUrl={project.input_data?.uploaded_files?.[0]}
        />

        <BlurredSection isLocked={isLocked} onUnlock={handleUnlock}>
          <Features
            features={aiData.features}
            title="Fonctionnalités"
            subtitle="Tout ce dont vous avez besoin pour réussir"
          />
        </BlurredSection>

        <BlurredSection isLocked={isLocked} onUnlock={handleUnlock}>
          <PainPoints
            painPoints={aiData.pain_points}
            title="Pourquoi choisir notre solution ?"
          />
        </BlurredSection>

        <BlurredSection isLocked={isLocked} onUnlock={handleUnlock}>
          <SocialProof
            testimonials={aiData.social_proof}
            title="Ce que disent nos clients"
          />
        </BlurredSection>

        <BlurredSection isLocked={isLocked} onUnlock={handleUnlock}>
          <FAQ faqs={aiData.faq} title="Questions fréquentes" />
        </BlurredSection>

        <BlurredSection isLocked={isLocked} onUnlock={handleUnlock}>
          <CTASection
            headline={aiData.cta_section.headline}
            subheadline={aiData.cta_section.subheadline}
            cta={aiData.cta_section.cta}
          />
        </BlurredSection>

        <FooterSection
          productName={project.input_data?.productName || project.name}
          tagline={aiData.footer.tagline}
          legal={aiData.footer.legal}
          rgpdPlaceholder={aiData.footer.rgpd_placeholder}
        />
      </div>
    </div>
  );
}
