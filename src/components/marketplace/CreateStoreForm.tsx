"use client";

// Importaciones
import { useState } from "react";
import { Store, Loader2 } from "lucide-react";
import { createStore } from "@/app/actions/store";
import { useRouter } from "next/navigation";

// Tipos
interface CreateStoreFormProps {
  localities: { id: string; ciudad: string; slug: string }[];
}

// Componente de Creación de Tienda
export function CreateStoreForm({ localities = [] }: CreateStoreFormProps) {
  // Lógica y Estado
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    detailed_description: "",
    locality_id: "",
    address: "",
  });

  // Funciones
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const response = await createStore(formData);

    if (response.success) {
      // Forzamos el refresco para que el Server Component del panel note que ya tenemos tienda
      router.refresh();
    } else {
      setErrorMsg(response.error || "Ocurrió un error.");
      setIsLoading(false);
    }
  };

  // Renderizado
  return (
    <div className="mx-auto max-w-2xl radius-predefined bg-surface shadow-sm border border-border p-8">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Store className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Abre tu tienda</h2>
        <p className="mt-2 text-sm text-foreground-muted">
          Estás a un paso de empezar a vender tus productos en Minú Market.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {errorMsg && (
          <div className="radius-predefined bg-red-50 p-3 text-sm font-medium text-red-600 ring-1 ring-red-200">
            {errorMsg}
          </div>
        )}

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-bold text-foreground">
            Nombre de la Tienda <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={50}
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej. La Panadería de Juan"
            className="w-full radius-predefined border border-border bg-surface-muted px-3 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
          <p className="mt-1 text-xs text-foreground-muted">
            Este nombre será público y se usará para generar el enlace de tu tienda.
          </p>
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-bold text-foreground">
            Descripción Corta <span className="text-red-500">*</span>
          </label>
          <input
            id="description"
            name="description"
            type="text"
            required
            maxLength={120}
            value={formData.description}
            onChange={handleChange}
            placeholder="Ej. Panes artesanales y pastelería de autor"
            className="w-full radius-predefined border border-border bg-surface-muted px-3 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="detailed_description" className="mb-1 block text-sm font-bold text-foreground">
            Descripción Detallada (Opcional)
          </label>
          <textarea
            id="detailed_description"
            name="detailed_description"
            rows={4}
            value={formData.detailed_description}
            onChange={handleChange}
            placeholder="Cuéntale a tus clientes más sobre tus productos, historia o procesos de elaboración..."
            className="w-full radius-predefined border border-border bg-surface-muted px-3 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>

        <div>
          <label htmlFor="locality_id" className="mb-1 block text-sm font-bold text-foreground">
            Localidad / Ciudad <span className="text-red-500">*</span>
          </label>
          <select
            id="locality_id"
            name="locality_id"
            required
            value={formData.locality_id}
            onChange={handleChange}
            className="w-full radius-predefined border border-border bg-surface-muted px-3 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Selecciona tu localidad</option>
            {localities.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.ciudad}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="address" className="mb-1 block text-sm font-bold text-foreground">
            Dirección / Ubicación (Opcional)
          </label>
          <input
            id="address"
            name="address"
            type="text"
            maxLength={150}
            value={formData.address}
            onChange={handleChange}
            placeholder="Ej. Calle Principal 123, local 4"
            className="w-full radius-predefined border border-border bg-surface-muted px-3 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 flex w-full items-center justify-center radius-button bg-primary px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95 disabled:pointer-events-none disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando tienda...
            </>
          ) : (
            "Crear Tienda"
          )}
        </button>
      </form>
    </div>
  );
}
