"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { fadeInUp, staggerContainer } from "./animations";

export function ComparisonSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900">
              Pas juste un autre template
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600">
              Pourquoi les développeurs préfèrent Redraft.ai
            </motion.p>
          </div>

          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8">
            {/* Generic Builders Card */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 opacity-70 hover:opacity-100 transition-opacity">
              <h3 className="text-xl font-bold text-gray-500 mb-6">Builders Génériques</h3>
              <ul className="space-y-4">
                {[
                  "Code spaghetti difficile à maintenir",
                  "Design générique 'IA'",
                  "Lock-in plateforme (abonnement mensuel)",
                  "Dépendances lourdes et inutiles"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Redraft.ai Card */}
            <div className="bg-white p-8 rounded-2xl border-2 border-blue-600 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                RECOMMANDÉ
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Redraft.ai</h3>
              <ul className="space-y-4">
                {[
                  "Stack Dev-First (Next.js 15, TS)",
                  "10 questions stratégiques pour éviter le bla-bla",
                  "Code 100% propriétaire sans dépendances cachées",
                  "Multi-langue (FR/EN) natif",
                  "Composants Shadcn/ui standards"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-900 font-medium">
                    <div className="p-0.5 bg-blue-100 rounded-full text-blue-600 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
