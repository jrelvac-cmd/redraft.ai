# Setup Coming Soon - Instructions

## 1. Créer la table Supabase

Exécute le SQL suivant dans Supabase (SQL Editor) :

```sql
-- Table pour stocker les emails des subscribers Coming Soon
CREATE TABLE IF NOT EXISTS coming_soon_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notified BOOLEAN DEFAULT FALSE
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_coming_soon_subscribers_email ON coming_soon_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_coming_soon_subscribers_created_at ON coming_soon_subscribers(created_at);

-- Politique RLS
ALTER TABLE coming_soon_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON coming_soon_subscribers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow service role select" ON coming_soon_subscribers
  FOR SELECT
  USING (auth.role() = 'service_role');
```

## 2. Variables d'environnement

Assure-toi que tes variables sont correctes dans `.env.local` :
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 3. Comportement par environnement

### En développement (NODE_ENV=development)
- Accès complet à toutes les routes
- Utile pour finaliser le SaaS

### En production (NODE_ENV=production)
- Seule la page `/coming-soon` est accessible
- Redirection automatique vers Coming Soon pour toutes les autres routes
- Les emails sont collectés et stockés dans Supabase

## 4. Déploiement sur Vercel

1. Déploie normalement sur Vercel
2. Ajoute les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NODE_ENV=production` (si nécessaire)
3. La page Coming Soon sera visible automatiquement en production

## 5. Voir les emails collectés

Dans Supabase Console :
- Tables → coming_soon_subscribers
- Tu verras tous les emails inscrits avec dates

## 6. Lancer le SaaS complet

Quand tu es prêt :
1. Ajoute un toggle/config pour désactiver le middleware de Coming Soon
2. Ou change `NODE_ENV` en development avant le vrai lancement
3. Le SaaS sera alors entièrement accessible
