"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronsLeft,
  ChevronsRight,
  Cylinder,
  Circle,
  Triangle,
  Pyramid,
  Hexagon,
  Image as ImageIcon,
  Palette,
  Grid3X3,
  Box,
  Layers,
  SquaresUnite,
  Combine,
  Scissors,
} from "lucide-react";
import { toast } from "sonner";
import { ObjectType } from "@/lib/store/editor-store";

export default function EditorSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("shapes");

  // Drag start handler
  const handleDragStart = (
    e: React.DragEvent,
    shapeName: string,
    shapeType: ObjectType
  ) => {
    e.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        type: shapeType,
        name: shapeName,
      })
    );
    e.dataTransfer.effectAllowed = "move";
    toast.success(`Dragging ${shapeName}`);
  };

  // Add shape handler
  const handleAddShape = (shapeName: string) => {
    toast.success(`Added ${shapeName} to scene`);
    // Logic to add shape to scene would be here
  };

  // Boolean operation handler
  const handleOperation = (operation: string) => {
    setSelectedOperation(operation);
    toast.success(`${operation} operation selected`);

    // In a real app, this would change the mode of the 3D editor
    // to prepare for a Boolean operation between two selected objects
  };

  // Material selection handler
  const handleMaterialSelect = (materialName: string, color: string) => {
    toast.success(`${materialName} material selected`);
    // In a real app, this would apply the material to the selected object
    // or set it as the default material for new objects
  };

  // Layer selection handler
  const handleLayerSelect = (layerName: string) => {
    toast.success(`${layerName} selected`);
    // In a real app, this would change the active layer
  };

  // Render collapsed sidebar
  if (isCollapsed) {
    return (
      <div className="w-14 h-full border-r border-border bg-card/50 flex flex-col items-center py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(false)}
              >
                <ChevronsRight className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Expand Sidebar</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col gap-4 mt-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === "shapes" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => {
                    setIsCollapsed(false);
                    setActiveTab("shapes");
                  }}
                >
                  <Box className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Shapes</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === "materials" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => {
                    setIsCollapsed(false);
                    setActiveTab("materials");
                  }}
                >
                  <Palette className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Materials</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === "layers" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => {
                    setIsCollapsed(false);
                    setActiveTab("layers");
                  }}
                >
                  <Layers className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Layers</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    );
  }

  return (
    <div className="w-60 h-full border-r border-border bg-card/50 flex flex-col">
      <div className="flex justify-between items-center p-2 border-b border-border">
        <h3 className="font-medium text-sm">Tools</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(true)}
        >
          <ChevronsLeft className="h-5 w-5" />
        </Button>
      </div>

      <Tabs
        defaultValue="shapes"
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1"
      >
        <TabsList className="w-full justify-start p-1 h-9">
          <TabsTrigger value="shapes" className="h-7 text-xs">
            <Box className="h-4 w-4 mr-1" /> Shapes
          </TabsTrigger>
          <TabsTrigger value="materials" className="h-7 text-xs">
            <Palette className="h-4 w-4 mr-1" /> Materials
          </TabsTrigger>
          <TabsTrigger value="layers" className="h-7 text-xs">
            <Layers className="h-4 w-4 mr-1" /> Layers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shapes" className="p-2 h-full flex flex-col">
          <div className="grid grid-cols-2 gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1"
                    onClick={() => handleAddShape("Cube")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Cube", "cube")}
                  >
                    <Box className="h-5 w-5" />
                    <span className="text-xs">Cube</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add a Cube (C) or drag to scene</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1"
                    onClick={() => handleAddShape("Sphere")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Sphere", "sphere")}
                  >
                    <Circle className="h-5 w-5" />
                    <span className="text-xs">Sphere</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Add a Sphere (S) or drag to scene
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1"
                    onClick={() => handleAddShape("Cylinder")}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, "Cylinder", "cylinder")
                    }
                  >
                    <Cylinder className="h-5 w-5" />
                    <span className="text-xs">Cylinder</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Add a Cylinder (Y) or drag to scene
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1"
                    onClick={() => handleAddShape("Pyramid")}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, "Pyramid", "pyramid")
                    }
                  >
                    <Pyramid className="h-5 w-5" />
                    <span className="text-xs">Pyramid</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Add a Pyramid (P) or drag to scene
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1"
                    onClick={() => handleAddShape("Cone")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Cone", "cone")}
                  >
                    <Triangle className="h-5 w-5" />
                    <span className="text-xs">Cone</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add a Cone (O) or drag to scene</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1"
                    onClick={() => handleAddShape("Torus")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Torus", "torus")}
                  >
                    <Hexagon className="h-5 w-5" />
                    <span className="text-xs">Torus</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Add a Torus (T) or drag to scene
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1"
                    onClick={() => handleAddShape("Plane")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Plane", "plane")}
                  >
                    <Grid3X3 className="h-5 w-5" />
                    <span className="text-xs">Plane</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Add a Plane (L) or drag to scene
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1"
                    onClick={() => handleAddShape("Text")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Text", "text")}
                  >
                    <Box className="h-5 w-5" />
                    <span className="text-xs">Text</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Add 3D Text (X) or drag to scene
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="mt-4">
            <h4 className="text-xs font-medium mb-2">Boolean Operations</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={
                  selectedOperation === "Union" ? "secondary" : "outline"
                }
                className="h-9 text-xs flex items-center justify-center"
                onClick={() => handleOperation("Union")}
              >
                <SquaresUnite className="h-3 w-3 mr-1" />
                Union
              </Button>
              <Button
                variant={
                  selectedOperation === "Subtract" ? "secondary" : "outline"
                }
                className="h-9 text-xs flex items-center justify-center"
                onClick={() => handleOperation("Subtract")}
              >
                <Scissors className="h-3 w-3 mr-1" />
                Subtract
              </Button>
              <Button
                variant={
                  selectedOperation === "Intersect" ? "secondary" : "outline"
                }
                className="h-9 text-xs flex items-center justify-center"
                onClick={() => handleOperation("Intersect")}
              >
                <Combine className="h-3 w-3 mr-1" />
                Intersect
              </Button>
              <Button
                variant={
                  selectedOperation === "Difference" ? "secondary" : "outline"
                }
                className="h-9 text-xs flex items-center justify-center"
                onClick={() => handleOperation("Difference")}
              >
                <div className="h-3 w-3 mr-1">⊖</div>
                Difference
              </Button>
            </div>

            {selectedOperation && (
              <div className="mt-2 p-2 bg-secondary/30 rounded-md text-xs">
                <p className="text-muted-foreground">
                  <strong>{selectedOperation} mode active.</strong>
                  <br />
                  1. Select the first object
                  <br />
                  2. Select the second object
                  <br />
                  3. Click "Apply" to perform the operation
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full text-xs"
                    onClick={() => {
                      toast.success(`Applied ${selectedOperation} operation`);
                      setSelectedOperation(null);
                    }}
                  >
                    Apply
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-1/2 text-xs"
                    onClick={() => {
                      toast.error(`Cancelled ${selectedOperation} operation`);
                      setSelectedOperation(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="p-2">
          <h4 className="text-xs font-medium mb-2">Materials</h4>
          <div className="grid grid-cols-2 gap-2">
            <div
              className="rounded-md h-14 bg-blue-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Blue", "#3b82f6")}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/material",
                  JSON.stringify({
                    color: "#3b82f6",
                    name: "Blue Material",
                  })
                );
                toast.success("Dragging Blue material");
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Blue</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-red-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Red", "#ef4444")}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/material",
                  JSON.stringify({
                    color: "#ef4444",
                    name: "Red Material",
                  })
                );
                toast.success("Dragging Red material");
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Red</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-green-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Green", "#22c55e")}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/material",
                  JSON.stringify({
                    color: "#22c55e",
                    name: "Green Material",
                  })
                );
                toast.success("Dragging Green material");
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Green</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-yellow-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Yellow", "#eab308")}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/material",
                  JSON.stringify({
                    color: "#eab308",
                    name: "Yellow Material",
                  })
                );
                toast.success("Dragging Yellow material");
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Yellow</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-purple-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Purple", "#a855f7")}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/material",
                  JSON.stringify({
                    color: "#a855f7",
                    name: "Purple Material",
                  })
                );
                toast.success("Dragging Purple material");
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Purple</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-gradient-to-r from-gray-300 to-gray-100 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Metal", "metal")}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/material",
                  JSON.stringify({
                    color: "metal",
                    name: "Metal Material",
                    metalness: 0.8,
                    roughness: 0.2,
                  })
                );
                toast.success("Dragging Metal material");
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Metal</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-gradient-to-r from-blue-300 to-blue-100 opacity-70 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Glass", "glass")}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/material",
                  JSON.stringify({
                    color: "glass",
                    name: "Glass Material",
                    opacity: 0.7,
                    transparent: true,
                  })
                );
                toast.success("Dragging Glass material");
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Glass</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-gradient-to-r from-amber-700 to-amber-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Wood", "wood")}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/material",
                  JSON.stringify({
                    color: "wood",
                    name: "Wood Material",
                    roughness: 0.8,
                  })
                );
                toast.success("Dragging Wood material");
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Wood</span>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-secondary/30 rounded-md text-xs">
            <p className="text-muted-foreground">
              <strong>Tip:</strong> Drag a material onto an object in the scene
              to apply it, or click to select it for new objects.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="layers" className="p-2">
          <h4 className="text-xs font-medium mb-2">Layers</h4>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-between h-8 px-2 hover:bg-secondary/50"
              onClick={() => handleLayerSelect("Layer 1")}
            >
              <div className="flex items-center">
                <Layers className="h-4 w-4 mr-2" />
                <span className="text-xs">Layer 1</span>
              </div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-between h-8 px-2 hover:bg-secondary/50"
              onClick={() => handleLayerSelect("Layer 2")}
            >
              <div className="flex items-center">
                <Layers className="h-4 w-4 mr-2" />
                <span className="text-xs">Layer 2</span>
              </div>
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            </Button>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center h-8 text-xs"
                onClick={() => {
                  const newLayerName = `Layer ${Math.floor(
                    Math.random() * 1000
                  )}`;
                  toast.success(`Created new layer: ${newLayerName}`);
                }}
              >
                <span className="mr-1">+</span> Add Layer
              </Button>
            </div>
          </div>

          <div className="mt-3 p-2 bg-secondary/30 rounded-md text-xs">
            <p className="text-muted-foreground">
              <strong>Layer Manager</strong>
              <br />
              Organize your 3D scene with layers. Click a layer to make it
              active. Objects created or moved will be added to the active
              layer.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
