// Datos de referencia para una futura BASE DE DATOS

export const MOCK_STORES: any[] = [
  {
    id: "la-panaderia-de-juan",
    name: "Panería de prueba",
    description: "Pan fresco todos los días y repostería artesanal.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 124,
    category: "Alimentos",
    tags: ["Pan", "Postres", "Café"],
    address: "Calle falsa, Guaminí",
    isVerified: true,
    detailedDescription:
      "Bienvenidos a La Panadería de Juan, un negocio familiar con más de 20 años de historia en el corazón de CABA. Nuestro compromiso es ofrecer productos de la más alta calidad, elaborados de forma artesanal todos los días. Nos enorgullece utilizar ingredientes frescos y seleccionados para asegurar el mejor sabor en nuestros panes, facturas y especialidades de repostería. ¡Te esperamos para endulzar tu día!",
  },
  {
    id: "moda-urbana",
    name: "Moda Urbana",
    description: "Ropa y accesorios para el día a día.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop",
    rating: 4.5,
    reviews: 89,
    category: "Ropa",
    tags: ["Indumentaria", "Zapatillas", "Urbano"],
    address: "Calle Florida 555, Guaminí",
    isVerified: false,
  },
];

export const MOCK_PRODUCTS: any[] = [
  {
    id: "prod-1",
    storeId: "moda-urbana",
    storeName: "Moda Urbana",
    name: "Zapatillas Deportivas X-Treme",
    price: 89990,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    sales: 450,
    rating: 4.8,
    category: "Ropa y Accesorios",
  },
  {
    id: "prod-2",
    storeId: "la-panaderia-de-juan",
    storeName: "La Panadería de Juan",
    name: "Docena de Medialunas de Manteca",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?q=80&w=600&auto=format&fit=crop",
    sales: 820,
    rating: 4.9,
    category: "Alimentos",
  },
  {
    id: "prod-3",
    storeId: "la-panaderia-de-juan",
    storeName: "La Panadería de Juan",
    name: "Producto de prueba",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?q=80&w=600&auto=format&fit=crop",
    sales: 820,
    rating: 2,
    category: "Alimentos",
  },
];

export const MOCK_PRODUCT_IMAGES: any[] = [
  {
    id: "img-1",
    productId: "prod-1",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "img-2",
    productId: "prod-1",
    url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "img-3",
    productId: "prod-1",
    url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "img-4",
    productId: "prod-2",
    url: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "img-5",
    productId: "prod-2",
    url: "https://images.unsplash.com/photo-1623910271000-4b2a3c74900a?q=80&w=1200&auto=format&fit=crop",
  },
];

export const MOCK_STORE_REVIEWS: any[] = [
  {
    id: "rev-1",
    storeId: "la-panaderia-de-juan",
    userId: "user-1",
    userName: "María G.",
    date: "2026-08-15",
    rating: 5,
    comment:
      "¡Las mejores medialunas de toda la ciudad! Siempre compro para los domingos y nunca decepcionan.",
  },
  {
    id: "rev-2",
    storeId: "la-panaderia-de-juan",
    userId: "user-2",
    userName: "Carlos R.",
    date: "2026-08-20",
    rating: 4,
    comment: "Muy buena calidad, aunque a veces hay mucha fila a la mañana.",
  },
  {
    id: "rev-3",
    storeId: "moda-urbana",
    userId: "user-3",
    userName: "Julieta M.",
    date: "2026-08-22",
    rating: 5,
    comment: "Me encantaron las zapatillas que compré, excelente atención.",
  },
];
