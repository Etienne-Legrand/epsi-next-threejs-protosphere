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
      toast.success(`Projet chargé : Projet ${projectId}`);
    } else if (templateId) {
      setProjectId(templateId);
      setProjectName(`Modèle ${templateId}`);
      toast.success(`Modèle chargé : Modèle ${templateId}`);
    } else {
      setProjectId(null);
      setProjectName("Projet sans titre");
      toast.success("Nouveau projet vide créé");
    }

    // Initialiser l'historique avec l'état actuel comme point de départ
    // Important de le faire après le chargement du projet pour capturer l'état initial
    setTimeout(() => {
      clearHistory();
      toast.success("Historique annuler/refaire initialisé");
    }, 500); // Petit délai pour s'assurer que tout est bien chargé
  }, [projectId, templateId, setProjectId, setProjectName, clearHistory]);

  // Set selected object in local state and store
  const handleSelectObject = (id: string | null) => {
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
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <EditorHeader
        projectName={useEditorStore.getState().projectName}
        isCollaborating={isCollaborating}
        setIsCollaborating={handleToggleCollaboration}
      />

      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />

        <div className="flex-1 flex flex-col">
          <EditorToolbar
            selectedObject={selectedObjectId}
            setSelectedObject={handleSelectObject}
          />

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 relative">
              <EditorCanvas
                selectedObject={selectedObjectId}
                setSelectedObject={handleSelectObject}
              />
            </div>

            {showProperties && selectedObjectId && (
              <div className="w-80 border-l border-border overflow-y-auto">
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
