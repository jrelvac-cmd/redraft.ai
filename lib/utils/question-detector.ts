import type { DetectedInfo } from "@/types";

export function analyzeInitialPrompt(description: string): DetectedInfo {
  const detectedInfo: DetectedInfo = {};

  const lowerDesc = description.toLowerCase();

  detectedInfo.productName = detectProductName(description);
  detectedInfo.objective = detectObjective(lowerDesc);
  detectedInfo.marketingAngle = detectMarketingAngle(lowerDesc);
  detectedInfo.competitors = detectCompetitors(description);
  detectedInfo.targetAudience = detectTargetAudience(lowerDesc);

  return detectedInfo;
}

function detectProductName(description: string): string | undefined {
  const sentences = description.split(/[.!?]/);
  if (sentences.length === 0) return undefined;

  const firstSentence = sentences[0].trim();
  
  const words = firstSentence.split(/\s+/);
  for (const word of words) {
    if (word.length > 2 && /^[A-Z]/.test(word) && !/^(Un|Une|Le|La|Les|Des|Du|De|A|An|The)$/.test(word)) {
      return word.replace(/[,;:]/, '');
    }
  }

  return undefined;
}

function detectObjective(lowerDesc: string): "email" | "sell" | "demo" | "inform" | undefined {
  const patterns = {
    email: [
      "capturer des emails",
      "collecter des emails",
      "waitlist",
      "liste d'attente",
      "s'inscrire",
      "inscription",
      "newsletter",
    ],
    sell: [
      "vendre",
      "acheter",
      "paiement",
      "prix",
      "tarif",
      "abonnement",
      "subscription",
    ],
    demo: [
      "démo",
      "démonstration",
      "essai",
      "test",
      "découvrir",
      "présentation",
    ],
    inform: [
      "informer",
      "présenter",
      "expliquer",
      "découvrir",
    ],
  };

  for (const [objective, keywords] of Object.entries(patterns)) {
    if (keywords.some((keyword) => lowerDesc.includes(keyword))) {
      return objective as "email" | "sell" | "demo" | "inform";
    }
  }

  return undefined;
}

function detectMarketingAngle(
  lowerDesc: string
): "time" | "money" | "status" | "simplicity" | "security" | "fun" | undefined {
  const patterns = {
    time: [
      "gain de temps",
      "gagner du temps",
      "plus rapide",
      "rapidement",
      "automatique",
      "automatiser",
      "économiser du temps",
    ],
    money: [
      "économie",
      "économiser",
      "moins cher",
      "gratuit",
      "rentable",
      "roi",
      "retour sur investissement",
    ],
    status: [
      "prestige",
      "professionnel",
      "premium",
      "exclusif",
      "élite",
      "leader",
    ],
    simplicity: [
      "simple",
      "facile",
      "intuitif",
      "sans effort",
      "en quelques clics",
      "accessible",
    ],
    security: [
      "sécurisé",
      "sécurité",
      "protection",
      "confidentiel",
      "crypté",
      "fiable",
    ],
    fun: [
      "amusant",
      "fun",
      "plaisant",
      "agréable",
      "ludique",
    ],
  };

  for (const [angle, keywords] of Object.entries(patterns)) {
    if (keywords.some((keyword) => lowerDesc.includes(keyword))) {
      return angle as "time" | "money" | "status" | "simplicity" | "security" | "fun";
    }
  }

  return undefined;
}

function detectCompetitors(description: string): string[] {
  const competitors: string[] = [];

  const patterns = [
    /comme\s+([A-Z][a-zA-Z0-9]+)/g,
    /alternative\s+à\s+([A-Z][a-zA-Z0-9]+)/g,
    /similaire\s+à\s+([A-Z][a-zA-Z0-9]+)/g,
    /remplace\s+([A-Z][a-zA-Z0-9]+)/g,
    /vs\s+([A-Z][a-zA-Z0-9]+)/g,
  ];

  for (const pattern of patterns) {
    const matches = description.matchAll(pattern);
    for (const match of matches) {
      if (match[1] && !competitors.includes(match[1])) {
        competitors.push(match[1]);
      }
    }
  }

  return competitors;
}

function detectTargetAudience(lowerDesc: string): string | undefined {
  const patterns = [
    /pour les ([a-zéèêàâôù\s]+)/,
    /destiné aux ([a-zéèêàâôù\s]+)/,
    /conçu pour les ([a-zéèêàâôù\s]+)/,
  ];

  for (const pattern of patterns) {
    const match = lowerDesc.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return undefined;
}
