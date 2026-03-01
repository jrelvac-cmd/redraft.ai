"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroSplitProps {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  badge?: string;
  mockupUrl?: string;
}

export function HeroSplit({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  badge,
  mockupUrl,
}: HeroSplitProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {badge && (
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {badge}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {headline}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 group justify-center">
                {ctaPrimary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {ctaSecondary && (
                <button className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors">
                  {ctaSecondary}
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {mockupUrl ? (
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border">
                <img
                  src={mockupUrl}
                  alt="Product mockup"
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-border flex items-center justify-center">
                <p className="text-muted-foreground">Product Visual</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
