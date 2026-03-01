# Redraft.AI

Générateur de landing pages haute performance pour produits SaaS, propulsé par l'IA (Claude 3.5 Sonnet + GPT-4o).

## Stack Technique

- **Framework**: Next.js 15 (App Router)
- **Langage**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Animations**: Framer Motion
- **Icônes**: Lucide React
- **Base de données**: Supabase (PostgreSQL + Auth + Storage)
- **IA**: Claude 3.5 Sonnet (Anthropic) + GPT-4o (OpenAI)
- **Paiement**: Lemon Squeezy
- **Emails**: Resend
- **State Management**: Zustand

## Installation

1. Cloner le repository
2. Installer les dépendances :

```bash
npm install
```

3. Copier `.env.local.example` vers `.env.local` et remplir les variables d'environnement :

```bash
cp .env.local.example .env.local
```

4. Configurer Supabase :
   - Créer un projet Supabase (région EU pour RGPD)
   - Exécuter les scripts SQL dans `/supabase/migrations`
   - Copier les clés API dans `.env.local`

5. Lancer le serveur de développement :

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Configuration des services externes

### Supabase
- Créer les tables : `profiles`, `projects`, `payments`, `assets`
- Activer Row Level Security (RLS)
- Créer le bucket `project-assets` (public)

### Anthropic (Claude)
- Obtenir une API key sur [console.anthropic.com](https://console.anthropic.com)

### OpenAI (GPT-4o)
- Obtenir une API key sur [platform.openai.com](https://platform.openai.com)

### Lemon Squeezy
- Créer un compte sur [lemonsqueezy.com](https://lemonsqueezy.com)
- Créer 5 produits : 
  - Unlock Page (24,99€)
  - Builder Mensuel (19,99€/mois)
  - Builder Annuel (167,99€/an)
  - Studio Mensuel (49,99€/mois)
  - Studio Annuel (419,99€/an)
- Configurer le webhook pour les paiements

### Resend
- Créer un compte sur [resend.com](https://resend.com)
- Obtenir une API key

## Structure du projet

Voir le fichier [`contexte.md`](./contexte.md) pour la documentation complète de l'architecture.

## Développement

- `npm run dev` : Lancer le serveur de développement
- `npm run build` : Build de production
- `npm run start` : Lancer le serveur de production
- `npm run lint` : Linter le code

## Documentation

- [contexte.md](./contexte.md) : Documentation complète du projet et PRD
- [DEPLOYMENT.md](./DEPLOYMENT.md) : Guide de déploiement sur Vercel
- [TESTING.md](./TESTING.md) : Guide de tests complet
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) : Configuration détaillée de Supabase

## Fonctionnalités

### Pour les utilisateurs
- ✅ Chatbox intelligent pour décrire le SaaS
- ✅ Upload d'images/PDFs (analyse automatique des couleurs)
- ✅ Tunnel de 10 questions guidées avec détection intelligente
- ✅ Génération IA de landing page complète (copywriting + design)
- ✅ Preview avec Hero visible + sections floutées (paywall)
- ✅ Paiement sécurisé 19€ pour déverrouiller
- ✅ Éditeur visuel 3 colonnes (sections, édition, preview live)
- ✅ Regénération IA de sections individuelles
- ✅ Export de code Next.js/Tailwind/TypeScript propre
- ✅ Dashboard avec gestion des projets
- ✅ Programme d'affiliation (30% de commission)
- ✅ Emails automatiques (bienvenue, unlock, feedback)

### Composants Puzzle Pieces
- `HeroCentered` : Hero centré avec mockup en dessous
- `HeroSplit` : Hero 50/50 texte/visuel
- `HeroFullWidth` : Hero pleine largeur avec gradient
- `Features` : Grille de features avec icônes
- `PainPoints` : Problèmes/Solutions côte à côte
- `SocialProof` : Témoignages avec notation 5 étoiles
- `FAQ` : Accordion avec questions/réponses
- `CTASection` : Section finale d'appel à l'action
- `FooterSection` : Footer avec mentions légales

## Architecture

### Routes principales
- `/` : Landing page marketing
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
- `/api/generate-headlines` : Génération de headlines avec Claude
- `/api/generate-page` : Génération complète de landing page
- `/api/generate-code` : Génération du code exportable
- `/api/regenerate` : Regénération de sections
- `/api/create-checkout` : Création de checkout Lemon Squeezy
- `/api/webhooks/lemon-squeezy` : Webhook pour les paiements
- `/api/send-email` : Envoi d'emails via Resend
- `/api/feedback` : Soumission de feedbacks
- `/api/projects` : CRUD des projets
- `/api/affiliate` : Statistiques d'affiliation

## Licence

Propriétaire - Tous droits réservés
