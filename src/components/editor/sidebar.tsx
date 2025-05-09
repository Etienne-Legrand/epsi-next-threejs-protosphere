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
  Image as ImageIcon,
  Palette,
  Box,
  Square,
  Torus,
  Type,
  Layers,
  SquaresUnite,
  Combine,
  Scissors,
} from "lucide-react";
import { toast } from "sonner";
import { ObjectType, useEditorStore } from "@/lib/store/editor-store";

export default function EditorSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("shapes");

  // Get addObject from store
  const addObject = useEditorStore((state) => state.addObject);
  const updateObject = useEditorStore((state) => state.updateObject);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);

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
    toast.success(`Glissement de ${shapeName}`);
  };

  // Add shape handler - directly use the store
  const handleAddShape = (shapeType: ObjectType) => {
    addObject(shapeType);
    toast.success(`${shapeType} ajouté à la scène`);
  };

  // Boolean operation handler
  const handleOperation = (operation: string) => {
    setSelectedOperation(operation);
    toast.success(`Opération ${operation} sélectionnée`);
  };

  // Material selection handler
  const handleMaterialSelect = (
    materialName: string,
    color: string,
    properties?: any
  ) => {
    if (selectedObjectId) {
      // Apply material to selected object
      updateObject(selectedObjectId, {
        material: {
          color,
          metalness: properties?.metalness || 0.1,
          roughness: properties?.roughness || 0.2,
          opacity: properties?.opacity || 1.0,
        },
      });
      toast.success(`${materialName} appliqué à l'objet sélectionné`);
    } else {
      toast.info(
        `Sélectionnez un objet pour appliquer le matériau ${materialName}`
      );
    }
  };

  // Material drag start handler
  const handleMaterialDrag = (
    e: React.DragEvent,
    materialName: string,
    color: string,
    properties?: any
  ) => {
    e.dataTransfer.setData(
      "application/material",
      JSON.stringify({
        color,
        name: materialName,
        ...properties,
      })
    );
    e.dataTransfer.effectAllowed = "copy";
    toast.success(`Glissement du matériau ${materialName}`);
  };

  // Render collapsed sidebar
  if (isCollapsed) {
    return (
      <div className="w-14 h-full border-r border-slate-700 bg-slate-900 flex flex-col items-center py-2 text-white">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-slate-700 text-white"
                onClick={() => setIsCollapsed(false)}
              >
                <ChevronsRight className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Développer la barre latérale
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col gap-4 mt-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === "shapes" ? "secondary" : "ghost"}
                  size="icon"
                  className={
                    activeTab === "shapes"
                      ? "bg-slate-600 hover:bg-slate-500"
                      : "hover:bg-slate-700"
                  }
                  onClick={() => {
                    setIsCollapsed(false);
                    setActiveTab("shapes");
                  }}
                >
                  <Box className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Formes</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === "materials" ? "secondary" : "ghost"}
                  size="icon"
                  className={
                    activeTab === "materials"
                      ? "bg-slate-600 hover:bg-slate-500"
                      : "hover:bg-slate-700"
                  }
                  onClick={() => {
                    setIsCollapsed(false);
                    setActiveTab("materials");
                  }}
                >
                  <Palette className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Matériaux</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === "layers" ? "secondary" : "ghost"}
                  size="icon"
                  className={
                    activeTab === "layers"
                      ? "bg-slate-600 hover:bg-slate-500"
                      : "hover:bg-slate-700"
                  }
                  onClick={() => {
                    setIsCollapsed(false);
                    setActiveTab("layers");
                  }}
                >
                  <Layers className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Calques</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    );
  }

  return (
    <div className="w-60 h-full border-r border-slate-700 bg-slate-900 flex flex-col text-white">
      <div className="flex justify-between items-center p-2 border-b border-slate-700">
        <h3 className="font-medium text-sm">Outils</h3>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-slate-700 text-white"
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
        <TabsList className="w-full justify-start p-1 h-9 bg-slate-700 m-2">
          <TabsTrigger
            value="shapes"
            className="h-7 text-xs data-[state=active]:bg-slate-600"
          >
            <Box className="h-4 w-4 mr-1" /> Formes
          </TabsTrigger>
          <TabsTrigger
            value="materials"
            className="h-7 text-xs data-[state=active]:bg-slate-600"
          >
            <Palette className="h-4 w-4 mr-1" /> Matériaux
          </TabsTrigger>
          <TabsTrigger
            value="layers"
            className="h-7 text-xs data-[state=active]:bg-slate-600"
          >
            <Layers className="h-4 w-4 mr-1" /> Calques
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shapes" className="p-2 h-full flex flex-col">
          <div className="grid grid-cols-2 gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                    onClick={() => handleAddShape("cube")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Cube", "cube")}
                  >
                    <Box className="h-5 w-5" />
                    <span className="text-xs">Cube</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Ajouter un Cube (C) ou glisser sur la scène
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                    onClick={() => handleAddShape("sphere")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Sphere", "sphere")}
                  >
                    <Circle className="h-5 w-5" />
                    <span className="text-xs">Sphère</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Ajouter une Sphère (S) ou glisser sur la scène
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                    onClick={() => handleAddShape("cylinder")}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, "Cylinder", "cylinder")
                    }
                  >
                    <Cylinder className="h-5 w-5" />
                    <span className="text-xs">Cylindre</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Ajouter un Cylindre (Y) ou glisser sur la scène
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                    onClick={() => handleAddShape("pyramid")}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, "Pyramid", "pyramid")
                    }
                  >
                    <Pyramid className="h-5 w-5" />
                    <span className="text-xs">Pyramide</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Ajouter une Pyramide (P) ou glisser sur la scène
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                    onClick={() => handleAddShape("cone")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Cone", "cone")}
                  >
                    <Triangle className="h-5 w-5" />
                    <span className="text-xs">Cône</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Ajouter un Cône (O) ou glisser sur la scène
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                    onClick={() => handleAddShape("torus")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Torus", "torus")}
                  >
                    <Torus className="h-5 w-5" />
                    <span className="text-xs">Tore</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Ajouter un Tore (T) ou glisser sur la scène
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                    onClick={() => handleAddShape("plane")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Plane", "plane")}
                  >
                    <Square className="h-5 w-5" />
                    <span className="text-xs">Plan</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Ajouter un Plan (L) ou glisser sur la scène
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-14 w-full flex flex-col justify-center items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                    onClick={() => handleAddShape("text")}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Text", "text")}
                  >
                    <Type className="h-5 w-5" />
                    <span className="text-xs">Texte</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Ajouter un Texte 3D (X) ou glisser sur la scène
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* <div className="mt-4">
            <h4 className="text-xs font-medium mb-2">Opérations booléennes</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={
                  selectedOperation === "Union" ? "secondary" : "outline"
                }
                className={`h-9 text-xs flex items-center justify-center ${
                  selectedOperation === "Union"
                    ? "bg-slate-600 hover:bg-slate-500"
                    : "bg-slate-700 hover:bg-slate-600 border-slate-600"
                }`}
                onClick={() => handleOperation("Union")}
              >
                <SquaresUnite className="h-3 w-3 mr-1" />
                Union
              </Button>
              <Button
                variant={
                  selectedOperation === "Subtract" ? "secondary" : "outline"
                }
                className={`h-9 text-xs flex items-center justify-center ${
                  selectedOperation === "Subtract"
                    ? "bg-slate-600 hover:bg-slate-500"
                    : "bg-slate-700 hover:bg-slate-600 border-slate-600"
                }`}
                onClick={() => handleOperation("Subtract")}
              >
                <Scissors className="h-3 w-3 mr-1" />
                Soustraire
              </Button>
              <Button
                variant={
                  selectedOperation === "Intersect" ? "secondary" : "outline"
                }
                className={`h-9 text-xs flex items-center justify-center ${
                  selectedOperation === "Intersect"
                    ? "bg-slate-600 hover:bg-slate-500"
                    : "bg-slate-700 hover:bg-slate-600 border-slate-600"
                }`}
                onClick={() => handleOperation("Intersect")}
              >
                <Combine className="h-3 w-3 mr-1" />
                Intersection
              </Button>
              <Button
                variant={
                  selectedOperation === "Difference" ? "secondary" : "outline"
                }
                className={`h-9 text-xs flex items-center justify-center ${
                  selectedOperation === "Difference"
                    ? "bg-slate-600 hover:bg-slate-500"
                    : "bg-slate-700 hover:bg-slate-600 border-slate-600"
                }`}
                onClick={() => handleOperation("Difference")}
              >
                <div className="h-3 w-3 mr-1">⊖</div>
                Différence
              </Button>
            </div>

            {selectedOperation && (
              <div className="mt-2 p-2 bg-slate-700/50 rounded-md text-xs">
                <p className="text-muted-foreground">
                  <strong>Mode {selectedOperation} actif.</strong>
                  <br />
                  1. Sélectionnez le premier objet
                  <br />
                  2. Sélectionnez le second objet
                  <br />
                  3. Cliquez sur "Appliquer" pour effectuer l'opération
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full text-xs bg-slate-600 hover:bg-slate-500"
                    onClick={() => {
                      toast.success(`Opération ${selectedOperation} appliquée`);
                      setSelectedOperation(null);
                    }}
                  >
                    Appliquer
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-1/2 text-xs bg-slate-700 border-slate-600 hover:bg-slate-600"
                    onClick={() => {
                      toast.error(`Opération ${selectedOperation} annulée`);
                      setSelectedOperation(null);
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </div> */}
        </TabsContent>

        <TabsContent value="materials" className="p-2">
          <h4 className="text-xs font-medium mb-2">Matériaux</h4>
          <div className="grid grid-cols-2 gap-2">
            <div
              className="rounded-md h-14 bg-blue-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Blue", "#3b82f6")}
              draggable
              onDragStart={(e) =>
                handleMaterialDrag(e, "Matériau bleu", "#3b82f6")
              }
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Bleu</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-red-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Red", "#ef4444")}
              draggable
              onDragStart={(e) =>
                handleMaterialDrag(e, "Matériau rouge", "#ef4444")
              }
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Rouge</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-green-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Green", "#22c55e")}
              draggable
              onDragStart={(e) =>
                handleMaterialDrag(e, "Matériau vert", "#22c55e")
              }
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Vert</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-yellow-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Yellow", "#eab308")}
              draggable
              onDragStart={(e) =>
                handleMaterialDrag(e, "Matériau jaune", "#eab308")
              }
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Jaune</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-purple-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Purple", "#a855f7")}
              draggable
              onDragStart={(e) =>
                handleMaterialDrag(e, "Matériau violet", "#a855f7")
              }
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Violet</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-gradient-to-r from-gray-300 to-gray-100 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Metal", "metal")}
              draggable
              onDragStart={(e) =>
                handleMaterialDrag(e, "Matériau métal", "metal", {
                  metalness: 0.8,
                  roughness: 0.2,
                })
              }
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Métal</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-gradient-to-r from-blue-300 to-blue-100 opacity-70 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Glass", "glass")}
              draggable
              onDragStart={(e) =>
                handleMaterialDrag(e, "Matériau verre", "glass", {
                  opacity: 0.7,
                  transparent: true,
                })
              }
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Verre</span>
              </div>
            </div>
            <div
              className="rounded-md h-14 bg-gradient-to-r from-amber-700 to-amber-500 cursor-pointer relative group"
              onClick={() => handleMaterialSelect("Wood", "wood")}
              draggable
              onDragStart={(e) =>
                handleMaterialDrag(e, "Matériau bois", "wood", {
                  roughness: 0.8,
                })
              }
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Bois</span>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-secondary/30 rounded-md text-xs">
            <p className="text-muted-foreground">
              <strong>Astuce :</strong> Glissez un matériau sur un objet dans la
              scène pour l'appliquer, ou cliquez pour le sélectionner pour les
              nouveaux objets.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="layers" className="p-2">
          <h4 className="text-xs font-medium mb-2">Calques</h4>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-between h-8 px-2 hover:bg-slate-700"
              onClick={() => handleLayerSelect("Layer 1")}
            >
              <div className="flex items-center">
                <Layers className="h-4 w-4 mr-2" />
                <span className="text-xs">Calque 1</span>
              </div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-between h-8 px-2 hover:bg-slate-700"
              onClick={() => handleLayerSelect("Layer 2")}
            >
              <div className="flex items-center">
                <Layers className="h-4 w-4 mr-2" />
                <span className="text-xs">Calque 2</span>
              </div>
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            </Button>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center h-8 text-xs bg-slate-700 border-slate-600 hover:bg-slate-600"
                onClick={() => {
                  const newLayerName = `Calque ${Math.floor(
                    Math.random() * 1000
                  )}`;
                  toast.success(`Nouveau calque créé : ${newLayerName}`);
                }}
              >
                <span className="mr-1">+</span> Ajouter un calque
              </Button>
            </div>
          </div>

          <div className="mt-3 p-2 bg-slate-700/50 rounded-md text-xs">
            <p className="text-muted-foreground">
              <strong>Gestionnaire de calques</strong>
              <br />
              Organisez votre scène 3D avec des calques. Cliquez sur un calque
              pour l'activer. Les objets créés ou déplacés seront ajoutés au
              calque actif.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
