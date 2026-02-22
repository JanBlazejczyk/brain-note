import type { JSONContent } from "@tiptap/core";

export interface Document {
  id: string;
  title: string;
  content: JSONContent;
  updated_at: string;
}
