import { Store } from "lucide-react";

export async function TopProducts() {
  return (
    <section className="bg-primary/5 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Lo que más disfrutan tus vecinos
          </h2>
          <p className="max-w-2xl text-lg text-foreground-muted">
            Descubre los productos más populares, calificados y vendidos en tu zona.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-12 text-center radius-predefined bg-white ring-1 ring-border border-dashed">
          <Store className="h-12 w-12 text-border mb-4" />
          <h3 className="text-lg font-bold text-foreground">El catálogo está vacío</h3>
          <p className="text-foreground-muted mt-2">Pronto nuestros vendedores empezarán a publicar sus mejores productos.</p>
        </div>
      </div>
    </section>
  );
}
