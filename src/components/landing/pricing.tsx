"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tiers = [
  {
    name: "Gratuit",
    description: "Parfait pour débuter avec la modélisation 3D de base.",
    price: "0€",
    duration: "pour toujours",
    features: [
      "Formes et outils basiques",
      "5 projets",
      "Export vers STL",
      "Support communautaire",
    ],
    buttonText: "Commencer gratuitement",
    buttonVariant: "outline",
  },
  {
    name: "Pro",
    description:
      "Tout ce dont vous avez besoin pour la conception 3D professionnelle.",
    price: "12€",
    duration: "par mois",
    features: [
      "Outils de modélisation avancés",
      "Projets illimités",
      "Export vers tous les formats",
      "Collaboration en temps réel avec 3 utilisateurs",
      "Support prioritaire",
      "Bibliothèque de matériaux personnalisés",
    ],
    buttonText: "S'abonner à Pro",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Équipe",
    description:
      "Idéal pour les équipes travaillant ensemble sur des projets complexes.",
    price: "49€",
    duration: "par mois",
    features: [
      "Tout ce qui est inclus dans Pro",
      "10 membres d'équipe",
      "Outils de collaboration avancés",
      "Historique des versions",
      "Modèles d'équipe",
      "Support dédié",
      "Accès API",
    ],
    buttonText: "Contacter les ventes",
    buttonVariant: "outline",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Tarification simple et transparente
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choisissez le forfait qui vous convient et commencez à créer dès
            aujourd'hui.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`card-hover border ${
                tier.popular
                  ? "bg-slate-800/80 border-primary/20 shadow-md"
                  : "bg-slate-900/80 border-slate-700"
              } backdrop-blur text-white`}
            >
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription className="text-slate-400">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-slate-400 ml-1">{tier.duration}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full text-slate-950 ${
                    tier.popular
                      ? "bg-blue-700 hover:bg-blue-600 text-white"
                      : tier.buttonVariant === "outline"
                      ? "border-slate-600 hover:bg-slate-700 text-white"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
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
          <p className="text-slate-400">
            Tous les forfaits incluent un essai de 14 jours. Aucune carte de
            crédit requise.
          </p>
        </div>
      </div>
    </section>
  );
}
