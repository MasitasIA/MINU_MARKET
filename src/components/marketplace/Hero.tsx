// Iconos
import { Search, MapPin } from "lucide-react";
import { LOCALITIES, PRODUCT_CATEGORIES } from "@/lib/constants";

// Hero
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary/5 py-16 sm:py-24">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('/HeroBackground.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 50%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      ></div>
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Apoya a tu barrio. <br className="hidden sm:block" />
          <span className="text-primary">Compra local y rápido.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted leading-relaxed">
          Encuentra productos únicos, comida deliciosa y servicios cerca de ti.
          Comprando aquí, ayudas a crecer a los negocios de tu ciudad.
        </p>

        {/* Buscador integrado en Hero */}
        <div className="mx-auto mt-10 max-w-3xl radius-predefined bg-white p-3 shadow-xl shadow-primary/10 ring-1 ring-border">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-foreground-subtle" />
              </div>
              <input
                type="text"
                className="h-12 w-full radius-predefined bg-surface-muted pl-12 pr-4 text-foreground placeholder:text-foreground-muted outline-none focus:bg-white focus:ring-2 focus:ring-primary/20"
                placeholder="¿Qué te apetece comprar hoy?"
              />
            </div>

            <div className="h-px w-full bg-surface-muted sm:h-12 sm:w-px"></div>

            <div className="relative sm:w-56">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <MapPin className="h-5 w-5 text-foreground-subtle" />
              </div>
              <select className="h-12 w-full appearance-none radius-predefined bg-surface-muted pl-12 pr-8 text-foreground outline-none focus:bg-white focus:ring-2 focus:ring-primary/20">
                {LOCALITIES.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="h-12 radius-button bg-primary px-8 font-bold text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 active:scale-95">
              Buscar
            </button>
          </div>
        </div>

        {/* Categorías */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
          <span className="text-foreground-muted">Categorías populares:</span>
          {PRODUCT_CATEGORIES.slice(0, 4).map((cat) => (
            <button
              key={cat.id}
              className="radius-button bg-white px-4 py-1.5 text-foreground-muted shadow-sm ring-1 ring-border transition-all hover:text-primary hover:ring-primary/30"
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
