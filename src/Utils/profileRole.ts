import { supabase } from "../supabase";

export type ProfileRole = "admin" | "user";

export async function getProfileRole(userId: string): Promise<ProfileRole> {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data?.role) {
    return "user";
  }

  return data.role === "admin" ? "admin" : "user";
}
