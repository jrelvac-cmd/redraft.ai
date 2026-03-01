# Guide de tests Redraft.AI

## Tests manuels à effectuer

### Phase 1 : Landing Page Marketing
- [ ] Accéder à `http://localhost:3000`
- [ ] Vérifier l'affichage du Hero avec chatbox
- [ ] Vérifier les sections Features, Social Proof, FAQ
- [ ] Tester le chatbox : entrer une description et cliquer sur "Commencer"
- [ ] Vérifier la redirection vers `/generator` avec description en localStorage

### Phase 2 : Authentification
- [ ] Créer un compte (`/auth/signup`)
  - Email/Password
  - Google OAuth (si configuré)
- [ ] Se connecter (`/auth/login`)
- [ ] Vérifier la création automatique du profil dans Supabase
- [ ] Vérifier la génération du code d'affiliation
- [ ] Se déconnecter

### Phase 3 : Création de projet
- [ ] Accéder à `/generator`
- [ ] Vérifier la récupération de la description depuis localStorage
- [ ] Uploader 1-5 images (PNG, JPEG, PDF)
- [ ] Vérifier les validations :
  - Description minimum 50 caractères
  - Maximum 5 fichiers
  - Maximum 10 MB par fichier
- [ ] Soumettre le formulaire
- [ ] Vérifier la création du projet dans Supabase
- [ ] Vérifier l'upload des assets dans le bucket `project-assets`
- [ ] Vérifier la redirection vers `/generator/[projectId]/questions`

### Phase 4 : Tunnel de questions
- [ ] Étape 1 : Nom et Objectif
  - Vérifier la pré-remplissage si détecté
  - Vérifier le badge "Détecté automatiquement"
  - Tester les 4 objectifs
- [ ] Étape 2 : Logo
  - Uploader un logo
  - Tester "Passer cette étape"
- [ ] Étape 3 : Angle marketing + Headline
  - Tester les 6 angles
  - Vérifier les suggestions de headlines (si API configurée)
  - Tester le mode "Écrire mon propre H1"
- [ ] Étape 4 : Couleurs
  - Tester les palettes prédéfinies
  - Vérifier la palette détectée (si images uploadées)
  - Tester Dark/Light mode
- [ ] Étape 5 : Typographie
  - Tester les 5 polices
- [ ] Étape 6 : Framework copywriting
  - Tester AIDA, PAS, Benefit-First
- [ ] Étape 7 : Style de Hero
  - Tester les 3 variantes avec preview
- [ ] Étape 8 : Preuve sociale
  - Tester "Générer avec l'IA"
  - Tester l'upload CSV
- [ ] Étape 9 : Informations complémentaires
  - Tester le champ concurrents
  - Tester l'URL vidéo
  - Tester l'intégration email
- [ ] Étape 10 : Résumé
  - Vérifier l'affichage de tous les choix
  - Cliquer sur "Lancer la génération"
- [ ] Vérifier la barre de progression verticale
- [ ] Tester le bouton "Retour"
- [ ] Tester le bouton "Mode Rapide"
- [ ] Vérifier la persistance des réponses dans Supabase

### Phase 5 : Génération IA
- [ ] Vérifier l'écran de chargement avec progression
- [ ] Attendre la génération (30-60 secondes)
- [ ] Vérifier que `ai_data` est bien sauvegardé dans Supabase
- [ ] Vérifier le statut du projet passe à "preview"

### Phase 6 : Preview & Paywall
- [ ] Vérifier l'affichage du Hero (non flouté)
- [ ] Vérifier que les autres sections sont floutées
- [ ] Vérifier l'overlay "Section verrouillée"
- [ ] Cliquer sur "Déverrouiller pour 19€"
- [ ] Vérifier la redirection vers `/checkout/[projectId]`

### Phase 7 : Paiement
- [ ] Vérifier l'affichage de la page checkout
- [ ] Vérifier les informations du projet
- [ ] Vérifier les 5 avantages listés
- [ ] Cliquer sur "Payer 19€"
- [ ] Vérifier la redirection vers Lemon Squeezy
- [ ] Effectuer un paiement test
- [ ] Vérifier la réception du webhook
- [ ] Vérifier que le statut du projet passe à "unlocked"
- [ ] Vérifier la redirection vers `/payment/success`
- [ ] Vérifier la réception de l'email de confirmation

