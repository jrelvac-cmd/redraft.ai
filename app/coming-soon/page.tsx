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
  const [isDesktop, setIsDesktop] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

  const t = translations[language];

  // Detect if desktop on mount
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  // Disable scroll on mount
  useEffect(() => {
    document.body.classList.add('no-scroll');
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      document.body.classList.remove('no-scroll');
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Auto-trigger confetti every 10 seconds (desktop only)
  useEffect(() => {
    if (!isDesktop) return;
    
    const interval = setInterval(() => {
      confettiRef.current?.fire({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [isDesktop]);

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
      className="h-screen text-[#0f172a] overflow-hidden relative"
      style={{
        backgroundImage: 'url(/coming-soon-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'fixed' : 'scroll',
        height: '100dvh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
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
        <div className="absolute top-4 left-4 md:top-6 md:left-8 z-50 p-1 md:p-0">
          <Image 
            src="/redraft-logo-white.svg" 
            alt="Redraft.AI" 
            width={40} 
            height={40}
            className="w-10 sm:w-12 md:w-8 h-10 sm:h-12 md:h-8"
          />
        </div>

        {/* Language Toggle */}
        <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50 p-1 md:p-0">
          <LanguageToggle onLanguageChange={setLanguage} variant="light" />
        </div>

        {/* Content Layer */}
        <div className="relative z-20 flex flex-col items-center justify-center space-y-4 sm:space-y-6 md:space-y-3 max-w-2xl px-4 sm:px-6 md:px-4">
          {/* Main Title with Animation and Gradient */}
          <motion.span 
            key={language}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none text-center text-5xl sm:text-7xl md:text-9xl font-semibold leading-tight md:leading-none whitespace-nowrap bg-gradient-to-b from-white to-white/5 bg-clip-text text-transparent pb-2 sm:pb-4"
          >
            {t.comingSoonTitle}
          </motion.span>

          {/* Subtitle with Animation */}
          <motion.p 
            key={`subtitle-${language}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-white/80 text-center max-w-xl"
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
                  <Mail className="absolute left-3 sm:left-4 md:left-4 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 md:h-5 w-4 sm:w-5 md:w-5 text-white z-10 pointer-events-none" />
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 sm:pl-12 md:pl-12 pr-3 sm:pr-4 md:pr-4 py-2 sm:py-3 md:py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-sm sm:text-base md:text-base text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  />
                </div>
                <GlowButton
                  label={isLoading ? t.notifying : t.notifyMe}
                  type="submit"
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
            className="text-xs sm:text-sm md:text-sm text-white/60 mt-2 sm:mt-3 md:mt-3"
          >
            {t.comingSoonCopyright}
          </motion.p>
        </div>
      </div>
    </main>
  );
}
