"use server";

import fs from "fs";
import path from "path";

const STATS_FILE_PATH = path.join(process.cwd(), "products-stats.json");

export interface ProductStats {
  views: number;
  sales?: number;
  rating?: number;
}

export async function recordProductView(productId: string) {
  try {
    let stats: Record<string, ProductStats> = {};
    
    if (fs.existsSync(STATS_FILE_PATH)) {
      const fileData = fs.readFileSync(STATS_FILE_PATH, "utf-8");
      stats = JSON.parse(fileData);
    }

    if (!stats[productId]) {
      stats[productId] = { views: 0 };
    }
    
    stats[productId].views += 1;

    fs.writeFileSync(STATS_FILE_PATH, JSON.stringify(stats, null, 2));
    return { success: true };
  } catch (error) {
    console.error("Error registrando visita del producto:", error);
    return { success: false };
  }
}

export async function getAllProductStats() {
  try {
    if (fs.existsSync(STATS_FILE_PATH)) {
      const fileData = fs.readFileSync(STATS_FILE_PATH, "utf-8");
      return JSON.parse(fileData) as Record<string, ProductStats>;
    }
    return {};
  } catch (error) {
    console.error("Error leyendo estadísticas de productos:", error);
    return {};
  }
}
