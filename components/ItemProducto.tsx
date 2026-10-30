"use client";

import { useState } from "react";
import Link from "next/link";
import { Producto } from "../datos/productos";
import { useCarrito } from "./CarritoContext";
import { useProductos } from "./ProductosContext";

export default function ItemProducto({
  producto: productoInicial,
}: {
  producto: Producto;
}) {
  const { agregarAlCarrito } = useCarrito();
  const { productoActual } = useProductos();
  const producto = productoActual(productoInicial);
  const [agregado, setAgregado] = useState(false);

  const manejarAgregar = () => {
    agregarAlCarrito(producto, 1);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <div className="col">
      <article className="card h-100 shadow-sm tarjeta-producto border-0">
        <div className="position-relative bg-white p-3 text-center">
          {producto.oferta && (
            <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
              Oferta
            </span>
          )}
          <span
            className={`badge position-absolute top-0 end-0 m-2 ${
              producto.enStock ? "bg-success" : "bg-danger"
            }`}
          >
            {producto.enStock ? "En stock" : "Agotado"}
          </span>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="imagen-producto mx-auto"
            style={{ maxHeight: "180px", objectFit: "contain" }}
          />
        </div>

        <div className="card-body d-flex flex-column">
          <span className="text-muted small mb-1">{producto.categoria}</span>
          <h3 className="h6 card-title fw-bold text-azul">{producto.nombre}</h3>
          <p className="card-text text-secondary small flex-grow-1">
            {producto.descripcion}
          </p>
          <p className="fs-5 fw-bold text-naranjo mb-3">{producto.precio}</p>

          <button
            type="button"
            className="btn boton btn-sm mb-2"
            onClick={manejarAgregar}
            disabled={!producto.enStock}
          >
            {producto.enStock ? "Añadir" : "Sin stock"}
          </button>

          {agregado && (
            <div
              className="alert alert-success py-1 px-2 small mb-2 text-center"
              role="status"
            >
              ¡Añadido al carrito!
            </div>
          )}

          <Link
            href={`/productos/${producto.id}`}
            className="btn btn-outline-primary btn-sm w-100 mt-auto"
          >
            Ver detalles
          </Link>
        </div>
      </article>
    </div>
  );
}
