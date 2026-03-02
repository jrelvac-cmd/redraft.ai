"use client";

import { motion } from "framer-motion";
import { MessageSquare, LayoutTemplate, PenTool, Download } from "lucide-react";
import { fadeInUp, staggerContainer } from "./animations";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Décrivez votre SaaS",
    description: "Expliquez votre produit, votre audience et votre offre en langage naturel. Uploadez votre logo et vos captures d'écran.",
  },
  {
    icon: LayoutTemplate,
    step: "02",
    title: "Répondez à 10 questions",
    description: "Clarifiez votre positionnement, vos objectifs et votre ton avec un flux guidé conçu spécifiquement pour les SaaS.",
  },
  {
    icon: PenTool,
    step: "03",
    title: "Générez & Éditez",
    description: "Obtenez une landing page complète. Éditez tout visuellement dans un éditeur 3 colonnes temps réel.",
  },
  {
    icon: Download,
    step: "04",
    title: "Exportez le code",
    description: "Copiez du code Next.js 15, TypeScript et Tailwind prêt pour la production. Pas de lock-in, code 100% à vous.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16"
        >
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900">
              De l'idée au déploiement en minutes
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600">
              Un workflow optimisé pour aller vite sans sacrifier la qualité du code.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute top-6 right-6 text-4xl font-bold text-gray-100 group-hover:text-blue-50 transition-colors select-none">
                  {step.step}
                </div>
                
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm relative z-10">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
