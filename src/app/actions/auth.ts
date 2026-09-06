"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Registra un nuevo usuario en Supabase Auth y luego
 * inserta su perfil en la tabla pública `profiles`.
 */
export async function registerUser(userData: any) {
  try {
    const supabase = await createClient();

    // 1. Crear el usuario en Supabase Auth (Tabla auth.users)
    // Pasamos los metadatos para que el trigger de la BBDD los capture e inserte en `profiles`
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.mail,
      password: userData.contrasena,
      options: {
        data: {
          username: userData.usuario,
          full_name: `${userData.nombre} ${userData.apellido}`,
          dni: userData.dni, // El trigger de la BBDD lo convierte a ::integer
        },
      },
    });

    if (authError || !authData.user) {
      console.error("Error en Auth:", authError);
      return { success: false, error: authError?.message || "Error al crear cuenta." };
    }

    // El Trigger de Supabase ('on_auth_user_created') ya insertó los datos en la tabla 'profiles'
    return { success: true };
  } catch (error) {
    console.error("Error de servidor:", error);
    return { success: false, error: "Error de servidor. Intenta de nuevo." };
  }
}

/**
 * Verifica si un nombre de usuario ya está registrado en `profiles`.
 */
export async function checkUsernameAvailability(username: string) {
  try {
    const supabase = await createClient();
    
    // Usamos maybeSingle() que no arroja error si no encuentra nada (retorna null)
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      console.error("Error buscando username:", error);
      return { available: false, error: "Error interno" };
    }

    // Si data existe, el username está tomado
    return { available: !data };
  } catch (error) {
    return { available: false, error: "Error de servidor" };
  }
}

/**
 * Inicia sesión usando Supabase Auth.
 */
export async function loginUser(emailOrUsername: string, contrasena: string) {
  try {
    const supabase = await createClient();
    
    let email = emailOrUsername;

    // Si no tiene '@', asumimos que es un username.
    // Supabase Auth requiere Email o Phone. Entonces buscamos el Email de ese username.
    if (!emailOrUsername.includes("@")) {
      const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", emailOrUsername)
        .single();
        
      if (!data) {
        return { success: false, error: "Credenciales incorrectas" };
      }
      // NOTA: Para hacer un login real por username con Supabase Auth sin tener
      // el email, es un poco complejo (requiere edge functions o leer auth.users).
      // Para este MVP, si escriben un username, fallará si no tenemos el correo,
      // así que el formulario debería forzar el email por ahora, o crear una RPC 
      // en Supabase que devuelva el correo dado un username.
      // Para evitar bloqueos, por ahora retornamos error indicando que usen email.
      return { success: false, error: "Por favor usa tu Correo Electrónico para iniciar sesión por ahora." };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: contrasena,
    });

    if (error) {
      console.error("Error detallado de login:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return { success: false, error: "Error de conexión." };
  }
}

/**
 * Cierra la sesión en Supabase y redirige.
 */
export async function logoutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
