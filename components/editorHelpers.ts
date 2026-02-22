import type { JSONContent } from "@tiptap/core";

export function getDefaultContent(): JSONContent {
  return {
    type: "doc",
    content: [{ type: "heading", attrs: { level: 1 } }, { type: "paragraph" }],
  };
}

export function extractTitleFromContent(content: JSONContent): string {
  const firstNode = content.content?.find(
    (node: JSONContent) => node.content && node.content.length > 0
  );
  
  const fullText =
    firstNode?.content
      ?.map((textNode: JSONContent) => textNode.text)
      .join("") || "";
  
  const words = fullText.split(/\s+/).filter(Boolean);
  
  if (words.length === 0) {
    return "Untitled";
  }
  
  return words.length > 5 
    ? words.slice(0, 5).join(" ") + "..." 
    : words.join(" ");
}
