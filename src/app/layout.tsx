import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientBody } from "./ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Protosphere - Créer, Éditer, Collaborer en 3D",
  description:
    "Une plateforme 3D moderne pour créer, collaborer et prototyper vos idées en équipe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
