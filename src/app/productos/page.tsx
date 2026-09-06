// Importaciones
import { CatalogView } from "@/components/marketplace/CatalogView";

// Metadatos
export const metadata = {
  title: "Catálogo de Productos | Minú Market",
  description: "Explora todos los productos de comercios locales.",
};

// Componente de la Página de Productos
export default function ProductosPage() {
  // Lógica y Estado
  // Cuando tengamos Supabase products, pasaremos los datos reales aquí:
  // const products = await getAllProducts();
  const products: any[] = [];

  // Renderizado
  return (
    <main>
      <CatalogView products={products} />
    </main>
  );
}
