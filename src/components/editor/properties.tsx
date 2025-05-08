"use client";

import { useState } from "react";
import { X, Copy, ChevronDown, ChevronUp, Box, CircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data - in real app this would come from the state or a store
const objectData = {
  "cube-1": {
    name: "Cube 1",
    type: "cube",
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    material: {
      color: "#4c6ef5",
      metalness: 0.1,
      roughness: 0.2,
      opacity: 1.0
    }
  },
  "sphere-1": {
    name: "Sphere 1",
    type: "sphere",
    position: { x: 2, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    material: {
      color: "#ae3ec9",
      metalness: 0.1,
      roughness: 0.2,
      opacity: 1.0
    }
  }
};

interface EditorPropertiesProps {
  selectedObject: string;
  onClose: () => void;
}

export default function EditorProperties({ selectedObject, onClose }: EditorPropertiesProps) {
  // Get the object data for the selected object
  const object = objectData[selectedObject as keyof typeof objectData];

  // State for form values (in a real app, this would update the actual 3D scene)
  const [position, setPosition] = useState(object.position);
  const [rotation, setRotation] = useState(object.rotation);
  const [scale, setScale] = useState(object.scale);
  const [material, setMaterial] = useState(object.material);
  const [name, setName] = useState(object.name);

  // Handle changes to the properties
  const handlePositionChange = (axis: keyof typeof position, value: number) => {
    setPosition({ ...position, [axis]: value });
    toast.success(`Updated ${axis} position to ${value}`);
  };

  const handleRotationChange = (axis: keyof typeof rotation, value: number) => {
    setRotation({ ...rotation, [axis]: value });
    toast.success(`Updated ${axis} rotation to ${value}`);
  };

  const handleScaleChange = (axis: keyof typeof scale, value: number) => {
    setScale({ ...scale, [axis]: value });
    toast.success(`Updated ${axis} scale to ${value}`);
  };

  const handleMaterialChange = (property: keyof typeof material, value: any) => {
    setMaterial({ ...material, [property]: value });
    toast.success(`Updated material ${property}`);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    toast.success(`Renamed to ${value}`);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center">
          {object.type === "cube" ? <Box className="h-4 w-4 mr-2" /> : <CircleIcon className="h-4 w-4 mr-2" />}
          <h3 className="font-medium text-sm">{name}</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Object Name */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium">Name</label>
            </div>
            <Input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="h-8"
            />
          </div>

          <Tabs defaultValue="transform">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transform" className="text-xs">Transform</TabsTrigger>
              <TabsTrigger value="material" className="text-xs">Material</TabsTrigger>
              <TabsTrigger value="options" className="text-xs">Options</TabsTrigger>
            </TabsList>

            {/* Transform Tab */}
            <TabsContent value="transform" className="space-y-5 pt-4">
              {/* Position Control */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Position</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">X</label>
                    <Input
                      type="number"
                      value={position.x}
                      onChange={(e) => handlePositionChange("x", parseFloat(e.target.value))}
                      className="h-8"
                      step={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Y</label>
                    <Input
                      type="number"
                      value={position.y}
                      onChange={(e) => handlePositionChange("y", parseFloat(e.target.value))}
                      className="h-8"
                      step={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Z</label>
                    <Input
                      type="number"
                      value={position.z}
                      onChange={(e) => handlePositionChange("z", parseFloat(e.target.value))}
                      className="h-8"
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
                      onChange={(e) => handleRotationChange("x", parseFloat(e.target.value))}
                      className="h-8"
                      step={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Y</label>
                    <Input
                      type="number"
                      value={rotation.y}
                      onChange={(e) => handleRotationChange("y", parseFloat(e.target.value))}
                      className="h-8"
                      step={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Z</label>
                    <Input
                      type="number"
                      value={rotation.z}
                      onChange={(e) => handleRotationChange("z", parseFloat(e.target.value))}
                      className="h-8"
                      step={0.1}
                    />
                  </div>
                </div>
              </div>

              {/* Scale Control */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Scale</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">X</label>
                    <Input
                      type="number"
                      value={scale.x}
                      onChange={(e) => handleScaleChange("x", parseFloat(e.target.value))}
                      className="h-8"
                      step={0.1}
                      min={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Y</label>
                    <Input
                      type="number"
                      value={scale.y}
                      onChange={(e) => handleScaleChange("y", parseFloat(e.target.value))}
                      className="h-8"
                      step={0.1}
                      min={0.1}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Z</label>
                    <Input
                      type="number"
                      value={scale.z}
                      onChange={(e) => handleScaleChange("z", parseFloat(e.target.value))}
                      className="h-8"
                      step={0.1}
                      min={0.1}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Material Tab */}
            <TabsContent value="material" className="space-y-5 pt-4">
              {/* Color Picker */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Color</label>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-md border border-border cursor-pointer"
                    style={{ backgroundColor: material.color }}
                  />
                  <Input
                    value={material.color}
                    onChange={(e) => handleMaterialChange("color", e.target.value)}
                    className="h-8 flex-1"
                  />
                </div>
              </div>

              {/* Material Properties */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Metalness</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={material.metalness}
                    onChange={(e) => handleMaterialChange("metalness", parseFloat(e.target.value))}
                    className="h-8"
                  />
                  <span className="text-xs w-8 text-right">{material.metalness.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Roughness</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={material.roughness}
                    onChange={(e) => handleMaterialChange("roughness", parseFloat(e.target.value))}
                    className="h-8"
                  />
                  <span className="text-xs w-8 text-right">{material.roughness.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Opacity</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={material.opacity}
                    onChange={(e) => handleMaterialChange("opacity", parseFloat(e.target.value))}
                    className="h-8"
                  />
                  <span className="text-xs w-8 text-right">{material.opacity.toFixed(2)}</span>
                </div>
              </div>
            </TabsContent>

            {/* Options Tab */}
            <TabsContent value="options" className="pt-4">
              <div className="space-y-3">
                <div className="text-xs font-medium pb-2">Object Actions</div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => toast.success(`Duplicated ${name}`)}
                >
                  <Copy className="h-4 w-4 mr-2" /> Duplicate Object
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => toast.success(`Centered ${name}`)}
                >
                  <span className="h-4 w-4 mr-2">⊕</span> Center Object
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => toast.success(`Reset Transform for ${name}`)}
                >
                  <span className="h-4 w-4 mr-2">↻</span> Reset Transform
                </Button>

                <div className="border-t border-border pt-3 mt-4">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => toast.success(`Deleted ${name}`)}
                  >
                    Delete Object
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
