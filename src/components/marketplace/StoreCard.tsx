// Importaciones
import Link from "next/link";
import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";

// Tipos
interface StoreCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  tags: string[];
  isVerified?: boolean;
}

// Componente Principal
export function StoreCard({
  id,
  name,
  description,
  image,
  rating,
  reviews,
  category,
  isVerified,
}: StoreCardProps) {
  return (
    <Link
      href={`/tiendas/${id}`}
      className="group relative flex flex-col overflow-hidden radius-predefined bg-white shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
    >
      <div className="relative aspect-[21/9] w-full overflow-hidden radius-predefined">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradiente para mejorar la legibilidad sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Etiqueta de categoría */}
        <div className="absolute top-3 left-3 radius-predefined bg-white/90 px-3 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur-md">
          {category}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors flex items-center gap-1.5">
            {name}
            {isVerified && (
              <BadgeCheck className="h-4 w-4 text-primary fill-primary/10" />
            )}
          </h3>
          <div className="flex items-center gap-1 text-secondary">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-bold text-foreground-muted">
              {rating}
            </span>
          </div>
        </div>

        <p className="mb-4 mt-2 text-sm text-foreground-muted line-clamp-2 flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs font-medium text-foreground-subtle">
            {reviews} opiniones
          </span>
          <span className="flex items-center text-sm font-bold text-primary transition-colors">
            Visitar
          </span>
        </div>
      </div>
    </Link>
  );
}
