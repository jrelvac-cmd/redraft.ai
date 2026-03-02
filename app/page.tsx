"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/landing/hero-section";
import { ProcessSection } from "@/components/landing/process-section";
import { FeaturesBlocks } from "@/components/landing/feature-blocks";
import { PersonasSection } from "@/components/landing/personas-section";
import { ExportSection } from "@/components/landing/export-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { FinalCTA } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation Fixe (Simplifiée pour la home) */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">Redraft.AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
            >
              Connexion
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Start free
            </Link>
          </div>
        </div>
      </nav>

      <HeroSection />
      <ProcessSection />
      <FeaturesBlocks />
      <PersonasSection />
      <ExportSection />
      <ComparisonSection />
      <FinalCTA />

      {/* Footer Minimaliste */}
      <footer className="border-t border-gray-200 bg-white py-12 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-900">Redraft.AI</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2026 Redraft.AI. Tous droits réservés.
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Mentions légales</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
