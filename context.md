# Redraft.AI - Contexte du Projet

## Vue d'ensemble
Redraft.AI est un générateur de landing pages haute performance pour SaaS et startups, propulsé par l'IA. Il combine Claude 3.5 Sonnet et GPT-4o pour générer des pages complètes avec copywriting optimisé et du code Next.js prêt à déployer.

## Dernière mise à jour
**03 mars 2026** - Système de Design Tokens pour cohérence IA
- Implémentation du système d'extraction de design tokens
- 4 styles de héro pré-configurés (Dark, Gradient, Minimal, Playful)
- Tokens appliqués strictement à toute la page générée
- Cohérence 100% garantie entre héro et autres sections
- L'IA ne peut plus générer des pages incohérentes visuellement
- API endpoint `/api/extract-design-tokens` pour extraire les tokens
- Tokens passés au prompt Claude/GPT pour génération de code cohérente
- Nouvelle structure: tokens → design → code

## Stack Technique

### Frontend
- **Framework**: Next.js 16.1.6 (App Router)
- **Langage**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Animations**: Framer Motion (entrées, stagger, scroll triggers)
- **Icônes**: Lucide React
- **State Management**: Zustand

### Backend & Services
- **Base de données**: Supabase (PostgreSQL + Auth + Storage)
- **IA**: Claude 3.5 Sonnet (Anthropic) + GPT-4o (OpenAI)
- **Paiement**: Lemon Squeezy
- **Emails**: Resend

## Architecture

### Routes principales
- `/` : Landing page marketing (page.tsx - REFONTÉE)
- `/generator` : Chatbox + upload d'images
- `/generator/[projectId]/questions` : Tunnel de questions
- `/generator/[projectId]/preview` : Preview avec paywall
- `/generator/[projectId]/editor` : Éditeur visuel
- `/checkout/[projectId]` : Page de paiement
- `/dashboard` : Liste des projets
- `/dashboard/affiliate` : Programme d'affiliation
- `/auth/login` : Connexion
- `/auth/signup` : Inscription

### API Routes
- `/api/upload-asset` : Upload de fichiers vers Supabase Storage
- `/api/analyze-images` : Analyse d'images avec GPT-4o
- `/api/generate-headlines` : Génération de headlines
- `/api/generate-page` : Génération complète de landing page
- `/api/generate-code` : Génération du code exportable
- `/api/regenerate` : Regénération de sections
- `/api/create-checkout` : Création de checkout Lemon Squeezy
- `/api/webhooks/lemon-squeezy` : Webhook pour les paiements
- `/api/send-email` : Envoi d'emails via Resend
- `/api/projects` : CRUD des projets
- `/api/affiliate` : Statistiques d'affiliation

## Design System & Design Tokens

### Architecture Design Tokens (NEW)

Pour garantir la cohérence visuelle de chaque landing page générée, le système utilise un **Design Token System** :

```
1. UTILISATEUR CHOISIT UN STYLE
   ↓
2. SYSTÈME EXTRAIT LES TOKENS
   (couleurs, typographie, spacing, effets)
   ↓
3. L'IA REÇOIT LES TOKENS
   ↓
4. L'IA GÉNÈRE TOUTE LA PAGE AVEC CES TOKENS
   ↓
RÉSULTAT: Page 100% cohérente visuellement
```

### Styles de Héros Disponibles

| Style | Palette | Usage |
|-------|---------|-------|
| **Dark** | Bleu clair sur fond sombre | Tech, premium, B2B |
| **Gradient** | Purple-to-Pink avec gradient | Créatif, modern, startup |
| **Minimal** | Noir sur blanc, épuré | Minimaliste, professionnel |
| **Playful** | Rose/Magenta, accessible | Fun, social, consumer |

### Structure des Tokens

Chaque style génère ces tokens :

```typescript
{
  colors: {
    primary: "#hex",        // Couleur dominante
    secondary: "#hex",      // Couleur secondaire
    accent: "#hex",         // Couleur accent CTA
    background: "#hex",     // Fond page
    text: "#hex",           // Texte principal
    muted: "#hex",          // Fond secondaire (sections)
    border: "#hex",         // Couleurs borders
  },
  typography: {
    h1: "text-7xl font-bold",  // Headlines principales
    h2: "text-5xl font-bold",  // Sous-headings
    h3: "text-3xl font-semibold",
    body: "text-lg text-gray-600",
    small: "text-sm text-gray-500",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    gap: "24px",      // Gap entre sections
    padding: "32px",  // Padding standard
  },
  effects: {
    shadow: "0 10px 25px rgba(...)",
    shadowHover: "0 20px 40px rgba(...)",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  }
}
```

### Flux de Génération avec Tokens

**Étape 1: Extract (Backend)**
```typescript
// app/api/generate-page/route.ts
const designTokens = extractDesignTokens(heroVariant, inputData);
// Résultat: tokens complets pour le style choisi
```

