"use client";

import React, { createContext, useContext, useState } from "react";
import { Producto } from "../datos/productos";

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

interface CarritoContextType {
  carrito: ItemCarrito[];
  agregarAlCarrito: (producto: Producto, cantidad: number) => void;
  quitarDelCarrito: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
  vaciarCarrito: () => void;
  totalUnidades: number;
  totalPrecio: number;
}

const CarritoContext = createContext<CarritoContextType>(null!);

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const agregarAlCarrito = (producto: Producto, cantidad: number) => {
    if (!producto.enStock) return;
    setCarrito((prev) => {
      const existente = prev.find((item) => item.producto.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.producto.id === producto.id
            ? {
                ...item,
                cantidad: Math.min(item.cantidad + cantidad, producto.stock),
              }
            : item
        );
      }
      return [...prev, { producto, cantidad: Math.min(cantidad, producto.stock) }];
    });
  };

  const quitarDelCarrito = (id: string) => {
    setCarrito((prev) => prev.filter((item) => item.producto.id !== id));
  };

  const actualizarCantidad = (id: string, cantidad: number) => {
    if (cantidad < 1) return;
    setCarrito((prev) =>
      prev.map((item) =>
        item.producto.id === id
          ? { ...item, cantidad: Math.min(cantidad, item.producto.stock) }
          : item
      )
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce(
    (acc, item) => acc + item.producto.precioNumerico * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        totalUnidades,
        totalPrecio,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito(): CarritoContextType {
  return useContext(CarritoContext);
}
