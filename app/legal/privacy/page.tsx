export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Politique de confidentialité</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Collecte des données</h2>
            <p className="text-muted-foreground">
              Redraft.AI collecte les données suivantes :
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Informations de compte (email, nom)</li>
              <li>Données de projets (descriptions, images uploadées)</li>
              <li>Données de paiement (via Lemon Squeezy)</li>
              <li>Données d'utilisation (analytics anonymes)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Utilisation des données</h2>
            <p className="text-muted-foreground">
              Vos données sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Fournir et améliorer nos services</li>
              <li>Générer vos landing pages avec l'IA</li>
              <li>Gérer votre compte et vos paiements</li>
              <li>Vous envoyer des notifications importantes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Partage des données</h2>
            <p className="text-muted-foreground">
              Nous ne vendons jamais vos données. Nous les partageons uniquement avec :
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Anthropic (Claude) et OpenAI (GPT-4o) pour la génération IA</li>
              <li>Lemon Squeezy pour le traitement des paiements</li>
              <li>Supabase pour l'hébergement sécurisé</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Vos droits (RGPD)</h2>
            <p className="text-muted-foreground">
              Conformément au RGPD, vous avez le droit de :
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Accéder à vos données personnelles</li>
              <li>Rectifier vos données</li>
              <li>Supprimer votre compte et vos données</li>
              <li>Exporter vos données</li>
              <li>Vous opposer au traitement</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Pour exercer ces droits, contactez-nous à : privacy@recreate.ai
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
            <p className="text-muted-foreground">
              Nous utilisons des cookies essentiels pour l'authentification et le
              fonctionnement du site. Aucun cookie de tracking tiers n'est utilisé.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Sécurité</h2>
            <p className="text-muted-foreground">
              Vos données sont stockées de manière sécurisée sur Supabase (PostgreSQL)
              avec chiffrement au repos et en transit. L'authentification utilise des
              tokens JWT sécurisés.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Contact</h2>
            <p className="text-muted-foreground">
              Pour toute question concernant cette politique de confidentialité :
            </p>
            <p className="text-muted-foreground">
              Email : privacy@recreate.ai
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-12">
            Dernière mise à jour : 28 février 2026
          </p>
        </div>
      </div>
    </div>
  );
}
