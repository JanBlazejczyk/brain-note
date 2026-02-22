"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useAutosave } from "@/hooks/useAutosave";
import { useEffect } from "react";
import { getEditorExtensions } from "./editorExtensions";
import { extractTitleFromContent, getDefaultContent } from "./editorHelpers";
import "./editor.css";
import type { Document } from "@/types/document";

interface EditorProps {
  document: Document | null;
}

export default function Editor({ document }: EditorProps) {
  const save = useAutosave(document?.id ?? "");

  const editor = useEditor({
    immediatelyRender: false,
    autofocus: true,
    extensions: getEditorExtensions(),
    content: document?.content || getDefaultContent(),
    onUpdate: ({ editor }) => {
      if (!document) return;

      const note = editor.getJSON();
      const title = extractTitleFromContent(note);
      save(title, note);
    },
  });

  useEffect(() => {
    if (editor && document) {
      editor.commands.setContent(document.content || getDefaultContent());

      const isNew = document.title === "Untitled";
      if (isNew) {
        editor.commands.focus();
        editor.commands.setTextSelection(1);
      } else {
        editor.commands.focus("end");
      }
    }
  }, [document?.id, editor]);

  if (!document) {
    return (
      <div className="flex flex-1 items-center justify-center text-zinc-400 dark:text-zinc-600">
        Select or create a document
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <EditorContent editor={editor} />
    </div>
  );
}
