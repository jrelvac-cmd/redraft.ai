# Redraft.AI - Contexte du Projet

## Vue d'ensemble
Redraft.AI est un générateur de landing pages haute performance pour SaaS et startups, propulsé par l'IA. Il combine Claude 3.5 Sonnet et GPT-4o pour générer des pages complètes avec copywriting optimisé et du code Next.js prêt à déployer.

## Dernière mise à jour
**03 mars 2026** - Refonte complète de la landing page avec design inspiré de relume.io
- Modernisation du design avec gradients et animations fluides
- Navigation fixe avec backdrop blur
- Hero section avec gradient text
- Section "How it works" avec 3 étapes claires
- Features grid moderne
- Social proof avec testimonials
- FAQ améliorée
- Footer avec structure multi-colonnes
- Utilisation complète de Framer Motion pour les animations

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

## Design System

### Palette de couleurs (mise à jour 2026)
- **Primaire**: Blue-600 (#2563EB)
- **Secondaire**: Blue-400 (#60A5FA) 
- **Fond**: Blanc pur (#FFFFFF)
- **Gris**: Palette complète de gray-50 à gray-900
- **Accents**: Yellow pour les ratings (★)

### Typographie
- **Headlines**: Font-bold, 5xl-7xl
- **Subheadings**: 2xl-4xl
- **Body**: Regular, 16-18px
- **Labels**: Small, font-semibold

### Spacing & Layout
- Container max-width: 5xl (64rem)
- Section padding: py-20 md:py-32
- Gaps: 8px (gap-2), 12px (gap-3), 16px (gap-4), 32px (gap-8)
- Border radius: 2xl (1rem) pour les cartes, xl (0.75rem) pour les inputs

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
