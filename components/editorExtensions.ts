import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

function getPlaceholderText(nodeName: string): string {
  if (nodeName === "heading") {
    return "Untitled";
  }
  return "Press '/' for commands...";
}

export function getEditorExtensions() {
  return [
    StarterKit,
    Placeholder.configure({
      showOnlyCurrent: true,
      includeChildren: true,
      placeholder: ({ node }) => getPlaceholderText(node.type.name),
    }),
  ];
}
