export const APP_NAME = "Redraft.AI";
export const APP_DESCRIPTION =
  "Créez des landing pages haute performance pour votre SaaS en quelques minutes avec l'IA";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const PRICING = {
  UNLOCK_PAGE: {
    amount: 24.99,
    currency: "EUR",
    label: "Déverrouillage unique (landing page)",
    description: "Accès complet à une landing page",
  },
  FREE: {
    amount: 0,
    currency: "EUR",
    label: "Free",
    interval: "month",
    features: [
      "1 landing page active",
      "Générateur IA basique",
      "Export code limité",
    ],
  },
  BUILDER: {
    amount: 19.99,
    currency: "EUR",
    label: "Plan Builder",
    interval: "month",
    yearlyAmount: 167.99,
    yearlyLabel: "Plan Builder - Annuel",
    features: [
      "Jusqu'à 5 landing pages actives",
      "Générations IA illimitées (fair-use)",
      "Export complet : Next.js 15 + TypeScript + Tailwind + shadcn/UI",
      "Multilingue FR/EN",
      "Sauvegarde des projets et ré-édition",
    ],
    forWho: "Fondateurs SaaS, indie hackers, petits projets",
  },
  STUDIO: {
    amount: 49.99,
    currency: "EUR",
    label: "Plan Studio/Agence",
    interval: "month",
    yearlyAmount: 419.99,
    yearlyLabel: "Plan Studio/Agence - Annuel",
    features: [
      "Jusqu'à 20 landing pages actives",
      "Exports de code illimités",
      "Multilingue FR/EN",
      "Marque blanche (pas de mention Redraft)",
      "Priorité file d'attente IA + support prioritaire",
      "Bases de landing réutilisables par client",
    ],
    forWho: "Freelances, studios, agences",
  },
};

export const LIMITS = {
  FREE: {
    projects: 1,
    activePages: 1,
    credits: 3,
  },
  BUILDER: {
    projects: 5,
    activePages: 5,
    credits: Infinity,
  },
  STUDIO: {
    projects: 20,
    activePages: 20,
    credits: Infinity,
    whiteLabel: true,
  },
};

export const FILE_LIMITS = {
  MAX_FILES: 5,
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  ALLOWED_TYPES: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
};

export const DESCRIPTION_LIMITS = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 2000,
};

export const AFFILIATE = {
  COMMISSION_RATE: 0.3,
};

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/redraft_ai",
  linkedin: "https://linkedin.com/company/redraft-ai",
  github: "https://github.com/redraft-ai",
};

export const SUPPORT_EMAIL = "support@redraft.fr";
export const LEGAL_EMAIL = "support@redraft.fr";
export const PRIVACY_EMAIL = "support@redraft.fr";
