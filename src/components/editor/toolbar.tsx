"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
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
  Camera
} from "lucide-react";
import { toast } from "sonner";
import { useEditorStore } from "@/lib/store/editor-store";

interface EditorToolbarProps {
  selectedObject: string | null;
  setSelectedObject: (id: string | null) => void;
}

export default function EditorToolbar({ selectedObject, setSelectedObject }: EditorToolbarProps) {
  // Tool states
  const [activeTool, setActiveTool] = useState<'select' | 'move' | 'scale' | 'rotate'>('select');

  // Editor history stack
  const [history, setHistory] = useState<Array<any>>([]);
  const [redoStack, setRedoStack] = useState<Array<any>>([]);

  // Handle tool clicks
  const handleToolClick = (toolName: 'select' | 'move' | 'scale' | 'rotate') => {
    setActiveTool(toolName);

    // In a real app, we'd update the scene's transform controls or interaction mode
    // For this demo, just show a toast
    toast.success(`${toolName} tool activated`);

    // In a real app, we'd dispatch to our state store, e.g.:
    // useEditorStore.getState().setActiveTool(toolName);
  };

  // Handle clipboard operations
  const handleClipboardOperation = (operation: 'copy' | 'cut' | 'delete') => {
    if (!selectedObject) return;

    // In a real app, these would actually modify the scene
    switch (operation) {
      case 'copy':
        // In a real app: saveToClipboard(selectedObject)
        toast.success(`Copied object to clipboard: ${selectedObject}`);
        break;
      case 'cut':
        // In a real app: saveToClipboard(selectedObject) + deleteObject(selectedObject)
        toast.success(`Cut object: ${selectedObject}`);
        setSelectedObject(null);
        break;
      case 'delete':
        // In a real app: deleteObject(selectedObject)
        toast.success(`Deleted object: ${selectedObject}`);
        setSelectedObject(null);
        break;
    }
  };

  // Handle history operations
  const handleHistoryOperation = (operation: 'undo' | 'redo') => {
    if (operation === 'undo') {
      if (history.length === 0) {
        toast.error("Nothing to undo");
        return;
      }

      // In a real app: Actually undo the last operation
      toast.success("Undo successful");

      // Simulate moving an item from history to redo stack
      const lastAction = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setRedoStack([...redoStack, lastAction]);
    } else {
      if (redoStack.length === 0) {
        toast.error("Nothing to redo");
        return;
      }

      // In a real app: Actually redo the last undone operation
      toast.success("Redo successful");

      // Simulate moving an item from redo stack to history
      const lastRedoAction = redoStack[redoStack.length - 1];
      setRedoStack(redoStack.slice(0, -1));
      setHistory([...history, lastRedoAction]);
    }
  };

  // Handle alignment operations
  const handleAlign = () => {
    if (!selectedObject) return;

    // In a real app, show alignment options and perform alignment
    toast.success(`Opening alignment options for ${selectedObject}`);
  };

  // Handle camera operations
  const handleCameraView = () => {
    // In a real app, show camera preset options
    toast.success("Changing camera view");

    // Toggle between preset views like top, front, side, etc.
    const views = ["Top", "Front", "Side", "Perspective"];
    const randomView = views[Math.floor(Math.random() * views.length)];
    toast.success(`Changed to ${randomView} view`);
  };

  return (
    <div className="toolbar h-12 border-b border-border flex items-center px-2 bg-card/50">
      <div className="flex items-center space-x-1 mr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === 'select' ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => handleToolClick('select')}
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
                variant={activeTool === 'move' ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => handleToolClick('move')}
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
                variant={activeTool === 'scale' ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => handleToolClick('scale')}
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
                variant={activeTool === 'rotate' ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => handleToolClick('rotate')}
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
                onClick={() => handleClipboardOperation('copy')}
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
                onClick={() => handleClipboardOperation('cut')}
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
                onClick={() => handleClipboardOperation('delete')}
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
                onClick={() => handleHistoryOperation('undo')}
                disabled={history.length === 0}
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
                onClick={() => handleHistoryOperation('redo')}
                disabled={redoStack.length === 0}
              >
                <CornerUpRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="h-6 w-px bg-border mr-2"></div>

      <div className="flex items-center space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleCameraView}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Camera Views</TooltipContent>
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
