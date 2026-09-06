"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAllCategories() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error obteniendo categorías:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error inesperado en getAllCategories:", error);
    return [];
  }
}

export async function getPopularCategories(limit: number = 5) {
  try {
    const supabase = await createClient();
    
    // Obtenemos categorías y la cuenta de productos asociados
    // Esto asume que hay una relación de clave foránea entre categories y products
    const { data, error } = await supabase
      .from("categories")
      .select("*, products(count)");
      
    if (error) {
      console.error("Error obteniendo categorías populares:", error);
      return [];
    }
    
    // Si la DB soporta count con select, 'products' será un array con un objeto [{count: X}]
    const categoriesWithCount = (data || []).map((cat: any) => ({
      ...cat,
      productCount: cat.products && cat.products[0] ? cat.products[0].count : 0
    }));
    
    // Ordenamos en memoria (asumiendo que no hay miles de categorías)
    categoriesWithCount.sort((a, b) => b.productCount - a.productCount);
    
    return categoriesWithCount.slice(0, limit);
  } catch (error) {
    console.error("Error inesperado en getPopularCategories:", error);
    return [];
  }
}
