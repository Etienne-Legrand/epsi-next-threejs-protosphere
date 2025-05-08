"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    avatar: "/avatars/sarah.jpg",
    fallback: "SJ",
    content: "Modern 3D Studio transformed my workflow. The intuitive interface made it easy to start creating immediately, and the real-time collaboration features have been a game-changer for our team.",
  },
  {
    name: "Michael Chen",
    role: "Architect",
    avatar: "/avatars/michael.jpg",
    fallback: "MC",
    content: "The simplicity of creating and modifying 3D models is incredible. I've tried many 3D tools, but none have been as accessible and powerful for quick concept visualization.",
  },
  {
    name: "Emily Rodriguez",
    role: "Game Developer",
    avatar: "/avatars/emily.jpg",
    fallback: "ER",
    content: "As someone who needs to create quick 3D prototypes, this platform has been invaluable. The export options work perfectly with my game engine, and the modeling tools are just what I need.",
  },
  {
    name: "David Thompson",
    role: "3D Printing Enthusiast",
    avatar: "/avatars/david.jpg",
    fallback: "DT",
    content: "I've been looking for a tool that makes it easy to design models for 3D printing without a steep learning curve. This is exactly what I needed - powerful enough for complex designs but simple to use.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-black/5">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who are bringing their ideas to life with our platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover border border-border/40 bg-card/50 backdrop-blur h-full">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-2">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{testimonial.content}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
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
