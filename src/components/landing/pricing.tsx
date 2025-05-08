"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  {
    name: "Free",
    description: "Perfect for getting started with basic 3D modeling.",
    price: "$0",
    duration: "forever",
    features: [
      "Basic shapes and tools",
      "5 projects",
      "Export to STL",
      "Community support",
    ],
    buttonText: "Start for Free",
    buttonVariant: "outline",
  },
  {
    name: "Pro",
    description: "Everything you need for professional 3D design.",
    price: "$12",
    duration: "per month",
    features: [
      "Advanced modeling tools",
      "Unlimited projects",
      "Export to all formats",
      "Real-time collaboration with 3 users",
      "Priority support",
      "Custom materials library",
    ],
    buttonText: "Subscribe to Pro",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Team",
    description: "Ideal for teams working together on complex projects.",
    price: "$49",
    duration: "per month",
    features: [
      "Everything in Pro",
      "10 team members",
      "Advanced collaboration tools",
      "Version history",
      "Team templates",
      "Dedicated support",
      "API access",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you and start creating today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`card-hover border border-border/40 ${tier.popular ? 'bg-secondary/30 border-primary/20 shadow-md' : 'bg-card/20'} backdrop-blur`}
            >
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground ml-1">{tier.duration}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${tier.popular ? 'bg-gradient-to-r from-[hsl(var(--accent-blue))] to-[hsl(var(--accent-purple))] hover:from-[hsl(var(--accent-purple))] hover:to-[hsl(var(--accent-blue))]' : ''}`}
                  variant={tier.buttonVariant as any}
                  asChild
                >
                  <Link href="/dashboard">{tier.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            All plans include a 14-day trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
