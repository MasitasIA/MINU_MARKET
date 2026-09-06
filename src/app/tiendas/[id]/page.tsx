import { notFound } from "next/navigation";
import { Star, MapPin, BadgeCheck, ShieldAlert, Store as StoreIcon } from "lucide-react";
import Image from "next/image";
import { getStoreById } from "@/app/actions/store";

export default async function StorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  
  // Obtenemos la tienda de la base de datos real
  const store = await getStoreById(resolvedParams.id);

  if (!store) {
    notFound();
  }

  // Cuando tengamos productos y reviews en base de datos:
  const storeProducts: any[] = [];
  const storeReviews: any[] = [];

  return (
    <div className="bg-surface-muted min-h-screen pb-16">
      {/* Banner Panorámico de Cabecera */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-800">
        {store.cover_url && (
          <Image 
            src={store.cover_url} 
            alt={`Portada de ${store.name}`} 
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Contenido sobre el banner */}
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6">
              
              {/* Avatar Flotante */}
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-xl bg-white flex items-center justify-center">
                <Image 
                  src={store.image_url || "/placeholder-store.jpg"} 
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
                  {store.is_verified && <BadgeCheck className="h-8 w-8 text-primary fill-white" />}
                </h1>
                
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-medium">
                  <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    {store.rating} ({store.reviews_count} opiniones)
                  </div>
                  {/* Dirección no está en la tabla base, la comentamos o mockeamos
                  <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <MapPin className="h-4 w-4 text-white/80" />
                    Rosario, SF
                  </div> */}
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
          {!store.is_verified && (
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
              {store.detailed_description || store.description || "Esta tienda no ha agregado una descripción detallada todavía."}
            </p>
          </div>
        </div>

        {/* Columna Derecha: Productos */}
        <div className="lg:col-span-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-6">
            Catálogo de Productos
          </h2>
          
          <div className="flex flex-col items-center justify-center p-12 text-center radius-predefined bg-white ring-1 ring-border border-dashed">
            <StoreIcon className="h-12 w-12 text-border mb-4" />
            <h3 className="text-lg font-bold text-foreground">Sin productos</h3>
            <p className="text-foreground-muted mt-2">Esta tienda aún no ha publicado productos.</p>
          </div>

          {/* Sección de Reseñas */}
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-6">
              Opiniones de Clientes
            </h2>
            
            <div className="radius-predefined bg-surface-muted p-8 text-center ring-1 ring-border border-dashed">
              <p className="text-foreground-muted">Esta tienda aún no tiene opiniones.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
