"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";

// Example scenes for the tabs
function SimpleObjects() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* Simple geometric shapes arranged as a sculpture */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#4c6ef5" />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial
            color="#ae3ec9"
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
      </group>
      <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} />
      <Environment preset="sunset" />
    </>
  );
}

function ArchitectureModel() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* Simple house model */}
      <group position={[0, -1, 0]}>
        {/* House base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 1, 2]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[3, 1.5, 2]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        {/* Door */}
        <mesh position={[0, 0, 1.01]}>
          <boxGeometry args={[0.6, 0.8, 0.1]} />
          <meshStandardMaterial color="#713f12" />
        </mesh>
        {/* Windows */}
        <mesh position={[-1, 0.2, 1.01]}>
          <boxGeometry args={[0.5, 0.5, 0.1]} />
          <meshStandardMaterial color="#0ea5e9" />
        </mesh>
        <mesh position={[1, 0.2, 1.01]}>
          <boxGeometry args={[0.5, 0.5, 0.1]} />
          <meshStandardMaterial color="#0ea5e9" />
        </mesh>
      </group>
      <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
      <Environment preset="city" />
    </>
  );
}

function ProductDesign() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* Phone model */}
      <group position={[0, 0, 0]}>
        {/* Phone body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2, 4, 0.2]} />
          <meshStandardMaterial
            color="#171717"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.11]} receiveShadow>
          <boxGeometry args={[1.8, 3.8, 0.01]} />
          <meshStandardMaterial
            color="#18181b"
            metalness={0.5}
            roughness={0.1}
          />
        </mesh>
        {/* Camera island */}
        <mesh position={[0.5, 1.5, 0.2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial
            color="#171717"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Camera lens */}
        <mesh position={[0.5, 1.5, 0.25]}>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
          <meshStandardMaterial
            color="#0c0a09"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
      <OrbitControls autoRotate autoRotateSpeed={0.7} enableZoom={false} />
      <Environment preset="apartment" />
    </>
  );
}

export default function Examples() {
  const [mounted, setMounted] = useState(true);

  return (
    <section id="examples" className="py-24 bg-slate-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Découvrez ce que vous pouvez créer
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Des objets simples aux conceptions complexes, notre plateforme rend
            la création 3D accessible à tous.
          </p>
        </div>

        <Tabs defaultValue="simple" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-700">
            <TabsTrigger
              value="simple"
              className="data-[state=active]:bg-slate-600 text-white"
            >
              Objets simples
            </TabsTrigger>
            <TabsTrigger
              value="architecture"
              className="data-[state=active]:bg-slate-600 text-white"
            >
              Architecture
            </TabsTrigger>
            <TabsTrigger
              value="product"
              className="data-[state=active]:bg-slate-600 text-white"
            >
              Design Produit
            </TabsTrigger>
          </TabsList>

          <Card className="border border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardContent className="p-1">
              <TabsContent value="simple" className="mt-0">
                <div className="h-[400px] w-full rounded-md overflow-hidden">
                  {mounted && (
                    <Canvas>
                      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                      <SimpleObjects />
                    </Canvas>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="architecture" className="mt-0">
                <div className="h-[400px] w-full rounded-md overflow-hidden">
                  {mounted && (
                    <Canvas>
                      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                      <ArchitectureModel />
                    </Canvas>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="product" className="mt-0">
                <div className="h-[400px] w-full rounded-md overflow-hidden">
                  {mounted && (
                    <Canvas>
                      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                      <ProductDesign />
                    </Canvas>
                  )}
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </section>
  );
}
