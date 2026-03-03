"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import "./smooth-cursor.css";

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
  const router = useRouter();

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

      <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#2864ff]" />
            <span className="text-lg font-semibold tracking-tight">Redraft.AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-slate-600 hover:text-slate-900">
              Connexion
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-lg bg-[#2864ff] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1d4fe0]"
            >
              Commencer
            </Link>
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
                  Propulsé par Claude 3.5 Sonnet + GPT-4o
                </AnimatedShinyText>
              </div>
              <p className="text-sm font-medium text-[#2864ff]">Pour fondateurs SaaS et équipes produit</p>
              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                Prompt vers
                <br />
                code landing
                <br />
                prêt à shipper
              </h1>
              <p className="max-w-xl text-lg text-slate-600">
                Redraft transforme votre idée en landing Next.js/Tailwind performante. Répondez au tunnel intelligent,
                éditez visuellement, exportez du code propre.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2864ff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4fe0]"
                >
                  Créer ma première landing <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/generator"
                  className="rounded-lg border border-black/15 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Voir la démo
                </Link>
              </div>
              <p className="text-sm text-slate-500">No lock-in. Vous possédez 100% du code.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
              <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
                <span>Prompt</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">Live Preview</span>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-slate-50 p-4">
                  <p className="mb-3 text-xs text-slate-500">Questions IA</p>
                  <div className="space-y-2 text-sm text-slate-700">
                    <p className="rounded-xl bg-white px-3 py-2">Audience cible ?</p>
                    <p className="rounded-xl bg-white px-3 py-2">Objectif principal ?</p>
                    <p className="rounded-xl bg-white px-3 py-2">Ton de voix ?</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-gradient-to-b from-white to-slate-50 p-4">
                  <p className="mb-3 text-xs text-slate-500">Hero généré</p>
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
                Décrivez votre SaaS
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Un outil qui transforme les réunions Zoom en résumés actionnables pour les managers..."
                className="w-full h-28 px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 cursor-text"
              />
              <button
                onClick={handleStart}
                disabled={isLoading}
                className="mt-6 w-full py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                <span>Créer ma landing page</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="mt-3 text-sm text-gray-500 text-center">
                Gratuit pour voir le Hero • 19€ pour débloquer la page complète
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fafbff] px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Prompt to Sitemap</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Définissez les pages, sections et messages clés de votre site en quelques secondes.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-7">
              <Navigation2 className="mb-4 h-7 w-7 text-[#2864ff]" />
              <h3 className="text-xl font-semibold">Mappez la structure</h3>
              <p className="mt-2 text-slate-600">Reliez proposition de valeur, sections et parcours utilisateur sans friction.</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-7">
              <CheckCircle2 className="mb-4 h-7 w-7 text-[#2864ff]" />
              <h3 className="text-xl font-semibold">Scopage plus précis</h3>
              <p className="mt-2 text-slate-600">Évitez le scope creep et démarrez avec une architecture claire pour le client.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Sitemap to Wireframe</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Générez des wireframes utilisables immédiatement avec de vraies sections de landing.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-7">
              <Edit3 className="mb-4 h-7 w-7 text-[#2864ff]" />
              <h3 className="text-xl font-semibold">Draft instantané</h3>
              <p className="mt-2 text-slate-600">Un premier jet concret dès la première minute pour accélérer vos validations.</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-7">
              <MessageSquare className="mb-4 h-7 w-7 text-[#2864ff]" />
              <h3 className="text-xl font-semibold">Édition augmentée</h3>
              <p className="mt-2 text-slate-600">Ajustez le copywriting et les blocs en direct selon vos retours équipe/client.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fafbff] px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Wireframe to Style Guide</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Définissez rapidement un design system cohérent pour finaliser votre landing sans ralentir.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Palette, title: "Couleurs", text: "Extraction auto depuis vos assets pour garder une identité cohérente." },
              { icon: Sparkles, title: "Typographie", text: "Hiérarchie lisible et équilibrée pour conversion + clarté produit." },
              { icon: CheckCircle2, title: "Spacing", text: "Rythme visuel propre, prêt à coder sans retouches interminables." },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-black/10 bg-white p-7 transition"
              >
                <item.icon className="mb-4 h-7 w-7 text-[#2864ff]" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Export to Figma, React & Code</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Utilisez vos outils habituels. Copiez-collez les blocs là où vous travaillez déjà.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Palette, title: "Copy to Figma", text: "Passez de l'idéation au design final sans ressaisie." },
              { icon: Code, title: "Copy to React", text: "Export Next.js/TypeScript/Tailwind prêt pour la prod." },
              { icon: Square, title: "Copy to Webflow", text: "Gardez la flexibilité de vos workflows no-code/low-code." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-black/10 bg-white p-7">
                <item.icon className="mb-4 h-7 w-7 text-[#2864ff]" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fafbff] px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Ils gagnent du temps chaque semaine</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              "On a réduit notre cycle landing de 2 semaines à 2 jours.",
              "Le copy IA est déjà exploitable dès la première génération.",
              "Le code exporté est propre, lisible et facile à maintenir.",
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
          <h2 className="text-5xl font-semibold tracking-tight md:text-6xl">Try Redraft.ai sur votre prochain lancement</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            De l'idée au code Next.js prêt à shipper en quelques minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2864ff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4fe0]"
            >
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/generator"
              className="rounded-lg border border-black/15 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Voir un exemple de code
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#2864ff]" />
              <span className="text-lg font-semibold">Redraft.AI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-slate-600">
              Générateur de landing pages SaaS haute performance avec export de code propre.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Produit</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>AI Site Builder</li>
              <li>React Library</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Ressources</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Documentation</li>
              <li>Community</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Légal</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/legal/privacy">Confidentialité</Link></li>
              <li><Link href="/legal/terms">Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[1200px] border-t border-black/10 pt-6 text-sm text-slate-500">
          © 2026 Redraft.AI. Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}
