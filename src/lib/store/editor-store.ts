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

// Nouvel interface pour représenter une entrée dans l'historique
interface HistoryEntry {
  state: {
    scene: Scene;
    selectedObjectId: string | null;
  };
  description: string; // Description de l'action pour les toasts
  timestamp: number;
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

  // Historique pour undo/redo
  history: HistoryEntry[];
  historyIndex: number;
  maxHistorySize: number;

  // État de la transformation en cours
  isTransforming: boolean;
  cachedTransformState: Object3D | null;

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

  // Undo/Redo actions
  undo: () => void;
  redo: () => void;
  saveToHistory: (description: string) => void;
  clearHistory: () => void;

  startCollaboration: () => void;
  stopCollaboration: () => void;

  // Transformations avec historique
  startTransformation: (objectId: string) => void;
  endTransformation: (objectId: string, description: string) => void;
}

// Generate a simple ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Create the store
export const useEditorStore = create<EditorState>((set, get) => ({
  // Project details
  projectId: null,
  projectName: "Projet sans titre",
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
        name: "Sphère 1",
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

  // Nouvel état pour l'historique
  history: [],
  historyIndex: -1,
  maxHistorySize: 50,

  // État de la transformation en cours
  isTransforming: false,
  cachedTransformState: null,

  // Collaboration
  isCollaborating: false,
  collaborators: [],
  provider: null,
  doc: null,

  // Actions
  setProjectId: (id) => set({ projectId: id }),

  setProjectName: (name) => {
    set({ projectName: name, isModified: true });
    get().saveToHistory(`Projet renommé en ${name}`);
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

    // Ajouter l'action à l'historique
    get().saveToHistory(`Ajout de ${newName}`);

    toast.success(`Ajout de ${newName}`);
  },

  updateObject: (id, updates) => {
    // Si nous sommes en mode transformation, ne pas sauvegarder dans l'historique
    const isTransforming = get().isTransforming;

    set((state) => {
      const objectIndex = state.scene.objects.findIndex((obj) => obj.id === id);
      if (objectIndex === -1) return state;

      const updatedObjects = [...state.scene.objects];
      const oldObject = { ...updatedObjects[objectIndex] };
      updatedObjects[objectIndex] = {
        ...oldObject,
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

    // Sauvegarder dans l'historique uniquement si nous ne sommes pas en mode transformation
    if (!isTransforming) {
      get().saveToHistory(`Mise à jour de ${id}`);
    }
  },

  deleteObject: (id) => {
    const objectToDelete = get().scene.objects.find((obj) => obj.id === id);
    if (!objectToDelete) return;

    const objectName = objectToDelete.name;

    set((state) => {
      const updatedObjects = state.scene.objects.filter((obj) => obj.id !== id);

      return {
        scene: {
          ...state.scene,
          objects: updatedObjects,
        },
        selectedObjectId: null,
        isModified: true,
      };
    });

    // Ajouter à l'historique
    get().saveToHistory(`Suppression de ${objectName}`);
    toast.success(`Suppression de ${objectName}`);
  },

  duplicateObject: (id) => {
    const objectToDuplicate = get().scene.objects.find((obj) => obj.id === id);
    if (!objectToDuplicate) return;

    const newId = `${objectToDuplicate.type}-${generateId()}`;
    const newObject: Object3D = {
      ...JSON.parse(JSON.stringify(objectToDuplicate)),
      id: newId,
      name: `${objectToDuplicate.name} (Copie)`,
      position: {
        x: objectToDuplicate.position.x + 1,
        y: objectToDuplicate.position.y,
        z: objectToDuplicate.position.z,
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

    // Ajouter à l'historique
    get().saveToHistory(`Duplication de ${objectToDuplicate.name}`);
    toast.success(`Duplication de ${objectToDuplicate.name}`);
  },

  // New clipboard actions
  copyObject: (id) => {
    const objectToCopy = get().scene.objects.find((obj) => obj.id === id);
    if (!objectToCopy) return;

    // Make a deep copy of the object
    const clipboardObject = JSON.parse(JSON.stringify(objectToCopy));
    set({ clipboard: clipboardObject });
    toast.success(`Copie de ${objectToCopy.name} dans le presse-papier`);
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

    // Ajouter à l'historique
    get().saveToHistory(`Coupe de ${objectToCut.name}`);
    toast.success(`Coupe de ${objectToCut.name} dans le presse-papier`);
  },

  pasteObject: () => {
    const { clipboard } = get();
    if (!clipboard) {
      toast.error("Aucun objet dans le presse-papier à coller");
      return;
    }

    const newId = `${clipboard.type}-${generateId()}`;
    const newObject: Object3D = {
      ...JSON.parse(JSON.stringify(clipboard)),
      id: newId,
      name: `${clipboard.name} (Copie)`,
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

    // Ajouter à l'historique
    get().saveToHistory(`Collage de ${newObject.name}`);
    toast.success(`Collage de ${newObject.name} depuis le presse-papier`);
  },

  setActiveTool: (tool) => {
    set({ activeTool: tool });
    toast.success(`Outil ${tool} sélectionné`);
  },

  // Nouvelles fonctions d'historique
  saveToHistory: (description) => {
    set((state) => {
      // Créer une entrée d'historique avec l'état actuel
      const currentState: HistoryEntry = {
        state: {
          scene: JSON.parse(JSON.stringify(state.scene)), // Deep copy
          selectedObjectId: state.selectedObjectId,
        },
        description: description,
        timestamp: Date.now(),
      };

      // Supprimer tout ce qui est après l'index actuel (si on fait un undo puis une action)
      const newHistory = state.history.slice(0, state.historyIndex + 1);

      // Ajouter l'état actuel à l'historique
      newHistory.push(currentState);

      // Limiter la taille de l'historique
      if (newHistory.length > state.maxHistorySize) {
        newHistory.shift(); // Supprimer l'entrée la plus ancienne
      }

      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  undo: () => {
    set((state) => {
      // Vérifier si on peut faire un undo
      if (state.historyIndex <= 0 || state.history.length === 0) {
        toast.error("Rien à annuler");
        return state;
      }

      const newIndex = state.historyIndex - 1;
      const prevState = state.history[newIndex].state;
      const actionDescription = state.history[newIndex + 1].description;

      toast.success(`Annulation : ${actionDescription}`);

      return {
        scene: JSON.parse(JSON.stringify(prevState.scene)), // Deep copy
        selectedObjectId: prevState.selectedObjectId,
        historyIndex: newIndex,
        isModified: true,
      };
    });
  },

  redo: () => {
    set((state) => {
      // Vérifier si on peut faire un redo
      if (state.historyIndex >= state.history.length - 1) {
        toast.error("Rien à rétablir");
        return state;
      }

      const newIndex = state.historyIndex + 1;
      const nextState = state.history[newIndex].state;
      const actionDescription = state.history[newIndex].description;

      toast.success(`Rétablissement : ${actionDescription}`);

      return {
        scene: JSON.parse(JSON.stringify(nextState.scene)), // Deep copy
        selectedObjectId: nextState.selectedObjectId,
        historyIndex: newIndex,
        isModified: true,
      };
    });
  },

  clearHistory: () => {
    // Sauvegarder l'état actuel comme point de départ
    const currentScene = get().scene;
    const currentSelection = get().selectedObjectId;

    set({
      history: [
        {
          state: {
            scene: JSON.parse(JSON.stringify(currentScene)),
            selectedObjectId: currentSelection,
          },
          description: "État initial",
          timestamp: Date.now(),
        },
      ],
      historyIndex: 0,
    });
  },

  startCollaboration: () => {
    const { projectId, projectName } = get();
    const roomId = projectId ?? `project-${generateId()}`;

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
        name: "Moi",
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

      toast.success("Collaboration démarrée - Partagez l'URL pour collaborer");
    } catch (error) {
      console.error("Error starting collaboration:", error);
      toast.error("Échec du démarrage de la collaboration");
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

    toast.success("Collaboration arrêtée");
  },

  // Nouvelles fonctions pour gérer les transformations avec historique
  startTransformation: (objectId) => {
    const object = get().scene.objects.find((obj) => obj.id === objectId);
    if (!object) return;

    set({
      isTransforming: true,
      cachedTransformState: JSON.parse(JSON.stringify(object)),
    });
  },

  endTransformation: (objectId, description) => {
    const { cachedTransformState } = get();
    if (!cachedTransformState) {
      set({ isTransforming: false });
      return;
    }

    set({ isTransforming: false, cachedTransformState: null });

    // Enregistrer cette transformation dans l'historique maintenant qu'elle est terminée
    get().saveToHistory(description);
  },
}));
