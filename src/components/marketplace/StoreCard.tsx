// Importaciones
import Link from "next/link";
import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";

// Tipos
interface StoreCardProps {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  rating: number;
  reviews_count: number;
  category_id?: string;
  is_verified?: boolean;
  cover_url?: string;
  categories?: { name: string } | null;
}

// Componente Principal
export function StoreCard({
  id,
  name,
  description,
  image_url,
  rating,
  reviews_count,
  category_id,
  is_verified,
  cover_url,
  categories,
}: StoreCardProps) {
  // Renderizado
  return (
    <Link
      href={`/tiendas/${id}`}
      className="group relative flex flex-col overflow-hidden radius-predefined bg-white shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
    >
      {/* Banner decorativo o Imagen de Portada */}
      <div className="relative h-24 w-full bg-gradient-to-br from-primary/20 via-surface-muted to-primary/10 radius-t-predefined overflow-hidden">
        {cover_url && (
          <Image
            src={cover_url}
            alt={`Portada de ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {cover_url && <div className="absolute inset-0 bg-black/20" />}

        {/* Etiqueta de categoría */}
        {category_id && categories && (
          <div className="absolute top-3 right-3 radius-predefined bg-white/90 px-3 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur-md">
            {categories.name}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        {/* Logo de la tienda */}
        <div className="relative -mt-10 mb-3 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-sm transition-transform duration-500 group-hover:scale-105">
          <Image
            src={image_url || "/placeholder-store.jpg"}
            alt={name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="mb-1 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {name}
            {is_verified && (
              <BadgeCheck className="h-4 w-4 text-primary fill-primary/10" />
            )}
          </h3>
          <div className="flex shrink-0 items-center gap-1 text-secondary">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-bold text-foreground-muted">
              {rating}
            </span>
          </div>
        </div>

        <p className="mb-4 mt-2 line-clamp-2 text-sm text-foreground-muted flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs font-medium text-foreground-subtle">
            {reviews_count} opiniones
          </span>
          <span className="flex items-center text-sm font-bold text-primary transition-colors">
            Visitar
          </span>
        </div>
      </div>
    </Link>
  );
}
