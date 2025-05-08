"use client";

import { create } from "zustand";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { WebsocketProvider } from "y-websocket";
import { toast } from "sonner";

// Type definitions
export type ObjectType =
  | "cube"
  | "sphere"
  | "cylinder"
  | "cone"
  | "torus"
  | "plane"
  | "pyramid"
  | "text";

export interface Object3D {
  id: string;
  name: string;
  type: ObjectType;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  material: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
  };
}

export interface Scene {
  objects: Object3D[];
}

interface EditorState {
  // Project details
  projectId: string | null;
  projectName: string;
  isModified: boolean;

  // Scene state
  scene: Scene;
  selectedObjectId: string | null;

  // Tool state
  activeTool: "select" | "move" | "rotate" | "scale";

  // Clipboard state
  clipboard: Object3D | null;

  // Collaboration
  isCollaborating: boolean;
  collaborators: { id: string; name: string; color: string }[];
  provider: WebrtcProvider | WebsocketProvider | null;
  doc: Y.Doc | null;

  // Actions
  setProjectId: (id: string | null) => void;
  setProjectName: (name: string) => void;
  markAsModified: () => void;
  markAsSaved: () => void;

  selectObject: (id: string | null) => void;
  addObject: (type: ObjectType) => void;
  updateObject: (id: string, updates: Partial<Object3D>) => void;
  deleteObject: (id: string) => void;
  duplicateObject: (id: string) => void;

  // Clipboard actions
  copyObject: (id: string) => void;
  cutObject: (id: string) => void;
  pasteObject: () => void;

  setActiveTool: (tool: "select" | "move" | "rotate" | "scale") => void;

  startCollaboration: () => void;
  stopCollaboration: () => void;
}

