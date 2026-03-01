"use client";

import { useState, useEffect } from "react";
import { Sparkles, Save, Loader2, Layout } from "lucide-react";
import type { AIGeneratedData } from "@/types";

interface EditorPanelProps {
  section: string | null;
  aiData: AIGeneratedData | null;
  onUpdate: (section: string, data: any) => void;
  onRegenerate: (section: string) => void;
  onSave: () => void;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
}

export function EditorPanel({
  section,
  aiData,
  onUpdate,
  onRegenerate,
  onSave,
  hasUnsavedChanges,
  isSaving,
}: EditorPanelProps) {
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    if (section && aiData) {
      setEditData(aiData[section as keyof AIGeneratedData]);
    }
  }, [section, aiData]);

  if (!section) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center space-y-2">
          <Layout className="w-12 h-12 mx-auto opacity-50" />
          <p>Sélectionnez une section pour commencer</p>
        </div>
      </div>
    );
  }

  if (!editData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleChange = (key: string, value: any) => {
    const newData = { ...editData, [key]: value };
    setEditData(newData);
    onUpdate(section, newData);
  };

  const handleArrayChange = (index: number, key: string, value: any) => {
    const newArray = [...editData];
    newArray[index] = { ...newArray[index], [key]: value };
    setEditData(newArray);
    onUpdate(section, newArray);
  };

  const renderEditor = () => {
    switch (section) {
      case "hero":
        return (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Headline</label>
              <input
                type="text"
                value={editData.headline || ""}
                onChange={(e) => handleChange("headline", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Sous-titre
              </label>
              <textarea
                value={editData.subheadline || ""}
                onChange={(e) => handleChange("subheadline", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                CTA Principal
              </label>
              <input
                type="text"
                value={editData.cta_primary || ""}
                onChange={(e) => handleChange("cta_primary", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                CTA Secondaire
              </label>
              <input
                type="text"
                value={editData.cta_secondary || ""}
                onChange={(e) => handleChange("cta_secondary", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Badge</label>
              <input
                type="text"
                value={editData.badge || ""}
                onChange={(e) => handleChange("badge", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        );

      case "features":
        return (
          <div className="space-y-6">
            {Array.isArray(editData) &&
              editData.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-muted/30 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Feature {index + 1}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Icône (Lucide)
                    </label>
                    <input
                      type="text"
                      value={feature.icon || ""}
                      onChange={(e) =>
                        handleArrayChange(index, "icon", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ex: Zap, Shield, Clock"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={feature.title || ""}
                      onChange={(e) =>
                        handleArrayChange(index, "title", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Description
                    </label>
                    <textarea
                      value={feature.description || ""}
                      onChange={(e) =>
                        handleArrayChange(index, "description", e.target.value)
                      }
                      rows={2}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              ))}
          </div>
        );

      case "social_proof":
        return (
          <div className="space-y-6">
            {Array.isArray(editData) &&
              editData.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-muted/30 space-y-4"
                >
                  <p className="font-medium">Témoignage {index + 1}</p>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nom</label>
                    <input
                      type="text"
                      value={testimonial.name || ""}
                      onChange={(e) =>
                        handleArrayChange(index, "name", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Rôle
                    </label>
                    <input
                      type="text"
                      value={testimonial.role || ""}
                      onChange={(e) =>
                        handleArrayChange(index, "role", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      value={testimonial.company || ""}
                      onChange={(e) =>
                        handleArrayChange(index, "company", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Avis
                    </label>
                    <textarea
                      value={testimonial.review || ""}
                      onChange={(e) =>
                        handleArrayChange(index, "review", e.target.value)
                      }
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              ))}
          </div>
        );

      case "faq":
        return (
          <div className="space-y-6">
            {Array.isArray(editData) &&
              editData.map((faq, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-muted/30 space-y-4"
                >
                  <p className="font-medium">Question {index + 1}</p>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Question
                    </label>
                    <input
                      type="text"
                      value={faq.question || ""}
                      onChange={(e) =>
                        handleArrayChange(index, "question", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Réponse
                    </label>
                    <textarea
                      value={faq.answer || ""}
                      onChange={(e) =>
                        handleArrayChange(index, "answer", e.target.value)
                      }
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              ))}
          </div>
        );

      case "cta_section":
        return (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Headline</label>
              <input
                type="text"
                value={editData.headline || ""}
                onChange={(e) => handleChange("headline", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Sous-titre
              </label>
              <textarea
                value={editData.subheadline || ""}
                onChange={(e) => handleChange("subheadline", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">CTA</label>
              <input
                type="text"
                value={editData.cta || ""}
                onChange={(e) => handleChange("cta", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        );

      case "meta":
        return (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Title (SEO)
              </label>
              <input
                type="text"
                value={editData.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Description (SEO)
              </label>
              <textarea
                value={editData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                OG Title
              </label>
              <input
                type="text"
                value={editData.og_title || ""}
                onChange={(e) => handleChange("og_title", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                OG Description
              </label>
              <textarea
                value={editData.og_description || ""}
                onChange={(e) => handleChange("og_description", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-muted-foreground">
            Éditeur pour cette section en cours de développement
          </div>
        );
    }
  };

  return (
    <div className="w-96 border-r border-border bg-card h-full overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-bold text-lg capitalize">
          {section?.replace("_", " ")}
        </h2>
        <button
          onClick={() => section && onRegenerate(section)}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
          title="Regénérer avec l'IA"
        >
          <Sparkles className="w-5 h-5 text-primary" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">{renderEditor()}</div>

      <div className="p-4 border-t border-border">
        <button
          onClick={onSave}
          disabled={!hasUnsavedChanges || isSaving}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sauvegarde...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Sauvegarder
            </>
          )}
        </button>
      </div>
    </div>
  );
}
