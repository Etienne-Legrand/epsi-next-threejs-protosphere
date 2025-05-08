"use client";

import React from "react";
import { Toaster } from "sonner";

export function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster theme="dark" position="top-right" richColors />
    </>
  );
}
