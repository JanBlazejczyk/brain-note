"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Editor from "@/components/Editor";
import type { Document } from "@/types/document";

interface AppShellProps {
  documents: Document[];
}

export default function AppShell({ documents }: AppShellProps) {
  const [activeDoc, setActiveDoc] = useState<Document | null>(
    documents[0] ?? null
  );

  console.log(documents);

  return (
    <div className="flex h-screen">
      <Sidebar
        documents={documents}
        activeId={activeDoc?.id ?? null}
        onSelect={setActiveDoc}
      />
      <main className="flex-1 overflow-y-auto px-16 py-16">
        <Editor document={activeDoc} />
      </main>
    </div>
  );
}
