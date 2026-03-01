"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useGeneratorStore } from "@/hooks/useGeneratorStore";
import { analyzeInitialPrompt } from "@/lib/utils/question-detector";
import { ProgressBar } from "@/components/generator/ProgressBar";
import { QuestionStep } from "@/components/generator/QuestionStep";
import { QuestionName } from "@/components/generator/QuestionName";
import { QuestionLogo } from "@/components/generator/QuestionLogo";
import { QuestionMarketing } from "@/components/generator/QuestionMarketing";
import { QuestionColors } from "@/components/generator/QuestionColors";
import { QuestionTypography } from "@/components/generator/QuestionTypography";
import { QuestionStructure } from "@/components/generator/QuestionStructure";
import { QuestionHero } from "@/components/generator/QuestionHero";
import { QuestionSocialProof } from "@/components/generator/QuestionSocialProof";
import { QuestionExtras } from "@/components/generator/QuestionExtras";
import { QuestionSummary } from "@/components/generator/QuestionSummary";
import type { Project } from "@/types";

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const supabase = createClient();

  const {
    currentStep,
    answers,
    detectedInfo,
    nextStep,
    previousStep,
    updateAnswer,
    setDetectedInfo,
    setLoading,
  } = useGeneratorStore();

  const [project, setProject] = useState<Project | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [statusText, setStatusText] = useState("");

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

    if (data.input_data) {
      const detected = analyzeInitialPrompt(
        data.input_data.description || data.description || ""
      );
      setDetectedInfo({
        ...detected,
        hasImages: data.input_data.uploaded_files_count > 0,
      });

      Object.entries(data.input_data).forEach(([key, value]) => {
        updateAnswer(key, value);
      });
    }
  };

  const saveAnswer = async (key: string, value: any) => {
    updateAnswer(key, value);

    await supabase
      .from("projects")
      .update({
        input_data: { ...project?.input_data, [key]: value },
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);
  };

  const handleNext = async (data: Record<string, any>) => {
    Object.entries(data).forEach(([key, value]) => {
      saveAnswer(key, value);
    });
    setDirection("forward");
    nextStep();
    updateStatusText(currentStep + 1);
  };

  const handlePrevious = () => {
    setDirection("backward");
    previousStep();
    updateStatusText(currentStep - 1);
  };

  const handleSkip = () => {
    setDirection("forward");
    nextStep();
    updateStatusText(currentStep + 1);
  };

  const handleGenerate = async () => {
    setLoading(true);
    
    await supabase
      .from("projects")
      .update({
        status: "preview",
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);

    router.push(`/generator/${projectId}/preview`);
  };

  const updateStatusText = (step: number) => {
    const statusTexts = [
      "",
      "Configuration initiale...",
      "Préparation des assets...",
      "Analyse des angles marketing...",
      "Harmonisation des couleurs...",
      "Sélection de la typographie...",
      "Affinage du copywriting...",
      "Design du Hero...",
      "Collecte de la preuve sociale...",
      "Finalisation des détails...",
      "Prêt à générer !",
    ];
    setStatusText(statusTexts[step] || "");
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-32 border-r bg-card flex items-center justify-center">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={10}
          statusText={statusText}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <QuestionStep isVisible={currentStep === 1} direction={direction}>
            <QuestionName
              initialName={detectedInfo.productName || answers.productName}
              initialObjective={detectedInfo.objective || answers.objective}
              autoDetected={!!detectedInfo.productName}
              onSubmit={handleNext}
            />
          </QuestionStep>

          <QuestionStep isVisible={currentStep === 2} direction={direction}>
            <QuestionLogo
              initialLogo={answers.logo}
              onSubmit={(logo) => handleNext({ logo })}
              onSkip={handleSkip}
            />
          </QuestionStep>

          <QuestionStep isVisible={currentStep === 3} direction={direction}>
            <QuestionMarketing
              initialAngle={detectedInfo.marketingAngle || answers.marketingAngle}
              initialHeadline={answers.headline}
              suggestedHeadlines={answers.suggestedHeadlines || []}
              autoDetected={!!detectedInfo.marketingAngle}
              onSubmit={handleNext}
              onSkip={handleSkip}
            />
          </QuestionStep>

          <QuestionStep isVisible={currentStep === 4} direction={direction}>
            <QuestionColors
              initialPalette={answers.palette}
              initialMode={answers.mode}
              analyzedColors={project.input_data?.image_analysis?.dominant_colors}
              autoDetected={!!project.input_data?.image_analysis}
              onSubmit={handleNext}
              onSkip={handleSkip}
            />
          </QuestionStep>

          <QuestionStep isVisible={currentStep === 5} direction={direction}>
            <QuestionTypography
              initialFont={answers.font}
              onSubmit={(font) => handleNext({ font })}
              onSkip={handleSkip}
            />
          </QuestionStep>

          <QuestionStep isVisible={currentStep === 6} direction={direction}>
            <QuestionStructure
              initialFramework={answers.copywritingFramework}
              recommendedFramework={detectedInfo.suggestedFramework}
              autoDetected={!!detectedInfo.suggestedFramework}
              onSubmit={(framework) =>
                handleNext({ copywritingFramework: framework })
              }
            />
          </QuestionStep>

          <QuestionStep isVisible={currentStep === 7} direction={direction}>
            <QuestionHero
              initialVariant={answers.heroVariant}
              onSubmit={(variant) => handleNext({ heroVariant: variant })}
            />
          </QuestionStep>

          <QuestionStep isVisible={currentStep === 8} direction={direction}>
            <QuestionSocialProof
              onSubmit={(testimonials) => handleNext({ testimonials })}
              onSkip={handleSkip}
            />
          </QuestionStep>

          <QuestionStep isVisible={currentStep === 9} direction={direction}>
            <QuestionExtras
              initialCompetitors={detectedInfo.competitors || answers.competitors}
              initialVideoUrl={answers.videoUrl}
              initialEmailIntegration={answers.emailIntegration}
              autoDetected={
                !!detectedInfo.competitors && detectedInfo.competitors.length > 0
              }
              onSubmit={handleNext}
              onSkip={handleSkip}
            />
          </QuestionStep>

          <QuestionStep isVisible={currentStep === 10} direction={direction}>
            <QuestionSummary
              answers={answers}
              onGenerate={handleGenerate}
              onBack={handlePrevious}
            />
          </QuestionStep>
        </div>
      </div>

      {currentStep > 1 && currentStep < 10 && (
        <button
          onClick={handlePrevious}
          className="fixed bottom-8 left-40 px-4 py-2 border rounded-md hover:bg-accent transition-colors text-sm"
        >
          Retour
        </button>
      )}

      {currentStep >= 3 && currentStep < 10 && (
        <button
          onClick={() => {
            for (let i = currentStep; i < 10; i++) {
              nextStep();
            }
          }}
          className="fixed bottom-8 right-8 px-4 py-2 border rounded-md hover:bg-accent transition-colors text-sm text-muted-foreground"
        >
          Mode Rapide →
        </button>
      )}
    </div>
  );
}