// Generate a simple ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Create the store
export const useEditorStore = create<EditorState>((set, get) => ({
  // Project details
  projectId: null,
  projectName: "Untitled Project",
  isModified: false,

  // Scene state
  scene: {
    objects: [
      {
        id: "cube-1",
        name: "Cube 1",
        type: "cube",
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        material: {
          color: "#4c6ef5",
          metalness: 0.1,
          roughness: 0.2,
          opacity: 1.0,
        },
      },
      {
        id: "sphere-1",
        name: "Sphere 1",
        type: "sphere",
        position: { x: 2, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        material: {
          color: "#ae3ec9",
          metalness: 0.1,
          roughness: 0.2,
          opacity: 1.0,
        },
      },
    ],
  },
  selectedObjectId: null,

  // Tool state
  activeTool: "select",

  // Clipboard state
  clipboard: null,

  // Collaboration
  isCollaborating: false,
  collaborators: [],
  provider: null,
  doc: null,

  // Actions
  setProjectId: (id) => set({ projectId: id }),

  setProjectName: (name) => {
    set({ projectName: name, isModified: true });
  },

  markAsModified: () => set({ isModified: true }),
  markAsSaved: () => set({ isModified: false }),

  selectObject: (id) => {
    set({ selectedObjectId: id });
  },

  addObject: (type) => {
    const newId = `${type}-${generateId()}`;
    const newName = `${
      type.charAt(0).toUpperCase() + type.slice(1)
    } ${generateId().substring(0, 4)}`;

    const newObject: Object3D = {
      id: newId,
      name: newName,
      type: type,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      material: {
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        metalness: 0.1,
        roughness: 0.2,
        opacity: 1.0,
      },
    };

    set((state) => ({
      scene: {
        ...state.scene,
        objects: [...state.scene.objects, newObject],
      },
      selectedObjectId: newId,
      isModified: true,
    }));

    toast.success(`Added ${newName}`);
  },

  updateObject: (id, updates) => {
    set((state) => {
      const objectIndex = state.scene.objects.findIndex((obj) => obj.id === id);
      if (objectIndex === -1) return state;

      const updatedObjects = [...state.scene.objects];
      updatedObjects[objectIndex] = {
        ...updatedObjects[objectIndex],
        ...updates,
      };

      return {
        scene: {
          ...state.scene,
          objects: updatedObjects,
        },
        isModified: true,
      };
    });
  },

  deleteObject: (id) => {
    set((state) => {
      const objectToDelete = state.scene.objects.find((obj) => obj.id === id);
      if (!objectToDelete) return state;

      const updatedObjects = state.scene.objects.filter((obj) => obj.id !== id);

      toast.success(`Deleted ${objectToDelete.name}`);

      return {
        scene: {
          ...state.scene,
          objects: updatedObjects,
        },
        selectedObjectId: null,
        isModified: true,
      };
    });
  },

  duplicateObject: (id) => {
    set((state) => {
      const objectToDuplicate = state.scene.objects.find(
        (obj) => obj.id === id
      );
      if (!objectToDuplicate) return state;

      const newId = `${objectToDuplicate.type}-${generateId()}`;
      const newObject: Object3D = {
        ...JSON.parse(JSON.stringify(objectToDuplicate)),
        id: newId,
        name: `${objectToDuplicate.name} (Copy)`,
        position: {
          x: objectToDuplicate.position.x + 1,
          y: objectToDuplicate.position.y,
          z: objectToDuplicate.position.z,
        },
      };

      toast.success(`Duplicated ${objectToDuplicate.name}`);

      return {
        scene: {
          ...state.scene,
          objects: [...state.scene.objects, newObject],
        },
        selectedObjectId: newId,
        isModified: true,
      };
    });
  },

  // New clipboard actions
  copyObject: (id) => {
    const objectToCopy = get().scene.objects.find((obj) => obj.id === id);
    if (!objectToCopy) return;

    // Make a deep copy of the object
    const clipboardObject = JSON.parse(JSON.stringify(objectToCopy));
    set({ clipboard: clipboardObject });
    toast.success(`Copied ${objectToCopy.name} to clipboard`);
  },

  cutObject: (id) => {
    const objectToCut = get().scene.objects.find((obj) => obj.id === id);
    if (!objectToCut) return;

    // Make a deep copy of the object before deleting
    const clipboardObject = JSON.parse(JSON.stringify(objectToCut));
    set({ clipboard: clipboardObject });

    // Delete the original object
    set((state) => ({
      scene: {
        ...state.scene,
        objects: state.scene.objects.filter((obj) => obj.id !== id),
      },
      selectedObjectId: null,
      isModified: true,
    }));

    toast.success(`Cut ${objectToCut.name} to clipboard`);
  },

  pasteObject: () => {
    const { clipboard } = get();
    if (!clipboard) {
      toast.error("No object in clipboard to paste");
      return;
    }

    const newId = `${clipboard.type}-${generateId()}`;
    const newObject: Object3D = {
      ...JSON.parse(JSON.stringify(clipboard)),
      id: newId,
      name: `${clipboard.name} (Copy)`,
      position: {
        x: clipboard.position.x + 1, // Offset position slightly
        y: clipboard.position.y,
        z: clipboard.position.z,
      },
    };

    set((state) => ({
      scene: {
        ...state.scene,
        objects: [...state.scene.objects, newObject],
      },
      selectedObjectId: newId,
      isModified: true,
    }));

    toast.success(`Pasted ${newObject.name} from clipboard`);
  },

  setActiveTool: (tool) => {
    set({ activeTool: tool });
    toast.success(`Selected ${tool} tool`);
  },

  startCollaboration: () => {
    const { projectId, projectName } = get();
    const roomId = projectId || `project-${generateId()}`;

    // Create a Y.js document
    const doc = new Y.Doc();

    // Create a WebRTC provider (for P2P collaboration)
    // In a real app, you might want to use WebSocketProvider with a server instead
    try {
      const provider = new WebrtcProvider(`modern-3d-studio-${roomId}`, doc);

      // Set up awareness (to show who is connected)
      const awareness = provider.awareness;

      // Set local state
      awareness.setLocalState({
        id: generateId(),
        name: "Me",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });

      // Listen for awareness changes
      awareness.on("change", () => {
        const states = Array.from(awareness.getStates().values());
        set({
          collaborators: states.map((state: any) => ({
            id: state.id,
            name: state.name,
            color: state.color,
          })),
        });
      });

      // Set the provider in the store
      set({
        isCollaborating: true,
        provider,
        doc,
      });

      toast.success("Collaboration started - Share the URL to collaborate");
    } catch (error) {
      console.error("Error starting collaboration:", error);
      toast.error("Failed to start collaboration");
    }
  },

  stopCollaboration: () => {
    const { provider, doc } = get();

    if (provider) {
      provider.disconnect();
    }

    if (doc) {
      doc.destroy();
    }

    set({
      isCollaborating: false,
      provider: null,
      doc: null,
      collaborators: [],
    });

    toast.success("Collaboration stopped");
  },
}));
