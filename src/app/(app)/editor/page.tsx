"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EditorHeader from "@/components/editor/header";
import EditorSidebar from "@/components/editor/sidebar";
import EditorCanvas from "@/components/editor/canvas";
import EditorProperties from "@/components/editor/properties";
import EditorToolbar from "@/components/editor/toolbar";
import { toast } from "sonner";
import { useEditorStore } from "@/lib/store/editor-store";

export default function EditorPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");
  const templateId = searchParams.get("template");

  // Get state and actions from the store
  const {
    selectedObjectId,
    selectObject,
    setProjectId,
    setProjectName,
    isCollaborating,
    startCollaboration,
    stopCollaboration,
    clearHistory,
  } = useEditorStore();

  const [showProperties, setShowProperties] = useState(true);

  // Load project or template data
  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);
      setProjectName(`Projet ${projectId}`);
      // toast.success(`Projet chargé : Projet ${projectId}`);
    } else if (templateId) {
      setProjectId(templateId);
      setProjectName(`Modèle ${templateId}`);
      // toast.success(`Modèle chargé : Modèle ${templateId}`);
    } else {
      setProjectId(null);
      setProjectName("Projet sans titre");
      // toast.success("Nouveau projet vide créé");
    }

    // Initialiser l'historique avec l'état actuel comme point de départ
    // Important de le faire après le chargement du projet pour capturer l'état initial
    setTimeout(() => {
      clearHistory();
      // toast.success("Historique annuler/refaire initialisé");
    }, 500); // Petit délai pour s'assurer que tout est bien chargé
  }, [projectId, templateId, setProjectId, setProjectName, clearHistory]);

  // Set selected object in local state and store
  const handleSelectObject = (id: string | null) => {
    setShowProperties(!!id); // Show properties panel if an object is selected
    selectObject(id);
  };

  // Toggle collaboration
  const handleToggleCollaboration = (value: boolean) => {
    if (value) {
      startCollaboration();
    } else {
      stopCollaboration();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 overflow-hidden">
      <EditorHeader
        projectName={useEditorStore.getState().projectName}
        isCollaborating={isCollaborating}
        setIsCollaborating={handleToggleCollaboration}
      />

      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />

        <div className="flex-1 flex flex-col relative overflow-hidden">
          <EditorToolbar
            selectedObject={selectedObjectId}
            setSelectedObject={handleSelectObject}
          />

          <div className="flex-1 relative">
            <EditorCanvas
              selectedObject={selectedObjectId}
              setSelectedObject={handleSelectObject}
            />

            {showProperties && selectedObjectId && (
              <div className="absolute top-0 right-0 h-full z-20 border-l border-slate-700 overflow-y-auto bg-slate-900">
                <EditorProperties
                  selectedObject={selectedObjectId}
                  onClose={() => setShowProperties(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
