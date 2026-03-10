"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Star,
  Quote,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/skeletons/navbar/navbar";
import { Logo } from "@/components/logo";

// Rotating text component
const RotatingText = ({ words, colorClass = "from-blue-200 to-indigo-200" }: { words: string[], colorClass?: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="relative inline-block w-[7ch] sm:w-[8ch] md:w-[9ch] text-left align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute top-0 left-0 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent pb-2 whitespace-nowrap`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      <span className="invisible">{words[0]}</span> {/* Placeholder for width */}
    </span>
  );
};

export default function Home() {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("fr");
  const router = useRouter();

  const t = translations[language];

  // Rotating words based on language
  const rotatingWords = language === "fr" 
    ? ["plus vite", "plus beau", "pour vendre"]
    : ["faster", "beautiful", "to sell"];

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
    <main className="min-h-screen bg-white text-[#0f172a] overflow-x-hidden font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <Navbar 
            logo={{
            url: "/",
            src: "/redraft-logo.svg",
            alt: "Redraft.AI",
            title: "Redraft.AI",
            component: <Logo className="w-8 h-8" />
          }}
          menu={[
            { title: t.productNav, url: "#features" },
            { title: t.aboutNav, url: "#gallery" },
          ]}
          auth={{
            login: { text: t.connexion, url: "/auth/login" },
            signup: { text: t.signUp, url: "/auth/signup" }
          }}
          mobileExtraLinks={[
            { name: t.documentation, url: "#" },
            { name: t.community, url: "#" },
          ]}
          onLanguageChange={setLanguage}
        />
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="px-4 pt-24 pb-20 md:pt-32 md:pb-28 md:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/coming-soon-bg.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="mx-auto max-w-[840px] relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            <motion.div variants={fadeInUp} className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md shadow-lg">
                <Sparkles className="h-3.5 w-3.5 fill-white text-white" />
                {t.powereredBy}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-white drop-shadow-lg"
            >
              {t.heroMainTitle}
            </motion.h1>
          </motion.div>

          {/* Prompt Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 relative z-10"
          >
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-3 shadow-2xl shadow-black/20 ring-1 ring-white/20">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.heroPlaceholder}
                className="w-full h-32 sm:h-36 px-5 py-4 resize-none focus:outline-none text-lg text-white placeholder-white/60 rounded-2xl bg-transparent"
              />
              <div className="flex items-center justify-between px-3 pb-2 pt-2">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                    <Upload className="h-4 w-4" />
                    {t.heroUpload}
                  </button>
                  <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                    <Wand2 className="h-4 w-4" />
                    {t.heroGoAI}
                  </button>
                </div>
                <button
                  onClick={handleStart}
                  disabled={isLoading}
                  className="flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-[#0f172a] transition-all hover:bg-slate-100 hover:shadow-lg hover:shadow-white/20 disabled:opacity-60 active:scale-95"
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
      <section className="px-4 py-20 md:px-8 border-y border-slate-100 bg-slate-50/30">
        <div className="mx-auto max-w-[1100px]">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { step: t.step1Title, desc: t.step1Desc, icon: FileText, color: "bg-blue-100 text-blue-700" },
              { step: t.step2Title, desc: t.step2Desc, icon: Code, color: "bg-emerald-100 text-emerald-700" },
              { step: t.step3Title, desc: t.step3Desc, icon: Zap, color: "bg-amber-100 text-amber-700" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="relative group"
              >
                <div className="rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1">
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">{item.step}</p>
                  <p className="text-xl font-bold text-slate-900 leading-snug">{item.desc}</p>
                </div>
                {/* Connector Line (Desktop) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TAGLINE ═══════════════ */}
      <section className="px-4 py-24 md:py-32 md:px-8 bg-white">
        <div className="mx-auto max-w-[1200px] text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight"
          >
            {language === "fr" ? "Créez " : "Build "}
            <RotatingText words={rotatingWords} colorClass="from-blue-600 to-indigo-600" />
          </motion.h2>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section id="features" className="px-4 py-24 md:py-32 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-4">
              {t.featuresTitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 max-w-2xl leading-[1.1]">
              Tout ce dont vous avez besoin pour shippper.
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Feature 1 - Large */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-2 rounded-[2rem] border border-slate-200 bg-white p-10 hover:shadow-xl transition-all duration-300 group overflow-hidden relative"
            >
              <div className="relative z-10">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{t.feature1Title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed max-w-md">{t.feature1Desc}</p>
              </div>
              
              <div className="mt-12 rounded-xl bg-slate-50 border border-slate-100 p-8 h-48 lg:h-auto lg:absolute lg:right-10 lg:bottom-10 lg:top-10 lg:w-80 lg:mt-0 shadow-inner">
                <div className="space-y-3 w-full opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="h-4 w-3/4 rounded-full bg-slate-200" />
                  <div className="h-3 w-full rounded-full bg-slate-200" />
                  <div className="h-3 w-5/6 rounded-full bg-slate-200" />
                  <div className="mt-6 h-10 w-32 rounded-xl bg-blue-600/20" />
                </div>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={fadeInUp}
              className="rounded-[2rem] border border-slate-200 bg-white p-10 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 group-hover:scale-110 transition-transform">
                <Paintbrush className="h-7 w-7 text-violet-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.feature2Title}</h3>
              <p className="text-slate-600 leading-relaxed">{t.feature2Desc}</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-3 rounded-[2rem] border border-slate-200 bg-slate-900 p-10 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-32 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex-1">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 group-hover:scale-110 transition-transform backdrop-blur-md">
                    <Code className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{t.feature3Title}</h3>
                  <p className="text-lg text-slate-300 leading-relaxed max-w-lg">{t.feature3Desc}</p>
                </div>
                <div className="flex-1 w-full rounded-xl bg-slate-800/50 border border-white/10 p-6 font-mono text-sm text-slate-300 shadow-2xl">
                  <p><span className="text-pink-400">export</span> <span className="text-blue-400">default</span> <span className="text-yellow-300">function</span> <span className="text-blue-300">App</span>() {'{'}</p>
                  <p className="pl-4"><span className="text-pink-400">return</span> (</p>
                  <p className="pl-8 text-white">{'<div className="p-4 bg-white rounded-xl">'}</p>
                  <p className="pl-12">Hello World</p>
                  <p className="pl-8 text-white">{'</div>'}</p>
                  <p className="pl-4">);</p>
                  <p>{'}'}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="gallery" className="px-4 py-24 md:py-32 md:px-8 bg-slate-50">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">{t.galleryTitle}</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">{t.galleryDesc}</h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                id: 1,
                title: "Dark Mode SaaS",
                component: (
                  <div className="w-full h-full bg-slate-900 p-6 flex flex-col justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="relative z-10 space-y-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-xl">Nexus AI</h3>
                      <p className="text-slate-400 text-xs">Automate your workflow with AI.</p>
                      <button className="w-fit px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-medium mt-2">Get Started</button>
                    </div>
                  </div>
                )
              },
              {
                id: 2,
                title: "Minimalist Blog",
                component: (
                  <div className="w-full h-full bg-[#f8f9fa] p-6 flex flex-col justify-between group-hover:scale-105 transition-transform duration-500">
                    <div className="space-y-4">
                      <div className="w-full h-24 bg-white rounded-xl border border-slate-100 shadow-sm" />
                      <div className="space-y-2">
                        <div className="w-3/4 h-4 bg-slate-200 rounded" />
                        <div className="w-1/2 h-3 bg-slate-100 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200" />
                      <div className="w-20 h-2 bg-slate-100 rounded" />
                    </div>
                  </div>
                )
              },
              {
                id: 3,
                title: "E-commerce Store",
                component: (
                  <div className="w-full h-full bg-white p-4 flex flex-col items-center justify-center gap-4 group-hover:scale-105 transition-transform duration-500 border border-slate-100">
                    <div className="relative w-32 h-32 bg-orange-50 rounded-2xl flex items-center justify-center">
                      <Star className="w-12 h-12 text-orange-400" />
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">SALE</div>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-900">Premium Kit</p>
                      <p className="text-orange-500 font-bold">$49.00</p>
                    </div>
                    <button className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-lg">Add to Cart</button>
                  </div>
                )
              },
              {
                id: 4,
                title: "Mobile App Landing",
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 p-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <div className="w-32 h-48 bg-white rounded-[2rem] p-3 shadow-2xl transform rotate-[-6deg] group-hover:rotate-0 transition-transform duration-300">
                      <div className="w-full h-full bg-slate-50 rounded-[1.5rem] flex flex-col items-center pt-4 gap-2">
                         <div className="w-8 h-8 rounded-full bg-pink-100" />
                         <div className="w-16 h-2 bg-slate-200 rounded" />
                         <div className="w-20 h-20 bg-pink-50 rounded-xl mt-2" />
                      </div>
                    </div>
                  </div>
                )
              },
              {
                id: 5,
                title: "Corporate Dashboard",
                component: (
                  <div className="w-full h-full bg-slate-50 p-6 flex flex-col gap-3 group-hover:scale-105 transition-transform duration-500">
                    <div className="flex gap-3">
                      <div className="w-1/3 h-20 bg-white rounded-xl shadow-sm border border-slate-100 p-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full mb-2" />
                        <div className="w-8 h-2 bg-slate-200 rounded" />
                      </div>
                      <div className="w-2/3 h-20 bg-white rounded-xl shadow-sm border border-slate-100 p-3">
                        <div className="flex gap-1 h-full items-end">
                           <div className="flex-1 bg-blue-500 h-[40%] rounded-t-sm" />
                           <div className="flex-1 bg-blue-300 h-[70%] rounded-t-sm" />
                           <div className="flex-1 bg-blue-600 h-[50%] rounded-t-sm" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-3 space-y-2">
                      <div className="w-full h-2 bg-slate-100 rounded" />
                      <div className="w-full h-2 bg-slate-100 rounded" />
                      <div className="w-2/3 h-2 bg-slate-100 rounded" />
                    </div>
                  </div>
                )
              },
              {
                id: 6,
                title: "Creative Portfolio",
                component: (
                  <div className="w-full h-full bg-[#1a1a1a] p-6 flex flex-col justify-center text-center group-hover:scale-105 transition-transform duration-500">
                    <p className="text-[#ccff00] font-mono text-xs mb-2">● AVAILABLE FOR WORK</p>
                    <h3 className="text-white text-3xl font-bold leading-none mb-4 font-serif italic">Digital<br/>Designer</h3>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                )
              }
            ].map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="group aspect-[4/3] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
              >
                {item.component}
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                   <p className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     {item.title}
                   </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SOCIAL PROOF ═══════════════ */}
      <section className="px-4 py-24 md:py-32 md:px-8 border-t border-slate-200">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">{t.socialProofTitle}</h2>
            <p className="text-lg text-slate-600">{t.socialProofDesc}</p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { text: t.review1, author: t.review1Author },
              { text: t.review2, author: t.review2Author },
              { text: t.review3, author: t.review3Author },
            ].map((review, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-800 font-medium text-lg mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {review.author[0]}
                  </div>
                  <p className="text-sm font-medium text-slate-500">{review.author}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="px-4 py-24 md:py-32 md:px-8 bg-[#0f172a] relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[800px] text-center relative z-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">{t.ctaTitle}</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">{t.ctaDesc}</p>
          <div>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-bold text-[#0f172a] transition-all hover:bg-blue-50 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
            >
              {t.ctaButton}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="px-4 py-16 md:px-8 border-t border-slate-100 bg-slate-50/50">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-5">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Logo className="w-8 h-8" />
              <span className="font-bold text-xl text-slate-900">Redraft.AI</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-xs">{t.productDesc}</p>
          </div>
          
          {[
            { title: t.product, links: [t.aiSiteBuilder, t.reactLibrary, t.pricingLink] },
            { title: t.resources, links: [t.documentation, t.community, t.support] },
            { title: t.legal, links: [t.privacy, t.terms] },
          ].map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-[1200px] border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>{t.copyright}</p>
          <div className="flex gap-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Systems Operational</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
