"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { LanguageToggle } from "@/components/language-toggle";
import { translations } from "@/lib/translations";
import type { ConfettiRef } from "@/components/ui/confetti";
import { Confetti } from "@/components/ui/confetti";
import GlowButton from "@/components/ui/glow-button";

type Language = "fr" | "en";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("fr");
  const confettiRef = useRef<ConfettiRef>(null);

  const t = translations[language];

  // Auto-trigger confetti every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      confettiRef.current?.fire({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
        
        // Trigger confetti on success
        confettiRef.current?.fire({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main 
      className="min-h-screen text-[#0f172a] overflow-hidden relative"
      style={{
        backgroundImage: 'url(/coming-soon-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} />

      {/* Main Confetti Section */}
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-visible" style={{ zIndex: 2 }}>
        {/* Confetti Canvas */}
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          manualstart={true}
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />

        {/* Logo en haut à gauche */}
        <div className="absolute top-4 left-4 md:top-6 md:left-8 z-50">
          <Image 
            src="/redraft-logo-white.svg" 
            alt="Redraft.AI" 
            width={32} 
            height={32}
            className="w-8 h-8"
          />
        </div>

        {/* Language Toggle */}
        <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50">
          <LanguageToggle onLanguageChange={setLanguage} variant="light" />
        </div>

        {/* Content Layer */}
        <div className="relative z-20 flex flex-col items-center justify-center space-y-3 max-w-2xl px-4">
          {/* Main Title with Animation and Gradient */}
          <motion.span 
            key={language}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none text-center text-6xl sm:text-8xl md:text-9xl font-semibold leading-none whitespace-nowrap bg-gradient-to-b from-white to-white/5 bg-clip-text text-transparent pb-4"
          >
            {t.comingSoonTitle}
          </motion.span>

          {/* Subtitle with Animation */}
          <motion.p 
            key={`subtitle-${language}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base md:text-lg text-white/80 text-center max-w-xl"
          >
            {t.comingSoonDesc}
          </motion.p>

          {/* Email Form Section with Animation */}
          <motion.div 
            key={`form-${language}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-full max-w-md mt-3"
          >
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in zoom-in">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-900 font-medium">
                  {t.notifySuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white z-10 pointer-events-none" />
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  />
                </div>
                <GlowButton
                  label={isLoading ? t.notifying : t.notifyMe}
                  onClick={handleSubmit}
                  className="w-full"
                />
              </form>
            )}
          </motion.div>

          {/* Footer Text with Animation */}
          <motion.p 
            key={`footer-${language}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-xs md:text-sm text-white/60 mt-3"
          >
            {t.comingSoonCopyright}
          </motion.p>
        </div>
      </div>
    </main>
  );
}
