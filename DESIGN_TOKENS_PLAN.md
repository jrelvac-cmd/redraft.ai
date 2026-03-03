# 📋 Plan d'Implémentation - Système de Design Tokens

## 🎯 Objectif Global

Créer un **système de design tokens automatisé** qui garantit que chaque landing page générée par l'IA est 100% cohérente visuellement, peu importe les données en entrée.

---

## 🔄 Le Flux Complet (Simplifié)

```
┌─────────────────────────────────────────────────────┐
│ 1. UTILISATEUR CRÉE UN PROJET                       │
│    - Choisit un style de héro (Dark, Gradient, etc) │
│    - Décrit son SaaS                                │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 2. SYSTÈME EXTRAIT LES DESIGN TOKENS                │
│    - POST /api/extract-design-tokens                │
│    - Récupère: couleurs, typographie, spacing       │
│    - Exemple: dark → bleu clair + fond noir         │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 3. L'IA GÉNÈRE LE CONTENU (JSON)                    │
│    - POST /api/generate-page                        │
│    - Claude reçoit les tokens en prompt             │
│    - Génère: hero, features, testimonials, CTA      │
│    - Mais NE DÉFINIT PAS les couleurs (tokens les)  │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 4. L'IA GÉNÈRE LE CODE (React + Tailwind)           │
│    - POST /api/generate-code                        │
│    - Claude reçoit les tokens EXPLICITEMENT         │
│    - Génère: app/page.tsx + composants              │
│    - RÈGLE: utilise UNIQUEMENT les tokens fournis   │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 5. RÉSULTAT FINAL                                   │
│    ✅ Page cohérente visuellement                   │
│    ✅ Tous les couleurs viennent du même token set  │
│    ✅ Tous les espacements identiques               │
│    ✅ Typographie consistante                       │
│    ✅ Style du héro respecté partout                │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Fichiers Modifiés/Créés

### ✅ Créés

| Fichier | Rôle | Impact |
|---------|------|--------|
| `lib/ai/extractDesignTokens.ts` | Logique d'extraction de tokens | 🔴 CENTRAL |
| `app/api/extract-design-tokens/route.ts` | API pour extraire tokens | 🟡 Support |

### ✅ Modifiés

| Fichier | Changement | Impact |
|---------|-----------|--------|
| `types/index.ts` | +interface `DesignTokens` | 🟢 Typage |
| `lib/ai/prompts.ts` | +section tokens dans SYSTEM_PROMPT_GENERATE_CODE | 🔴 CENTRAL |
| `app/api/generate-page/route.ts` | +extraction + passage des tokens | 🔴 CENTRAL |
| `app/api/generate-code/route.ts` | +tokens dans userPrompt | 🔴 CENTRAL |
| `context.md` | +documentation design tokens | 🟢 Docs |

---

## 🔍 Comment Ça Marche - Détail Technique

### Phase 1: Extraction des Tokens (lib/ai/extractDesignTokens.ts)

```typescript
function extractDesignTokens(heroStyle: string): DesignTokens {
  // Basé sur le style choisi (dark, gradient, minimal, playful)
  // Retourne l'ensemble complet des tokens
  
  if (heroStyle === "dark") {
    return {
      colors: { primary: "#60a5fa", background: "#0f172a", ... },
      typography: { h1: "text-7xl font-bold", ... },
      spacing: { gap: "28px", padding: "40px", ... },
      effects: { shadow: "0 10px 40px rgba(0,0,0,0.5)", ... }
    }
  }
  // etc.
}
```

**4 Styles Pré-configurés:**

1. **Dark** → Bleu clair + fond sombre (tech premium)
2. **Gradient** → Purple-to-pink (creative/startup)
3. **Minimal** → Noir/blanc épuré (professionnel)
4. **Playful** → Rose/magenta accessible (consumer/fun)

### Phase 2: Transmission à l'IA (app/api/generate-code/route.ts)

```typescript
const designTokens = extractDesignTokens(inputData.heroVariant);

