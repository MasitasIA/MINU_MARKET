// Importaciones
import Link from "next/link";
import Image from "next/image";
import { Plus, Star } from "lucide-react";

// Tipos
interface ProductCardProps {
  id: string;
  storeId: string;
  storeName: string;
  name: string;
  price: number;
  image: string;
  sales: number;
  rating: number;
}

// Componente principal
export function ProductCard({
  id,
  storeId,
  storeName,
  name,
  price,
  image,
  rating,
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col radius-predefined bg-white p-3 shadow-sm ring-1 ring-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
      <Link
        href={`/productos/${id}`}
        className="relative mb-4 block aspect-square w-full overflow-hidden radius-predefined bg-surface-muted"
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 radius-predefined bg-white px-2.5 py-1 text-[10px] font-bold text-foreground shadow-sm uppercase tracking-wider">
          Popular
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-1">
        <Link
          href={`/tiendas/${storeId}`}
          className="mb-1 text-xs font-semibold text-foreground-subtle hover:text-primary transition-colors"
        >
          {storeName}
        </Link>
        <Link href={`/productos/${id}`}>
          <h3 className="mb-2 text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-1 text-xs font-medium text-foreground-muted">
              <Star className="h-3 w-3 fill-secondary text-secondary" />
              {rating}
            </div>
            <span className="text-lg font-extrabold text-foreground">
              ${price.toFixed(2)}
            </span>
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center radius-button bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white hover:scale-110 active:scale-95"
            aria-label="Añadir al carrito"
          >
            <Plus className="h-5 w-5" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
