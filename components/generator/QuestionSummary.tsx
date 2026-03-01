"use client";

import { Sparkles } from "lucide-react";

interface QuestionSummaryProps {
  answers: Record<string, any>;
  onGenerate: () => void;
  onBack: () => void;
}

export function QuestionSummary({
  answers,
  onGenerate,
  onBack,
}: QuestionSummaryProps) {
  const getSummaryItems = () => {
    const items = [];

    if (answers.productName) {
      items.push({ label: "Nom du produit", value: answers.productName });
    }
    if (answers.objective) {
      const objectiveLabels: Record<string, string> = {
        email: "Capturer des emails",
        sell: "Vendre directement",
        demo: "Obtenir des démos",
        inform: "Informer",
      };
      items.push({
        label: "Objectif",
        value: objectiveLabels[answers.objective] || answers.objective,
      });
    }
    if (answers.marketingAngle) {
      const angleLabels: Record<string, string> = {
        time: "Gain de temps",
        money: "Économie d'argent",
        status: "Status/Prestige",
        simplicity: "Simplicité",
        security: "Sécurité",
        fun: "Fun",
      };
      items.push({
        label: "Angle marketing",
        value: angleLabels[answers.marketingAngle] || answers.marketingAngle,
      });
    }
    if (answers.headline) {
      items.push({ label: "Headline", value: answers.headline });
    }
    if (answers.mode) {
      items.push({
        label: "Mode",
        value: answers.mode === "dark" ? "Sombre" : "Clair",
      });
    }
    if (answers.font) {
      items.push({ label: "Police", value: answers.font });
    }
    if (answers.copywritingFramework) {
      const frameworkLabels: Record<string, string> = {
        aida: "AIDA",
        pas: "PAS",
        benefit: "Benefit-First",
      };
      items.push({
        label: "Framework copywriting",
        value:
          frameworkLabels[answers.copywritingFramework] ||
          answers.copywritingFramework,
      });
    }
    if (answers.heroVariant) {
      const variantLabels: Record<string, string> = {
        v1: "Hero Centré",
        v2: "Hero Split",
        v3: "Hero Full-Width",
      };
      items.push({
        label: "Style de Hero",
        value: variantLabels[answers.heroVariant] || answers.heroVariant,
      });
    }

    return items;
  };

  const summaryItems = getSummaryItems();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Vérification avant génération</h2>
        <p className="text-muted-foreground">
          Voici un résumé de vos choix. Tout est prêt pour générer votre
          landing page !
        </p>
      </div>

      <div className="bg-card border rounded-lg p-6 space-y-4">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-start py-3 border-b last:border-b-0"
          >
            <span className="text-sm font-medium text-muted-foreground">
              {item.label}
            </span>
            <span className="text-sm font-medium text-right max-w-[60%]">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-sm font-medium">Prêt à générer</p>
            <p className="text-sm text-muted-foreground">
              L'IA va analyser vos informations et générer une landing page
              professionnelle avec copywriting optimisé. Cela prend environ 30
              secondes.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border rounded-md hover:bg-accent transition-colors"
        >
          Retour
        </button>
        <button
          type="button"
          onClick={onGenerate}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Lancer la génération
        </button>
      </div>
    </div>
  );
}
