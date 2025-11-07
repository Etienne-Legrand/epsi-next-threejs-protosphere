"use client";

import Link from "next/link";
import { Bell, Settings, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900 text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[hsl(var(--accent-blue))] to-[hsl(var(--accent-purple))]"></div>
            <span className="hidden text-xl font-bold md:inline-block">
              Protosphere
            </span>
          </Link>

          <nav className="hidden items-center space-x-4 md:flex">
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Projets
            </Link>
            <Link
              // href="/gallery"
              href=""
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Galerie
            </Link>
            <Link
              // href="/learn"
              href=""
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Apprendre
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-slate-700 hover:text-white"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-slate-700 hover:text-white"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-slate-700 hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full hover:bg-slate-700"
              >
                <Avatar>
                  <AvatarImage src="/avatars/user.jpg" alt="Utilisateur" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 border-slate-700 bg-slate-800 text-white"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Jean Dupont
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    jean.dupont@exemple.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                <Link
                  // href="/profile"
                  href=""
                  className="flex w-full"
                >
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                <Link
                  // href="/settings"
                  href=""
                  className="flex w-full"
                >
                  Paramètres
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                <Link
                  // href="/billing"
                  href=""
                  className="flex w-full"
                >
                  Facturation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                <Link href="/" className="flex w-full">
                  Se déconnecter
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
