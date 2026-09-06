"use client";

// Importaciones
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Search, LayoutGrid, Store } from "lucide-react";
import Image from "next/image";
import { AuthModal } from "@/components/ui/AuthModal";
import { UserSession } from "@/lib/session";

// Componente del Navbar
export function Navbar({ user }: { user: UserSession | null }) {
  // Lógica y Estado
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/productos?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Renderizado
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Logo.svg"
              alt="Minú Market Logo"
              width={120}
              height={120}
              className="w-20 h-20 md:w-24 md:h-24"
            />
          </Link>

          {/* Buscador - Desktop */}
          <div className="hidden flex-1 items-center justify-center px-8 md:flex">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos, tiendas..."
                className="w-full radius-predefined border border-border bg-surface-muted py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                aria-label="Buscar productos o tiendas"
              />
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
            </form>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-1 sm:gap-4">
            <Link
              href="/productos"
              className="flex items-center gap-1.5 radius-button p-2 text-foreground-muted transition-colors hover:bg-surface-muted hover:text-primary"
            >
              <LayoutGrid className="h-5 w-5 sm:hidden" />
              <span className="hidden text-sm font-medium sm:block">
                Productos
              </span>
            </Link>

            <Link
              href="/panel-tienda"
              className="flex items-center gap-1.5 radius-button p-2 text-foreground-muted transition-colors hover:bg-surface-muted hover:text-primary"
            >
              <Store className="h-5 w-5 sm:hidden" />
              <span className="hidden text-sm font-medium sm:block">
                Gestión
              </span>
            </Link>

            <div className="h-6 w-px bg-border hidden sm:block"></div>

            {user ? (
              <Link
                href="/mi-cuenta"
                className="flex items-center gap-1.5 radius-button p-2 text-primary font-bold transition-colors hover:bg-primary/10"
              >
                <User className="h-5 w-5" />
                <span className="hidden text-sm sm:block">Mi Cuenta</span>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                aria-label="Ingresar a mi cuenta"
                className="flex items-center gap-1.5 radius-button p-2 text-foreground-muted transition-colors hover:bg-surface-muted hover:text-primary"
              >
                <User className="h-5 w-5" />
                <span className="hidden text-sm font-medium sm:block">
                  Ingresar
                </span>
              </button>
            )}

            <button
              aria-label="Ver carrito"
              className="relative flex items-center justify-center radius-button bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20 sm:p-2.5"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center radius-predefined bg-primary text-[10px] font-bold text-white">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Buscador - Móvil */}
        <div className="border-t border-border p-3 md:hidden">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full radius-predefined border border-border bg-surface-muted py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              aria-label="Buscar en móvil"
            />
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
          </form>
        </div>
      </header>

      {/* Modal de Autenticación */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
