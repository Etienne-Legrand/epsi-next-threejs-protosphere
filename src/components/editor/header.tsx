"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Save,
  Share2,
  ArrowLeft,
  Users,
  MoreVertical,
  Download,
  GitFork,
  Settings,
  ExternalLink,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface EditorHeaderProps {
  projectName: string;
  isCollaborating: boolean;
  setIsCollaborating: (value: boolean) => void;
}

export default function EditorHeader({
  projectName,
  isCollaborating,
  setIsCollaborating,
}: EditorHeaderProps) {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState(projectName);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Projet enregistré avec succès");
    }, 1000);
  };

  const handleRename = () => {
    // Handle project rename
    toast.success(`Projet renommé en ${newProjectName}`);
    setIsRenameDialogOpen(false);
  };

  const handleExport = (format: string) => {
    toast.success(`Exportation au format ${format}...`);
  };

  const handleStartCollaboration = () => {
    setIsCollaborating(true);
    toast.success(
      "Mode collaboration activé - Partagez le lien pour collaborer"
    );
  };

  return (
    <header className="border-b border-slate-700 bg-slate-900 backdrop-blur z-10 text-white">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-slate-700"
                >
                  <Link href="/dashboard">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Retour au Tableau de bord</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[hsl(var(--accent-blue))] to-[hsl(var(--accent-purple))]"></div>

          <div className="flex items-center">
            <Dialog
              open={isRenameDialogOpen}
              onOpenChange={setIsRenameDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto py-1.5 px-2 hover:bg-slate-700"
                >
                  <span className="font-medium truncate max-w-[180px]">
                    {projectName}
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Renommer le Projet</DialogTitle>
                  <DialogDescription>
                    Entrez un nouveau nom pour votre projet
                  </DialogDescription>
                </DialogHeader>
                <Input
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Nom du projet"
                  className="mt-4"
                />
                <DialogFooter className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsRenameDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleRename}>Renommer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCollaborating && (
            <div className="flex items-center gap-1.5 mr-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/avatars/user.jpg" alt="Utilisateur" />
                <AvatarFallback>
                  <User className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
              <Avatar className="h-6 w-6">
                <AvatarImage src="/avatars/sarah.jpg" alt="Sarah" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                2 utilisateurs
              </span>
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-slate-800 border-slate-600 hover:bg-slate-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Enregistrer le Projet (Ctrl+S)</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {!isCollaborating ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStartCollaboration}
                    className="bg-slate-800 border-slate-600 hover:bg-slate-700 text-white"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Collaborer
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Démarrer une Session de Collaboration
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-800 border-slate-600 hover:bg-slate-700 text-white"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Partager le Lien de Collaboration
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-slate-800 border-slate-600 hover:bg-slate-700 text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Plus d'Options</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options du Projet</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleExport("STL")}>
                <Download className="h-4 w-4 mr-2" />
                Exporter en STL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("OBJ")}>
                <Download className="h-4 w-4 mr-2" />
                Exporter en OBJ
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("GLTF")}>
                <Download className="h-4 w-4 mr-2" />
                Exporter en GLTF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <GitFork className="h-4 w-4 mr-2" />
                Dupliquer le Projet
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Paramètres du Projet
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ExternalLink className="h-4 w-4 mr-2" />
                Ouvrir dans une Nouvelle Fenêtre
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
