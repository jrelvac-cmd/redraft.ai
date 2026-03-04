import type { ComponentType } from "react";
import Skeleton_01_Freemium_Classic from "./Skeleton_01_Freemium_Classic";
import Skeleton_02_Freemium_TrustFirst from "./Skeleton_02_Freemium_TrustFirst";
import Skeleton_03_Freemium_Conversion from "./Skeleton_03_Freemium_Conversion";
import Skeleton_04_B2B_Enterprise from "./Skeleton_04_B2B_Enterprise";
import Skeleton_05_B2B_Simple from "./Skeleton_05_B2B_Simple";
import Skeleton_06_Product_Showcase from "./Skeleton_06_Product_Showcase";
import Skeleton_07_Problem_Solution from "./Skeleton_07_Problem_Solution";
import Skeleton_08_Platform_Integrations from "./Skeleton_08_Platform_Integrations";
import Skeleton_09_Onboarding_Process from "./Skeleton_09_Onboarding_Process";
import Skeleton_10_Analytics from "./Skeleton_10_Analytics";
import Skeleton_11_Marketing from "./Skeleton_11_Marketing";
import Skeleton_12_Sales_CRM from "./Skeleton_12_Sales_CRM";
import Skeleton_13_Developer_Tool from "./Skeleton_13_Developer_Tool";
import Skeleton_14_Multi_CTA from "./Skeleton_14_Multi_CTA";
import Skeleton_15_Product_First from "./Skeleton_15_Product_First";
import Skeleton_16_Long_Form from "./Skeleton_16_Long_Form";
import Skeleton_17_Minimal from "./Skeleton_17_Minimal";
import Skeleton_18_Trust_Heavy from "./Skeleton_18_Trust_Heavy";
import Skeleton_19_Comparison_Focus from "./Skeleton_19_Comparison_Focus";
import Skeleton_20_FAQ_Heavy from "./Skeleton_20_FAQ_Heavy";

export interface SkeletonMeta {
  id: string;
  name: string;
  zones: string[];
  bestFor: string;
  ctaCount: number;
  hasPricing: boolean;
  hasSocialProof: boolean;
}

export const SKELETONS_REGISTRY: Record<string, ComponentType> = {
  "skeleton-01": Skeleton_01_Freemium_Classic,
  "skeleton-02": Skeleton_02_Freemium_TrustFirst,
  "skeleton-03": Skeleton_03_Freemium_Conversion,
  "skeleton-04": Skeleton_04_B2B_Enterprise,
  "skeleton-05": Skeleton_05_B2B_Simple,
  "skeleton-06": Skeleton_06_Product_Showcase,
  "skeleton-07": Skeleton_07_Problem_Solution,
  "skeleton-08": Skeleton_08_Platform_Integrations,
  "skeleton-09": Skeleton_09_Onboarding_Process,
  "skeleton-10": Skeleton_10_Analytics,
  "skeleton-11": Skeleton_11_Marketing,
  "skeleton-12": Skeleton_12_Sales_CRM,
  "skeleton-13": Skeleton_13_Developer_Tool,
  "skeleton-14": Skeleton_14_Multi_CTA,
  "skeleton-15": Skeleton_15_Product_First,
  "skeleton-16": Skeleton_16_Long_Form,
  "skeleton-17": Skeleton_17_Minimal,
  "skeleton-18": Skeleton_18_Trust_Heavy,
  "skeleton-19": Skeleton_19_Comparison_Focus,
  "skeleton-20": Skeleton_20_FAQ_Heavy,
};

