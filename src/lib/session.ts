import { createClient } from "@/lib/supabase/server";

export interface UserSession {
  id: string;
  email: string;
  username: string;
}

/**
 * Obtiene el usuario actual logueado leyendo la sesión real de Supabase.
 */
export async function getUser(): Promise<UserSession | null> {
  try {
    const supabase = await createClient();
    
    // 1. Obtener la sesión segura (verifica JWT y cookies)
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return null;
    }

    // 2. Obtener el perfil extendido (username) desde la tabla pública
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    return {
      id: user.id,
      email: user.email || "",
      username: profile?.username || "Usuario",
    };
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return null;
  }
}
