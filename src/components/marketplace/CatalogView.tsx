"use client";

// Importaciones
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Filter, SlidersHorizontal, X, SearchX } from "lucide-react";

// Tipos
interface Product {
  id: string;
  storeId: string;
  storeName: string;
  name: string;
  price: number;
  image: string;
  sales: number;
  rating: number;
  category: string;
}

interface CatalogViewProps {
  products: Product[];
}

// Componente
export function CatalogView({ products }: CatalogViewProps) {
  // Lógica y Estado
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sincronizar búsqueda URL con el estado
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Extraer categorías únicas
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["Todas", ...Array.from(cats)];
  }, [products]);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === "Todas" || p.category === selectedCategory;
      const matchPrice = p.price <= maxPrice;
      const matchSearch = searchQuery === "" || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.storeName.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchCategory && matchPrice && matchSearch;
    });
  }, [products, selectedCategory, maxPrice, searchQuery]);

  // Renderizado
  return (
    <div className="bg-background min-h-screen pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              Catálogo de Productos
            </h1>
            {searchQuery ? (
              <p className="mt-2 text-foreground-muted">
                Resultados de búsqueda para: <strong className="text-foreground">"{searchQuery}"</strong>
              </p>
            ) : (
              <p className="mt-2 text-foreground-muted">
                Descubre lo que nuestros comercios locales tienen para ofrecerte.
              </p>
            )}
          </div>
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 radius-button bg-surface-muted px-4 py-2 text-sm font-bold ring-1 ring-border"
          >
            <Filter className="h-4 w-4" />
            Filtros
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar de Filtros (Desktop & Mobile modal) */}
          <div className={`
            fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:static md:z-auto md:bg-transparent md:backdrop-blur-none
            ${isMobileFiltersOpen ? "block" : "hidden md:block"}
          `}>
            <div className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white p-6 shadow-2xl md:static md:h-auto md:w-64 md:max-w-none md:bg-transparent md:p-0 md:shadow-none">
              
              <div className="flex items-center justify-between mb-6 md:hidden">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" /> Filtros
                </h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-surface-muted radius-button">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Categorías */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                    Categorías
                  </h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={cat}
                          checked={selectedCategory === cat}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="h-4 w-4 text-primary focus:ring-primary border-border"
                        />
                        <span className={`text-sm font-medium transition-colors ${selectedCategory === cat ? "text-primary" : "text-foreground-subtle group-hover:text-foreground"}`}>
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Precio */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 flex justify-between">
                    <span>Precio Máx.</span>
                    <span className="text-primary">${maxPrice.toLocaleString()}</span>
                  </h3>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-foreground-subtle mt-2 font-medium">
                    <span>$1.000</span>
                    <span>$100.000+</span>
                  </div>
                </div>
              </div>
              
              {/* Botón Aplicar (solo móvil) */}
              <div className="mt-8 md:hidden">
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full radius-button bg-primary py-3 text-sm font-bold text-white"
                >
                  Ver {filteredProducts.length} resultados
                </button>
              </div>

            </div>
          </div>

          {/* Grilla de Productos */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between text-sm text-foreground-muted font-medium">
              <span>Mostrando {filteredProducts.length} productos</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center radius-predefined bg-white ring-1 ring-border border-dashed shadow-sm">
                <SearchX className="h-12 w-12 text-border mb-4" />
                <h3 className="text-lg font-bold text-foreground">No hay resultados</h3>
                <p className="text-foreground-muted mt-2 max-w-sm">
                  No encontramos productos que coincidan con tus filtros o búsqueda actual.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory("Todas");
                    setMaxPrice(100000);
                  }}
                  className="mt-6 text-sm font-bold text-primary hover:underline transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
