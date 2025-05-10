"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Search, Filter } from "lucide-react";
import DashboardHeader from "@/components/dashboard/header";

// Sample project data
const projects = [
  {
    id: "1",
    name: "Chaise moderne",
    createdAt: "il y a 2 jours",
    thumbnail: "bg-gradient-to-br from-blue-500 to-indigo-500",
  },
  {
    id: "2",
    name: "Maison simple",
    createdAt: "il y a 1 semaine",
    thumbnail: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: "3",
    name: "Prototype de téléphone",
    createdAt: "il y a 2 semaines",
    thumbnail: "bg-gradient-to-br from-green-500 to-emerald-500",
  },
  {
    id: "4",
    name: "Sculpture abstraite",
    createdAt: "il y a 1 mois",
    thumbnail: "bg-gradient-to-br from-orange-500 to-amber-500",
  },
];

const templates = [
  {
    id: "template-1",
    name: "Projet vide",
    description: "Commencez avec une toile vierge",
    thumbnail: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    id: "template-2",
    name: "Pièce basique",
    description: "Commencez avec une disposition simple de pièce",
    thumbnail: "bg-gradient-to-br from-blue-500 to-indigo-500",
  },
  {
    id: "template-3",
    name: "Présentation de produit",
    description: "Modèle pour la visualisation de produits",
    thumbnail: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: "template-4",
    name: "Architectural",
    description: "Modèle pour les conceptions architecturales",
    thumbnail: "bg-gradient-to-br from-green-500 to-emerald-500",
  },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-800 text-white">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Vos projets</h1>
            <p className="text-muted-foreground">
              Créez, gérez et organisez vos designs 3D
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher des projets..."
                className="pl-10 h-10 bg-slate-700 border-slate-600 border text-white rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="border-slate-600 bg-slate-700 hover:bg-slate-600 text-white"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-slate-700 hover:bg-slate-600 text-white">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nouveau Projet
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle>Créer un nouveau projet</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Commencez de zéro ou choisissez un modèle
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="templates" className="mt-4">
                  <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                    <TabsTrigger
                      value="templates"
                      className="data-[state=active]:bg-slate-600"
                    >
                      Modèles
                    </TabsTrigger>
                    <TabsTrigger
                      value="blank"
                      className="data-[state=active]:bg-slate-600"
                    >
                      Projet vierge
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="templates" className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <Card
                          key={template.id}
                          className="card-hover bg-slate-900 border-slate-600"
                        >
                          <CardContent className="p-4">
                            <div
                              className={`w-full h-32 rounded-md mb-3 ${template.thumbnail}`}
                            ></div>
                            <h3 className="font-medium">{template.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {template.description}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
                              asChild
                              onClick={() => setIsCreateDialogOpen(false)}
                            >
                              <Link href={`/editor?template=${template.id}`}>
                                Utiliser ce modèle
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="blank" className="mt-4">
                    <div className="text-center py-6">
                      <h3 className="font-medium mb-2">
                        Commencer avec un projet vierge
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Débutez avec une toile vierge et créez tout ce que vous
                        pouvez imaginer
                      </p>
                      <Button
                        asChild
                        onClick={() => setIsCreateDialogOpen(false)}
                        className="bg-slate-400 hover:bg-slate-300 text-slate-950"
                      >
                        <Link href="/editor">Créer un projet vierge</Link>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <DialogFooter className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="border-slate-600 bg-slate-700 hover:bg-slate-600"
                  >
                    Annuler
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Link key={project.id} href={`/editor?project=${project.id}`}>
                <Card className="card-hover h-full border border-slate-700 bg-slate-900/80 backdrop-blur text-white">
                  <CardContent className="p-0">
                    <div
                      className={`w-full h-48 rounded-t-lg ${project.thumbnail}`}
                    ></div>
                    <div className="p-4">
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Dernière modification {project.createdAt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : searchQuery ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-4">
                Aucun projet ne correspond à votre recherche
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                className="border-slate-600 bg-slate-700 hover:bg-slate-600"
              >
                Effacer la Recherche
              </Button>
            </div>
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore créé de projets
              </p>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-slate-700 hover:bg-slate-600"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Créer Votre Premier Projet
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
