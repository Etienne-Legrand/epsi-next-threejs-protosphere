"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

// Example scenes for the tabs
function SimpleObjects() {
  const bodyMaterialProps = {
    color: 0x4b8c3e,
    metalness: 0.4,
    roughness: 0.4,
    opacity: 0.9,
    transparent: true,
    side: THREE.DoubleSide,
  };

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.3} />

      <group position={[0, 0.25, 0]}>
        {/* Base et corps inférieur */}
        <mesh position={[0, -1, 0]}>
          <sphereGeometry
            args={[1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 1.5]}
          />
          <meshStandardMaterial {...bodyMaterialProps} />
        </mesh>

        {/* Corps bas */}
        <mesh position={[0, 0.6, 0]}>
          <coneGeometry args={[1.299, 1.7, 32]} />
          <meshStandardMaterial {...bodyMaterialProps} />
        </mesh>

        {/* Corps supérieur */}
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1, 2.5, 32]} />
          <meshStandardMaterial {...bodyMaterialProps} />
        </mesh>

        {/* Bec verseur */}
        <mesh
          position={[-0.87, 1.2, 0]}
          rotation={[Math.PI, 0, -Math.PI / 2.5]}
        >
          <coneGeometry args={[0.2, 0.4, 32]} />
          <meshStandardMaterial {...bodyMaterialProps} />
        </mesh>

        {/* Anse de la carafe */}
        <mesh position={[1.1, 0.2, 0]} rotation={[0, Math.PI, Math.PI / 5]}>
          <torusGeometry args={[0.9, 0.15, 16, 32, Math.PI * 1.2]} />
          <meshStandardMaterial {...bodyMaterialProps} />
        </mesh>
      </group>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={true}
        minDistance={3}
        maxDistance={15}
      />
      <Environment preset="city" />
    </>
  );
}

function ArchitectureModel() {
  const windowMaterialProps = {
    color: 0x5d5e60,
    metalness: 0.4,
    roughness: 0,
    opacity: 0.4,
    transparent: true,
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <group position={[0, -1, 0]}>
        {/* Base/Terrain */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[10, 0.3, 10]} />
          <meshStandardMaterial color="#767a3f" />
        </mesh>

        {/* House main structure */}
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[5, 2, 4]} />
          <meshStandardMaterial color="#f7f6ee" />
        </mesh>

        {/* Roof */}
        <mesh position={[0, 3, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[3.6, 2, 4]} />
          <meshStandardMaterial color="#a35e3d" />
        </mesh>

        {/* Door */}
        <mesh position={[0, 0.75, 2.01]} castShadow>
          <boxGeometry args={[1, 1.5, 0.1]} />
          <meshStandardMaterial color="#713f12" />
        </mesh>

        {/* Windows */}
        <mesh position={[-1.5, 1.2, 2.01]} castShadow>
          <boxGeometry args={[0.8, 0.8, 0.1]} />
          <meshStandardMaterial {...windowMaterialProps} />
        </mesh>

        <mesh position={[1.5, 1.2, 2.01]} castShadow>
          <boxGeometry args={[0.8, 0.8, 0.1]} />
          <meshStandardMaterial {...windowMaterialProps} />
        </mesh>

        {/* Side Windows */}
        <mesh position={[2.51, 1.2, 0]} castShadow>
          <boxGeometry args={[0.1, 0.8, 0.8]} />
          <meshStandardMaterial {...windowMaterialProps} />
        </mesh>

        <mesh position={[-2.51, 1.2, 0]} castShadow>
          <boxGeometry args={[0.1, 0.8, 0.8]} />
          <meshStandardMaterial {...windowMaterialProps} />
        </mesh>

        {/* Chimney */}
        <mesh position={[1.5, 3, -1]} castShadow>
          <boxGeometry args={[0.6, 1.5, 0.6]} />
          <meshStandardMaterial color="#a1a1aa" />
        </mesh>

        {/* Tree trunk */}
        <mesh position={[3, 0.9, 3.5]} castShadow>
          <cylinderGeometry args={[0.1, 0.2, 1.6, 8]} />
          <meshStandardMaterial color="#854d0e" />
        </mesh>

        {/* Tree leaves */}
        <mesh position={[3, 1.8, 3.5]} castShadow>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
      </group>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={true}
        minDistance={3}
        maxDistance={15}
      />
      <Environment preset="sunset" />
    </>
  );
}

