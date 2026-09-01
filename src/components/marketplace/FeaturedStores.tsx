// Componentes
import { StoreCard } from "./StoreCard";
import { EmptyStoreState } from "./EmptyStoreState";

// Datos
import { MOCK_STORES } from "@/lib/mock-data";

export function FeaturedStores() {
  // Si no hay tiendas, mostrar el estado de ausencia de tiendas
  if (MOCK_STORES.length === 0) {
    return (
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EmptyStoreState />
        </div>
      </section>
    );
  }

  // Renderizar las tiendas destacadas
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Tus tiendas favoritas, más cerca
          </h2>
          <p className="max-w-2xl text-lg text-foreground-muted">
            Descubre los locales mejor valorados por la comunidad. Calidad y
            cercanía garantizada.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_STORES.map((store) => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="radius-button bg-surface-muted px-8 py-3.5 font-bold text-foreground-muted ring-1 ring-border transition-all hover:bg-surface-muted hover:text-primary hover:ring-primary/30">
            Ver todas las tiendas
          </button>
        </div>
      </div>
    </section>
  );
}
