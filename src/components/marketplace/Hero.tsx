// Importaciones
import { Tag } from "lucide-react";
import { getPopularCategories } from "@/app/actions/categories";
import { getAllLocalities } from "@/app/actions/localities";
import { HeroSearch } from "@/components/marketplace/HeroSearch";
import Link from "next/link";

// Componente Principal de Búsqueda (Hero)
export async function Hero() {
  // Lógica y Estado
  const popularCategories = await getPopularCategories(5);
  const localities = await getAllLocalities();

  // Renderizado
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
        <HeroSearch localities={localities} />

        {/* Categorías */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
          <span className="text-foreground-muted">Categorías populares:</span>
          {popularCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/productos?category=${cat.slug}`}
              className="radius-button bg-white px-4 py-1.5 text-foreground-muted shadow-sm ring-1 ring-border transition-all hover:text-primary hover:ring-primary/30 flex items-center gap-2"
            >
              {cat.icon ? <span>{cat.icon}</span> : <Tag className="h-4 w-4" />}{" "}
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
