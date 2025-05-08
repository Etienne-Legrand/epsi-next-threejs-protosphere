"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, Layers, Shapes, Move, PenTool, Users, FileCode, Download } from "lucide-react";

const features = [
  {
    title: "Simple 3D Modeling",
    description: "Create 3D models with basic shapes, extrusions, and boolean operations for quick design iterations.",
    icon: Shapes,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Transformation Tools",
    description: "Easily move, rotate, and resize objects with intuitive controls for precise positioning.",
    icon: Move,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Extrusion & Sculpting",
    description: "Turn 2D shapes into 3D objects with powerful extrusion tools and basic sculpting capabilities.",
    icon: ArrowUpDown,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Layer Management",
    description: "Organize your designs with intuitive layer controls for complex multi-part models.",
    icon: Layers,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Real-time Collaboration",
    description: "Work together with teammates in real-time with synchronized editing and commenting.",
    icon: Users,
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "Customization",
    description: "Apply materials, textures, and colors to make your 3D models visually stunning.",
    icon: PenTool,
    color: "from-rose-500 to-red-500",
  },
  {
    title: "Export Options",
    description: "Export your creations to various 3D formats for printing, rendering, or game development.",
    icon: Download,
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "Advanced Scripting",
    description: "Extend functionality with JavaScript for custom tools and automation workflows.",
    icon: FileCode,
    color: "from-teal-500 to-green-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-black/5">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features, Simple Interface</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to bring your ideas to life in 3D, without the complexity.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover border border-border/40 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color}`}>
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
