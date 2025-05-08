"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search, Filter } from "lucide-react";
import DashboardHeader from "@/components/dashboard/header";

// Sample project data
const projects = [
  {
    id: "1",
    name: "Modern Chair",
    createdAt: "2 days ago",
    thumbnail: "bg-gradient-to-br from-blue-500 to-indigo-500",
  },
  {
    id: "2",
    name: "Simple House",
    createdAt: "1 week ago",
    thumbnail: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: "3",
    name: "Phone Prototype",
    createdAt: "2 weeks ago",
    thumbnail: "bg-gradient-to-br from-green-500 to-emerald-500",
  },
  {
    id: "4",
    name: "Abstract Sculpture",
    createdAt: "1 month ago",
    thumbnail: "bg-gradient-to-br from-orange-500 to-amber-500",
  },
];

const templates = [
  {
    id: "template-1",
    name: "Empty Project",
    description: "Start with a blank canvas",
    thumbnail: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    id: "template-2",
    name: "Basic Room",
    description: "Start with a simple room layout",
    thumbnail: "bg-gradient-to-br from-blue-500 to-indigo-500",
  },
  {
    id: "template-3",
    name: "Product Showcase",
    description: "Template for product visualization",
    thumbnail: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: "template-4",
    name: "Architectural",
    description: "Template for architectural designs",
    thumbnail: "bg-gradient-to-br from-green-500 to-emerald-500",
  },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Your Projects</h1>
            <p className="text-muted-foreground">Create, manage, and organize your 3D designs</p>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 h-10 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Start from scratch or choose a template
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="templates" className="mt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="blank">Blank Project</TabsTrigger>
                  </TabsList>

                  <TabsContent value="templates" className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <Card key={template.id} className="card-hover">
                          <CardContent className="p-4">
                            <div className={`w-full h-32 rounded-md mb-3 ${template.thumbnail}`}></div>
                            <h3 className="font-medium">{template.name}</h3>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full"
                              asChild
                              onClick={() => setIsCreateDialogOpen(false)}
                            >
                              <Link href={`/editor?template=${template.id}`}>
                                Use Template
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="blank" className="mt-4">
                    <div className="text-center py-6">
                      <h3 className="font-medium mb-2">Start with a blank project</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Begin with an empty canvas and create anything you can imagine
                      </p>
                      <Button
                        asChild
                        onClick={() => setIsCreateDialogOpen(false)}
                      >
                        <Link href="/editor">Create Blank Project</Link>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
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
                <Card className="card-hover h-full">
                  <CardContent className="p-0">
                    <div className={`w-full h-48 rounded-t-lg ${project.thumbnail}`}></div>
                    <div className="p-4">
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">Last edited {project.createdAt}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            searchQuery ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground mb-4">No projects match your search</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't created any projects yet</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
