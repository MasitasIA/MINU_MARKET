// Importaciones
import { getUser } from "@/lib/session";
import { getStoreByOwner } from "@/app/actions/store";
import { getAllLocalities } from "@/app/actions/localities";
import { redirect } from "next/navigation";
import { CreateStoreForm } from "@/components/marketplace/CreateStoreForm";
import Link from "next/link";
import { PlusCircle, Package, Settings, Star, TrendingUp } from "lucide-react";

// Metadatos
export const metadata = {
  title: "Panel de Vendedor | Minú Market",
};

// Componente del Panel de Vendedor
export default async function SellerPanelPage() {
  // Lógica y Estado
  // 1. Verificamos sesión
  const user = await getUser();
  if (!user) {
    redirect("/iniciar");
  }

  // 2. Verificamos si tiene tienda
  const store = await getStoreByOwner(user.id);

  // 3. Obtenemos localidades para el formulario
  const localities = await getAllLocalities();

  // Renderizado
  return (
    <div className="bg-surface-muted min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!store ? (
          // Vista: No tiene tienda -> Muestra el formulario para crearla
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                Convertirse en Vendedor
              </h1>
              <p className="mt-2 text-lg text-foreground-muted">
                Crea tu tienda gratis y llega a miles de clientes en Minú
                Market.
              </p>
            </div>
            <CreateStoreForm localities={localities} />
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl flex items-center gap-3">
                  {store.name}
                  {store.is_verified && (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      Verificada
                    </span>
                  )}
                </h1>
                <p className="mt-2 text-foreground-muted">
                  ID de tienda (Slug):{" "}
                  <span className="font-mono text-sm">{store.id}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/panel-tienda/ajustes"
                  className="inline-flex items-center justify-center radius-button border border-border bg-white px-4 py-2.5 text-sm font-bold text-foreground shadow-sm transition-all hover:bg-surface-muted"
                >
                  <Settings className="mr-2 h-4 w-4" /> Ajustes
                </Link>
                <Link
                  href="/panel-tienda/productos/nuevo"
                  className="inline-flex items-center justify-center radius-button bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:brightness-110"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Producto
                </Link>
              </div>
            </div>

            {/* Tarjetas de Estadísticas Simples */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
              <div className="radius-predefined bg-white p-6 shadow-sm border border-border">
                <div className="flex items-center text-foreground-muted mb-2">
                  <Package className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold text-sm">Productos Activos</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">0</p>
              </div>

              <div className="radius-predefined bg-white p-6 shadow-sm border border-border">
                <div className="flex items-center text-foreground-muted mb-2">
                  <Star className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold text-sm">Calificación Media</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {store.rating}
                </p>
                <p className="text-xs text-foreground-muted mt-1">
                  {store.reviews_count} reseñas
                </p>
              </div>

              <div className="radius-predefined bg-white p-6 shadow-sm border border-border">
                <div className="flex items-center text-foreground-muted mb-2">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold text-sm">Ventas Totales</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">0</p>
              </div>
            </div>

            {/* Lista de Productos (Mock) */}
            <div className="radius-predefined bg-white shadow-sm border border-border overflow-hidden">
              <div className="px-6 py-5 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">
                  Tus Productos
                </h3>
              </div>
              <div className="p-12 text-center text-foreground-muted">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>Aún no tienes productos a la venta.</p>
                <Link
                  href="/panel-tienda/productos/nuevo"
                  className="text-primary hover:underline font-semibold mt-2 inline-block"
                >
                  Crea tu primer producto
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
