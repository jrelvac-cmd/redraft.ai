# Configuration Supabase pour Redraft.AI

## 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. **IMPORTANT** : Choisir la région **Europe (Frankfurt)** pour la conformité RGPD
4. Noter les informations de connexion

## 2. Configurer les variables d'environnement

Copier les valeurs suivantes dans votre fichier `.env.local` :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
```

## 3. Exécuter les migrations SQL

1. Aller dans l'onglet "SQL Editor" de votre projet Supabase
2. Copier le contenu du fichier `supabase/migrations/001_initial_schema.sql`
3. Coller et exécuter le script

Cela va créer :
- Les 4 tables principales : `profiles`, `projects`, `payments`, `assets`
- Les index pour améliorer les performances
- Les politiques RLS (Row Level Security)
- Les triggers pour la création automatique des profils
- Les fonctions utilitaires

## 4. Créer le bucket de storage

1. Aller dans l'onglet "Storage"
2. Créer un nouveau bucket nommé `project-assets`
3. Configurer le bucket comme **public**
4. Ajouter les politiques de sécurité suivantes :

### Politique SELECT (lecture)
```sql
CREATE POLICY "Users can view own assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### Politique INSERT (upload)
```sql
CREATE POLICY "Users can upload own assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### Politique DELETE (suppression)
```sql
CREATE POLICY "Users can delete own assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 5. Configurer l'authentification

1. Aller dans l'onglet "Authentication" > "Providers"
2. Activer l'authentification par Email
3. Configurer Google OAuth (optionnel) :
   - Créer un projet sur [Google Cloud Console](https://console.cloud.google.com)
   - Activer l'API Google+ et créer des identifiants OAuth 2.0
   - Ajouter l'URL de redirection : `https://votre-projet.supabase.co/auth/v1/callback`
   - Copier le Client ID et Client Secret dans Supabase

## 6. Vérifier la configuration

Exécuter les requêtes suivantes dans le SQL Editor pour vérifier :

```sql
-- Vérifier les tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Vérifier les politiques RLS
SELECT tablename, policyname FROM pg_policies 
WHERE schemaname = 'public';

-- Vérifier le bucket
SELECT * FROM storage.buckets WHERE name = 'project-assets';
```

## 7. Tester l'authentification

1. Lancer l'application : `npm run dev`
2. Aller sur `/auth/signup`
3. Créer un compte de test
4. Vérifier dans Supabase > Authentication > Users que l'utilisateur est créé
5. Vérifier dans la table `profiles` que le profil est automatiquement créé

## Troubleshooting

### Erreur "relation does not exist"
- Vérifier que le script SQL a bien été exécuté
- Vérifier que vous êtes dans le bon projet Supabase

### Erreur RLS
- Vérifier que les politiques RLS sont bien créées
- Vérifier que l'utilisateur est bien authentifié

### Erreur Storage
- Vérifier que le bucket `project-assets` existe
- Vérifier que le bucket est configuré en public
- Vérifier que les politiques de storage sont bien créées
