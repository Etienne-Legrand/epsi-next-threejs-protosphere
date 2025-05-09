import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientBody } from "./ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Protosphere - Créer, Éditer, Collaborer en 3D",
  description:
    "Une plateforme moderne de modélisation et de conception 3D pour les créateurs et les équipes",
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
