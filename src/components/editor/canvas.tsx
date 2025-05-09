"use client";

import { useEffect, useState, useRef, Suspense, useCallback } from "react";
import { Canvas, useThree, useFrame, ThreeEvent } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  Grid,
  Environment,
  Center,
  PerspectiveCamera,
  Html,
  useContextBridge,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei";
import * as THREE from "three";
import { toast } from "sonner";
import { ObjectType, useEditorStore } from "@/lib/store/editor-store";

interface EditorCanvasProps {
  selectedObject: string | null;
  setSelectedObject: (id: string | null) => void;
}

interface DragDropData {
  type: ObjectType;
  name: string;
}

// Main Scene Component
function Scene({ selectedObject, setSelectedObject }: EditorCanvasProps) {
  const { camera, gl } = useThree();
  const selectedRef = useRef<THREE.Mesh | null>(null);
  const objectsRef = useRef<{ [key: string]: THREE.Mesh }>({});

  // Get data from Zustand store
  const {
    scene,
    selectObject,
    addObject,
    updateObject,
    activeTool,
    setActiveTool,
    copyObject,
    pasteObject,
    cutObject,
    deleteObject,
    undo,
    redo,
    startTransformation,
    endTransformation,
  } = useEditorStore();

  // Transform mode mapping from store's activeTool
  const getTransformMode = () => {
    if (activeTool === "move") return "translate";
    if (activeTool === "rotate") return "rotate";
    if (activeTool === "scale") return "scale";
    return undefined;
  };

  const transformMode = getTransformMode();

  // Handle object selection
  const handleSelect = useCallback(
    (id: string, e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      selectObject(id);
      setSelectedObject(id);
      toast.success(`${id} sélectionné`);
    },
    [selectObject, setSelectedObject]
  );

  // Handle canvas click (deselection)
  const handleCanvasClick = useCallback(() => {
    if (selectedObject) {
      selectObject(null);
      setSelectedObject(null);
    }
  }, [selectedObject, selectObject, setSelectedObject]);

  // Key event listener to change transform mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tool shortcuts
      if (selectedObject) {
        switch (e.key.toLowerCase()) {
          case "g":
            setActiveTool("move");
            toast.success("Outil de déplacement activé");
            break;
          case "r":
            setActiveTool("rotate");
            toast.success("Outil de rotation activé");
            break;
          case "s":
            setActiveTool("scale");
            toast.success("Outil de mise à l'échelle activé");
            break;
        }
      }

      // Clipboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "c":
            if (selectedObject) {
              copyObject(selectedObject);
            }
            break;
          case "x":
            if (selectedObject) {
              cutObject(selectedObject);
              setSelectedObject(null);
            }
            break;
          case "v":
            pasteObject();
            break;
          case "z":
            // Undo
            e.preventDefault();
            undo();
            break;
          case "y":
            // Redo
            e.preventDefault();
            redo();
            break;
        }
      }

      // Delete shortcut
      if (e.key === "Delete" && selectedObject) {
        deleteObject(selectedObject);
        setSelectedObject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedObject,
    setActiveTool,
    copyObject,
    cutObject,
    pasteObject,
    deleteObject,
    setSelectedObject,
    undo,
    redo,
  ]);

  // Handle transform changes
  const handleTransformChange = (e: any) => {
    if (selectedObject && objectsRef.current[selectedObject]) {
      const mesh = objectsRef.current[selectedObject];

      // Update position in the store (convert Vector3 to object)
      updateObject(selectedObject, {
        position: {
          x: mesh.position.x,
          y: mesh.position.y,
          z: mesh.position.z,
        },
        rotation: {
          x: mesh.rotation.x,
          y: mesh.rotation.y,
          z: mesh.rotation.z,
        },
        scale: {
          x: mesh.scale.x,
          y: mesh.scale.y,
          z: mesh.scale.z,
        },
      });
    }
  };

  // Handle dropping objects
  const handleObjectDrop = (
    type: ObjectType,
    position: [number, number, number]
  ) => {
    addObject(type);
    toast.success(
      `${type} ajouté à la position (${position[0].toFixed(
        2
      )}, ${position[1].toFixed(2)}, ${position[2].toFixed(2)})`
    );
  };

  // Extract selected object
  const selectedObjectRef = selectedObject
    ? objectsRef.current[selectedObject]
    : null;

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
      {scene.objects.map((object) => (
        <mesh
          key={object.id}
          position={[object.position.x, object.position.y, object.position.z]}
          rotation={[object.rotation.x, object.rotation.y, object.rotation.z]}
          scale={[object.scale.x, object.scale.y, object.scale.z]}
          onClick={(e) => handleSelect(object.id, e)}
          ref={(mesh) => {
            if (mesh) objectsRef.current[object.id] = mesh;
            if (selectedObject === object.id) selectedRef.current = mesh;
          }}
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
          {object.type === "text" && (
            <mesh>
              {/* Text is a placeholder, can be replaced with proper Text component */}
              <boxGeometry args={[1, 0.5, 0.1]} />
            </mesh>
          )}

          <meshStandardMaterial
            color={object.material.color}
            metalness={object.material.metalness}
            roughness={object.material.roughness}
            transparent={object.material.opacity < 1}
            opacity={object.material.opacity}
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
              {object.name}
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
      {selectedObject && selectedObjectRef && transformMode && (
        <TransformControls
          object={selectedObjectRef}
          mode={transformMode}
          onObjectChange={handleTransformChange}
          onMouseDown={() => {
            // Capture l'état initial avant la transformation
            startTransformation(selectedObject);
          }}
          onMouseUp={(e) => {
            // Enregistre l'état final après la transformation
            endTransformation(
              selectedObject,
              `Transformation ${transformMode} appliquée`
            );
            toast.success(`Transformation ${transformMode} appliquée`);
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

      {/* Axes helper gizmo (similaire à l'image) */}
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="white"
        />
      </GizmoHelper>
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
        <p className="mt-2">Chargement de l'éditeur 3D...</p>
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
  const addObject = useEditorStore((state) => state.addObject);

  // Convert screen coordinates to world coordinates
  const screenToWorld = (
    e: React.DragEvent,
    camera: THREE.Camera,
    targetZ = 0
  ): [number, number, number] => {
    if (!canvasRef.current) return [0, 0, 0];

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Create a ray from the camera through the mouse position
    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(camera);

    // Calculate where the ray intersects the target Z plane
    const dir = vector.sub(camera.position).normalize();
    const distance = (targetZ - camera.position.z) / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));

    return [pos.x, targetZ, pos.z];
  };

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

        // Position where to add the new object
        let position: [number, number, number] = [0, 0.5, 0]; // Default position

        // Try to get the camera from the canvas
        const canvas = document.querySelector("canvas");
        if (canvas && window._DREI_CAMERA) {
          // Use the camera to convert screen to world coordinates
          position = screenToWorld(e, window._DREI_CAMERA, 0.5);
        } else {
          // Fallback to random offset if camera is not available
          const randomOffset = () => (Math.random() - 0.5) * 3;
          position = [randomOffset(), 0.5, randomOffset()];
        }

        // Add the object to the Zustand store
        addObject(data.type);

        // Position will be handled by the store's addObject function
        toast.success(
          `${data.name} ajouté à la position (${position[0].toFixed(
            2
          )}, ${position[1].toFixed(2)}, ${position[2].toFixed(2)})`
        );
      }

      // Get material data
      const materialData = e.dataTransfer.getData("application/material");
      if (materialData && selectedObject) {
        const material = JSON.parse(materialData);
        // Update material in store
        useEditorStore.getState().updateObject(selectedObject, {
          material: {
            color: material.color,
            metalness: material.metalness || 0.1,
            roughness: material.roughness || 0.2,
            opacity: material.opacity || 1.0,
          },
        });
        toast.success(`${material.name} appliqué à ${selectedObject}`);
      }
    } catch (error) {
      console.error("Error handling drop:", error);
      toast.error("Échec du traitement de l'élément déposé");
    }
  };

  // Store camera reference globally for coordinate conversion
  useEffect(() => {
    setMounted(true);
    return () => {
      if (window._DREI_CAMERA) delete window._DREI_CAMERA;
    };
  }, []);

  // Store the camera globally
  const storeCamera = (state: any) => {
    if (state?.camera) {
      window._DREI_CAMERA = state.camera;
    }
  };

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
      <Canvas shadows onCreated={storeCamera}>
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

// Add this to the global Window interface
declare global {
  interface Window {
    _DREI_CAMERA?: THREE.Camera;
  }
}
