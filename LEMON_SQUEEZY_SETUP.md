# 🍋 Configuration Lemon Squeezy

Voici la liste des 5 produits/variantes à créer dans Lemon Squeezy.

## Produits à créer

### 1️⃣ Unlock Page (Paiement unique)
- **Type** : One-time payment
- **Prix** : 24,99€
- **Devise** : EUR
- **Description** : "Déverrouille une landing page et accès permanent à l'éditeur"
- **Variant ID** : À obtenir après création → `LEMON_SQUEEZY_UNLOCK_VARIANT_ID`

---

### 2️⃣ Plan Builder - Mensuel
- **Type** : Subscription (monthly)
- **Prix** : 19,99€/mois
- **Devise** : EUR
- **Billing cycle** : Monthly
- **Description** : "5 pages actives, générations IA illimitées, export code complet"
- **Features** :
  - Jusqu'à 5 landing pages actives
  - Générations IA illimitées (fair-use)
  - Export Next.js 15 + TypeScript + Tailwind
  - Sauvegarde et ré-édition des projets
- **Variant ID** : À obtenir après création → `LEMON_SQUEEZY_BUILDER_VARIANT_ID`

---

### 3️⃣ Plan Builder - Annuel
- **Type** : Subscription (yearly)
- **Prix** : 167,99€/an
- **Devise** : EUR
- **Billing cycle** : Yearly
- **Description** : "Plan Builder - Facturation annuelle (économise 71,90€)"
- **Features** : Identiques au Builder mensuel
- **Variant ID** : À obtenir après création → `LEMON_SQUEEZY_BUILDER_YEARLY_VARIANT_ID`

---

### 4️⃣ Plan Studio/Agence - Mensuel
- **Type** : Subscription (monthly)
- **Prix** : 49,99€/mois
- **Devise** : EUR
- **Billing cycle** : Monthly
- **Description** : "20 pages, marque blanche, support prioritaire, pour agences"
- **Features** :
  - Jusqu'à 20 landing pages actives
  - Exports de code illimités
  - Marque blanche (pas de mention Redraft dans le code)
  - Support prioritaire (réponse < 24h)
  - Webhooks & API future
  - Multilingue FR/EN
- **Variant ID** : À obtenir après création → `LEMON_SQUEEZY_STUDIO_VARIANT_ID`

---

### 5️⃣ Plan Studio/Agence - Annuel
- **Type** : Subscription (yearly)
- **Prix** : 419,99€/an
- **Devise** : EUR
- **Billing cycle** : Yearly
- **Description** : "Plan Studio - Facturation annuelle (économise 179,90€)"
- **Features** : Identiques au Studio mensuel
- **Variant ID** : À obtenir après création → `LEMON_SQUEEZY_STUDIO_YEARLY_VARIANT_ID`

---

## 📝 Template de store ID

```
Store ID: [À obtenir dans Settings → Store]
```

## 🔧 Étapes de création

1. **Aller dans Lemon Squeezy Dashboard**
2. **Products** → **Create Product** pour chaque produit ci-dessus
3. **Pour chaque produit** :
   - Remplir le nom et description
   - Ajouter les prix selon le type (one-time ou subscription)
   - Créer les variantes (Builder mensuel, Builder annuel, etc.)
   - Copier les Variant IDs
4. **Settings** → **API Keys** → Générer une clé API

## 📋 Variables d'environnement à remplir

Après avoir créé tous les produits, remplissez ces variables dans `.env.local` et Vercel :

```env
# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=[Votre clé API]
LEMON_SQUEEZY_WEBHOOK_SECRET=[Webhook signing secret]
LEMON_SQUEEZY_STORE_ID=[Votre Store ID]

# Product Variants
LEMON_SQUEEZY_UNLOCK_VARIANT_ID=[Variant ID du produit Unlock]
LEMON_SQUEEZY_BUILDER_VARIANT_ID=[Variant ID du Builder mensuel]
LEMON_SQUEEZY_BUILDER_YEARLY_VARIANT_ID=[Variant ID du Builder annuel]
LEMON_SQUEEZY_STUDIO_VARIANT_ID=[Variant ID du Studio mensuel]
LEMON_SQUEEZY_STUDIO_YEARLY_VARIANT_ID=[Variant ID du Studio annuel]
```

## ✅ Webhook Configuration

Dans Lemon Squeezy → Settings → Webhooks :

- **Endpoint URL** : `https://votre-domaine.vercel.app/api/webhooks/lemon-squeezy`
- **Events** à cocher :
  - ✅ `order_created`
  - ✅ `subscription_created`
  - ✅ `subscription_updated`
  - ✅ `subscription_cancelled`
- **Copier le Signing Secret** → `LEMON_SQUEEZY_WEBHOOK_SECRET`

## 💡 Tips

- **Test Mode** : Créer des produits de test avant de lancer
- **Pricing Updates** : Les prix ne peuvent pas être modifiés après création (créer une nouvelle variante)
- **Currency** : Toujours en EUR pour Redraft.AI
- **Tax** : Lemon Squeezy gère automatiquement la TVA

