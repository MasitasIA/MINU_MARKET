"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

// Tipos
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Componente Principal
export default function Error({ error, reset }: ErrorProps) {
  // Efecto secundario
  useEffect(() => {
    // Loguear el error a un servicio externo de monitoreo si existiera
    console.error("Error global capturado:", error);
  }, [error]);

  // Renderizado
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center radius-predefined bg-red-50 text-red-500 ring-1 ring-red-500/20">
        <AlertTriangle className="h-12 w-12" />
      </div>

      <h1 className="mb-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
        ¡Uy! Algo salió mal
      </h1>
      <p className="mb-8 max-w-md text-foreground-muted">
        Ocurrió un error inesperado al procesar tu solicitud. Estamos trabajando
        para solucionarlo.
      </p>

      <button
        onClick={() => reset()}
        className="flex items-center justify-center gap-2 radius-button bg-primary px-8 py-3 font-bold text-white transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-sm"
      >
        <RefreshCcw className="h-5 w-5" />
        Intentar de nuevo
      </button>
    </div>
  );
}
