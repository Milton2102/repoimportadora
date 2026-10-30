"use client";

import { useState } from "react";
import Link from "next/link";
import { Producto } from "../datos/productos";
import { useCarrito } from "./CarritoContext";
import { useProductos } from "./ProductosContext";

export default function AgregarAlCarrito({
  producto: productoInicial,
}: {
  producto: Producto;
}) {
  const { agregarAlCarrito } = useCarrito();
  const { productoActual } = useProductos();
  const producto = productoActual(productoInicial);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const manejarAgregar = () => {
    agregarAlCarrito(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 3000);
  };

  return (
    <div>
      <p className="mb-4">
        <strong>Disponibilidad: </strong>
        <span
          className={
            producto.enStock ? "text-success fw-bold" : "text-danger fw-bold"
          }
        >
          {producto.enStock
            ? `En stock (${producto.stock} unidades) — despacho inmediato`
            : "Agotado temporalmente (importación a pedido)"}
        </span>
      </p>

      {producto.enStock ? (
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <div className="input-group" style={{ maxWidth: "140px" }}>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setCantidad(cantidad - 1)}
              disabled={cantidad <= 1}
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <span className="form-control text-center fw-semibold">
              {cantidad}
            </span>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setCantidad(cantidad + 1)}
              disabled={cantidad >= producto.stock}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="btn boton px-4 py-2"
            onClick={manejarAgregar}
          >
            Añadir al carrito
          </button>
        </div>
      ) : (
        <div className="d-flex flex-wrap gap-3">
          <button className="btn boton px-4 py-2" disabled>
            Sin stock
          </button>
          <Link href="/contacto" className="btn btn-outline-primary px-4 py-2">
            Consultar disponibilidad
          </Link>
        </div>
      )}

      {agregado && (
        <div className="alert alert-success mt-3 py-2" role="status">
          ¡Producto añadido al carrito!{" "}
          <Link href="/carrito" className="alert-link">
            Ver carrito →
          </Link>
        </div>
      )}
    </div>
  );
}
