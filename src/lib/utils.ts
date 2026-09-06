// Calculador de popularidad de productos
export function calculatePopularity(
  sales: number = 0,
  rating: number = 0,
  views: number = 0,
  maxSalesReference: number = 1000,
  maxViewsReference: number = 500,
): number {
  // Normalizar ventas (0 a 1)
  const normalizedSales = Math.min(sales / maxSalesReference, 1);

  // Normalizar rating (0 a 1) - rating máximo de 5
  const normalizedRating = rating / 5;

  // Normalizar visitas (0 a 1)
  const normalizedViews = Math.min(views / maxViewsReference, 1);

  // Calcular score final (0 a 100)
  // Pesos: Ventas 50%, Rating 30%, Visitas 20%
  const score =
    normalizedSales * 50 + normalizedRating * 30 + normalizedViews * 20;

  return Math.round(score);
}

/**
 * Retorna el tipo de badge según el puntaje
 */
export function getPopularityBadge(
  score: number,
): "top-ventas" | "tendencia" | null {
  if (score >= 80) return "top-ventas";
  if (score >= 60) return "tendencia";
  return null;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}
