"use client";

import { motion } from "framer-motion";
import {
  Layout,
  Type,
  Palette,
  Users,
  HelpCircle,
  Megaphone,
  Sparkles,
} from "lucide-react";

interface EditorSidebarProps {
  selectedSection: string | null;
  onSelectSection: (section: string) => void;
}

const sections = [
  { id: "hero", label: "Hero", icon: Layout },
  { id: "features", label: "Features", icon: Sparkles },
  { id: "pain_points", label: "Pain Points", icon: Megaphone },
  { id: "social_proof", label: "Témoignages", icon: Users },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "cta_section", label: "CTA", icon: Type },
  { id: "footer", label: "Footer", icon: Layout },
  { id: "meta", label: "SEO Meta", icon: Palette },
];

export function EditorSidebar({
  selectedSection,
  onSelectSection,
}: EditorSidebarProps) {
  return (
    <div className="w-64 border-r border-border bg-card h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="font-bold text-lg">Sections</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Cliquez pour éditer
        </p>
      </div>

      <div className="p-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isSelected = selectedSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onSelectSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-1 ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