**Étape 2: Prompt (Claude/GPT)**
```typescript
const userPrompt = `
DESIGN TOKENS:
${JSON.stringify(designTokens)}

RÈGLE STRICTE:
- Utilise UNIQUEMENT tokens.colors.primary pour les boutons
- Utilise UNIQUEMENT tokens.spacing.gap pour tous les gaps
- Utilise UNIQUEMENT tokens.typography.h1 pour les titres
// etc.
`;
```

**Étape 3: Génération (Code Généré)**
```typescript
// L'IA génère du code comme ça:
<div className={`gap-[${tokens.spacing.gap}] p-[${tokens.spacing.padding}]`}>
  <h1 className={tokens.typography.h1}>Titre</h1>
  <button className={`bg-[${tokens.colors.primary}] shadow-[${tokens.effects.shadow}]`}>
    CTA
  </button>
</div>
```

### API Endpoints

| Endpoint | Méthode | Utilité |
|----------|---------|---------|
| `/api/extract-design-tokens` | POST | Extrait tokens d'un style |
| `/api/generate-page` | POST | Génère landing JSON + tokens |
| `/api/generate-code` | POST | Génère code React avec tokens |

### Bénéfices du Design Token System

✅ **Cohérence garantie** - Aucune couleur/spacing aléatoire
✅ **Flexibilité** - Ajouter un nouveau style = nouveau token set
✅ **Scalabilité** - L'IA peut générer infinies pages cohérentes
✅ **Maintenabilité** - Change un token = toute la page change
✅ **UX** - Pages générées ressemblent à du vrai design, pas de l'IA

## Sections de la Landing Page

### 1. Navigation (fixed)
- Logo + Redraft.AI
- Liens: Connexion, Commencer
- Backdrop blur avec border subtle
- Fixed top-0 z-50

### 2. Hero Section
- Gradient background (from-white via-blue-50/30 to-white)
- Headline 5xl-7xl avec gradient text
- Badge bleu avec icon
- Call-to-action textarea + button
- Animations stagger avec Framer Motion

### 3. How it Works
- 3 étapes: Décrivez → Générez → Déployez
- Cards avec step numbers (01, 02, 03)
- Icons Layers, Sparkles, Rocket
- Arrows entre les cartes (desktop only)
- Fond gray-50

### 4. Features
- 2x2 grid sur desktop
- 4 features avec icons
- Cartes gray-50 avec hover effect
- Icons: Palette, Code, Zap, CheckCircle2

### 5. Social Proof
- Testimonials 3-colonnes
- 5 stars en emoji
- Quote en gras, author + role
- Fond blue-50 avec border

### 6. FAQ
- 4 questions clés
- Cartes gray-50 avec hover
- Design simplifié (pas d'accordion, affichage direct)

### 7. CTA Final
- Gradient blue-600 to blue-700
- Texte blanc, button blanc avec text bleu
- Call-to-action puissante: "Prêt à lancer?"

### 8. Footer
- 4 colonnes: Brand + Product + Company + Légal
- Text petit (sm), gris
- Border top subtle
- Copyright centré

## Animations Framer Motion
- `fadeInUp`: Opacity 0→1, Y 20→0, 0.6s
- `staggerContainer`: Stagger 0.1s, delay 0.2s
- `whileInView`: Déclenche au scroll
- `viewport={{ once: true }}`: Animation 1x seulement

## Features Actuelles

### Pour les utilisateurs
- ✅ Chatbox intelligent
- ✅ Upload d'images/PDFs avec analyse couleurs
- ✅ Tunnel de 10 questions guidées
- ✅ Génération IA de landing page complète
- ✅ Preview avec Hero visible + sections floutées
- ✅ Paiement sécurisé (19€)
- ✅ Éditeur visuel 3 colonnes
- ✅ Regénération IA de sections
- ✅ Export code Next.js/Tailwind/TypeScript propre
- ✅ Dashboard avec gestion projets
- ✅ Programme d'affiliation (30%)
- ✅ Emails automatiques

### Composants Puzzle Pieces
- `HeroCentered` : Hero centré avec mockup
- `HeroSplit` : Hero 50/50 texte/visuel
- `HeroFullWidth` : Hero pleine largeur avec gradient
- `Features` : Grille de features avec icônes
- `PainPoints` : Problèmes/Solutions côte à côte
- `SocialProof` : Témoignages avec notation 5 étoiles
- `FAQ` : Accordion avec questions/réponses
- `CTASection` : Section finale d'appel à l'action
- `FooterSection` : Footer avec mentions légales

## Prochaines étapes
- [ ] Tester la landing page en dev
- [ ] Optimiser les performances (Core Web Vitals)
- [ ] A/B tester les CTA
- [ ] Ajouter analytics (Vercel Analytics)
- [ ] Optimiser les images (next/image)
