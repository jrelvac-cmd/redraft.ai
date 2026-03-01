"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroCenteredProps {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  badge?: string;
  mockupUrl?: string;
}

export function HeroCentered({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  badge,
  mockupUrl,
}: HeroCenteredProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 group">
              {ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            {ctaSecondary && (
              <button className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors">
                {ctaSecondary}
              </button>
            )}
          </motion.div>

          {mockupUrl && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-16"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border">
                <img
                  src={mockupUrl}
                  alt="Product mockup"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
