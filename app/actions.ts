"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createDocument() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("documents")
    .insert({ title: "Untitled", content: {} })
    .select()
    .single();

  revalidatePath("/");
  return data;
}

export async function saveDocument(id: string, title: string, content: object) {
  const supabase = await createClient();
  await supabase.from("documents").update({ title, content }).eq("id", id);

  revalidatePath("/");
}

export async function deleteDocument(id: string) {
  const supabase = await createClient();
  await supabase.from("documents").delete().eq("id", id);

  revalidatePath("/");
}
