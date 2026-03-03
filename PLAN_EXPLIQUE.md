# 📋 LE PLAN EXPLIQUÉ SIMPLEMENT

## 🎯 L'Objectif
Faire en sorte que l'IA génère des landing pages qui se ressemblent à elles-mêmes - avec les mêmes couleurs, le même spacing, la même typographie - selon le style choisi.

---

## 🔄 LE FLUX SIMPLE (3 ÉTAPES)

### AVANT (Sans Design Tokens)
```
L'IA génère une page
↓
Résultat: Couleurs aléatoires, pas de cohérence
❌ Page a l'air générée, pas pro
```

### APRÈS (Avec Design Tokens)
```
1️⃣ UTILISATEUR CHOISIT UN STYLE
   "Je veux un design Dark"
   ↓

2️⃣ SYSTÈME EXTRAIT LES TOKENS
   Dark = Bleu clair + fond noir + spacing 28px + ...
   ↓

3️⃣ L'IA GÉNÈRE AVEC CES TOKENS
   "Utilise UNIQUEMENT ces couleurs/spacing"
   ↓

✅ Page cohérente, belle, pro
```

---

## 🎨 LES 4 STYLES & LEURS TOKENS

### 1. **DARK** 🌙
```
Couleurs:   Bleu clair (#60a5fa) sur fond noir (#0f172a)
Utilité:    Tech premium, B2B
Ressent:    Professionnel, moderne, tech
```

### 2. **GRADIENT** 🌈
```
Couleurs:   Purple (#7c3aed) → Pink gradient
Utilité:    Creative, startup, moderne
Ressent:    Fun, innovant, attention-grabbing
```

### 3. **MINIMAL** ⚪
```
Couleurs:   Noir/gris sur blanc
Utilité:    Professionnel, minimaliste, clean
Ressent:    Simple, épuré, confiance
```

### 4. **PLAYFUL** 🎨
```
Couleurs:   Rose/Magenta (#ec4899)
Utilité:    Consumer, fun, accessible
Ressent:    Cool, accessible, modern
```

---

## 🔧 COMMENT ÇA MARCHE TECHNIQUEMENT

### LE CONCEPT CLÉ
**Au lieu de laisser l'IA inventer les couleurs, on lui dit :**
> "Voici les 10 couleurs que tu as le droit d'utiliser. JAMAIS d'autres."

### LES TOKENS = LA "PALETTE" DE L'IA

```typescript
// Token Set "Dark" (exemple simplifié)
{
  colors: {
    primary: "#60a5fa",      // La couleur des boutons
    background: "#0f172a",   // Le fond
    text: "#f1f5f9",         // Le texte
    muted: "#1e293b",        // Couleurs secondaires
  },
  typography: {
    h1: "text-7xl font-bold", // Les grands titres
    body: "text-lg",           // Le texte normal
  },
  spacing: {
    gap: "28px",              // L'espace entre sections
    padding: "40px",          // Le padding standard
  }
}
```

### CE QUI SE PASSE DANS LE CODE

```typescript
// Claude génère du code comme ça:

<button className={`bg-[${tokens.colors.primary}]`}>
  // Va utiliser #60a5fa (bleu du token set)
</button>

<h1 className={tokens.typography.h1}>
  // Va utiliser les classes du token set
</h1>

<section className={`gap-[${tokens.spacing.gap}]`}>
  // Va utiliser 28px d'espacement
</section>
```

---

## 📊 LE FLUX COMPLET (AVEC CODE)

```
┌──────────────────────────────────────────────────┐
│ ÉTAPE 1: UTILISATEUR CRÉE UN PROJET             │
│                                                  │
│ - Choisit un style: "Dark"                      │
│ - Décrit son SaaS: "Un outil de gestion de      │
│   tâches avec IA intégrée"                      │
└──────────┬───────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────┐
│ ÉTAPE 2: EXTRACTION DES TOKENS                  │
│                                                  │
│ extractDesignTokens("dark")                     │
│ ↓                                                │
│ Retourne: {                                      │
│   colors: { primary: "#60a5fa", ... },          │
│   typography: { h1: "text-7xl", ... },          │
│   spacing: { gap: "28px", ... }                 │
│ }                                                │
└──────────┬───────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────┐
│ ÉTAPE 3: GÉNÉRATION DU CONTENU (JSON)           │
│                                                  │
│ POST /api/generate-page                         │
│ Claude reçoit:                                  │
│ - Description du SaaS                           │
│ - Les tokens (mais ne les utilise pas pour le   │
│   contenu, c'est juste du texte)                │
│ ↓                                                │
│ Retourne: {                                      │
│   hero: { headline: "...", cta: "..." },        │
│   features: [...],                              │
│   testimonials: [...]                           │
│ }                                                │
└──────────┬───────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────┐
│ ÉTAPE 4: GÉNÉRATION DU CODE (REACT)             │
│                                                  │
│ POST /api/generate-code                         │
│ Claude reçoit:                                  │
│ - Contenu du JSON (hero, features, etc)         │
│ - LES TOKENS EXPLICITEMENT                      │
│ - Instruction: "UTILISE UNIQUEMENT CES TOKENS"  │
│                                                  │
│ Claude génère:                                  │
│ app/page.tsx                                    │
│ ├─ HeroSection (utilise token colors)           │
│ ├─ Features (utilise token spacing)             │
│ ├─ Testimonials (utilise token typography)      │
│ └─ CTA (utilise token buttons)                  │
│                                                  │
│ ✅ TOUT EST COHÉRENT!                          │
└──────────────────────────────────────────────────┘
```

