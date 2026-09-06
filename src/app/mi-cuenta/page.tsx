import { redirect } from "next/navigation";
import { getUser } from "@/lib/session";
import { User, Package, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { logoutUser } from "@/app/actions/auth";

export const metadata = {
  title: "Mi Cuenta | Minú Market",
};

export default async function MiCuentaPage() {
  const user = await getUser();

  // Protección de ruta: Si no hay usuario, redirigir al login.
  if (!user) {
    redirect("/iniciar");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-black text-foreground">
        Hola, {user.username} 👋
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Panel lateral */}
        <div className="space-y-4">
          <div className="radius-predefined bg-white p-6 shadow-sm ring-1 ring-border">
            <div className="flex items-center gap-4 border-b border-border pb-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center radius-predefined bg-primary/10 text-primary">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-foreground">{user.username}</p>
                <p className="text-sm text-foreground-muted">{user.email}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <Link
                href="/mi-cuenta"
                className="flex items-center gap-2 radius-button bg-primary/5 px-4 py-2 font-medium text-primary"
              >
                <User className="h-4 w-4" />
                Mi Perfil
              </Link>
              <Link
                href="/mi-cuenta/compras"
                className="flex items-center gap-2 radius-button px-4 py-2 font-medium text-foreground-muted hover:bg-surface-muted hover:text-foreground"
              >
                <Package className="h-4 w-4" />
                Mis Compras
              </Link>
              <Link
                href="/mi-cuenta/ajustes"
                className="flex items-center gap-2 radius-button px-4 py-2 font-medium text-foreground-muted hover:bg-surface-muted hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                Ajustes
              </Link>
            </nav>

            <div className="mt-6 border-t border-border pt-4">
              <form action={logoutUser} className="w-full">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 radius-button border border-red-200 px-4 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="md:col-span-2 space-y-6">
          <div className="radius-predefined bg-white p-6 shadow-sm ring-1 ring-border">
            <h2 className="mb-4 text-xl font-bold text-foreground">
              Información Personal
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
                <div className="font-medium text-foreground-muted">
                  ID de Usuario
                </div>
                <div className="col-span-2 font-mono text-sm text-foreground">
                  {user.id}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
                <div className="font-medium text-foreground-muted">Usuario</div>
                <div className="col-span-2 font-medium text-foreground">
                  @{user.username}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-2">
                <div className="font-medium text-foreground-muted">Email</div>
                <div className="col-span-2 font-medium text-foreground">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          <div className="radius-predefined border border-primary/20 bg-primary/5 p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-bold text-primary">
              ¿Tienes un comercio local?
            </h2>
            <p className="text-foreground-muted mb-4">
              Puedes empezar a vender tus productos en Minú Market de forma
              gratuita y llegar a todos tus vecinos.
            </p>
            <Link
              href="/panel-tienda"
              className="inline-flex radius-button bg-primary px-6 py-2.5 font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-md shadow-primary/20"
            >
              Crear mi Tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
