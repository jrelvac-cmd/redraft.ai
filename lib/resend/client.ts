import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function sendWelcomeEmail(
  to: string,
  userName: string
): Promise<void> {
  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: "Redraft.AI <noreply@redraft.fr>",
      to,
      subject: "Bienvenue sur Redraft.AI !",
      html: getWelcomeEmailTemplate(userName),
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}

export async function sendProjectUnlockedEmail(
  to: string,
  userName: string,
  projectName: string,
  projectId: string
): Promise<void> {
  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: "Redraft.AI <noreply@redraft.fr>",
      to,
      subject: `Votre landing page "${projectName}" est déverrouillée !`,
      html: getProjectUnlockedEmailTemplate(userName, projectName, projectId),
    });
  } catch (error) {
    console.error("Error sending unlock email:", error);
    throw error;
  }
}

export async function sendFeedbackRequestEmail(
  to: string,
  userName: string,
  projectName: string
): Promise<void> {
  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: "Redraft.AI <noreply@redraft.fr>",
      to,
      subject: "Comment s'est passée votre expérience ?",
      html: getFeedbackRequestEmailTemplate(userName, projectName),
    });
  } catch (error) {
    console.error("Error sending feedback email:", error);
    throw error;
  }
}

function getWelcomeEmailTemplate(userName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .button { display: inline-block; padding: 14px 28px; background: #6366F1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="color: #6366F1; margin: 0;">Bienvenue sur Redraft.AI !</h1>
    </div>
    
    <p>Bonjour ${userName},</p>
    
    <p>Merci de rejoindre Redraft.AI, le générateur de landing pages SaaS propulsé par l'IA.</p>
    
    <p>Avec Redraft.AI, vous pouvez :</p>
    <ul>
      <li>Créer des landing pages professionnelles en quelques minutes</li>
      <li>Générer du copywriting optimisé pour la conversion</li>
      <li>Exporter du code Next.js/Tailwind propre et production-ready</li>
      <li>Personnaliser chaque section avec notre éditeur visuel</li>
    </ul>
    
    <p style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/generator" class="button">
        Créer ma première landing page
      </a>
    </p>
    
    <p>À bientôt,<br>L'équipe Redraft.AI</p>
    
    <div class="footer">
      <p>© 2026 Redraft.AI. Tous droits réservés.</p>
    </div>
  </div>
</body>
</html>
  `;
}

function getProjectUnlockedEmailTemplate(
  userName: string,
  projectName: string,
  projectId: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .success-badge { display: inline-block; padding: 8px 16px; background: #10B981; color: white; border-radius: 20px; font-size: 14px; font-weight: 600; margin-bottom: 20px; }
    .button { display: inline-block; padding: 14px 28px; background: #6366F1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="success-badge">✓ Paiement confirmé</div>
      <h1 style="color: #6366F1; margin: 0;">Votre landing page est prête !</h1>
    </div>
    
    <p>Bonjour ${userName},</p>
    
    <p>Excellente nouvelle ! Votre projet <strong>"${projectName}"</strong> a été déverrouillé avec succès.</p>
    
    <p>Vous pouvez maintenant :</p>
    <ul>
      <li>✓ Éditer toutes les sections de votre landing page</li>
      <li>✓ Regénérer les sections avec l'IA</li>
      <li>✓ Exporter le code Next.js/Tailwind/TypeScript</li>
      <li>✓ Personnaliser les couleurs, polices et layout</li>
    </ul>
    
    <p style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/generator/${projectId}/editor" class="button">
        Accéder à l'éditeur
      </a>
    </p>
    
    <p>Besoin d'aide ? Répondez simplement à cet email, nous sommes là pour vous aider.</p>
    
    <p>Bonne création,<br>L'équipe Redraft.AI</p>
    
    <div class="footer">
      <p>© 2026 Redraft.AI. Tous droits réservés.</p>
    </div>
  </div>
</body>
</html>
  `;
}

function getFeedbackRequestEmailTemplate(
  userName: string,
  projectName: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .rating { display: flex; justify-content: center; gap: 10px; margin: 30px 0; }
    .star { font-size: 32px; text-decoration: none; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="color: #6366F1; margin: 0;">Comment s'est passée votre expérience ?</h1>
    </div>
    
    <p>Bonjour ${userName},</p>
    
    <p>Vous avez récemment créé votre landing page <strong>"${projectName}"</strong> avec Redraft.AI.</p>
    
    <p>Nous aimerions beaucoup avoir votre avis ! Cela ne prend que quelques secondes et nous aide énormément à améliorer le produit.</p>
    
    <p style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/feedback?rating=5" class="star">⭐</a>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/feedback?rating=4" class="star">⭐</a>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/feedback?rating=3" class="star">⭐</a>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/feedback?rating=2" class="star">⭐</a>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/feedback?rating=1" class="star">⭐</a>
    </p>
    
    <p style="text-align: center; color: #666; font-size: 14px;">
      Cliquez sur le nombre d'étoiles qui correspond à votre expérience
    </p>
    
    <p>Merci pour votre temps et votre confiance,<br>L'équipe Redraft.AI</p>
    
    <div class="footer">
      <p>© 2026 Redraft.AI. Tous droits réservés.</p>
    </div>
  </div>
</body>
</html>
  `;
}
