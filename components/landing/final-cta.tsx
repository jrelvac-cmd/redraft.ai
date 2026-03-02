"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "./animations";

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
      
      <div className="container mx-auto max-w-4xl px-4 md:px-8 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-8"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
          >
            Essayez Redraft.ai pour votre <br/>
            <span className="text-blue-600">prochain lancement</span>
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Rejoignez les fondateurs qui shippent leurs landing pages en quelques minutes, pas en quelques jours.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
             <Link
                href="/auth/signup"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg shadow-xl shadow-blue-200"
              >
                <Sparkles className="w-5 h-5" />
                Commencer gratuitement
              </Link>
              <button className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg">
                Voir le repo Next.js
                <ArrowRight className="w-5 h-5" />
              </button>
          </motion.div>

          <motion.p 
            variants={fadeInUp}
            className="text-sm text-gray-500 pt-4"
          >
            Moins de 5 minutes pour générer votre première page.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
