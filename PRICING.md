# 💰 Tarification Redraft.AI

## Plans disponibles

### 🎯 Free
- **Prix** : 0€/mois
- **Landing pages actives** : 1
- **Features** :
  - Générateur IA basique
  - Export code limité
  - Support communautaire
- **Idéal pour** : Tester le produit, découvrir la plateforme

### 🚀 Builder
- **Prix mensuel** : 19,99€/mois
- **Prix annuel** : 167,99€/an (économise ~71,9€)
- **Landing pages actives** : Jusqu'à 5
- **Features** :
  - Générations IA illimitées (fair-use)
  - Export complet : Next.js 15 + TypeScript + Tailwind + shadcn/UI
  - Multilingue FR/EN
  - Sauvegarde des projets et ré-édition via l'éditeur
  - Support email standard
- **Idéal pour** : Fondateurs SaaS, indie hackers, petits projets qui veulent itérer

### 🏢 Studio/Agence
- **Prix mensuel** : 49,99€/mois
- **Prix annuel** : 419,99€/an (économise ~179,9€)
- **Landing pages actives** : Jusqu'à 20
- **Features** :
  - Exports de code illimités
  - Multilingue FR/EN
  - **Marque blanche** : Pas de mention Redraft dans le code
  - **Priorité file d'attente IA** + génération rapide
  - Support prioritaire (réponse < 24h)
  - Bases de landing réutilisables par client
  - Webhooks et API future
- **Idéal pour** : Freelances, studios, agences qui produisent des landings SaaS pour leurs clients

### 💳 Unlock Page (Pay-as-you-go)
- **Prix** : 24,99€ par landing page
- **Une seule fois** : Accès permanent à la landing page
- **Avantage** : Pour les utilisateurs qui veulent juste une page sans s'abonner
- **Idéal pour** : Tests, MVP, projets ponctuels

---

## 📊 Comparaison détaillée

| Feature | Free | Builder | Studio | Unlock |
|---------|------|---------|--------|--------|
| **Prix mensuel** | 0€ | 19,99€ | 49,99€ | 24,99€ (one-time) |
| **Prix annuel** | — | 167,99€ | 419,99€ | — |
| **Pages actives** | 1 | 5 | 20 | 1 |
| **Générations IA/mois** | Limitées | Illimitées* | Illimitées* | Illimitées* |
| **Export code** | Limité | Complet ✅ | Complet ✅ | Complet ✅ |
| **Marque blanche** | ❌ | ❌ | ✅ | ❌ |
| **Support prioritaire** | ❌ | Standard | Prioritaire ✅ | ❌ |
| **Multilingue FR/EN** | ❌ | ✅ | ✅ | ✅ |
| **Ré-édition projets** | ❌ | ✅ | ✅ | ✅ |

*Fair-use policy : ~50 générations/mois par défaut

---

## 🎯 Stratégie de tarification

### Psychologie marketing appliquée

1. **Price Anchoring** : 
   - Studio (49,99€) est le "high-end" qui rend Builder attrayant
   - Unlock (24,99€) se positionne entre gratuit et Builder

2. **Annualisation stratégique** :
   - 29% de réduction (10,5€ / mois pour Builder)
   - Encourage l'engagement long-terme
   - Prix rond (167,99€ ≈ 14€/mois)

3. **Segmentation claire** :
   - **Free** : Conversion funnel (acquisition)
   - **Builder** : Main revenue stream (small/medium)
   - **Studio** : High-value customers (agencies)
   - **Unlock** : Trial/FOMO mechanism

4. **Ratio prix/valeur** :
   - Studio est 2.5x plus cher mais offre 4x plus de pages
   - Justifié par marque blanche + support + API

---

## 📈 Projections revenue

### Hypothèses
- 1,000 utilisateurs Free (month 1)
- 5% conversion Free → Builder
- 1% conversion Free → Studio
- 10% utilisent Unlock au lieu de s'abonner

### MRR estimé (month 1)
```
Builder: 50 × 19,99€ = 999,50€
Studio: 10 × 49,99€ = 499,90€
Unlock: 100 × 24,99€ = 2,499€
Total MRR ≈ 4,000€
```

### Annual Revenue (year 1 extrapolé)
```
MRR base: ~4,000€
Annualisé: ~48,000€
+ Growth (3x): ~144,000€
Affiliation (30%): +~20,000€
Total ARR: ~164,000€
```

---

## 💡 Recommandations

### À faire avant le lancement
1. **Tester les prix** : A/B test Builder vs Free avec landing page
2. **Monitorer conversion** : Tracker Free → Builder → Studio
3. **Feedback utilisateur** : Demander "pourquoi" aux churned users
4. **Competitor pricing** : Surveiller Figma (à titre de comparaison)

### Optimisations futures
- [ ] Discount long-terme : -40% annuel (au lieu de -29%)
- [ ] Team pricing : 3-4 utilisateurs Studio pour 79,99€/mois
- [ ] Usage-based : Overage pour pages > limite du plan
- [ ] Affiliate tiers : Plus de commission pour Agences (50%+)

---

## 🔗 Intégration Lemon Squeezy

### Variant IDs à créer

```env
# Unlock Page (one-time)
LEMON_SQUEEZY_UNLOCK_VARIANT_ID=xxx

# Builder (monthly & yearly)
LEMON_SQUEEZY_BUILDER_VARIANT_ID=xxx
LEMON_SQUEEZY_BUILDER_YEARLY_VARIANT_ID=xxx

# Studio (monthly & yearly)
LEMON_SQUEEZY_STUDIO_VARIANT_ID=xxx
LEMON_SQUEEZY_STUDIO_YEARLY_VARIANT_ID=xxx
```

### Webhooks à monitorer
- `order_created` : Unlock page payments
- `subscription_created` : Builder/Studio new subscriptions
- `subscription_updated` : Plan upgrades/downgrades
- `subscription_cancelled` : Churn tracking

---

## 🎁 Promo & Discounts (optionnel)

- **Early Adopter** : 50% off Builder pendant 3 mois
- **Referral** : 3 mois gratuits quand ami achète (affiliation)
- **Bundle** : Unlock + 1 mois Builder = -20%
- **Seasonal** : -25% en Black Friday

---

## 📞 Support

Pour des questions de tarification :
- support@redraft.ai
- Calendly pour démo personnalisée (Studio)

