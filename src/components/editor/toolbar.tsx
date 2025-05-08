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
    toast.success(`Opening alignment options for ${selectedObject}`);
  };

  return (
    <div className="toolbar h-12 border-b border-border flex items-center px-2 bg-card/50">
      <div className="flex items-center space-x-1 mr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === "select" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => handleToolClick("select")}
              >
                <MousePointer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Select (V)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === "move" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => handleToolClick("move")}
              >
                <Move className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move (G)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === "scale" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => handleToolClick("scale")}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Scale (S)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === "rotate" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => handleToolClick("rotate")}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Rotate (R)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="h-6 w-px bg-border mr-2"></div>

      <div className="flex items-center space-x-1 mr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleClipboardOperation("copy")}
                disabled={!selectedObject}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy (Ctrl+C)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleClipboardOperation("cut")}
                disabled={!selectedObject}
              >
                <Scissors className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Cut (Ctrl+X)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleClipboardOperation("paste")}
                disabled={!clipboard}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Paste (Ctrl+V)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleClipboardOperation("delete")}
                disabled={!selectedObject}
              >
                <Eraser className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete (Del)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="h-6 w-px bg-border mr-2"></div>

      <div className="flex items-center space-x-1 mr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleAlign}
                disabled={!selectedObject}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleHistoryOperation("undo")}
                disabled={historyIndex <= 0}
              >
                <CornerUpLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleHistoryOperation("redo")}
                disabled={historyIndex >= history.length - 1}
              >
                <CornerUpRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="ml-auto flex items-center space-x-1">
        {selectedObject && (
          <div className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
            {selectedObject}
          </div>
        )}
      </div>
    </div>
  );
}
