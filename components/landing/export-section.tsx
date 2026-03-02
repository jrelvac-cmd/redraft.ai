"use client";

import { motion } from "framer-motion";
import { FileCode, ShieldCheck, Palette } from "lucide-react";
import { fadeInUp, staggerContainer } from "./animations";

export function ExportSection() {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Text */}
          <div className="space-y-8">
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900">
              Exportez vers votre stack favorite
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600">
              Pas de code spaghetti. Redraft.ai génère le code que vous auriez écrit vous-même si vous aviez le temps.
            </motion.p>
            
            <div className="space-y-6 pt-4">
              {[
                {
                  icon: FileCode,
                  title: "Next.js 15 (App Router)",
                  desc: "Pages, routes et layouts prêts à déployer sur Vercel.",
                },
                {
                  icon: ShieldCheck,
                  title: "TypeScript Strict",
                  desc: "Typage complet pour un code sûr et maintenable dès le premier jour.",
                },
                {
                  icon: Palette,
                  title: "Tailwind CSS + Shadcn/ui",
                  desc: "Composants modernes, accessibles et faciles à personnaliser.",
                },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Code Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-gray-800"
          >
            <div className="flex items-center px-4 py-3 bg-[#252526] border-b border-[#333]">
              <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-xs text-gray-400 font-mono">app/page.tsx</div>
            </div>
            <div className="p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                <code>
                  <span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">{`{ Hero }`}</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">&quot;@/components/hero&quot;</span>;{'\n'}
                  <span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">{`{ Features }`}</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">&quot;@/components/features&quot;</span>;{'\n'}
                  {'\n'}
                  <span className="text-[#c586c0]">export</span> <span className="text-[#569cd6]">default</span> <span className="text-[#569cd6]">function</span> <span className="text-[#dcdcaa]">Home</span>() {'{'}{'\n'}
                  {'  '}<span className="text-[#c586c0]">return</span> ({'\n'}
                  {'    '}<span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0]">main</span> <span className="text-[#9cdcfe]">className</span>=<span className="text-[#ce9178]">&quot;min-h-screen bg-background&quot;</span><span className="text-[#808080]">&gt;</span>{'\n'}
                  {'      '}<span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0]">Hero</span>{'\n'}
                  {'        '}<span className="text-[#9cdcfe]">title</span>=<span className="text-[#ce9178]">&quot;Automate your workflow&quot;</span>{'\n'}
                  {'        '}<span className="text-[#9cdcfe]">cta</span>=<span className="text-[#ce9178]">&quot;Start Free&quot;</span>{'\n'}
                  {'      '}<span className="text-[#808080]">/&gt;</span>{'\n'}
                  {'      '}<span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0]">Features</span> <span className="text-[#808080]">/&gt;</span>{'\n'}
                  {'      '}<span className="text-[#6a9955]">{`/* More sections... */`}</span>{'\n'}
                  {'    '}<span className="text-[#808080]">&lt;/</span><span className="text-[#4ec9b0]">main</span><span className="text-[#808080]">&gt;</span>{'\n'}
                  {'  '});{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
