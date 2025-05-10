"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  Environment,
} from "@react-three/drei";

// Simple 3D scene for hero section
function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4c6ef5" />
      </mesh>
      <mesh position={[-1.2, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#ae3ec9" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[1.2, 0, 0]}>
        <torusGeometry args={[0.6, 0.2, 16, 32]} />
        <meshStandardMaterial color="#22c55e" metalness={0.3} roughness={0.4} />
      </mesh>
      <OrbitControls autoRotate autoRotateSpeed={0.6} enableZoom={false} />
      <Environment preset="city" />
    </>
  );
}

export default function LandingHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-900">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-heading">Concevez en 3D</span>
              <br />
              <span className="text-white">En toute simplicité</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Un studio de conception 3D moderne pour créer, éditer et
              collaborer sur des modèles 3D avec une interface belle et
              intuitive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-blue-700 hover:bg-blue-600 text-white"
                asChild
              >
                <Link href="/dashboard">Commencer à créer</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-700"
                asChild
              >
                <Link href="#examples">Voir les exemples</Link>
              </Button>
            </div>
          </div>
          <div className="h-[400px] max-w-xl mx-auto lg:h-[500px] w-full rounded-xl overflow-hidden border border-slate-700 shadow-lg">
            {mounted && (
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <HeroScene />
              </Canvas>
            )}
          </div>
        </div>
      </div>

      <div className="absolute -z-10 top-0 inset-x-0 transform-gpu overflow-hidden blur-3xl">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="absolute -z-10 bottom-0 inset-x-0 transform-gpu overflow-hidden blur-3xl">
        <div
          className="relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] opacity-10 sm:left-[calc(50%+15rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
