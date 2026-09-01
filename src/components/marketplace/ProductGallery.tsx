"use client";

// Importaciones
import { useState } from "react";
import Image from "next/image";

// Tipos
interface ProductGalleryProps {
  images: string[];
  productName: string;
}

// Componente Principal
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  // Lógica y Estado
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen Principal */}
      <div className="relative aspect-square w-full overflow-hidden radius-predefined bg-surface-muted ring-1 ring-border shadow-sm">
        <Image
          src={images[activeIndex]}
          alt={`Imagen principal del producto`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-300"
        />
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((url, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square w-full overflow-hidden radius-predefined transition-all ${
                activeIndex === index
                  ? "ring-2 ring-primary scale-95 opacity-100"
                  : "ring-1 ring-border hover:ring-primary/50 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={url}
                alt={`Miniatura ${index + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 15vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
