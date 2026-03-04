"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Navigation2,
  Edit3,
  Palette,
  MessageSquare,
  Copy,
  Square,
  Code,
  CheckCircle2,
  Star,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { LanguageToggle } from "@/components/language-toggle";
import { translations } from "@/lib/translations";
import "./smooth-cursor.css";

type Language = "fr" | "en";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
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
    <main className="min-h-screen bg-white text-[#0f172a] overflow-x-hidden cursor-none">
      <SmoothCursor />

      <nav className="sticky top-0 z-50 pt-4 pb-4">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="mx-auto flex h-16 max-w-fit items-center justify-between gap-8 rounded-full border border-black/10 bg-white/95 px-6 md:px-8 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <Image src="/redraft-logo.svg" alt="Redraft.AI" width={40} height={40} />
            </div>
            <div className="flex items-center gap-3">
              <LanguageToggle onLanguageChange={setLanguage} />
              <Link href="/auth/login" className="text-sm text-slate-600 hover:text-slate-900">
                {t.connexion}
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-[#2864ff] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1d4fe0]"
              >
                {t.commencer}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="border-b border-black/10 px-4 pb-20 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[1200px]">
          <motion.div className="grid items-center gap-14 lg:grid-cols-2" initial="initial" animate="animate" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#bed0ff] bg-[#edf3ff] px-4 py-2">
                <AnimatedShinyText className="inline-flex items-center gap-2 text-sm font-medium text-[#1d4fe0]">
                  <Sparkles className="h-4 w-4" />
                  {t.powereredBy}
                </AnimatedShinyText>
              </div>
              <p className="text-sm font-medium text-[#2864ff]">{t.forFounders}</p>
              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                {t.heroTitle}
              </h1>
              <p className="max-w-xl text-lg text-slate-600">
                {t.heroDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2864ff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4fe0]"
                >
                  {t.createFirstLanding} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/generator"
                  className="rounded-lg border border-black/15 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  {t.seeDemo}
                </Link>
              </div>
              <p className="text-sm text-slate-500">{t.noLockIn}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
              <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
                <span>Prompt</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">{t.livePreview}</span>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-slate-50 p-4">
                  <p className="mb-3 text-xs text-slate-500">{t.questionsAI}</p>
                  <div className="space-y-2 text-sm text-slate-700">
                    <p className="rounded-xl bg-white px-3 py-2">Audience cible ?</p>
                    <p className="rounded-xl bg-white px-3 py-2">Objectif principal ?</p>
                    <p className="rounded-xl bg-white px-3 py-2">Ton de voix ?</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-gradient-to-b from-white to-slate-50 p-4">
                  <p className="mb-3 text-xs text-slate-500">{t.heroGenerated}</p>
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 rounded bg-slate-900" />
                    <div className="h-2 w-full rounded bg-slate-300" />
                    <div className="h-2 w-2/3 rounded bg-slate-300" />
                    <div className="mt-4 h-8 w-28 rounded bg-[#2864ff]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" animate="animate" className="mx-auto mt-16 max-w-2xl">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <label className="block text-left text-sm font-semibold text-gray-900 mb-4">
                {t.describeSaaS}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.exampleDescription}
                className="w-full h-28 px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 cursor-text"
              />
              <button
                onClick={handleStart}
                disabled={isLoading}
                className="mt-6 w-full py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                <span>{t.createLandingPage}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="mt-3 text-sm text-gray-500 text-center">
                {t.pricing}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fafbff] px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.promptToSitemap}</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            {t.sitemapDescription}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-7">
              <Navigation2 className="mb-4 h-7 w-7 text-[#2864ff]" />
              <h3 className="text-xl font-semibold">{t.mapStructure}</h3>
              <p className="mt-2 text-slate-600">{t.mapStructureDesc}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-7">
              <CheckCircle2 className="mb-4 h-7 w-7 text-[#2864ff]" />
              <h3 className="text-xl font-semibold">{t.preciseScoping}</h3>
              <p className="mt-2 text-slate-600">{t.preciseScopingDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.sitemapToWireframe}</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            {t.wireframeDescription}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-7">
              <Edit3 className="mb-4 h-7 w-7 text-[#2864ff]" />
              <h3 className="text-xl font-semibold">{t.instantDraft}</h3>
              <p className="mt-2 text-slate-600">{t.instantDraftDesc}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-7">
              <MessageSquare className="mb-4 h-7 w-7 text-[#2864ff]" />
              <h3 className="text-xl font-semibold">{t.enhancedEditing}</h3>
              <p className="mt-2 text-slate-600">{t.enhancedEditingDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fafbff] px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.wireframeToStyleGuide}</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            {t.styleGuideDescription}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Palette, titleKey: "colors" as const, textKey: "colorsDesc" as const },
              { icon: Sparkles, titleKey: "typography" as const, textKey: "typographyDesc" as const },
              { icon: CheckCircle2, titleKey: "spacing" as const, textKey: "spacingDesc" as const },
            ].map((item) => (
              <motion.div
                key={item.titleKey}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-black/10 bg-white p-7 transition"
              >
                <item.icon className="mb-4 h-7 w-7 text-[#2864ff]" />
                <h3 className="text-xl font-semibold">{t[item.titleKey]}</h3>
                <p className="mt-2 text-slate-600">{t[item.textKey]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.exportToTools}</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            {t.exportDescription}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Palette, titleKey: "copyToFigma" as const, textKey: "copyToFigmaDesc" as const },
              { icon: Code, titleKey: "copyToReact" as const, textKey: "copyToReactDesc" as const },
              { icon: Square, titleKey: "copyToWebflow" as const, textKey: "copyToWebflowDesc" as const },
            ].map((item) => (
              <div key={item.titleKey} className="rounded-2xl border border-black/10 bg-white p-7">
                <item.icon className="mb-4 h-7 w-7 text-[#2864ff]" />
                <h3 className="text-xl font-semibold">{t[item.titleKey]}</h3>
                <p className="mt-2 text-slate-600">{t[item.textKey]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fafbff] px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.testimonials}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              t.testimonial1,
              t.testimonial2,
              t.testimonial3,
            ].map((quote, i) => (
              <div key={quote} className="rounded-2xl border border-black/10 bg-white p-7">
                <div className="mb-4 flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={`${i}-${idx}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-800">{quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 md:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="text-5xl font-semibold tracking-tight md:text-6xl">{t.tryRedraft}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            {t.tryDescription}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2864ff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4fe0]"
            >
              {t.startFree} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/generator"
              className="rounded-lg border border-black/15 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              {t.seeExample}
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Image src="/redraft-logo.svg" alt="Redraft.AI" width={40} height={40} />
            </div>
            <p className="mt-3 max-w-sm text-sm text-slate-600">
              {t.productDesc}
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">{t.product}</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>{t.aiSiteBuilder}</li>
              <li>{t.reactLibrary}</li>
              <li>{t.pricingLink}</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">{t.resources}</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>{t.documentation}</li>
              <li>{t.community}</li>
              <li>{t.support}</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">{t.legal}</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/legal/privacy">{t.privacy}</Link></li>
              <li><Link href="/legal/terms">{t.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[1200px] border-t border-black/10 pt-6 text-sm text-slate-500">
          {t.copyright}
        </div>
      </footer>
    </main>
  );
}