const userPrompt = `
DESIGN TOKENS (À UTILISER STRICTEMENT):
${JSON.stringify(designTokens, null, 2)}

RÈGLES ABSOLUES:
- JAMAIS d'autres couleurs que celles fournies
- JAMAIS d'autres espacements
- JAMAIS d'autres typographies
- Utilise tokens.colors.primary pour TOUS les CTA
- Utilise tokens.spacing.gap pour TOUS les gaps
// etc.
`;

const code = await generateWithClaude(systemPrompt, userPrompt);
```

### Phase 3: Utilisation par l'IA (Generated Code)

```typescript
// Ce que l'IA génère:
<div className={`p-[${tokens.spacing.padding}] gap-[${tokens.spacing.gap}]`}>
  <h1 className={tokens.typography.h1}>Mon Titre</h1>
  <button className={`bg-[${tokens.colors.primary}] shadow-[${tokens.effects.shadow}]`}>
    Mon CTA
  </button>
</div>

// Résultat HTML/CSS généré:
<div className="p-[40px] gap-[28px]">
  <h1 className="text-7xl font-bold">Mon Titre</h1>
  <button className="bg-[#60a5fa] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
    Mon CTA
  </button>
</div>
```

---

## 🧪 Comment Tester

### Test 1: Extraction des Tokens
```bash
curl -X POST http://localhost:3000/api/extract-design-tokens \
  -H "Content-Type: application/json" \
  -d '{"heroStyle": "dark", "inputData": {}}'

# Réponse:
{
  "designTokens": {
    "colors": { "primary": "#60a5fa", ... },
    "typography": { "h1": "text-7xl font-bold", ... },
    ...
  }
}
```

### Test 2: Génération Cohérente
1. Créer un projet avec hero="dark"
2. Générer la page
3. Générer le code
4. Vérifier que TOUTES les couleurs sont "#60a5fa" ou du token set "dark"

---

## 🎨 Exemple Concret: Utilisateur Choisit "Dark Style"

```
ÉTAPE 1: Extraction
  → designTokens = getDarkTokens()
  → primary: #60a5fa, background: #0f172a, text: #f1f5f9

ÉTAPE 2: Génération JSON (pas d'impact, IA génère juste du texte)
  → hero.headline: "Manage tasks faster"
  → features: [...]
  → (Aucune couleur ici)

ÉTAPE 3: Génération Code
  → Claude reçoit les tokens dark
  → Génère:
     - h1 avec tokens.typography.h1 ✅
     - Buttons avec tokens.colors.primary (#60a5fa) ✅
     - Spacing avec tokens.spacing.gap ✅
     - Shadows avec tokens.effects.shadow ✅

RÉSULTAT: Page dark-themed cohérente 100%
```

---

## ✅ Avantages Réalisés

| Avantage | Avant | Après |
|----------|-------|-------|
| **Cohérence** | ❌ Couleurs aléatoires | ✅ Tokens strict |
| **Contrôle** | ❌ L'IA fait n'importe quoi | ✅ Limité au token set |
| **UX** | ❌ Pages désordonnées | ✅ Pages pro |
| **Scalabilité** | ❌ Ajouter style = code nouveau | ✅ Juste ajouter token set |
| **Maintenabilité** | ❌ Duplication de couleurs | ✅ Centralisé |

---

## 🚀 Prochaines Étapes (Optionnel)

1. **Créer des variantes de tokens supplémentaires**
   - Corporate (bleu profond)
   - Startup (bright/vibrant)
   - etc.

2. **Ajouter un UI de sélection de style**
   - Dropdown/cards pour choisir le style
   - Preview du token set

3. **Permettre la customisation des tokens**
   - Utilisateur change couleur primaire
   - Nouveau token set généré
   - Page regénérée automatiquement

4. **Analytics**
   - Track quel style est le plus populaire
   - Conversion par style

---

## 📚 Fichiers Clés à Consulter

- `lib/ai/extractDesignTokens.ts` - Logique d'extraction
- `app/api/generate-code/route.ts` - Intégration dans le flux
- `lib/ai/prompts.ts` - Prompts système (section DESIGN TOKENS)
- `types/index.ts` - Interface DesignTokens

---

## 🎯 Conclusion

Le système de design tokens transforme l'IA de "générateur chaotique" à "générateur cohérent et professionnel". Chaque landing page générée ressemble à du vrai design, pas à de la génération IA.
