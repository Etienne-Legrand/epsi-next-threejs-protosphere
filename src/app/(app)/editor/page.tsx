"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EditorHeader from "@/components/editor/header";
import EditorSidebar from "@/components/editor/sidebar";
import EditorCanvas from "@/components/editor/canvas";
import EditorProperties from "@/components/editor/properties";
import EditorToolbar from "@/components/editor/toolbar";
import { toast } from "sonner";

export default function EditorPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");
  const templateId = searchParams.get("template");

  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [showProperties, setShowProperties] = useState(true);
  const [isCollaborating, setIsCollaborating] = useState(false);

  // Load project or template data
  useEffect(() => {
    if (projectId) {
      toast.success(`Project loaded: Project ${projectId}`);
    } else if (templateId) {
      toast.success(`Template loaded: Template ${templateId}`);
    } else {
      toast.success("New blank project created");
    }
  }, [projectId, templateId]);

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <EditorHeader
        projectName={
          projectId
            ? `Project ${projectId}`
            : templateId
            ? `Template ${templateId}`
            : "Untitled Project"
        }
        isCollaborating={isCollaborating}
        setIsCollaborating={setIsCollaborating}
      />

      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />

        <div className="flex-1 flex flex-col">
          <EditorToolbar
            selectedObject={selectedObject}
            setSelectedObject={setSelectedObject}
          />

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 relative">
              <EditorCanvas
                selectedObject={selectedObject}
                setSelectedObject={setSelectedObject}
              />
            </div>

            {showProperties && selectedObject && (
              <div className="w-80 border-l border-border overflow-y-auto">
                <EditorProperties
                  selectedObject={selectedObject}
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
