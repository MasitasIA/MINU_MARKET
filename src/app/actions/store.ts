"use server";

// Importaciones
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/session";
import { revalidatePath } from "next/cache";

// Función auxiliar para generar el slug (ID de la tienda) a partir del nombre
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD") // Descompone acentos
    .replace(/[\u0300-\u036f]/g, "") // Remueve acentos
    .replace(/[^a-z0-9\s-]/g, "") // Remueve caracteres especiales
    .trim()
    .replace(/\s+/g, "-"); // Reemplaza espacios por guiones
}

/**
 * Obtiene la tienda del usuario actualmente logueado.
 */
export async function getStoreByOwner(userId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("owner_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error obteniendo tienda:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error inesperado en getStoreByOwner:", error);
    return null;
  }
}

/**
 * Crea una nueva tienda para el usuario actual.
 */
export async function createStore(storeData: {
  name: string;
  description: string;
  detailed_description?: string;
  locality_id: string;
  address?: string;
}) {
  try {
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        error: "Debes iniciar sesión para crear una tienda.",
      };
    }

    const supabase = await createClient();

    // Verificamos si ya tiene una tienda
    const existingStore = await getStoreByOwner(user.id);
    if (existingStore) {
      return { success: false, error: "Ya tienes una tienda registrada." };
    }

    let slug = generateSlug(storeData.name);

    // Verificamos si el slug ya existe (búsqueda de colisiones)
    const { data: slugExists } = await supabase
      .from("stores")
      .select("id")
      .eq("id", slug)
      .maybeSingle();

    if (slugExists) {
      // Si el slug existe, le agregamos números aleatorios para hacerlo único
      slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
    }

    const { error: insertError } = await supabase.from("stores").insert({
      id: slug,
      name: storeData.name,
      owner_id: user.id,
      description: storeData.description,
      detailed_description: storeData.detailed_description || null,
      locality_id: storeData.locality_id,
      address: storeData.address || null,
    });

    if (insertError) {
      console.error("Error creando tienda:", insertError);
      return {
        success: false,
        error:
          "Ocurrió un error al crear la tienda. Por favor intenta de nuevo.",
      };
    }

    revalidatePath("/panel-tienda");
    return { success: true };
  } catch (error) {
    console.error("Error inesperado en createStore:", error);
    return { success: false, error: "Error interno del servidor." };
  }
}

/**
 * Obtiene todas las tiendas (para el inicio y el directorio de tiendas).
 */
export async function getAllStores() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("stores")
      .select("*, categories(name)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error obteniendo tiendas:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error inesperado en getAllStores:", error);
    return [];
  }
}

/**
 * Obtiene una tienda especifica por su ID (slug).
 */
export async function getStoreById(slug: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("id", slug)
      .maybeSingle();

    if (error) {
      console.error("Error obteniendo tienda:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error inesperado en getStoreById:", error);
    return null;
  }
}

/**
 * Actualiza los datos de la tienda, incluyendo la posibilidad de cambiar el ID (slug).
 */
export async function updateStore(oldSlug: string, storeData: {
  id: string; // Nuevo slug
  name: string;
  description: string;
  detailed_description?: string;
  category_id?: string;
  image_url?: string;
  cover_url?: string;
}) {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, error: "No autorizado." };
    }

    const supabase = await createClient();

    // Validar que la tienda le pertenezca
    const { data: currentStore } = await supabase
      .from("stores")
      .select("owner_id")
      .eq("id", oldSlug)
      .maybeSingle();

    if (!currentStore || currentStore.owner_id !== user.id) {
      return { success: false, error: "No tienes permiso para editar esta tienda." };
    }

    // Si est cambiando el slug, verificar que el nuevo no exista
    if (oldSlug !== storeData.id) {
      const { data: slugExists } = await supabase
        .from("stores")
        .select("id")
        .eq("id", storeData.id)
        .maybeSingle();

      if (slugExists) {
        return { success: false, error: "Ese identificador (URL) ya est en uso por otra tienda." };
      }
    }

    const { error: updateError } = await supabase
      .from("stores")
      .update({
        id: storeData.id,
        name: storeData.name,
        description: storeData.description,
        detailed_description: storeData.detailed_description || null,
        category_id: storeData.category_id || null,
        image_url: storeData.image_url || null,
        cover_url: storeData.cover_url || null,
      })
      .eq("id", oldSlug);

    if (updateError) {
      console.error("Error actualizando tienda:", updateError);
      return { success: false, error: "Error al actualizar la tienda." };
    }

    revalidatePath("/panel-tienda");
    revalidatePath("/panel-tienda/ajustes");
    return { success: true };
  } catch (error) {
    console.error("Error inesperado en updateStore:", error);
    return { success: false, error: "Error interno del servidor." };
  }
}

/**
 * Elimina una tienda definitivamente (requiere confirmacin en UI).
 */
export async function deleteStore(slug: string) {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, error: "No autorizado." };
    }

    const supabase = await createClient();

    // Validar que la tienda le pertenezca
    const { data: currentStore } = await supabase
      .from("stores")
      .select("owner_id")
      .eq("id", slug)
      .maybeSingle();

    if (!currentStore || currentStore.owner_id !== user.id) {
      return { success: false, error: "No tienes permiso para eliminar esta tienda." };
    }

    const { error } = await supabase
      .from("stores")
      .delete()
      .eq("id", slug);

    if (error) {
      console.error("Error eliminando tienda:", error);
      return { success: false, error: "Error al eliminar la tienda." };
    }

    revalidatePath("/panel-tienda");
    return { success: true };
  } catch (error) {
    console.error("Error inesperado en deleteStore:", error);
    return { success: false, error: "Error interno del servidor." };
  }
}
