"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Zap, Code, Palette, Layers, Rocket, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Home() {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStart = () => {
    setIsLoading(true);
    if (description.trim()) {
      localStorage.setItem("initial_description", description);
    }
    setTimeout(() => {
      router.push("/generator");
    }, 300);
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">Redraft.AI</span>
          </motion.div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-32 px-4 md:px-8 bg-gradient-to-br from-white via-blue-50/30 to-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            className="space-y-8 text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mx-auto border border-blue-200"
              variants={fadeInUp}
            >
              <Sparkles className="w-4 h-4" />
              Propulsé par Claude 3.5 Sonnet + GPT-4o
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
                De zéro à landing page{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  en minutes
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Décrivez votre SaaS. Notre IA génère une landing page complète avec copywriting optimisé et du code Next.js prêt à déployer.
            </motion.p>

            {/* CTA Section */}
            <motion.div 
              className="pt-8"
              variants={fadeInUp}
            >
              <div className="max-w-2xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <label className="block text-left text-sm font-semibold text-gray-900 mb-4">
                    Décrivez votre SaaS
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Un outil qui transforme les réunions Zoom en résumés actionnables pour les managers..."
                    className="w-full h-28 px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                  <button
                    onClick={handleStart}
                    disabled={isLoading}
                    className="mt-6 w-full py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Créer ma landing page</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="mt-3 text-sm text-gray-500 text-center">
                    Gratuit pour voir le Hero • 19€ pour débloquer la page complète
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works - Relume style workflow */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Un flux simple et intuitif
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              De la description à la page publiée en trois étapes claires
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {[
              {
                step: "01",
                title: "Décrivez",
                description: "Parlez-nous de votre SaaS en quelques phrases",
                icon: Layers,
              },
              {
                step: "02",
                title: "Générez",
                description: "L'IA crée une page complète avec design et copywriting",
                icon: Sparkles,
              },
              {
                step: "03",
                title: "Déployez",
                description: "Exportez du code Next.js propre et prêt à l'emploi",
                icon: Rocket,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-200 hover:shadow-lg transition-all h-full">
                  <div className="text-sm font-bold text-blue-600 mb-4">{item.step}</div>
                  <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 text-gray-400">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi Redraft.AI ?
            </h2>
            <p className="text-xl text-gray-600">
              Outils professionnels pour designers et développeurs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Palette,
                title: "Design sans compromis",
                description: "Jamais de look générique. Chaque page est unique, moderne et optimisée pour convertir.",
              },
              {
                icon: Code,
                title: "Code exportable",
                description: "Next.js, TypeScript, Tailwind CSS. Du code propre qu'on colle dans son projet.",
              },
              {
                icon: Zap,
                title: "Copywriting IA",
                description: "Claude génère des textes qui convertent, basés sur les frameworks proven (AIDA, PAS).",
              },
              {
                icon: CheckCircle2,
                title: "Éditeur visuel",
                description: "Modifiez le design et le contenu en temps réel avant d'exporter votre code.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-blue-200 transition-all"
              >
                <item.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-blue-50 border-y border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-lg font-semibold text-blue-600 mb-4">Trusted by</p>
            <h2 className="text-4xl font-bold text-gray-900">
              500+ SaaS et startups utilisent Redraft.AI
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                quote: "En 5 minutes j'avais une landing page pro. Mieux qu'un template Webflow.",
                author: "Marie",
                role: "Founder, TechStartup",
              },
              {
                quote: "Le copywriting généré était tellement bon qu'on l'a utilisé tel quel.",
                author: "Louis",
                role: "Growth Manager",
              },
              {
                quote: "Code propre et organisé. Exactement ce qu'il fallait pour scalabiliser.",
                author: "Sophie",
                role: "CTO, Scale-up",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-900 font-medium mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-3xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Questions fréquentes
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "Puis-je modifier la page après génération ?",
                a: "Oui ! Accédez à un éditeur visuel complet pour ajuster textes, couleurs et spacing. Le code exporté reflète toutes vos modifications.",
              },
              {
                q: "Quel format pour l'export de code ?",
                a: "Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion. Chaque section est un composant réutilisable.",
              },
              {
                q: "Est-ce que vous générez les images ?",
                a: "Non, vous uploadez vos propres images (logo, screenshots, mockups). L'IA analyse leur style pour harmoniser le design.",
              },
              {
                q: "Puis-je utiliser le code sur plusieurs projets ?",
                a: "Bien sûr ! Une fois acheté, le code vous appartient. Utilisez-le où vous voulez, sans restriction.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-blue-200 transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Prêt à lancer votre landing page ?
            </h2>
            <p className="text-xl text-blue-100">
              Créez une page qui convertit en quelques minutes
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold group"
            >
              <span>Essayer gratuitement</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-sm text-blue-100">
              7 jours gratuit • Pas de carte bancaire
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-gray-900">Redraft.AI</span>
              </div>
              <p className="text-sm text-gray-600">Générez des landing pages performantes avec l'IA.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/legal/privacy" className="hover:text-gray-900 transition-colors">Confidentialité</a></li>
                <li><a href="/legal/terms" className="hover:text-gray-900 transition-colors">Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© 2026 Redraft.AI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
