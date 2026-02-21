"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import type { JSONContent } from "@tiptap/core";
import { useAutosave } from "@/hooks/useAutosave";
import { useEffect } from "react";
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
    extensions: [
      StarterKit,
      Placeholder.configure({
        showOnlyCurrent: true,
        includeChildren: true,
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Untitled";
          }

          return "Press '/' for commands...";
        },
      }),
    ],
    content: document?.content || {
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 1 } },
        { type: "paragraph" },
      ],
    },
    onUpdate: ({ editor }) => {
      if (!document) return;

      const note: JSONContent = editor.getJSON();
      const firstNode = note.content?.find(
        (node: JSONContent) => node.content && node.content.length > 0
      );
      const fullText =
        firstNode?.content
          ?.map((textNode: JSONContent) => textNode.text)
          .join("") || "";
      const words = fullText.split(/\s+/).filter(Boolean);
      let title = "Untitled";

      if (words.length > 0) {
        title =
          words.length > 5
            ? words.slice(0, 5).join(" ") + "..."
            : words.join(" ");
      }

      save(title, note);
    },
  });

  useEffect(() => {
    if (editor && document) {
      editor.commands.setContent(
        document.content || {
          type: "doc",
          content: [
            { type: "heading", attrs: { level: 1 } },
            { type: "paragraph" },
          ],
        }
      );

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
