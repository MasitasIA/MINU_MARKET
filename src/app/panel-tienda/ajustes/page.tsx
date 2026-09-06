import { getUser } from "@/lib/session";
import { getStoreByOwner } from "@/app/actions/store";
import { getAllCategories } from "@/app/actions/categories";
import { redirect } from "next/navigation";
import { StoreSettingsForm } from "@/components/marketplace/StoreSettingsForm";

export const metadata = {
  title: "Ajustes de Tienda | Minú Market",
};

export default async function StoreSettingsPage() {
  const user = await getUser();
  if (!user) {
    redirect("/iniciar");
  }

  const store = await getStoreByOwner(user.id);
  if (!store) {
    redirect("/panel-tienda");
  }

  const categories = await getAllCategories();

  return (
    <div className="bg-surface-muted min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Ajustes de la Tienda
          </h1>
          <p className="mt-2 text-foreground-muted">
            Modifica la información pública de tu comercio, categorías y más.
          </p>
        </div>

        <StoreSettingsForm store={store} categories={categories} />
      </div>
    </div>
  );
}
