"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getDefaultContent } from "@/components/editorHelpers";

export async function createDocument() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("documents")
    .insert({ title: "Untitled", content: getDefaultContent() })
    .select()
    .single();

  revalidatePath("/"); // invalidate cache for homepage
  return data;
}

export async function updateDocument(
  id: string,
  title: string,
  content: object
) {
  const supabase = await createClient();
  await supabase.from("documents").update({ title, content }).eq("id", id);

  revalidatePath("/"); // invalidate cache for homepage
}

export async function deleteDocument(id: string) {
  const supabase = await createClient();
  await supabase.from("documents").delete().eq("id", id);

  revalidatePath("/"); // invalidate cache for homepage
}
