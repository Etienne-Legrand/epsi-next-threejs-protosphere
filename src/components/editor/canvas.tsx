"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  Grid,
  Environment,
  Center,
  PerspectiveCamera,
  Html,
  useContextBridge,
} from "@react-three/drei";
import * as THREE from "three";
import { toast } from "sonner";
import { ObjectType } from "@/lib/store/editor-store";

interface EditorCanvasProps {
  selectedObject: string | null;
  setSelectedObject: (id: string | null) => void;
}

interface DragDropData {
  type: ObjectType;
  name: string;
}

// Sample scene objects
const defaultObjects = [
  { id: "cube-1", type: "cube", position: [0, 0, 0], color: "#4c6ef5" },
  { id: "sphere-1", type: "sphere", position: [2, 0, 0], color: "#ae3ec9" },
];

// Main Scene Component
function Scene({ selectedObject, setSelectedObject }: EditorCanvasProps) {
  const { camera, gl } = useThree();
  const [objects, setObjects] = useState(defaultObjects);
  const selectedRef = useRef<THREE.Mesh | null>(null);
  const [transformMode, setTransformMode] = useState<
    "translate" | "rotate" | "scale"
  >("translate");
  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle object selection
  const handleSelect = (id: string, e: THREE.Event) => {
    e.stopPropagation();
    setSelectedObject(id);
    toast.success(`Selected ${id}`);
  };

  // Handle canvas click (deselection)
  const handleCanvasClick = () => {
    if (selectedObject) {
      setSelectedObject(null);
    }
  };

  // Set up the transform controls for the selected object
  useEffect(() => {
    selectedRef.current = null;
  }, [selectedObject]);

  // Key event listener to change transform mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedObject) {
        switch (e.key.toLowerCase()) {
          case "g":
            setTransformMode("translate");
            toast.success("Move tool activated");
            break;
          case "r":
            setTransformMode("rotate");
            toast.success("Rotate tool activated");
            break;
          case "s":
            setTransformMode("scale");
            toast.success("Scale tool activated");
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedObject]);

  // Add a new object to the scene
  const addObject = (type: ObjectType, position = [0, 0, 0]) => {
    const id = `${type}-${Math.random().toString(36).substring(2, 9)}`;
    const colors = {
      cube: "#4c6ef5",
      sphere: "#ae3ec9",
      cylinder: "#22c55e",
      cone: "#f97316",
      torus: "#a855f7",
      plane: "#64748b",
      pyramid: "#fbbf24",
      text: "#ec4899",
    };

    const newObject = {
      id,
      type,
      position,
      color: colors[type] || "#ffffff",
    };

    setObjects((prev) => [...prev, newObject]);
    setSelectedObject(id);
    toast.success(
      `Added ${type} at position (${position[0]}, ${position[1]}, ${position[2]})`
    );
  };

  return (
    <>
      {/* Grid for reference */}
      <Grid
        infiniteGrid
        cellColor="#444444"
        sectionColor="#888888"
        fadeDistance={30}
        fadeStrength={1.5}
        cellSize={1}
        sectionSize={5}
      />

      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Main directional light with shadow */}
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* The 3D objects */}
      {objects.map((object) => (
        <mesh
          key={object.id}
          position={object.position as [number, number, number]}
          onClick={(e) => handleSelect(object.id, e)}
          ref={selectedObject === object.id ? selectedRef : undefined}
          castShadow
          receiveShadow
        >
          {object.type === "cube" && <boxGeometry args={[1, 1, 1]} />}
          {object.type === "sphere" && <sphereGeometry args={[0.7, 32, 32]} />}
          {object.type === "cylinder" && (
            <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
          )}
          {object.type === "cone" && <coneGeometry args={[0.7, 1.5, 32]} />}
          {object.type === "torus" && (
            <torusGeometry args={[0.5, 0.2, 16, 32]} />
          )}
          {object.type === "plane" && <planeGeometry args={[1.5, 1.5]} />}
          {object.type === "pyramid" && <coneGeometry args={[0.7, 1.5, 4]} />}

          <meshStandardMaterial
            color={object.color}
            metalness={0.1}
            roughness={0.2}
            emissive={selectedObject === object.id ? "#333333" : "#000000"}
          />

          {/* Label for the object */}
          <Html
            position={[0, 1.2, 0]}
            center
            distanceFactor={10}
            sprite
            occlude
            className={`pointer-events-none transition-opacity ${
              selectedObject === object.id ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="px-2 py-1 rounded-md bg-background border border-border text-xs font-mono">
              {object.id}
            </div>
          </Html>
        </mesh>
      ))}

      {/* The background plane to receive drag & drop and handle deselection */}
      <mesh
        position={[0, -0.001, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[100, 100, 1]}
        onClick={handleCanvasClick}
      >
        <planeGeometry />
        <meshStandardMaterial transparent opacity={0.0} />
      </mesh>

      {/* Transform controls for selected object */}
      {selectedObject && selectedRef.current && (
        <TransformControls
          object={selectedRef.current}
          mode={transformMode}
          onMouseUp={() => {
            toast.success(`Applied ${transformMode} transformation`);
          }}
        />
      )}

      {/* Environment lighting */}
      <Environment preset="city" />

      {/* Orbit controls for camera */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.25}
        rotateSpeed={0.7}
        minDistance={2}
        maxDistance={20}
      />
    </>
  );
}

// Loading fallback
function CanvasLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center text-muted-foreground">
        <svg
          className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="mt-2">Loading 3D editor...</p>
      </div>
    </div>
  );
}

// Main Canvas Component
export default function EditorCanvas({
  selectedObject,
  setSelectedObject,
}: EditorCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    try {
      // Get shape data
      const shapeData = e.dataTransfer.getData("application/reactflow");
      if (shapeData) {
        const data = JSON.parse(shapeData) as DragDropData;
        // Add the shape at the drop position
        // We would need to convert screen coordinates to world coordinates
        // For simplicity, we'll just add the object at a random position near the center

        const randomOffset = () => (Math.random() - 0.5) * 3;
        const position: [number, number, number] = [
          randomOffset(),
          0.5, // Lift slightly above ground
          randomOffset(),
        ];

        // Update the scene with the new object
        // In a real app, we would dispatch to our store
        toast.success(
          `Added ${data.name} at position (${position[0].toFixed(
            2
          )}, ${position[1].toFixed(2)}, ${position[2].toFixed(2)})`
        );
      }

      // Get material data
      const materialData = e.dataTransfer.getData("application/material");
      if (materialData && selectedObject) {
        const material = JSON.parse(materialData);
        toast.success(`Applied ${material.name} to ${selectedObject}`);
      }
    } catch (error) {
      console.error("Error handling drop:", error);
      toast.error("Failed to process dropped item");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <CanvasLoading />;
  }

  return (
    <div
      className="w-full h-full bg-gradient-to-b from-background to-background/80"
      ref={canvasRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Canvas shadows>
        <Suspense fallback={<CanvasLoading />}>
          <Scene
            selectedObject={selectedObject}
            setSelectedObject={setSelectedObject}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
