import datosPrueba from "../datos_prueba.json";

export interface Producto {
  id: string;
  category: string;
  price: string;
  precioNumerico: number;
  stocked: boolean;
  oferta?: boolean;
  destacado?: boolean;
  name: string;
  image: string;
  description: string;
}

export const API_BASE_URL = "http://localhost:4000/products";

export async function obtenerProductos(
  fetchImpl: typeof fetch = fetch
): Promise<Producto[]> {
  try {
    const response = await fetchImpl(`${API_BASE_URL}/`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data as Producto[];
  } catch {
    return datosPrueba.products as Producto[];
  }
}

export async function obtenerProductoPorId(
  slug: string,
  fetchImpl: typeof fetch = fetch
): Promise<Producto | null> {
  try {
    const response = await fetchImpl(`${API_BASE_URL}/${slug}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return null;
    }
    const producto = await response.json();
    if (!producto || !producto.id) {
      return null;
    }
    return producto as Producto;
  } catch {
    const encontrado = (datosPrueba.products as Producto[]).find(
      (p) => p.id === String(slug)
    );
    return encontrado || null;
  }
}
