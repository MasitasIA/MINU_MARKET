import { notFound } from "next/navigation";
import { MOCK_STORES, MOCK_PRODUCTS, MOCK_STORE_REVIEWS } from "@/lib/mock-data";
import { Star, MapPin, BadgeCheck, ShieldAlert, Store as StoreIcon } from "lucide-react";
import { ProductCard } from "@/components/marketplace/ProductCard";
import Image from "next/image";


export default async function StorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  console.log("DEBUG: resolvedParams.id =", resolvedParams.id);
  console.log("DEBUG: Available stores =", MOCK_STORES.map((s) => s.id));
  const store = MOCK_STORES.find((s) => s.id === resolvedParams.id);

  if (!store) {
    notFound();
  }

  // Filtrar productos que pertenecen a esta tienda
  const storeProducts = MOCK_PRODUCTS.filter((p) => p.storeId === store.id);
  const storeReviews = MOCK_STORE_REVIEWS.filter((r) => r.storeId === store.id);

  return (
    <div className="bg-surface-muted min-h-screen pb-16">
      {/* Banner Panorámico de Cabecera */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-800">
        <Image 
          src={store.image} 
          alt={store.name} 
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Contenido sobre el banner */}
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6">
              
              {/* Avatar Flotante */}
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-xl bg-white flex items-center justify-center">
                <Image 
                  src={store.image} 
                  alt={store.name} 
                  fill
                  sizes="(max-width: 640px) 96px, 128px"
                  className="object-cover" 
                />
              </div>
              
              {/* Título e info */}
              <div className="flex flex-col gap-2 text-white pb-2">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight flex items-center gap-2">
                  {store.name}
                  {store.isVerified && <BadgeCheck className="h-8 w-8 text-primary fill-white" />}
                </h1>
                
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-medium">
                  <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    {store.rating} ({store.reviews} opiniones)
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <MapPin className="h-4 w-4 text-white/80" />
                    {store.address}
                  </div>
                  <div className="flex items-center gap-1.5 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                    <StoreIcon className="h-4 w-4" />
                    {store.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Columna Izquierda: Info de Tienda */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Advertencia si no está verificado */}
          {!store.isVerified && (
            <div className="flex items-start gap-3 rounded-md bg-amber-50 p-4 text-amber-800 ring-1 ring-amber-500/30 shadow-sm">
              <ShieldAlert className="h-6 w-6 shrink-0 text-amber-600" />
              <div>
                <h3 className="font-bold text-amber-900">Vendedor no verificado</h3>
                <p className="text-sm mt-1">Recomendamos revisar la reputación y opiniones de otros compradores antes de realizar pagos externos.</p>
              </div>
            </div>
          )}

          {/* Tarjeta "Sobre Nosotros" */}
          <div className="radius-predefined bg-white p-6 shadow-sm ring-1 ring-border">
            <h3 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">
              Sobre Nosotros
            </h3>
            <p className="text-foreground-muted leading-relaxed text-sm whitespace-pre-line">
              {store.detailedDescription || store.description}
            </p>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {store.tags.map((tag: string) => (
                <span key={tag} className="bg-surface-muted px-3 py-1 text-xs font-medium text-foreground-subtle radius-predefined">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Productos */}
        <div className="lg:col-span-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-6">
            Catálogo de Productos
          </h2>
          
          {storeProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {storeProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center radius-predefined bg-white ring-1 ring-border border-dashed">
              <StoreIcon className="h-12 w-12 text-border mb-4" />
              <h3 className="text-lg font-bold text-foreground">Sin productos</h3>
              <p className="text-foreground-muted mt-2">Esta tienda aún no ha publicado productos.</p>
            </div>
          )}

          {/* Sección de Reseñas */}
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-6">
              Opiniones de Clientes
            </h2>
            
            {storeReviews.length > 0 ? (
              <div className="flex flex-col gap-4">
                {storeReviews.map((review) => (
                  <div key={review.id} className="radius-predefined bg-white p-6 ring-1 ring-border shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{review.userName}</p>
                          <p className="text-xs text-foreground-muted">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-surface-muted px-2 py-1 radius-predefined">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="text-sm font-bold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-foreground-muted text-sm leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="radius-predefined bg-surface-muted p-8 text-center ring-1 ring-border border-dashed">
                <p className="text-foreground-muted">Esta tienda aún no tiene opiniones.</p>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
