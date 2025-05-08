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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[hsl(var(--accent-blue))] to-[hsl(var(--accent-purple))]"></div>
            <span className="text-xl font-bold">Modern 3D Studio</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#examples" className="text-muted-foreground hover:text-foreground transition-colors">Examples</Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
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
