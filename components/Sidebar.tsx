"use client";

import { useState } from "react";
import { createDocument, deleteDocument } from "@/app/actions";
import type { Document } from "@/types/document";

interface SidebarProps {
  documents: Document[];
  activeId: string | null;
  onSelect: (doc: Document) => void;
}

export default function Sidebar({
  documents,
  activeId,
  onSelect,
}: SidebarProps) {
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreate() {
    setIsCreating(true);
    const doc = await createDocument();
    if (doc) {
      onSelect(doc);
    }
    setIsCreating(false);
  }

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    await deleteDocument(id);

    if (id === activeId) {
      const idx = documents.findIndex((doc) => doc.id === id);
      const next = documents[idx + 1] ?? documents[idx - 1] ?? null;
      onSelect(next);
    }
  }

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Documents
        </h2>
        <button
          onClick={handleCreate}
          disabled={isCreating}
          className="rounded-md p-1 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          aria-label="New document"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(doc)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(doc);
            }}
            className={`group flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
              activeId === doc.id
                ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <span className="truncate">{doc.title || "Untitled"}</span>
            <button
              onClick={(e) => handleDelete(e, doc.id)}
              className="hidden rounded p-0.5 text-zinc-400 hover:text-red-500 group-hover:block dark:text-zinc-600 dark:hover:text-red-400"
              aria-label="Delete document"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </nav>
    </aside>
  );
}
