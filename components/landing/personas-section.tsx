"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Briefcase } from "lucide-react";
import { fadeInUp, staggerContainer } from "./animations";

const personas = [
  {
    icon: Rocket,
    title: "Fondateurs SaaS",
    benefit: "Shippez une landing crédible sans attendre un copywriter ou un designer.",
  },
  {
    icon: Code2,
    title: "Développeurs",
    benefit: "Obtenez un code propre, une stack moderne, et zéro lock-in propriétaire.",
  },
  {
    icon: Briefcase,
    title: "Agences & Freelances",
    benefit: "Produisez des landing pages SaaS en série pour vos clients en un temps record.",
  },
];

export function PersonasSection() {
  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-16"
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              Conçu pour les bâtisseurs
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-800">
            {personas.map((persona, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="px-4 py-8 md:px-8 text-center md:text-left hover:bg-gray-800/50 transition-colors rounded-xl"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-blue-400 mb-6 mx-auto md:mx-0">
                  <persona.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {persona.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {persona.benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
