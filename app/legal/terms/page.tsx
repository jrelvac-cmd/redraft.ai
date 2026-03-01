export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptation des conditions</h2>
            <p className="text-muted-foreground">
              En utilisant Redraft.AI, vous acceptez ces conditions générales
              d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas
              utiliser notre service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Description du service</h2>
            <p className="text-muted-foreground">
              Redraft.AI est un générateur de landing pages SaaS propulsé par l'IA
              (Claude 3.5 Sonnet et GPT-4o). Le service permet de créer, personnaliser
              et exporter des landing pages professionnelles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Tarification</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Déverrouillage unique :</strong> 19€ par landing page pour
                accéder au code et à l'éditeur complet
              </li>
              <li>
                <strong>Abonnement Pro :</strong> 39€/mois pour des déverrouillages
                illimités et des fonctionnalités avancées
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Les paiements sont traités de manière sécurisée par Lemon Squeezy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Propriété du code</h2>
            <p className="text-muted-foreground">
              Une fois déverrouillé, le code généré vous appartient entièrement. Vous
              pouvez l'utiliser, le modifier et le déployer sans restriction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Utilisation acceptable</h2>
            <p className="text-muted-foreground">
              Vous vous engagez à ne pas :
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Utiliser le service à des fins illégales</li>
              <li>Générer du contenu offensant ou discriminatoire</li>
              <li>Tenter de contourner les limitations techniques</li>
              <li>Revendre l'accès au service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Garanties et limitations</h2>
            <p className="text-muted-foreground">
              Le service est fourni "tel quel". Nous ne garantissons pas que le code
              généré sera exempt d'erreurs ou adapté à tous les cas d'usage. Vous êtes
              responsable de tester et valider le code avant déploiement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Résiliation</h2>
            <p className="text-muted-foreground">
              Vous pouvez supprimer votre compte à tout moment depuis le dashboard.
              Les abonnements Pro peuvent être annulés à tout moment, sans remboursement
              au prorata.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Modifications</h2>
            <p className="text-muted-foreground">
              Nous nous réservons le droit de modifier ces conditions à tout moment.
              Les modifications seront notifiées par email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contact</h2>
            <p className="text-muted-foreground">
              Pour toute question concernant ces CGU :
            </p>
            <p className="text-muted-foreground">
              Email : legal@recreate.ai
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
