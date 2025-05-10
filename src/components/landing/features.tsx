"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpDown,
  Layers,
  Shapes,
  Move,
  PenTool,
  Users,
  FileCode,
  Download,
} from "lucide-react";

const features = [
  {
    title: "Modélisation rapide",
    description:
      "Créez des prototypes 3D avec des formes simples, des extrusions et des opérations booléennes.",
    icon: Shapes,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Transformations précises",
    description:
      "Positionnez, faites pivoter et redimensionnez facilement vos objets.",
    icon: Move,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Extrusion & sculpture",
    description:
      "Donnez vie à vos idées 2D avec des outils d’extrusion et de sculpture intuitive.",
    icon: ArrowUpDown,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Calques organisés",
    description:
      "Structurez vos modèles complexes grâce à une gestion claire des calques.",
    icon: Layers,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Collaboration en temps réel",
    description:
      "Prototypage en équipe avec édition synchronisée et commentaires en temps réel.",
    icon: Users,
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "Personnalisation visuelle",
    description:
      "Ajoutez couleurs, textures et matériaux pour des prototypes expressifs.",
    icon: PenTool,
    color: "from-rose-500 to-red-500",
  },
  {
    title: "Exportation multiple",
    description:
      "Exportez vos modèles dans les bons formats pour l’impression, le rendu ou le jeu vidéo.",
    icon: Download,
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "Scripts avancés",
    description:
      "Créez des outils sur mesure avec JavaScript pour automatiser votre prototypage.",
    icon: FileCode,
    color: "from-teal-500 to-green-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-800">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Fonctionnalités puissantes, interface simple
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour donner vie à vos idées en 3D,
            sans la complexité.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="card-hover border border-slate-700 bg-slate-900/80 backdrop-blur text-white"
            >
              <CardHeader className="pb-2">
                <div
                  className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color}`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400 text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