### Phase 8 : Éditeur
- [ ] Accéder à `/generator/[projectId]/editor`
- [ ] Vérifier l'affichage 3 colonnes :
  - Sidebar gauche (sections)
  - Panel central (édition)
  - Preview droite
- [ ] Tester l'édition de chaque section :
  - Hero
  - Features
  - Social Proof
  - FAQ
  - CTA Section
  - Meta SEO
- [ ] Vérifier le badge "Non sauvegardé"
- [ ] Cliquer sur "Sauvegarder"
- [ ] Vérifier la sauvegarde dans Supabase
- [ ] Tester le bouton "Regénérer" (icône Sparkles)
- [ ] Vérifier la mise à jour en temps réel dans la preview
- [ ] Cliquer sur "Exporter le code"
- [ ] Vérifier la génération du code (30-60 secondes)
- [ ] Vérifier l'affichage des fichiers dans les tabs
- [ ] Tester "Copier" pour chaque fichier
- [ ] Tester "Tout télécharger"

### Phase 9 : Dashboard
- [ ] Accéder à `/dashboard`
- [ ] Vérifier l'affichage de tous les projets
- [ ] Vérifier les statuts (draft, preview, unlocked)
- [ ] Tester la recherche
- [ ] Tester "Nouveau projet"
- [ ] Tester le menu "..." sur une carte :
  - Voir
  - Éditer (si unlocked)
  - Exporter (si unlocked)
  - Supprimer
- [ ] Vérifier la suppression d'un projet
- [ ] Vérifier l'affichage du statut Pro/Free
- [ ] Vérifier l'affichage des crédits

### Phase 10 : Affiliation
- [ ] Accéder à `/dashboard/affiliate`
- [ ] Vérifier l'affichage du code d'affiliation
- [ ] Tester "Copier" le lien
- [ ] Vérifier les statistiques (parrainages, gains)
- [ ] Créer un compte avec `?ref=CODE` dans l'URL
- [ ] Vérifier que le parrainage est enregistré dans Supabase
- [ ] Vérifier l'affichage du nouveau parrainage dans le tableau

### Phase 11 : Emails
- [ ] Vérifier l'email de bienvenue à l'inscription
- [ ] Vérifier l'email de déverrouillage après paiement
- [ ] Tester la popup de feedback après export
- [ ] Soumettre un feedback
- [ ] Vérifier l'enregistrement dans Supabase

### Phase 12 : Pages légales
- [ ] Accéder à `/legal/privacy`
- [ ] Accéder à `/legal/terms`
- [ ] Vérifier l'affichage et la lisibilité

## Tests de performance

### Lighthouse
```bash
# Installer Lighthouse CLI
npm install -g lighthouse

# Tester la page d'accueil
lighthouse http://localhost:3000 --view

# Objectifs :
# - Performance : > 90
# - Accessibility : > 95
# - Best Practices : > 90
# - SEO : > 95
```

### Bundle Size
```bash
# Analyser le bundle
npm run build

# Vérifier que :
# - First Load JS < 200 KB
# - Pas de dépendances inutiles
```

## Tests de sécurité

- [ ] Vérifier que les routes protégées redirigent vers `/auth/login`
- [ ] Vérifier que les RLS policies Supabase fonctionnent
- [ ] Tester l'accès à un projet d'un autre utilisateur (doit être refusé)
- [ ] Vérifier que les clés API ne sont jamais exposées côté client
- [ ] Vérifier la validation du webhook Lemon Squeezy (signature)

## Checklist finale avant production

- [ ] Toutes les variables d'environnement sont configurées
- [ ] Les migrations Supabase sont appliquées
- [ ] Le bucket de storage est public avec RLS
- [ ] Les providers OAuth sont configurés (si utilisés)
- [ ] Le webhook Lemon Squeezy est configuré
- [ ] Les domaines d'envoi Resend sont vérifiés
- [ ] Les URLs de redirection sont à jour
- [ ] Le fichier `.env.local.example` est à jour
- [ ] Le README est complet
- [ ] Les pages légales sont complètes
- [ ] Les erreurs sont gérées gracieusement
- [ ] Le build Next.js passe sans erreur
- [ ] Les tests manuels critiques sont passés

## Notes

- Utilisez des paiements test Lemon Squeezy avant de passer en production
- Surveillez les logs Vercel et Supabase les premiers jours
- Configurez des alertes pour les erreurs critiques
