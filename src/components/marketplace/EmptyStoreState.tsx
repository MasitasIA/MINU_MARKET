// Iconos
import { Store } from "lucide-react";

// Importaciones
import Link from "next/link";

// Componente para mostrar la ausencia de tiendas
export function EmptyStoreState() {
  return (
    <div className="mx-auto max-w-3xl flex w-full flex-col items-center justify-center radius-predefined bg-surface-muted/50 p-12 text-center border-2 border-dashed border-border">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Store className="h-10 w-10" />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-foreground">
        Aún no hay tiendas cerca
      </h3>
      <p className="mb-8 max-w-sm text-foreground-muted">
        ¿Tienes un negocio local? Sé el primero en formar parte de nuestra
        comunidad y empieza a vender hoy mismo.
      </p>
      <Link
        href="/vender"
        className="radius-button bg-primary px-8 py-3.5 font-bold text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
      >
        Registrar mi tienda
      </Link>
    </div>
  );
}
