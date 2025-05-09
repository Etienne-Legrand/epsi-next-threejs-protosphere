"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MousePointer,
  Move,
  Maximize2,
  RotateCw,
  Eraser,
  Copy,
  Scissors,
  AlignCenter,
  CornerUpLeft,
  CornerUpRight,
  Clipboard,
} from "lucide-react";
import { toast } from "sonner";
import { useEditorStore } from "@/lib/store/editor-store";

interface EditorToolbarProps {
  selectedObject: string | null;
  setSelectedObject: (id: string | null) => void;
}

export default function EditorToolbar({
  selectedObject,
  setSelectedObject,
}: Readonly<EditorToolbarProps>) {
  // Get state and actions from the store
  const {
    activeTool,
    setActiveTool,
    deleteObject,
    duplicateObject,
    copyObject,
    cutObject,
    pasteObject,
    clipboard,
    markAsModified,
    undo,
    redo,
    history,
    historyIndex,
  } = useEditorStore();

  // Handle tool clicks
  const handleToolClick = (
    toolName: "select" | "move" | "scale" | "rotate"
  ) => {
    setActiveTool(toolName);
  };

  // Handle clipboard operations
  const handleClipboardOperation = (
    operation: "copy" | "cut" | "paste" | "delete"
  ) => {
    if (operation === "paste") {
      pasteObject();
      markAsModified();
      return;
    }

    if (!selectedObject) return;

    switch (operation) {
      case "copy":
        copyObject(selectedObject);
        break;
      case "cut":
        cutObject(selectedObject);
        setSelectedObject(null);
        markAsModified();
        break;
      case "delete":
        deleteObject(selectedObject);
        setSelectedObject(null);
        markAsModified();
        break;
    }
  };

  // Handle history operations
  const handleHistoryOperation = (operation: "undo" | "redo") => {
    if (operation === "undo") {
      undo();
    } else {
      redo();
    }
  };

  // Handle alignment operations
  const handleAlign = () => {
    if (!selectedObject) return;
    // toast.success(`Ouverture des options d'alignement pour ${selectedObject}`);
  };

  return (
    <div className="toolbar h-12 border-b border-slate-700 flex items-center px-2 bg-slate-900 text-white">
      <div className="flex items-center space-x-1 mr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === "select" ? "secondary" : "ghost"}
                size="icon"
                className={`h-8 w-8 text-white ${
                  activeTool === "select"
                    ? "bg-slate-600 hover:bg-slate-500"
                    : "hover:bg-slate-700"
                }`}
                onClick={() => handleToolClick("select")}
              >
                <MousePointer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Sélectionner (V)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === "move" ? "secondary" : "ghost"}
                size="icon"
                className={`h-8 w-8 text-white ${
                  activeTool === "move"
                    ? "bg-slate-600 hover:bg-slate-500"
                    : "hover:bg-slate-700"
                }`}
                onClick={() => handleToolClick("move")}
              >
                <Move className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Déplacer (G)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === "scale" ? "secondary" : "ghost"}
                size="icon"
                className={`h-8 w-8 text-white ${
                  activeTool === "scale"
                    ? "bg-slate-600 hover:bg-slate-500"
                    : "hover:bg-slate-700"
                }`}
                onClick={() => handleToolClick("scale")}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redimensionner (S)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === "rotate" ? "secondary" : "ghost"}
                size="icon"
                className={`h-8 w-8 text-white ${
                  activeTool === "rotate"
                    ? "bg-slate-600 hover:bg-slate-500"
                    : "hover:bg-slate-700"
                }`}
                onClick={() => handleToolClick("rotate")}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pivoter (R)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="h-6 w-px bg-slate-600 mr-2"></div>

      <div className="flex items-center space-x-1 mr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-700 text-white"
                onClick={() => handleClipboardOperation("copy")}
                disabled={!selectedObject}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copier (Ctrl+C)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-700 text-white"
                onClick={() => handleClipboardOperation("cut")}
                disabled={!selectedObject}
              >
                <Scissors className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Couper (Ctrl+X)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-700 text-white"
                onClick={() => handleClipboardOperation("paste")}
                disabled={!clipboard}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Coller (Ctrl+V)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-700 text-white"
                onClick={() => handleClipboardOperation("delete")}
                disabled={!selectedObject}
              >
                <Eraser className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Supprimer (Del)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="h-6 w-px bg-slate-600 mr-2"></div>

      <div className="flex items-center space-x-1 mr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-700 text-white"
                onClick={handleAlign}
                disabled={!selectedObject}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Aligner</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-700 text-white"
                onClick={() => handleHistoryOperation("undo")}
                disabled={historyIndex <= 0}
              >
                <CornerUpLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Annuler (Ctrl+Z)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-700 text-white"
                onClick={() => handleHistoryOperation("redo")}
                disabled={historyIndex >= history.length - 1}
              >
                <CornerUpRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Rétablir (Ctrl+Y)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="ml-auto flex items-center space-x-1">
        {selectedObject && (
          <div className="text-xs text-white bg-slate-700 px-2 py-1 rounded-md">
            {selectedObject}
          </div>
        )}
      </div>
    </div>
  );
}
