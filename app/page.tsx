import { createClient } from "@/utils/supabase/server";
import AppShell from "@/components/AppShell";

export default async function Home() {
  const supabase = await createClient();
  const { data: documents } = await supabase
    .from("documents")
    .select()
    .order("updated_at", { ascending: false });

  return <AppShell documents={documents ?? []} />;
}
