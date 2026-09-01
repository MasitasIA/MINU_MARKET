import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-white pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Enlaces Legales y Técnicos Obligatorios Destacados */}
        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row bg-primary/5 p-6 radius-predefined border border-primary/20">
          <Link 
            href="/arrepentimiento" 
            className="text-center font-extrabold text-red-600 hover:text-red-700 transition-colors underline underline-offset-4 decoration-2"
          >
            BOTÓN DE ARREPENTIMIENTO
          </Link>
          <span className="hidden sm:block text-primary/20">|</span>
          <Link 
            href="/baja-servicio" 
            className="text-center font-extrabold text-foreground-muted hover:text-foreground transition-colors underline underline-offset-4 decoration-2"
          >
            BOTÓN DE BAJA DE SERVICIO
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 mb-12">
          {/* Identificación de la Empresa */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-foreground uppercase mb-4">
              Datos de la Empresa
            </h3>
            <div className="flex flex-col gap-2 text-sm text-foreground-muted">
              <p><strong>Razón Social:</strong> [Para rellenar: Empresa S.R.L. / Tu Nombre]</p>
              <p><strong>CUIT:</strong> [Para rellenar: XX-XXXXXXXX-X]</p>
              <p><strong>Domicilio Legal:</strong> [Para rellenar: Calle, Número, Ciudad, Provincia, CP]</p>
            </div>
          </div>

          {/* Documentación de la Plataforma */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-foreground uppercase mb-4">
              Legal y Privacidad
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-foreground-muted">
              <li>
                <Link href="/terminos" className="hover:text-primary transition-colors">
                  Términos y Condiciones de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-primary transition-colors">
                  Políticas de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Defensa del Consumidor y Data Fiscal */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-bold tracking-wider text-foreground uppercase mb-4">
                Defensa del Consumidor
              </h3>
              <a 
                href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-foreground-muted hover:text-primary transition-colors block"
              >
                Dirección General de Defensa y Protección al Consumidor - Para reclamos ingrese aquí.
              </a>
            </div>

            {/* Formulario 960/D de ARCA */}
            <div>
              <h3 className="text-sm font-bold tracking-wider text-foreground uppercase mb-4">
                Data Fiscal
              </h3>
              <div className="h-24 w-16 bg-surface-muted flex items-center justify-center border border-dashed border-border radius-predefined">
                <span className="text-[10px] text-foreground-subtle text-center px-1 font-medium">QR<br/>ARCA<br/>(960/D)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground-subtle">
            © {new Date().getFullYear()} Minú Market. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

