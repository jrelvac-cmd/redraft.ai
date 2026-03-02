"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fadeInUp, staggerContainer } from "./animations";

export function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Un SaaS pour transformer les réunions en plans d'action...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-20 md:pb-32 px-4 md:px-8 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100">
                <Terminal className="w-4 h-4" />
                Pour fondateurs SaaS & devs
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]"
            >
              Du prompt au code <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                prêt pour la prod
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-lg leading-relaxed"
            >
              Redraft.ai transforme votre idée en landing page Next.js haute performance. 
              Générez, éditez et exportez du code propre en quelques minutes.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                href="/auth/signup"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-blue-200/50"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg">
                Voir un exemple de code
              </button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 text-sm text-gray-500"
            >
              <Check className="w-4 h-4 text-green-500" />
              <span>Pas de lock-in. Le code vous appartient à 100%.</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Animated Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Background decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-50 rounded-3xl blur-2xl opacity-50" />
            
            <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="ml-4 text-xs text-gray-400 font-mono">redraft-ai-generator</div>
              </div>

              {/* Window Content */}
              <div className="p-6 md:p-8 grid gap-8">
                {/* Chat Input Simulation */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Votre idée</div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 h-24 font-mono text-sm text-gray-600">
                    <span className="text-blue-600 mr-2">{">"}</span>
                    {typedText}
                    <span className="animate-pulse inline-block w-2 h-4 bg-blue-500 ml-1 align-middle" />
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                  <div className="p-2 bg-blue-50 rounded-full text-blue-600 animate-bounce">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                {/* Generated Preview Simulation */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Résultat généré</div>
                    <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">Ready to export</div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-default group">
                    {/* Mini Navbar */}
                    <div className="h-8 border-b border-gray-100 flex items-center px-4 justify-between bg-white">
                      <div className="w-16 h-2 bg-gray-200 rounded-full" />
                      <div className="flex gap-2">
                        <div className="w-8 h-2 bg-gray-100 rounded-full" />
                        <div className="w-8 h-2 bg-blue-100 rounded-full" />
                      </div>
                    </div>
                    {/* Mini Hero */}
                    <div className="p-6 bg-gradient-to-br from-white to-gray-50 flex items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse" />
                        <div className="h-2 w-full bg-gray-200 rounded" />
                        <div className="h-2 w-2/3 bg-gray-200 rounded" />
                        <div className="mt-2 h-6 w-24 bg-blue-600 rounded-md shadow-sm group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
