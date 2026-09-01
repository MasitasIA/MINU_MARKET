import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { CatalogView } from "@/components/marketplace/CatalogView";

export const metadata = {
  title: "Catálogo de Productos | Minú Market",
  description: "Explora todos los productos de comercios locales.",
};

export default function ProductosPage() {
  return (
    <main>
      <CatalogView products={MOCK_PRODUCTS} />
    </main>
  );
}
