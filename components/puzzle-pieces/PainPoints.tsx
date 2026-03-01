"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import type { PainPoint } from "@/types";

interface PainPointsProps {
  painPoints: PainPoint[];
  title?: string;
  subtitle?: string;
}

export function PainPoints({ painPoints, title, subtitle }: PainPointsProps) {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-8">
          {painPoints.map((painPoint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="p-6 rounded-xl border border-destructive/20 bg-destructive/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-destructive mb-1">
                      Problème
                    </p>
                    <p className="text-foreground">{painPoint.problem}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">
                      Solution
                    </p>
                    <p className="text-foreground">{painPoint.solution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
