"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Designer Produit",
    avatar: "/avatars/sarah.jpg",
    fallback: "SJ",
    content:
      "Protosphere a transformé mon flux de travail. L'interface intuitive m'a permis de commencer à créer immédiatement, et les fonctionnalités de collaboration en temps réel ont été un véritable changement de paradigme pour notre équipe.",
  },
  {
    name: "Michael Chen",
    role: "Architecte",
    avatar: "/avatars/michael.jpg",
    fallback: "MC",
    content:
      "La simplicité de création et de modification des modèles 3D est incroyable. J'ai essayé de nombreux outils 3D, mais aucun n'a été aussi accessible et puissant pour la visualisation rapide de concepts.",
  },
  {
    name: "Emily Rodriguez",
    role: "Développeuse de Jeux",
    avatar: "/avatars/emily.jpg",
    fallback: "ER",
    content:
      "En tant que personne qui a besoin de créer rapidement des prototypes 3D, cette plateforme a été inestimable. Les options d'exportation fonctionnent parfaitement avec mon moteur de jeu, et les outils de modélisation sont exactement ce dont j'ai besoin.",
  },
  {
    name: "David Thompson",
    role: "Passionné d'Impression 3D",
    avatar: "/avatars/david.jpg",
    fallback: "DT",
    content:
      "Je cherchais un outil qui facilite la conception de modèles pour l'impression 3D sans courbe d'apprentissage abrupte. C'est exactement ce dont j'avais besoin - suffisamment puissant pour des designs complexes mais simple à utiliser.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-800">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Rejoignez des milliers de créateurs qui donnent vie à leurs idées
            avec notre plateforme.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="card-hover border border-slate-700 bg-slate-900/50 backdrop-blur h-full text-white"
            >
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-2">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-300">{testimonial.content}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
