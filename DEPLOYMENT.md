# Guide de déploiement Redraft.AI

## Prérequis

Avant de déployer, assurez-vous d'avoir :

- ✅ Un projet Supabase configuré avec les migrations appliquées
- ✅ Un bucket de storage `project-assets` public configuré
- ✅ Les clés API pour Anthropic, OpenAI, Lemon Squeezy et Resend
- ✅ Un compte Vercel

## Étape 1 : Configuration Supabase

### 1.1 Créer le projet
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez l'URL du projet et la clé `anon` (API Settings)

### 1.2 Appliquer les migrations
```bash
# Connectez-vous au SQL Editor de Supabase
# Copiez-collez le contenu de supabase/migrations/001_initial_schema.sql
# Puis 002_add_feedbacks.sql
# Exécutez les scripts
```

### 1.3 Configurer le Storage
1. Allez dans Storage → Create bucket
2. Nom : `project-assets`
3. Public : ✓ Oui
4. Appliquez les RLS policies (voir SUPABASE_SETUP.md)

### 1.4 Configurer l'authentification
1. Allez dans Authentication → Providers
2. Activez Email/Password
3. Activez Google OAuth (optionnel)
4. Configurez les URLs de redirection :
   - `http://localhost:3000/auth/callback` (dev)
   - `https://votre-domaine.com/auth/callback` (prod)

## Étape 2 : Configuration des API externes

### 2.1 Anthropic (Claude)
1. Créez un compte sur [console.anthropic.com](https://console.anthropic.com)
2. Générez une clé API
3. Notez la clé pour les variables d'environnement

### 2.2 OpenAI (GPT-4o)
1. Créez un compte sur [platform.openai.com](https://platform.openai.com)
2. Ajoutez des crédits (minimum 10$)
3. Générez une clé API
4. Notez la clé pour les variables d'environnement

### 2.3 Lemon Squeezy
1. Créez un compte sur [lemonsqueezy.com](https://lemonsqueezy.com)
2. Créez un store
3. Créez 5 produits :
   - **Unlock Page** : 24,99€ (paiement unique)
   - **Builder - Mensuel** : 19,99€/mois
   - **Builder - Annuel** : 167,99€/an
   - **Studio/Agence - Mensuel** : 49,99€/mois
   - **Studio/Agence - Annuel** : 419,99€/an
4. Notez les Variant IDs de chaque produit :
   - Unlock Page : `LEMON_SQUEEZY_UNLOCK_VARIANT_ID`
   - Builder (Mensuel) : `LEMON_SQUEEZY_BUILDER_VARIANT_ID`
   - Builder (Annuel) : `LEMON_SQUEEZY_BUILDER_YEARLY_VARIANT_ID`
   - Studio (Mensuel) : `LEMON_SQUEEZY_STUDIO_VARIANT_ID`
   - Studio (Annuel) : `LEMON_SQUEEZY_STUDIO_YEARLY_VARIANT_ID`
5. Générez une clé API (Settings → API)
6. Configurez le webhook :
   - URL : `https://votre-domaine.com/api/webhooks/lemon-squeezy`
   - Events : `order_created`, `subscription_created`, `subscription_updated`, `subscription_cancelled`
   - Notez le Signing Secret

### 2.4 Resend
1. Créez un compte sur [resend.com](https://resend.com)
2. Vérifiez votre domaine d'envoi (ou utilisez le domaine de test)
3. Générez une clé API
4. Notez la clé pour les variables d'environnement

## Étape 3 : Déploiement sur Vercel

### 3.1 Préparer le projet
```bash
# Assurez-vous que toutes les dépendances sont installées
npm install

# Vérifiez qu'il n'y a pas d'erreurs de build
npm run build
```

### 3.2 Déployer sur Vercel
1. Installez Vercel CLI (optionnel) :
   ```bash
   npm i -g vercel
   ```

2. Ou déployez via l'interface web :
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez votre repo GitHub/GitLab
   - Importez le projet `Redraft.AI`

### 3.3 Configurer les variables d'environnement
Dans Vercel → Settings → Environment Variables, ajoutez :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Anthropic (Claude)
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI (GPT-4o)
OPENAI_API_KEY=sk-...

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...
LEMON_SQUEEZY_WEBHOOK_SECRET=...
LEMON_SQUEEZY_STORE_ID=...
LEMON_SQUEEZY_UNLOCK_VARIANT_ID=...
LEMON_SQUEEZY_BUILDER_VARIANT_ID=...
LEMON_SQUEEZY_BUILDER_YEARLY_VARIANT_ID=...
LEMON_SQUEEZY_STUDIO_VARIANT_ID=...
LEMON_SQUEEZY_STUDIO_YEARLY_VARIANT_ID=...

# Resend
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=https://votre-domaine.vercel.app
```

### 3.4 Déployer
```bash
# Via CLI
vercel --prod

# Ou via l'interface web : cliquez sur "Deploy"
```

## Étape 4 : Post-déploiement

### 4.1 Vérifier le webhook Lemon Squeezy
1. Allez dans Lemon Squeezy → Settings → Webhooks
2. Mettez à jour l'URL avec votre domaine de production
3. Testez le webhook avec un paiement test

### 4.2 Vérifier les redirections OAuth
1. Retournez dans Supabase → Authentication → URL Configuration
2. Ajoutez votre domaine de production aux Redirect URLs

### 4.3 Configurer le domaine personnalisé (optionnel)
1. Dans Vercel → Settings → Domains
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions

### 4.4 Tests de production
- [ ] Créer un compte
- [ ] Créer un projet
- [ ] Passer par le tunnel de questions
- [ ] Générer une landing page
- [ ] Tester le paiement (mode test)
- [ ] Vérifier l'éditeur
- [ ] Exporter le code
- [ ] Vérifier les emails

## Optimisations recommandées

### Performance
- ✅ Images optimisées avec `next/image`
- ✅ Lazy loading des composants lourds
- ✅ Streaming SSR pour les routes API
- ⚠️ Ajouter un CDN pour les assets statiques (optionnel)

### SEO
- ✅ Meta tags configurés
- ✅ Sitemap.xml (à générer)
- ✅ Robots.txt (à créer)

### Monitoring
- Configurer Vercel Analytics
- Configurer Sentry pour les erreurs (optionnel)
- Surveiller les logs Supabase

## Troubleshooting

### Erreur : "Supabase client not initialized"
→ Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont bien définis

### Erreur : "Failed to generate page"
→ Vérifiez que `ANTHROPIC_API_KEY` est valide et a des crédits

### Erreur : "Payment failed"
→ Vérifiez la configuration Lemon Squeezy et le webhook

### Images ne s'affichent pas
→ Vérifiez que le bucket `project-assets` est public et que les RLS policies sont correctes

## Support

Pour toute question : support@redraft.ai
