"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Designer produit",
    avatar: "/avatars/sarah.jpg",
    fallback: "SJ",
    content:
      "Une interface fluide et facile à prendre en main. On a pu collaborer dès le premier jour, sans friction. Ça a clairement boosté notre processus de design.",
    star: 5,
  },
  {
    name: "Michael Chen",
    role: "Architecte",
    avatar: "/avatars/michael.jpg",
    fallback: "MC",
    content:
      "Simple, rapide et efficace. Un vrai gain de temps pour visualiser mes idées en 3D.",
    star: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Développeuse de jeux",
    avatar: "/avatars/emily.jpg",
    fallback: "ER",
    content:
      "J’ai besoin d’itérer vite sur des idées, et cette plateforme me le permet sans prise de tête. L’intégration avec mon moteur de jeu est top, et je gagne un temps fou.",
    star: 5,
  },
  {
    name: "David Thompson",
    role: "Passionné d'impression 3D",
    avatar: "/avatars/david.jpg",
    fallback: "DT",
    content:
      "Intuitif et puissant à la fois. Je ne suis pas designer pro, mais j’ai pu modéliser des pièces complexes pour mes impressions sans galérer. Super outil.",
    star: 4,
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
              className="card-hover border border-slate-700 bg-slate-900/80 backdrop-blur h-full text-white"
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
                  {[...Array(testimonial.star)].map((_, i) => (
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
