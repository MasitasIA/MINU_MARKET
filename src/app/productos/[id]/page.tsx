import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, ShoppingCart, ShieldCheck, BadgeCheck, ShieldAlert } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  
  // Cuando tengamos Supabase products:
  // const product = await getProductById(resolvedParams.id);
  const product: any = null;

  if (!product) {
    notFound();
  }

  return (
    <div></div>
  );
}
