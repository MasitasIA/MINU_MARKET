// Componentes
import { Hero } from "@/components/marketplace/Hero";
import { FeaturedStores } from "@/components/marketplace/FeaturedStores";
import { TopProducts } from "@/components/marketplace/TopProducts";

// Página principal
export default function Home() {
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
