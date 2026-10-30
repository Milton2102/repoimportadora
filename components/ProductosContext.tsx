"use client";

import React, { createContext, useContext, useState } from "react";
import { Producto, productos as productosIniciales } from "../datos/productos";
import { ItemCarrito } from "./CarritoContext";

interface ProductosContextType {
  productos: Producto[];
  productoActual: (producto: Producto) => Producto;
  descontarStock: (items: ItemCarrito[]) => void;
}

const ProductosContext = createContext<ProductosContextType>({
  productos: productosIniciales,
  productoActual: (producto) => producto,
  descontarStock: () => {},
});

export function ProductosProvider({ children }: { children: React.ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);

  const productoActual = (producto: Producto) => {
    return productos.find((p) => p.id === producto.id) || producto;
  };

  const descontarStock = (items: ItemCarrito[]) => {
    setProductos((prev) =>
      prev.map((p) => {
        const item = items.find((i) => i.producto.id === p.id);
        if (!item) return p;
        const stock = Math.max(p.stock - item.cantidad, 0);
        return { ...p, stock, enStock: stock > 0 };
      })
    );
  };

  return (
    <ProductosContext.Provider
      value={{ productos, productoActual, descontarStock }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos(): ProductosContextType {
  return useContext(ProductosContext);
}
