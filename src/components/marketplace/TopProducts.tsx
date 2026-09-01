// Importaciones
import { ProductCard } from "./ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

// Componente de productos más populares
export function TopProducts() {
  // Lógica y estado
  if (MOCK_PRODUCTS.length === 0) {
    return null;
  }

  return (
    <section className="bg-primary/5 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Lo que más disfrutan tus vecinos
          </h2>
          <p className="max-w-2xl text-lg text-foreground-muted">
            Mira los productos más populares en tu localidad, ¿qué estás
            esperando?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="radius-button bg-primary px-8 py-3.5 font-bold text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/20">
            Explorar todos los productos
          </button>
        </div>
      </div>
    </section>
  );
}
