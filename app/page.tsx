"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  Upload,
  Sparkles,
  Zap,
  Paintbrush,
  Code,
  FileText,
  Wand2,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageToggle } from "@/components/language-toggle";
import { translations } from "@/lib/translations";

type Language = "fr" | "en";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Home() {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("fr");
  const router = useRouter();

  const t = translations[language];

  const handleStart = () => {
    setIsLoading(true);
    if (description.trim()) {
      localStorage.setItem("initial_description", description);
    }
    setTimeout(() => {
      router.push("/generator");
    }, 300);
  };

  return (
    <main className="min-h-screen bg-white text-[#0f172a] overflow-x-hidden">

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className="sticky top-0 z-50 py-3 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-8">
              <Image src="/redraft-logo.svg" alt="Redraft.AI" width={36} height={36} />
              <div className="hidden sm:flex items-center gap-6">
                <Link href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition">
                  {t.productNav}
                </Link>
                <Link href="#gallery" className="text-sm text-slate-600 hover:text-slate-900 transition">
                  {t.aboutNav}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageToggle onLanguageChange={setLanguage} />
              <Link href="/auth/login" className="text-sm text-slate-600 hover:text-slate-900 transition">
                {t.connexion}
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-[#0f172a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1e293b]"
              >
                {t.signUp}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="px-4 pt-20 pb-16 md:pt-28 md:pb-24 md:px-8">
        <div className="mx-auto max-w-[800px]">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-medium text-slate-600">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                {t.powereredBy}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              {t.tagline}<br />
              <span className="text-slate-400">{t.tagline2}</span><br />
              <span className="text-[#2864ff]">{t.tagline3}</span>
            </motion.h1>
          </motion.div>

          {/* Prompt Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/50">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.heroPlaceholder}
                className="w-full h-24 sm:h-28 px-4 py-3 resize-none focus:outline-none text-base text-slate-900 placeholder-slate-400 rounded-xl"
              />
              <div className="flex items-center justify-between px-2 pb-1">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition">
                    <Upload className="h-3.5 w-3.5" />
                    {t.heroUpload}
                  </button>
                  <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition">
                    <Wand2 className="h-3.5 w-3.5" />
                    {t.heroGoAI}
                  </button>
                </div>
                <button
                  onClick={handleStart}
                  disabled={isLoading}
                  className="flex items-center gap-2 rounded-xl bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e293b] disabled:opacity-60"
                >
                  {t.heroSubmit}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 3 STEPS ═══════════════ */}
      <section className="px-4 py-16 md:px-8 bg-slate-50/50">
        <div className="mx-auto max-w-[1000px]">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { step: t.step1Title, desc: t.step1Desc, icon: FileText, color: "bg-blue-50 text-blue-600" },
              { step: t.step2Title, desc: t.step2Desc, icon: Code, color: "bg-emerald-50 text-emerald-600" },
              { step: t.step3Title, desc: t.step3Desc, icon: Zap, color: "bg-amber-50 text-amber-600" },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="relative rounded-2xl border border-slate-200 bg-white p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{item.step}</p>
                <p className="text-base font-semibold text-slate-900">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TAGLINE ═══════════════ */}
      <section className="px-4 py-24 md:py-32 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[900px] text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            {t.tagline}<br />
            <span className="text-slate-400">{t.tagline2}</span><br />
            <span className="text-[#2864ff]">{t.tagline3}</span>
          </h2>
        </motion.div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section id="features" className="px-4 py-16 md:py-24 md:px-8 bg-slate-50/50">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-[#2864ff] mb-3">{t.featuresTitle}</p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mt-10 grid gap-6 md:grid-cols-2"
          >
            {/* Feature 1 - Large */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10 md:row-span-2 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{t.feature1Title}</h3>
                <p className="mt-3 text-slate-600 text-base leading-relaxed">{t.feature1Desc}</p>
              </div>
              <div className="mt-8 rounded-xl bg-slate-50 border border-slate-100 p-6 h-40 flex items-center justify-center">
                <div className="space-y-2 w-full">
                  <div className="h-3 w-3/4 rounded bg-slate-200" />
                  <div className="h-2 w-full rounded bg-slate-150" />
                  <div className="h-2 w-2/3 rounded bg-slate-150" />
                  <div className="mt-4 h-8 w-28 rounded-lg bg-[#2864ff]" />
                </div>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl border border-slate-200 bg-white p-8 hover:shadow-lg transition-shadow"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
                <Paintbrush className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold">{t.feature2Title}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{t.feature2Desc}</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl border border-slate-200 bg-white p-8 hover:shadow-lg transition-shadow"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                <Code className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold">{t.feature3Title}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{t.feature3Desc}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="gallery" className="px-4 py-16 md:py-24 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-[#2864ff] mb-3">{t.galleryTitle}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{t.galleryDesc}</h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="aspect-[4/3] rounded-2xl border border-slate-200 bg-slate-50 hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                  <div className="text-center space-y-2 opacity-40 group-hover:opacity-60 transition-opacity">
                    <Layers className="h-8 w-8 mx-auto text-slate-400" />
                    <p className="text-xs text-slate-400">Projet {i}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="px-4 py-20 md:py-28 md:px-8 bg-[#0f172a]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[700px] text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">{t.ctaTitle}</h2>
          <p className="mt-4 text-lg text-slate-400">{t.ctaDesc}</p>
          <div className="mt-8">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#0f172a] transition hover:bg-slate-100"
            >
              {t.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="px-4 py-14 md:px-8 border-t border-slate-100">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Image src="/redraft-logo.svg" alt="Redraft.AI" width={36} height={36} />
            <p className="mt-3 max-w-sm text-sm text-slate-500">{t.productDesc}</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-slate-900">{t.product}</p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-slate-900 transition cursor-pointer">{t.aiSiteBuilder}</li>
              <li className="hover:text-slate-900 transition cursor-pointer">{t.reactLibrary}</li>
              <li className="hover:text-slate-900 transition cursor-pointer">{t.pricingLink}</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-slate-900">{t.resources}</p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-slate-900 transition cursor-pointer">{t.documentation}</li>
              <li className="hover:text-slate-900 transition cursor-pointer">{t.community}</li>
              <li className="hover:text-slate-900 transition cursor-pointer">{t.support}</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-slate-900">{t.legal}</p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/legal/privacy" className="hover:text-slate-900 transition">{t.privacy}</Link></li>
              <li><Link href="/legal/terms" className="hover:text-slate-900 transition">{t.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[1200px] border-t border-slate-100 pt-6 text-sm text-slate-400">
          {t.copyright}
        </div>
      </footer>
    </main>
  );
}
