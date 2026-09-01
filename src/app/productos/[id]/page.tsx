import { notFound } from "next/navigation";
import { MOCK_PRODUCTS, MOCK_STORES, MOCK_PRODUCT_IMAGES } from "@/lib/mock-data";
import { Star, MapPin, ShoppingCart, ShieldCheck, BadgeCheck, ShieldAlert } from "lucide-react";
import { ProductGallery } from "@/components/marketplace/ProductGallery";
import Link from "next/link";
import Image from "next/image";

// Generar rutas estáticas
export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  const store = MOCK_STORES.find((s) => s.id === product.storeId);
  const images = MOCK_PRODUCT_IMAGES.filter((img) => img.productId === product.id);
  
  // Agregar imagen principal si no hay adicionales, o juntar ambas
  const allImages = images.length > 0 
    ? images.map(i => i.url) 
    : [product.image];

  return (
    <div className="bg-surface-muted min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm font-medium text-foreground-muted">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
            <li>/</li>
            <li><Link href="/productos" className="hover:text-primary">Productos</Link></li>
            <li>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* Columna Izquierda: Galería */}
          <ProductGallery images={allImages} productName={product.name} />

          {/* Columna Derecha: Detalles */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-4">
              {product.name}
            </h1>
            
            <div className="mb-6 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 font-bold text-foreground">
                <Star className="h-5 w-5 fill-secondary text-secondary" />
                {product.rating}
              </div>
              <span className="text-foreground-muted">|</span>
              <span className="text-foreground-muted">{product.sales} vendidos</span>
            </div>

            <div className="mb-8 flex items-end gap-4">
              <span className="text-4xl font-black text-foreground">
                ${product.price.toLocaleString("es-AR")}
              </span>
            </div>

            {/* Acciones */}
            <div className="mb-10 flex flex-col gap-4">
              <button className="flex h-14 items-center justify-center gap-2 radius-button bg-primary px-8 font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95">
                <ShoppingCart className="h-5 w-5" />
                Comprar ahora
              </button>
            </div>

            {/* Información de la Tienda */}
            {store && (
              <div className="mt-8 radius-predefined bg-white p-6 shadow-sm ring-1 ring-border">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground-subtle">
                  Información del Vendedor
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden radius-predefined ring-1 ring-border shadow-sm bg-surface-muted relative">
                  <Image
                    src={store.image}
                    alt={store.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                  <div>
                    <Link href={`/tiendas/${store.id}`} className="text-lg font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                      {store.name}
                      {store.isVerified && <BadgeCheck className="h-4 w-4 text-primary fill-primary/10" />}
                    </Link>
                    <div className="flex items-center gap-1 text-sm text-foreground-muted">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      {store.rating} ({store.reviews} reseñas)
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 text-sm text-foreground-muted">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{store.address}</span>
                  </div>
                  {store.isVerified ? (
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-secondary" />
                      <span>Vendedor verificado localmente</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 rounded-md bg-amber-50 p-2 text-amber-700 ring-1 ring-amber-500/20">
                      <ShieldAlert className="h-4 w-4" />
                      <span className="font-semibold">Vendedor no verificado</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