function ProductDesign() {
  // Matériaux
  const frameMaterial = {
    color: "#d1d5db", // Couleur argentée
    metalness: 0.8,
    roughness: 0.2,
  };

  const screenMaterial = {
    color: "#18181b",
    metalness: 0.5,
    roughness: 0.1,
  };

  const cameraMaterial = {
    color: "#171717",
    metalness: 0.9,
    roughness: 0.2,
  };

  const lensMaterial = {
    color: "#0c0a09",
    metalness: 0.9,
    roughness: 0.1,
  };

  const buttonMaterial = {
    color: "#b8b8b8",
    metalness: 0.6,
  };

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <group position={[0, 0, 0]}>
        {/* Corps principal de l'iPhone avec coins arrondis */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2.3, 4.6, 0.3]} />
          <meshStandardMaterial {...frameMaterial} />
        </mesh>

        {/* Écran avec bordures plus fines */}
        <mesh position={[0, 0, -0.16]} receiveShadow>
          <boxGeometry args={[2.2, 4.5, 0.01]} />
          <meshStandardMaterial {...screenMaterial} />
        </mesh>

        {/* Module caméra (carré avec coins arrondis) */}
        <mesh position={[-0.6, 1.6, 0.16]} castShadow>
          <boxGeometry args={[1.0, 1.0, 0.15]} />
          <meshStandardMaterial {...cameraMaterial} color="#a7a8aa" />
        </mesh>

        {/* Objectifs de l'appareil photo */}
        <mesh position={[-0.8, 1.8, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 32]} />
          <meshStandardMaterial {...cameraMaterial} />
        </mesh>
        <mesh position={[-0.8, 1.8, 0.31]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
          <meshStandardMaterial {...lensMaterial} />
        </mesh>

        {/* Deuxième objectif */}
        <mesh position={[-0.4, 1.8, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 32]} />
          <meshStandardMaterial {...cameraMaterial} />
        </mesh>
        <mesh position={[-0.4, 1.8, 0.31]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
          <meshStandardMaterial {...lensMaterial} />
        </mesh>

        {/* Troisième objectif */}
        <mesh position={[-0.8, 1.4, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 32]} />
          <meshStandardMaterial {...cameraMaterial} />
        </mesh>
        <mesh position={[-0.8, 1.4, 0.31]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
          <meshStandardMaterial {...lensMaterial} />
        </mesh>

        {/* Bouton latéral (power) */}
        <mesh position={[1.15, 0.8, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.05, 0.5, 0.1]} />
          <meshStandardMaterial {...buttonMaterial} />
        </mesh>

        {/* Boutons de volume */}
        <mesh position={[-1.15, 0.5, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.05, 0.3, 0.1]} />
          <meshStandardMaterial {...buttonMaterial} />
        </mesh>
        <mesh position={[-1.15, 0.1, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.05, 0.3, 0.1]} />
          <meshStandardMaterial {...buttonMaterial} />
        </mesh>
      </group>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={true}
        minDistance={3}
        maxDistance={15}
      />
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
              Design produit
            </TabsTrigger>
          </TabsList>

          <Card className="border border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardContent className="p-1">
              <TabsContent value="simple" className="mt-0">
                <div className="h-[400px] w-full rounded-md overflow-hidden">
                  {mounted && (
                    <Canvas>
                      <PerspectiveCamera makeDefault position={[0, 2.5, 6]} />
                      <SimpleObjects />
                    </Canvas>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="architecture" className="mt-0">
                <div className="h-[400px] w-full rounded-md overflow-hidden">
                  {mounted && (
                    <Canvas>
                      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                      <ArchitectureModel />
                    </Canvas>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="product" className="mt-0">
                <div className="h-[400px] w-full rounded-md overflow-hidden">
                  {mounted && (
                    <Canvas>
                      <PerspectiveCamera makeDefault position={[-3, 1, 6]} />
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

export { SimpleObjects, ArchitectureModel, ProductDesign };
