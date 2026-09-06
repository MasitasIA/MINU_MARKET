"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAllLocalities() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("localities")
      .select("*")
      .order("ciudad", { ascending: true });

    if (error) {
      console.error("Error obteniendo localidades:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error inesperado en getAllLocalities:", error);
    return [];
  }
}