---

## 🎯 RÉSULTAT FINAL

### Ce que le Client Voit

```
Une landing page avec:
✅ Un seul style cohérent (Dark)
✅ Les mêmes couleurs partout
✅ Le même espacement
✅ La même typographie
✅ Une vraie page pro, pas "générée par IA"
```

### Ce qui se passe dans le Code

```typescript
// Tout utilise les tokens du set "Dark"

<section className="bg-[#0f172a]">  // Token: background
  <h1 className="text-7xl font-bold">  // Token: h1
  <button className="bg-[#60a5fa]">    // Token: primary
  <div className="gap-[28px]">         // Token: gap
</section>
```

---

## 💡 POURQUOI C'EST IMPORTANT

### Avant (Sans Tokens)
```
L'IA génère:
- Bouton bleu #2563eb
- Autre bouton purple #7c3aed  
- Texte gris #6b7280
- Texte gris #4b5563 (légèrement différent)
= Page incohérente, générique, pas pro
```

### Après (Avec Tokens)
```
L'IA ne peut générer que:
- Tous les boutons: #60a5fa (token primary)
- Tous les textes: #f1f5f9 (token text)
- Tous les espacements: 28px (token gap)
= Page cohérente, belle, professionnel
```

---

## 🚀 EXEMPLE CONCRET

### Utilisateur: "Je veux un design Dark pour ma SaaS de gestion de tâches"

```
1. Choisit "Dark"
   ↓
2. Système extrait tokens Dark
   (bleu clair + fond noir + spacing 28px + ...)
   ↓
3. L'IA génère le contenu
   Hero: "Manage tasks faster"
   Features: ["AI Planning", "Team Sync", "Analytics"]
   ↓
4. L'IA génère le code
   AVEC LES TOKENS IMPOSÉS
   - h1 → font-bold text-7xl (du token)
   - boutons → bg-[#60a5fa] (du token)
   - sections → gap-[28px] (du token)
   ↓
✅ RÉSULTAT: Landing page cohérente et pro
```

---

## ✨ LES 4 FICHIERS CLÉS

### 1. **extractDesignTokens.ts** 🎨
```typescript
// C'EST ICI QUE LES TOKENS SONT DÉFINIS

export function getDarkTokens() {
  return {
    colors: { primary: "#60a5fa", ... },
    typography: { h1: "text-7xl", ... },
    ...
  }
}
```

### 2. **prompts.ts** 🤖
```typescript
// C'EST ICI QUE L'IA REÇOIT L'INSTRUCTION

"RÈGLES D'UTILISATION STRICTES :
- JAMAIS d'autres couleurs que tokens.colors.*
- JAMAIS d'autres espacements que tokens.spacing.*
- Utilise tokens.typography pour la typo"
```

### 3. **generate-code/route.ts** 🔄
```typescript
// C'EST ICI QUE LES TOKENS SONT PASSÉS À L'IA

const tokens = extractDesignTokens(heroStyle);
const userPrompt = `
DESIGN TOKENS:
${JSON.stringify(tokens)}
...
`;
```

### 4. **generate-page/route.ts** 🔄
```typescript
// C'EST ICI QUE LES TOKENS SONT EXTRAITS

const designTokens = extractDesignTokens(heroVariant);
inputData.designTokens = designTokens;
```

---

## 🎯 RÉSUMÉ EN 5 POINTS

1. **L'IA choisit un style** (Dark, Gradient, Minimal, Playful)

2. **Le système extrait les tokens** (couleurs, spacing, typo)

3. **L'IA reçoit les tokens et l'instruction** ("Utilise UNIQUEMENT ceux-ci")

4. **L'IA génère du code** en respectant strictement les tokens

5. **Résultat:** Page 100% cohérente et pro ✅

---

## 🔗 FICHIERS À CONSULTER

📄 `DESIGN_TOKENS_PLAN.md` - Plan technique complet
📄 `context.md` - Documentation du design system
📄 `lib/ai/extractDesignTokens.ts` - Code source des tokens
📄 `lib/ai/prompts.ts` - Les prompts système

