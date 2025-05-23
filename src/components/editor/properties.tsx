"use client";

import { useState, useEffect } from "react";
import {
  X,
  Trash2,
  Copy,
  Box,
  Cylinder,
  Torus,
  Circle,
  Pyramid,
  Cone,
  Type,
  Square,
  SlidersHorizontal,
  Palette,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useEditorStore } from "@/lib/store/editor-store";

interface EditorPropertiesProps {
  selectedObject: string;
  onClose: () => void;
}

export default function EditorProperties({
  selectedObject,
  onClose,
}: Readonly<EditorPropertiesProps>) {
  // Get the object data from the store
  const object = useEditorStore((state) =>
    state.scene.objects.find((obj) => obj.id === selectedObject)
  );

  const updateObject = useEditorStore((state) => state.updateObject);
  const deleteObject = useEditorStore((state) => state.deleteObject);
  const duplicateObject = useEditorStore((state) => state.duplicateObject);

  // State for form values
  const [position, setPosition] = useState(
    object?.position || { x: 0, y: 0, z: 0 }
  );
  const [rotation, setRotation] = useState(
    object?.rotation || { x: 0, y: 0, z: 0 }
  );
  const [scale, setScale] = useState(object?.scale || { x: 1, y: 1, z: 1 });
  const [material, setMaterial] = useState(
    object?.material || {
      color: "#ffffff",
      metalness: 0.1,
      roughness: 0.2,
      opacity: 1.0,
    }
  );
  const [name, setName] = useState(object?.name || "");

  // State local pour le color picker
  const [colorInput, setColorInput] = useState(material.color);

  // Synchroniser le colorInput quand la couleur du matériau change
  useEffect(() => {
    setColorInput(material.color);
  }, [material.color]);

  // Update local state when selected object changes
  useEffect(() => {
    if (object) {
      setPosition(object.position);
      setRotation(object.rotation);
      setScale(object.scale);
      setMaterial(object.material);
      setName(object.name);
    }
  }, [object, selectedObject]);

  // If no object is found, show an error
  if (!object) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p>Objet non trouvé</p>
        <Button onClick={onClose}>Fermer</Button>
      </div>
    );
  }

  // Handle changes to the properties
  const handlePositionChange = (axis: keyof typeof position, value: number) => {
    const newPosition = { ...position, [axis]: value };
    setPosition(newPosition);
    updateObject(selectedObject, { position: newPosition });
    // toast.success(`Position ${axis} mise à jour à ${value}`);
  };

  const handleRotationChange = (axis: keyof typeof rotation, value: number) => {
    const newRotation = { ...rotation, [axis]: value };
    setRotation(newRotation);
    updateObject(selectedObject, { rotation: newRotation });
    // toast.success(`Rotation ${axis} mise à jour à ${value}`);
  };

  const handleScaleChange = (axis: keyof typeof scale, value: number) => {
    const newScale = { ...scale, [axis]: value };
    setScale(newScale);
    updateObject(selectedObject, { scale: newScale });
    // toast.success(`Échelle ${axis} mise à jour à ${value}`);
  };

  const handleMaterialChange = (
    property: keyof typeof material,
    value: any
  ) => {
    const newMaterial = { ...material, [property]: value };
    setMaterial(newMaterial);
    updateObject(selectedObject, {
      material: newMaterial,
    });
    // toast.success(`Matériau ${property} mis à jour`);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    updateObject(selectedObject, { name: value });
    // toast.success(`Renommé en ${value}`);
  };

  // Handle object actions
  const handleDuplicateObject = () => {
    duplicateObject(selectedObject);
  };

  const handleCenterObject = () => {
    const newPosition = { x: 0, y: 0, z: 0 };
    setPosition(newPosition);
    updateObject(selectedObject, { position: newPosition });
    // toast.success(`${name} centré`);
  };

  const handleResetTransform = () => {
    const defaultRotation = { x: 0, y: 0, z: 0 };
    const defaultScale = { x: 1, y: 1, z: 1 };

    setRotation(defaultRotation);
    setScale(defaultScale);

    updateObject(selectedObject, {
      rotation: defaultRotation,
      scale: defaultScale,
    });

    // toast.success(`Transformation réinitialisée pour ${name}`);
  };

  const handleDeleteObject = () => {
    deleteObject(selectedObject);
    onClose();
    // toast.success(`${name} supprimé`);
  };

  return (
    <div className="w-[18.5rem] h-full flex flex-col bg-slate-900 text-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
        <div className="flex items-center">
          {(() => {
            switch (object.type) {
              case "cube":
                return <Box className="h-4 w-4 mr-2 text-slate-300" />;
              case "sphere":
                return <Circle className="h-4 w-4 mr-2 text-slate-300" />;
              case "cylinder":
                return <Cylinder className="h-4 w-4 mr-2 text-slate-300" />;
              case "pyramid":
                return <Pyramid className="h-4 w-4 mr-2 text-slate-300" />;
              case "cone":
                return <Cone className="h-4 w-4 mr-2 text-slate-300" />;
              case "torus":
                return <Torus className="h-4 w-4 mr-2 text-slate-300" />;
              case "plane":
                return <Square className="h-4 w-4 mr-2 text-slate-300" />;
              case "text":
                return <Type className="h-4 w-4 mr-2 text-slate-300" />;
              default:
                return null;
            }
          })()}
          <h3 className="font-medium text-sm text-white">{name}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-slate-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6">
          {/* Object Name */}
          <div className="space-y-2 px-4 pt-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium">Nom</label>
            </div>
            <Input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
            />
          </div>

          <Tabs defaultValue="transform">
            <div className="m-3">
              <TabsList className="w-full justify-between p-1 h-9 bg-slate-700">
                <TabsTrigger
                  value="transform"
                  className="h-7 text-xs data-[state=active]:bg-slate-600 px-2"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-1" />
                  Géométrie
                </TabsTrigger>
                <TabsTrigger
                  value="material"
                  className="h-7 text-xs data-[state=active]:bg-slate-600 px-2"
                >
                  <Palette className="h-4 w-4 mr-1" />
                  Matériau
                </TabsTrigger>
                <TabsTrigger
                  value="options"
                  className="h-7 text-xs data-[state=active]:bg-slate-600 px-2"
                >
                  <Settings2 className="h-4 w-4 mr-1" />
                  Options
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Transform Tab */}
            <TabsContent value="transform" className="space-y-5 pt-2 px-4">
              {/* Position Control */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Position</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">X</label>
                    <Input
                      type="number"
                      value={position.x}
                      onChange={(e) =>
                        handlePositionChange("x", parseFloat(e.target.value))
                      }
                      className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                      step={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Y</label>
                    <Input
                      type="number"
                      value={position.y}
                      onChange={(e) =>
                        handlePositionChange("y", parseFloat(e.target.value))
                      }
                      className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                      step={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Z</label>
                    <Input
                      type="number"
                      value={position.z}
                      onChange={(e) =>
                        handlePositionChange("z", parseFloat(e.target.value))
                      }
                      className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                      step={0.1}
                    />
                  </div>
                </div>
              </div>

              {/* Rotation Control */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Rotation</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">X</label>
                    <Input
                      type="number"
                      value={rotation.x}
                      onChange={(e) =>
                        handleRotationChange("x", parseFloat(e.target.value))
                      }
                      className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                      step={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Y</label>
                    <Input
                      type="number"
                      value={rotation.y}
                      onChange={(e) =>
                        handleRotationChange("y", parseFloat(e.target.value))
                      }
                      className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                      step={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Z</label>
                    <Input
                      type="number"
                      value={rotation.z}
                      onChange={(e) =>
                        handleRotationChange("z", parseFloat(e.target.value))
                      }
                      className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                      step={0.1}
                    />
                  </div>
                </div>
              </div>

              {/* Scale Control */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Échelle</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">X</label>
                    <Input
                      type="number"
                      value={scale.x}
                      onChange={(e) =>
                        handleScaleChange("x", parseFloat(e.target.value))
                      }
                      className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                      step={0.1}
                      min={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Y</label>
                    <Input
                      type="number"
                      value={scale.y}
                      onChange={(e) =>
                        handleScaleChange("y", parseFloat(e.target.value))
                      }
                      className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                      step={0.1}
                      min={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Z</label>
                    <Input
                      type="number"
                      value={scale.z}
                      onChange={(e) =>
                        handleScaleChange("z", parseFloat(e.target.value))
                      }
                      className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                      step={0.1}
                      min={0.1}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Material Tab */}
            <TabsContent value="material" className="space-y-5 pt-2 px-4">
              {/* Color Picker */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Couleur</label>
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <Input
                    type="color"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    onBlur={(e) =>
                      handleMaterialChange("color", e.target.value)
                    }
                    className="h-8 p-1 w-16 bg-slate-700 border-slate-600"
                  />
                  <Input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    onBlur={(e) =>
                      handleMaterialChange("color", e.target.value)
                    }
                    className="h-8 flex-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              {/* Material Properties */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Métallique</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={material.metalness}
                    onChange={(e) =>
                      handleMaterialChange(
                        "metalness",
                        parseFloat(e.target.value)
                      )
                    }
                    className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                  />
                  <span className="text-xs w-8 text-right">
                    {material.metalness.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Rugosité</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={material.roughness}
                    onChange={(e) =>
                      handleMaterialChange(
                        "roughness",
                        parseFloat(e.target.value)
                      )
                    }
                    className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                  />
                  <span className="text-xs w-8 text-right">
                    {material.roughness.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Opacité</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={material.opacity}
                    onChange={(e) =>
                      handleMaterialChange(
                        "opacity",
                        parseFloat(e.target.value)
                      )
                    }
                    className="h-8 bg-slate-700 border-slate-600 text-white focus:ring-slate-500"
                  />
                  <span className="text-xs w-8 text-right">
                    {material.opacity.toFixed(2)}
                  </span>
                </div>
              </div>
            </TabsContent>

            {/* Options Tab */}
            <TabsContent value="options" className="pt-3 px-4">
              <div className="space-y-3">
                <div className="text-xs font-medium pb-2">
                  Actions sur l'objet
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
                  onClick={handleDuplicateObject}
                >
                  <Copy className="h-4 w-4 mr-2" /> Dupliquer l'objet
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
                  onClick={handleCenterObject}
                >
                  <span className="h-4 w-4 mr-2">⊕</span> Centrer l'objet
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
                  onClick={handleResetTransform}
                >
                  <span className="h-4 w-4 mr-2">↻</span> Réinitialiser la
                  transformation
                </Button>

                <div className="border-t border-border pt-3 mt-4">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={handleDeleteObject}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer l'objet
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
