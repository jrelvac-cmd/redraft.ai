"use client";

import { motion } from "framer-motion";
import { Component, Type, Palette } from "lucide-react";
import { fadeInUp, staggerContainer } from "./animations";

const features = [
  {
    icon: Component,
    title: "Structure & Sections",
    badge: "Automatique",
    description: "Génération intelligente de toutes les sections clés : Hero, Problème, Solution, Features, Preuve Sociale, Pricing, FAQ et Footer. Optimisé pour la conversion SaaS.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Type,
    title: "Copywriting IA",
    badge: "Claude 3.5",
    description: "Titres orientés bénéfices, micro-copy persuasive pour les CTA, et bullet points clairs. Plus besoin de passer des heures sur votre texte.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Palette,
    title: "Design System",
    badge: "Tailwind",
    description: "Couleurs extraites automatiquement de votre logo ou de vos images. Typographie cohérente et espacements systématiques basés sur Tailwind.",
    color: "bg-purple-50 text-purple-600",
  },
];

export function FeaturesBlocks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-16"
        >
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900">
              Tous les blocs pour une page haute conversion
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600">
              Inspiré des meilleurs pratiques de design et de copywriting.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full uppercase tracking-wide">
                    {feature.badge}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
