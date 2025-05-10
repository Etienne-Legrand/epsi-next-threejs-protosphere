import Link from "next/link";
import { Button } from "@/components/ui/button";
import LandingHero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Examples from "@/components/landing/examples";
import Testimonials from "@/components/landing/testimonials";
import Pricing from "@/components/landing/pricing";
import Footer from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[hsl(var(--accent-blue))] to-[hsl(var(--accent-purple))]"></div>
            <span className="text-xl font-bold">Protosphere</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#examples"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Exemples
            </Link>
            <Link
              href="#pricing"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Prix
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-700"
              asChild
            >
              <Link href="/login">Connexion</Link>
            </Button>
            <Button
              className="bg-blue-700 hover:bg-blue-600 text-white"
              asChild
            >
              <Link href="/dashboard">Commencer</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <LandingHero />
        <Features />
        <Examples />
        <Testimonials />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}
