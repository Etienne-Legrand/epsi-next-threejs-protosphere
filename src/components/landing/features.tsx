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
    title: "Modélisation 3D Simple",
    description:
      "Créez des modèles 3D avec des formes de base, des extrusions et des opérations booléennes pour des itérations de conception rapides.",
    icon: Shapes,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Outils de Transformation",
    description:
      "Déplacez, tournez et redimensionnez facilement des objets avec des contrôles intuitifs pour un positionnement précis.",
    icon: Move,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Extrusion et Sculpture",
    description:
      "Transformez des formes 2D en objets 3D avec de puissants outils d'extrusion et des fonctionnalités de sculpture de base.",
    icon: ArrowUpDown,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Gestion des Calques",
    description:
      "Organisez vos designs avec des contrôles de calques intuitifs pour des modèles complexes à plusieurs parties.",
    icon: Layers,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Collaboration en Temps Réel",
    description:
      "Travaillez ensemble avec vos coéquipiers en temps réel avec édition synchronisée et commentaires.",
    icon: Users,
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "Personnalisation",
    description:
      "Appliquez des matériaux, des textures et des couleurs pour rendre vos modèles 3D visuellement époustouflants.",
    icon: PenTool,
    color: "from-rose-500 to-red-500",
  },
  {
    title: "Options d'Exportation",
    description:
      "Exportez vos créations vers différents formats 3D pour l'impression, le rendu ou le développement de jeux.",
    icon: Download,
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "Scripts Avancés",
    description:
      "Étendez les fonctionnalités avec JavaScript pour des outils personnalisés et des flux de travail automatisés.",
    icon: FileCode,
    color: "from-teal-500 to-green-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-black/5">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Fonctionnalités puissantes, interface simple
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour donner vie à vos idées en 3D,
            sans la complexité.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="card-hover border border-border/40 bg-card/50 backdrop-blur"
            >
              <CardHeader className="pb-2">
                <div
                  className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color}`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm">
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
