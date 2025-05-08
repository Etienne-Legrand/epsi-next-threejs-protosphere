"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Save, Share2, ArrowLeft, Users, MoreVertical,
  Download, GitFork, Settings, ExternalLink, User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface EditorHeaderProps {
  projectName: string;
  isCollaborating: boolean;
  setIsCollaborating: (value: boolean) => void;
}

export default function EditorHeader({ projectName, isCollaborating, setIsCollaborating }: EditorHeaderProps) {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState(projectName);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Project saved successfully");
    }, 1000);
  };

  const handleRename = () => {
    // Handle project rename
    toast.success(`Project renamed to ${newProjectName}`);
    setIsRenameDialogOpen(false);
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format}...`);
  };

  const handleStartCollaboration = () => {
    setIsCollaborating(true);
    toast.success("Collaboration mode enabled - Share the link to collaborate");
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Back to Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[hsl(var(--accent-blue))] to-[hsl(var(--accent-purple))]"></div>

          <div className="flex items-center">
            <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="h-auto py-1.5 px-2">
                  <span className="font-medium truncate max-w-[180px]">{projectName}</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename Project</DialogTitle>
                  <DialogDescription>
                    Enter a new name for your project
                  </DialogDescription>
                </DialogHeader>
                <Input
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Project name"
                  className="mt-4"
                />
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleRename}>Rename</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCollaborating && (
            <div className="flex items-center gap-1.5 mr-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/avatars/user.jpg" alt="User" />
                <AvatarFallback><User className="h-3 w-3" /></AvatarFallback>
              </Avatar>
              <Avatar className="h-6 w-6">
                <AvatarImage src="/avatars/sarah.jpg" alt="Sarah" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">2 users</span>
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save Project (Ctrl+S)</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {!isCollaborating ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleStartCollaboration}>
                    <Users className="h-4 w-4 mr-2" />
                    Collaborate
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Start Collaboration Session</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share Collaboration Link</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>More Options</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Project Options</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleExport("STL")}>
                <Download className="h-4 w-4 mr-2" />
                Export as STL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("OBJ")}>
                <Download className="h-4 w-4 mr-2" />
                Export as OBJ
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("GLTF")}>
                <Download className="h-4 w-4 mr-2" />
                Export as GLTF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <GitFork className="h-4 w-4 mr-2" />
                Duplicate Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Project Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Window
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
