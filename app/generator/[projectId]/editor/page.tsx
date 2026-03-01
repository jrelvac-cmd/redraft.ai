"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEditorStore } from "@/hooks/useEditorStore";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { CodeExportModal } from "@/components/editor/CodeExportModal";
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
import { Loader2 } from "lucide-react";
import type { Project } from "@/types";

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const supabase = createClient();

  const {
    aiData,
    selectedSection,
    hasUnsavedChanges,
    setAiData,
    setSelectedSection,
    updateSection,
    markSaved,
  } = useEditorStore();

  const [project, setProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/auth/login?next=/generator/${projectId}/editor`);
      return;
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", user.id)
      .single();

    if (error || !data) {
      router.push("/dashboard");
      return;
    }

    if (data.status !== "unlocked") {
      router.push(`/generator/${projectId}/preview`);
      return;
    }

    setProject(data as Project);

    if (data.ai_data) {
      setAiData(data.ai_data);
    }
  };

  const handleSave = async () => {
    if (!aiData) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("projects")
        .update({
          ai_data: aiData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", projectId);

      if (error) {
        throw error;
      }

      markSaved();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Erreur lors de la sauvegarde. Veuillez réessayer.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRegenerate = async (section: string) => {
    setIsRegenerating(true);
    try {
      const response = await fetch("/api/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, section }),
      });

      if (!response.ok) {
        throw new Error("Failed to regenerate");
      }

      const { aiData: newAiData } = await response.json();
      setAiData(newAiData);
      markSaved();
    } catch (error) {
      console.error("Error regenerating:", error);
      alert("Erreur lors de la regénération. Veuillez réessayer.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handlePreview = () => {
    if (hasUnsavedChanges) {
      if (
        confirm(
          "Vous avez des modifications non sauvegardées. Voulez-vous sauvegarder avant de prévisualiser ?"
        )
      ) {
        handleSave();
      }
    }
    window.open(`/generator/${projectId}/preview`, "_blank");
  };

  if (!project || !aiData) {
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
    <div className="h-screen flex flex-col bg-background">
      <EditorToolbar
        projectName={project.name}
        hasUnsavedChanges={hasUnsavedChanges}
        onExportCode={() => setIsExportModalOpen(true)}
        onPreview={handlePreview}
      />

      <div className="flex-1 flex overflow-hidden">
        <EditorSidebar
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
        />

        <EditorPanel
          section={selectedSection}
          aiData={aiData}
          onUpdate={updateSection}
          onRegenerate={handleRegenerate}
          onSave={handleSave}
          hasUnsavedChanges={hasUnsavedChanges}
          isSaving={isSaving}
        />

        <div className="flex-1 overflow-y-auto bg-muted/30">
          <div className="min-h-full">
            <HeroComponent
              headline={aiData.hero.headline}
              subheadline={aiData.hero.subheadline}
              ctaPrimary={aiData.hero.cta_primary}
              ctaSecondary={aiData.hero.cta_secondary}
              badge={aiData.hero.badge}
              mockupUrl={project.input_data?.uploaded_files?.[0]}
            />

            <Features
              features={aiData.features}
              title="Fonctionnalités"
              subtitle="Tout ce dont vous avez besoin"
            />

            <PainPoints
              painPoints={aiData.pain_points}
              title="Pourquoi nous choisir ?"
            />

            <SocialProof
              testimonials={aiData.social_proof}
              title="Ce que disent nos clients"
            />

            <FAQ faqs={aiData.faq} title="Questions fréquentes" />

            <CTASection
              headline={aiData.cta_section.headline}
              subheadline={aiData.cta_section.subheadline}
              cta={aiData.cta_section.cta}
            />

            <FooterSection
              productName={project.input_data?.productName || project.name}
              tagline={aiData.footer.tagline}
              legal={aiData.footer.legal}
              rgpdPlaceholder={aiData.footer.rgpd_placeholder}
            />
          </div>
        </div>
      </div>

      <CodeExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        projectId={projectId}
      />

      {isRegenerating && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-8 text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <p className="font-semibold">Regénération en cours...</p>
            <p className="text-sm text-muted-foreground">
              L'IA crée une nouvelle version
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
