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
      className="h-screen text-[#0f172a] overflow-hidden relative coming-soon-main"
      style={{
        backgroundImage: 'url(/coming-soon-bg.jpg)',
        backgroundSize: '110% 110%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100dvh',
        minHeight: '100vh',
        position: 'fixed',
        top: '-5%',
        left: '-5%',
        right: '-5%',
        bottom: '-5%',
        width: '110%',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* Dark overlay for text readability - extended */}
      <div 
        className="absolute bg-black/40" 
        style={{ 
          zIndex: 1,
          top: '-10%',
          left: '-10%',
          right: '-10%',
          bottom: '-10%',
          width: '120%',
          height: '120%'
        }} 
      />

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
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 256 256" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}
          >
            <path d="m145.8 11c-45.58 0-84.71 36.12-88.84 82.1-2.66 28.98 8.31 50.05 18.43 62.74-20.46-10.12-37.27-32.52-37.27-61.06 0-26.72 14.61-51.57 40.67-66.65-16.92 3.96-27.87 9.49-41.87 21.26-19.29 16.49-27.91 40.55-27.91 66.85 0 44.47 37.25 86.29 87.88 86.29 28.57 0 53.08-14.69 69.03-33.59 10.4-14.78-1.03-38.21-1.03-38.21-10.82 30.09-34.89 53.22-68 53.71-33.69 0.49-65.97-23.49-70.37-65.47 10.68 29.91 37.11 56.16 73.27 56.16 10.14 0 20.99-5.12 27.44-8.06-31.21-2.2-52.31-34.04-52.31-64.87 0-39.26 31.01-73.19 73.22-73.19 32.99 0 61.53 20.6 77.98 52.78-5.2-37.87-35.57-70.79-80.32-70.79z" fill="#ffffff"/>
            <path d="m226.5 83.04c-16.55-19.85-39.38-32.3-67.55-32.3-32.15 0-58.05 17.02-70.97 37.15-7.31 11.49-2.27 30.18 1.63 38.19 6.4-27.69 30.56-56.59 68.19-56.59 30.93 0 70.95 24.34 70.95 69.19v7.51c-8.48-33.4-39.54-64.88-75.58-64.88-10.56 0-19.16 3.41-27.95 7.95 29.89 5.5 52.14 34.35 52.14 65.22 0 35.35-28.56 72.51-73.56 72.51-36.74 0-62.2-22.17-77.85-56.35 4.96 39.02 35.35 74.36 80.95 74.36 49.28 0 88.58-45.99 88.58-88.37 0-22.75-7.18-41.62-17.13-55.57 21.37 11.96 35.51 35.67 35.51 63.06 0 24.54-13.65 47.47-38.8 64.39 39.9-9.03 72.55-41.43 72.55-87.83 0-22.27-8.65-43.42-21.11-57.64z" fill="#ffffff"/>
          </svg>
        </div>

        {/* Language Toggle */}
        <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50 p-1 md:p-0">
          <LanguageToggle onLanguageChange={setLanguage} variant="light" />
        </div>

        {/* Content Layer */}
        <div className="relative z-20 flex flex-col items-center justify-center max-w-2xl px-4 sm:px-6 md:px-4">
          {/* Main Title with Animation and Gradient */}
          <motion.span 
            key={language}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none text-center font-semibold leading-tight md:leading-none whitespace-nowrap bg-gradient-to-b from-white to-white/5 bg-clip-text text-transparent"
            style={{
              fontSize: 'clamp(3rem, 13vw, 8rem)',
            }}
          >
            {t.comingSoonTitle}
          </motion.span>

          {/* Subtitle with Animation */}
          <motion.p 
            key={`subtitle-${language}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-white/80 text-center max-w-xl mt-2 font-normal"
          >
            {t.comingSoonDesc}
          </motion.p>

          {/* Email Form Section with Animation */}
          <motion.div 
            key={`form-${language}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-full max-w-lg mt-6 sm:mt-8 md:mt-3"
          >
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in zoom-in">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-900 font-medium">
                  {t.notifySuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white z-10 pointer-events-none" />
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 sm:py-4 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm text-base sm:text-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  />
                </div>
                <GlowButton
                  label={isLoading ? t.notifying : t.notifyMe}
                  type="submit"
                  className="w-full text-base sm:text-lg py-4"
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
            className="text-sm sm:text-base md:text-sm text-white/70 mt-4 sm:mt-5 md:mt-3"
          >
            {t.comingSoonCopyright}
          </motion.p>
        </div>
      </div>
    </main>
  );
}