export const SKELETONS_META: Record<string, SkeletonMeta> = {
  "skeleton-01": {
    id: "skeleton-01",
    name: "Freemium Classic",
    zones: ["nav", "hero", "features", "social-proof", "pricing", "cta", "footer"],
    bestFor: "SaaS freemium (Slack, Notion)",
    ctaCount: 1,
    hasPricing: true,
    hasSocialProof: true,
  },
  "skeleton-02": {
    id: "skeleton-02",
    name: "Freemium Trust First",
    zones: ["nav", "hero", "social-proof", "features", "pricing", "cta", "footer"],
    bestFor: "SaaS qui doit prouver crédibilité avant features",
    ctaCount: 1,
    hasPricing: true,
    hasSocialProof: true,
  },
  "skeleton-03": {
    id: "skeleton-03",
    name: "Freemium Conversion",
    zones: ["nav", "hero", "features", "pricing", "social-proof", "cta", "footer"],
    bestFor: "SaaS pricing transparent",
    ctaCount: 1,
    hasPricing: true,
    hasSocialProof: true,
  },
  "skeleton-04": {
    id: "skeleton-04",
    name: "B2B Enterprise",
    zones: ["nav", "hero", "stats", "features", "comparison", "case-studies", "cta", "footer"],
    bestFor: "SaaS B2B (HubSpot, Salesforce)",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: false,
  },
  "skeleton-05": {
    id: "skeleton-05",
    name: "B2B Simple",
    zones: ["nav", "hero", "features", "social-proof", "cta", "footer"],
    bestFor: "SaaS B2B léger",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: true,
  },
  "skeleton-06": {
    id: "skeleton-06",
    name: "Product Showcase",
    zones: ["nav", "hero", "demo", "features", "social-proof", "cta", "footer"],
    bestFor: "SaaS visuel (Figma, Framer)",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: true,
  },
  "skeleton-07": {
    id: "skeleton-07",
    name: "Problem Solution",
    zones: ["nav", "hero", "problem", "solution", "features", "cta", "footer"],
    bestFor: "SaaS qui résout un pain point clair",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: false,
  },
  "skeleton-08": {
    id: "skeleton-08",
    name: "Platform Integrations",
    zones: ["nav", "hero", "integrations", "use-cases", "how-it-works", "cta", "footer"],
    bestFor: "SaaS plateforme (Zapier, Make)",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: false,
  },
  "skeleton-09": {
    id: "skeleton-09",
    name: "Onboarding Process",
    zones: ["nav", "hero", "process", "faq", "cta", "footer"],
    bestFor: "SaaS onboarding-heavy",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: false,
  },
  "skeleton-10": {
    id: "skeleton-10",
    name: "Analytics",
    zones: ["nav", "hero", "problem", "demo", "pricing", "cta", "footer"],
    bestFor: "SaaS analytics/data",
    ctaCount: 1,
    hasPricing: true,
    hasSocialProof: false,
  },
  "skeleton-11": {
    id: "skeleton-11",
    name: "Marketing",
    zones: ["nav", "hero", "features", "social-proof", "integrations", "cta", "footer"],
    bestFor: "SaaS marketing",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: true,
  },
  "skeleton-12": {
    id: "skeleton-12",
    name: "Sales CRM",
    zones: ["nav", "hero", "stats", "features", "comparison", "cta", "footer"],
    bestFor: "SaaS ventes/CRM",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: false,
  },
  "skeleton-13": {
    id: "skeleton-13",
    name: "Developer Tool",
    zones: ["nav", "hero", "demo", "features", "cta", "footer"],
    bestFor: "SaaS dev tools",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: false,
  },
  "skeleton-14": {
    id: "skeleton-14",
    name: "Multi CTA",
    zones: ["nav", "hero", "features", "cta", "social-proof", "pricing", "cta", "footer"],
    bestFor: "SaaS plusieurs points de conversion",
    ctaCount: 2,
    hasPricing: true,
    hasSocialProof: true,
  },
  "skeleton-15": {
    id: "skeleton-15",
    name: "Product First",
    zones: ["nav", "hero", "demo", "features", "pricing", "cta", "footer"],
    bestFor: "SaaS produit-first",
    ctaCount: 1,
    hasPricing: true,
    hasSocialProof: false,
  },
  "skeleton-16": {
    id: "skeleton-16",
    name: "Long Form",
    zones: ["nav", "hero", "problem", "solution", "features", "how-it-works", "social-proof", "pricing", "faq", "cta", "footer"],
    bestFor: "SaaS complexe, page longue",
    ctaCount: 1,
    hasPricing: true,
    hasSocialProof: true,
  },
  "skeleton-17": {
    id: "skeleton-17",
    name: "Minimal",
    zones: ["nav", "hero", "features", "cta", "footer"],
    bestFor: "SaaS minimaliste",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: false,
  },
  "skeleton-18": {
    id: "skeleton-18",
    name: "Trust Heavy",
    zones: ["nav", "hero", "stats", "social-proof", "features", "social-proof", "cta", "footer"],
    bestFor: "SaaS nouveau, preuve sociale double",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: true,
  },
  "skeleton-19": {
    id: "skeleton-19",
    name: "Comparison Focus",
    zones: ["nav", "hero", "comparison", "features", "cta", "footer"],
    bestFor: "SaaS différenciant vs concurrents",
    ctaCount: 1,
    hasPricing: false,
    hasSocialProof: false,
  },
  "skeleton-20": {
    id: "skeleton-20",
    name: "FAQ Heavy",
    zones: ["nav", "hero", "features", "faq", "pricing", "cta", "footer"],
    bestFor: "SaaS avec objections fréquentes",
    ctaCount: 1,
    hasPricing: true,
    hasSocialProof: false,
  },
};

export function getSkeletonById(id: string): ComponentType | null {
  return SKELETONS_REGISTRY[id] ?? null;
}

export function getSkeletonsInfo(): string {
  return Object.entries(SKELETONS_META)
    .map(
      ([id, meta]) =>
        `${id}: "${meta.name}" - Zones: [${meta.zones.join(", ")}] - Pour: ${meta.bestFor} - CTA: ${meta.ctaCount} - Pricing: ${meta.hasPricing}`
    )
    .join("\n");
}
