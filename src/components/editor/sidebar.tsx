"use client";

import { useState, useEffect } from "react";
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
  Eye,
  EyeOff,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Paintbrush,
  SlidersHorizontal,
  PlusCircle,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { ObjectType, useEditorStore } from "@/lib/store/editor-store";
import { Input } from "@/components/ui/input";

export default function EditorSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("shapes");
  const [activeLayer, setActiveLayer] = useState("layer-1");
  const [layers, setLayers] = useState([
    { id: "layer-1", name: "Calque 1", visible: true, color: "bg-green-500" },
    { id: "layer-2", name: "Calque 2", visible: true, color: "bg-blue-500" },
  ]);
  const [customColor, setCustomColor] = useState("#6366f1");
  const [customMetalness, setCustomMetalness] = useState(0.2);
  const [customRoughness, setCustomRoughness] = useState(0.5);
  const [customOpacity, setCustomOpacity] = useState(1.0);
  const [selectedLayerObjects, setSelectedLayerObjects] = useState<
    Array<{ id: string; name: string }>
  >([]);

  // Get addObject from store
  const addObject = useEditorStore((state) => state.addObject);
  const updateObject = useEditorStore((state) => state.updateObject);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
  const objects = useEditorStore((state) => state.scene.objects);

  // Layer handling function
  const handleLayerSelect = (layerId: string) => {
    setActiveLayer(layerId);

    // Récupérer les objets qui appartiennent à ce calque
    const objectsInLayer = objects
      .filter((obj) => obj.layerId === layerId)
      .map((obj) => ({
        id: obj.id,
        name: obj.name || `${obj.type} sans nom`,
      }));

    setSelectedLayerObjects(objectsInLayer);
    // toast.info(`Calque ${layerId} sélectionné`);
  };

  // Fonction modifiée pour changer la visibilité du calque ET des objets qui lui appartiennent
  const toggleLayerVisibility = (layerId: string) => {
    // Trouver le calque et déterminer sa nouvelle visibilité
    const layer = layers.find((l) => l.id === layerId);
    const newVisibility = layer ? !layer.visible : false;

    // Mettre à jour l'état local des calques
    setLayers(
      layers.map((layer) =>
        layer.id === layerId ? { ...layer, visible: newVisibility } : layer
      )
    );

    // Mettre à jour la visibilité de tous les objets qui appartiennent à ce calque
    const objectsInLayer = objects.filter((obj) => obj.layerId === layerId);
    objectsInLayer.forEach((obj) => {
      updateObject(obj.id, { visible: newVisibility });
    });

    // toast.info(
    //   `Visibilité du calque ${newVisibility ? "activée" : "désactivée"}`
    // );
  };

  const deleteLayer = (layerId: string) => {
    if (layers.length <= 1) {
      toast.error("Impossible de supprimer le dernier calque");
      return;
    }

    // Trouver le calque à supprimer
    const layerToDelete = layers.find((layer) => layer.id === layerId);

    // Si le calque est masqué, rendre visibles tous les objets de ce calque
    if (layerToDelete && layerToDelete.visible === false) {
      const objectsInLayer = objects.filter((obj) => obj.layerId === layerId);
      objectsInLayer.forEach((obj) => {
        updateObject(obj.id, { visible: true });
        alert(
          `Objet ${obj.name} rendu visible car le calque ${layerToDelete.name} a été supprimé`
        );
      });
    }

    setLayers(layers.filter((layer) => layer.id !== layerId));

    // Si on supprime le calque actif, on sélectionne le premier calque restant
    if (activeLayer === layerId) {
      const remainingLayers = layers.filter((layer) => layer.id !== layerId);
      if (remainingLayers.length > 0) {
        setActiveLayer(remainingLayers[0].id);
      }
    }

    // toast.success(`Calque supprimé`);
  };

  const addNewLayer = () => {
    const newLayerId = `layer-${Date.now()}`;
    const newLayer = {
      id: newLayerId,
      name: `Calque ${layers.length + 1}`,
      visible: true,
      color: `bg-${
        ["red", "green", "blue", "yellow", "purple"][
          Math.floor(Math.random() * 5)
        ]
      }-500`,
    };
    setLayers([...layers, newLayer]);
    setActiveLayer(newLayerId);
    // toast.success(`Nouveau calque créé`);
  };

  const moveLayer = (layerId: string, direction: "up" | "down") => {
    const index = layers.findIndex((layer) => layer.id === layerId);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === layers.length - 1)
    ) {
      return;
    }

    const newLayers = [...layers];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newLayers[index];
    newLayers[index] = newLayers[newIndex];
    newLayers[newIndex] = temp;

    setLayers(newLayers);
  };

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
    // toast.success(`Glissement de ${shapeName}`);
  };

  // Add shape handler - directly use the store
  const handleAddShape = (shapeType: ObjectType) => {
    addObject(shapeType);
    // toast.success(`${shapeType} ajouté à la scène`);
  };

  // Boolean operation handler
  const handleOperation = (operation: string) => {
    setSelectedOperation(operation);
    // toast.success(`Opération ${operation} sélectionnée`);
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
      // toast.success(`${materialName} appliqué à l'objet sélectionné`);
    } else {
      // toast.info(
      //   `Sélectionnez un objet pour appliquer le matériau ${materialName}`
      // );
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
    // toast.success(`Glissement du matériau ${materialName}`);
  };

  // Create custom material
  const handleCreateCustomMaterial = () => {
    if (selectedObjectId) {
      updateObject(selectedObjectId, {
        material: {
          color: customColor,
          metalness: customMetalness,
          roughness: customRoughness,
          opacity: customOpacity,
        },
      });
      // toast.success("Matériau personnalisé appliqué");
    } else {
      // toast.info(
      //   "Sélectionnez un objet pour appliquer le matériau personnalisé"
      // );
    }
  };

  // Fonction modifiée pour assigner un objet à un calque et appliquer sa visibilité
  const assignObjectToLayer = (objectId: string, layerId: string) => {
    if (objectId) {
      // Trouver le calque pour obtenir son état de visibilité
      const layer = layers.find((l) => l.id === layerId);
      const layerVisibility = layer ? layer.visible : true;

      // Mettre à jour l'objet avec le layerId ET sa visibilité
      updateObject(objectId, {
        layerId,
        visible: layerVisibility, // Hérite de la visibilité du calque
      });

      // Mettre à jour la liste des objets dans ce calque
      const updatedObjects = [...selectedLayerObjects];
      const objectToAdd = objects.find((obj) => obj.id === objectId);

      if (
        objectToAdd &&
        !selectedLayerObjects.some((obj) => obj.id === objectId)
      ) {
        updatedObjects.push({
          id: objectId,
          name: objectToAdd.name || `${objectToAdd.type} sans nom`,
        });
        setSelectedLayerObjects(updatedObjects);
      }

      // toast.success(`Objet ajouté au calque ${layerId}`);
    }
  };

  // Fonction pour retirer un objet d'un calque (modifiée pour réinitialiser sa visibilité)
  const removeObjectFromLayer = (objectId: string) => {
    if (objectId) {
      // Quand on retire un objet d'un calque, on le rend toujours visible
      updateObject(objectId, {
        layerId: undefined,
        visible: true, // Objet visible par défaut quand il n'appartient pas à un calque
      });

      // Retirer l'objet de la liste
      const updatedObjects = selectedLayerObjects.filter(
        (obj) => obj.id !== objectId
      );
      setSelectedLayerObjects(updatedObjects);

      // toast.info(`Objet retiré du calque`);
    }
  };

  // Mettre à jour la liste des objets quand les objets changent
  useEffect(() => {
    if (activeLayer) {
      // Mettre à jour la liste des objets dans le calque actif
      const objectsInLayer = objects
        .filter((obj) => obj.layerId === activeLayer)
        .map((obj) => ({
          id: obj.id,
          name: obj.name || `${obj.type} sans nom`,
        }));

      setSelectedLayerObjects(objectsInLayer);
    }
  }, [objects, activeLayer]);

  // Ajouter un useEffect pour synchroniser la visibilité des objets quand les calques changent
  useEffect(() => {
    // Pour chaque calque
    layers.forEach((layer) => {
      // Trouver tous les objets de ce calque et mettre à jour leur visibilité
      const objectsInLayer = objects.filter((obj) => obj.layerId === layer.id);
      objectsInLayer.forEach((obj) => {
        // Si la visibilité de l'objet ne correspond pas à celle du calque, la mettre à jour
        if (obj.visible !== layer.visible) {
          updateObject(obj.id, { visible: layer.visible });
        }
      });
    });
  }, [layers, objects]);

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
    <div className="w-72 h-full border-r border-slate-700 bg-slate-900 flex flex-col text-white">
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
        <div className="m-2">
          <TabsList className="w-full justify-between p-1 h-9 bg-slate-700">
            <TabsTrigger
              value="shapes"
              className="h-7 text-xs data-[state=active]:bg-slate-600 px-2"
            >
              <Box className="h-4 w-4 mr-1" /> Formes
            </TabsTrigger>
            <TabsTrigger
              value="materials"
              className="h-7 text-xs data-[state=active]:bg-slate-600 px-2"
            >
              <Palette className="h-4 w-4 mr-1" /> Matériaux
            </TabsTrigger>
            <TabsTrigger
              value="layers"
              className="h-7 text-xs data-[state=active]:bg-slate-600 px-2"
            >
              <Layers className="h-4 w-4 mr-1" /> Calques
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Simplifier la structure et supprimer le conteneur flex supplémentaire */}
        <TabsContent
          value="shapes"
          className="p-2 overflow-y-auto h-[calc(100%-60px)]"
        >
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
        </TabsContent>

        <TabsContent
          value="materials"
          className="p-2 overflow-y-auto h-[calc(100%-60px)]"
        >
          <h4 className="text-xs font-medium mb-2">Matériaux prédéfinis</h4>
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
              onClick={() =>
                handleMaterialSelect("Metal", "#c0c0c0", {
                  metalness: 0.8,
                  roughness: 0.2,
                })
              }
              draggable
              onDragStart={(e) =>
                handleMaterialDrag(e, "Matériau métal", "#c0c0c0", {
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
              onClick={() =>
                handleMaterialSelect("Glass", "#a5d8ff", {
                  opacity: 0.7,
                  transparent: true,
                })
              }
              draggable
              onDragStart={(e) =>
                handleMaterialDrag(e, "Matériau verre", "#a5d8ff", {
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
              onClick={() =>
                handleMaterialSelect("Wood", "#92400e", {
                  roughness: 0.8,
                })
              }
              draggable
              onDragStart={(e) =>
                handleMaterialDrag(e, "Matériau bois", "#92400e", {
                  roughness: 0.8,
                })
              }
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <span className="text-white text-xs font-medium">Bois</span>
              </div>
            </div>
          </div>

          <h4 className="text-xs font-medium mt-4 mb-2">
            Matériau personnalisé
          </h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <label className="text-xs">Couleur</label>
              <Input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="h-8 p-1 w-16 bg-slate-700 border-slate-600"
              />
              <Input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="h-8 flex-1 bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4" />
              <label className="text-xs">Métallique</label>
              <Input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={customMetalness}
                onChange={(e) => setCustomMetalness(parseFloat(e.target.value))}
                className="flex-1 h-8 bg-slate-700 border-slate-600"
              />
              <span className="text-xs w-8">{customMetalness.toFixed(1)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4" />
              <label className="text-xs">Rugosité</label>
              <Input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={customRoughness}
                onChange={(e) => setCustomRoughness(parseFloat(e.target.value))}
                className="flex-1 h-8 bg-slate-700 border-slate-600"
              />
              <span className="text-xs w-8">{customRoughness.toFixed(1)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4" />
              <label className="text-xs">Opacité</label>
              <Input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={customOpacity}
                onChange={(e) => setCustomOpacity(parseFloat(e.target.value))}
                className="flex-1 h-8 bg-slate-700 border-slate-600"
              />
              <span className="text-xs w-8">{customOpacity.toFixed(1)}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2 bg-slate-700 border-slate-600 hover:bg-slate-600"
              onClick={handleCreateCustomMaterial}
            >
              <Paintbrush className="h-4 w-4 mr-2" />
              Appliquer le matériau
            </Button>
          </div>

          <div className="mt-3 p-2 bg-slate-700/50 rounded-md text-xs">
            <p className="text-muted-foreground">
              <strong>Astuce :</strong> Glissez un matériau sur un objet dans la
              scène pour l'appliquer, ou cliquez pour le sélectionner pour les
              nouveaux objets.
            </p>
          </div>
        </TabsContent>

        <TabsContent
          value="layers"
          className="p-2 overflow-y-auto h-[calc(100%-60px)]"
        >
          <h4 className="text-xs font-medium mb-2 flex justify-between items-center">
            <span>Calques ({layers.length})</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-slate-700"
              onClick={addNewLayer}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </h4>

          <div className="space-y-1 overflow-y-auto">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`flex flex-col rounded-md mb-2 ${
                  activeLayer === layer.id
                    ? "bg-slate-700 border border-slate-500"
                    : "hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-6 w-6 hover:bg-slate-700 ${
                        !layer.visible ? "text-slate-400" : ""
                      }`}
                      onClick={() => toggleLayerVisibility(layer.id)}
                    >
                      {layer.visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>

                    <div className={`h-3 w-3 rounded-full ${layer.color}`} />

                    <span
                      className={`text-xs cursor-pointer flex-1 font-medium ${
                        !layer.visible ? "text-slate-400" : ""
                      }`}
                      onClick={() => handleLayerSelect(layer.id)}
                    >
                      {layer.name} {!layer.visible && "(masqué)"}
                    </span>
                  </div>

                  <div className="flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-slate-700"
                      onClick={() => moveLayer(layer.id, "up")}
                    >
                      <MoveUp className="h-3 w-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-slate-700"
                      onClick={() => moveLayer(layer.id, "down")}
                    >
                      <MoveDown className="h-3 w-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-red-700"
                      onClick={() => deleteLayer(layer.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Section pour montrer les objets dans ce calque si c'est le calque actif */}
                {activeLayer === layer.id && (
                  <div className="px-2 py-1 text-xs bg-slate-800/50">
                    {selectedObjectId && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          assignObjectToLayer(selectedObjectId, layer.id)
                        }
                        className="w-full mt-1 mb-2 text-xs bg-slate-600 border-slate-600 hover:bg-slate-500"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Ajouter l'objet sélectionné
                      </Button>
                    )}

                    {!selectedObjectId && (
                      <div className="text-slate-400 text-center py-1 mb-1">
                        Sélectionnez un objet pour l'ajouter à ce calque
                      </div>
                    )}

                    {/* Liste des objets dans ce calque */}
                    <div className="pl-2 pr-1 py-1">
                      <div className="font-medium text-slate-300 mb-1">
                        Objets dans ce calque:
                      </div>

                      {selectedLayerObjects.length === 0 ? (
                        <div className="text-slate-400 italic text-center py-1">
                          Aucun objet dans ce calque
                        </div>
                      ) : (
                        <ul className="space-y-1">
                          {selectedLayerObjects.map((obj) => (
                            <li
                              key={obj.id}
                              className="flex justify-between items-center bg-slate-800 rounded px-2 py-1"
                            >
                              <span className="truncate text-slate-300 text-[10px]">
                                {obj.name}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 hover:bg-red-900/60"
                                onClick={() => removeObjectFromLayer(obj.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {layers.length === 0 && (
              <div className="text-center p-4 text-xs text-slate-400">
                Aucun calque disponible
              </div>
            )}
          </div>

          <div className="mt-3 p-2 bg-slate-700/50 rounded-md text-xs">
            <p className="text-muted-foreground">
              <strong>Comment utiliser les calques</strong>
              <br />
              1. Sélectionnez un calque en cliquant sur son nom
              <br />
              2. Sélectionnez un objet dans la scène 3D
              <br />
              3. Cliquez sur "Ajouter l'objet sélectionné" pour l'assigner au
              calque
              <br />
              4. Les objets dans le calque sont listés et peuvent être retirés
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
