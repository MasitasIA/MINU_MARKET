// Importaciones
import { Hero } from "@/components/marketplace/Hero";
import { FeaturedStores } from "@/components/marketplace/FeaturedStores";
import { TopProducts } from "@/components/marketplace/TopProducts";

// Componente de Página Principal
export default function Home() {
  // Renderizado
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <Hero />
        <FeaturedStores />
        <TopProducts />
      </main>
    </div>
  );
}
