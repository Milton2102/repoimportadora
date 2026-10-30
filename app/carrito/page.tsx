"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCarrito } from "../../components/CarritoContext";
import { useProductos } from "../../components/ProductosContext";
import { useAuth } from "../../components/InicioSesion";
import { validarNombre } from "../../utils/validaciones";

interface DatosCheckout {
  nombre: string;
  direccion: string;
  comuna: string;
  metodoPago: string;
  observaciones: string;
}

export default function CarritoPage() {
  const router = useRouter();
  const { usuarioActual, cargando } = useAuth();
  const {
    carrito,
    quitarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    totalUnidades,
    totalPrecio,
  } = useCarrito();

  const { descontarStock } = useProductos();

  useEffect(() => {
    if (!cargando && !usuarioActual) {
      router.push("/login");
    }
  }, [usuarioActual, cargando, router]);

  const [datos, setDatos] = useState<DatosCheckout>({
    nombre: "",
    direccion: "",
    comuna: "",
    metodoPago: "debito",
    observaciones: "",
  });

  useEffect(() => {
    if (usuarioActual) {
      setDatos((prev) => ({
        ...prev,
        nombre: usuarioActual.nombre || "",
      }));
    }
  }, [usuarioActual]);

  const [errores, setErrores] = useState<Partial<DatosCheckout>>({});
  const [compraExitosa, setCompraExitosa] = useState<boolean>(false);

  const actualizar = (campo: keyof DatosCheckout, valor: string) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  };

  const validar = (): boolean => {
    const e: Partial<DatosCheckout> = {};
    if (!validarNombre(datos.nombre)) e.nombre = "Ingresa un nombre válido.";
    if (!datos.direccion) e.direccion = "La dirección es obligatoria.";
    if (!datos.comuna) e.comuna = "La comuna es obligatoria.";
    if (!datos.metodoPago) e.metodoPago = "Selecciona un método de pago.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const finalizarCompra = (e: React.FormEvent) => {
    e.preventDefault();
    if (carrito.length === 0) return;
    if (!validar()) return;
    descontarStock(carrito);
    vaciarCarrito();
    setCompraExitosa(true);
  };

  if (cargando || !usuarioActual) {
    return (
      <div className="text-center py-5">
        <p className="text-secondary">Redirigiendo a inicio de sesión...</p>
      </div>
    );
  }

  if (compraExitosa) {
    return (
      <div className="py-3 text-center">
        <div className="card shadow-sm border-0 p-5 bg-white mx-auto" style={{ maxWidth: "600px" }}>
          <p className="display-1 mb-2">✅</p>
          <h1 className="h2 fw-bold text-azul mb-3">
            ¡Compra realizada exitosamente!
          </h1>
          <p className="text-secondary mb-4">
            Gracias por confiar en Importadora Larraín.
          </p>
          <Link href="/productos" className="btn boton px-4 py-2 mx-auto">
            Seguir comprando
          </Link>
        </div>
      </div>
    );
  }

  if (carrito.length === 0) {
    return (
      <div className="py-5 text-center">
        <p className="display-1 mb-3">🛒</p>
        <h1 className="h3 fw-bold text-azul mb-2">Tu carrito está vacío</h1>
        <p className="text-secondary mb-4">
          Agrega productos desde el catálogo para comenzar tu compra.
        </p>
        <Link href="/productos" className="btn boton px-4 py-2">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="py-2">
      <h1 className="h2 fw-bold text-azul mb-4">
        Carrito de compras
        <span className="badge bg-primary ms-2 fs-6">{totalUnidades}</span>
      </h1>

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0 bg-white">
            <div className="card-body">
              <h2 className="h5 fw-bold text-azul mb-3">Productos</h2>

              {carrito.map(({ producto, cantidad }) => (
                <div
                  key={producto.id}
                  className="d-flex align-items-center gap-3 py-3 border-bottom"
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{ width: "60px", height: "60px", objectFit: "contain" }}
                    className="rounded bg-white border"
                  />
                  <div className="flex-grow-1">
                    <p className="fw-bold mb-0 small text-azul">
                      {producto.nombre}
                    </p>
                    <p className="text-naranjo fw-bold mb-0 small">
                      {producto.precio}
                    </p>
                  </div>

                  <div className="input-group input-group-sm" style={{ maxWidth: "110px" }}>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() =>
                        actualizarCantidad(producto.id, cantidad - 1)
                      }
                      disabled={cantidad <= 1}
                    >
                      −
                    </button>
                    <span className="form-control text-center fw-semibold">
                      {cantidad}
                    </span>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() =>
                        actualizarCantidad(producto.id, cantidad + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="fw-bold mb-0 text-nowrap small" style={{ minWidth: "80px" }}>
                    $
                    {(
                      producto.precioNumerico * cantidad
                    ).toLocaleString("es-CL")}
                  </p>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    type="button"
                    onClick={() => quitarDelCarrito(producto.id)}
                    aria-label={`Quitar ${producto.nombre}`}
                  >
                    ✕
                  </button>
                </div>
              ))}

              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </button>
                <p className="fs-5 fw-bold text-azul mb-0">
                  Total: ${totalPrecio.toLocaleString("es-CL")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border-0 bg-white">
            <div className="card-body">
              <h2 className="h5 fw-bold text-azul mb-3">
                Finalizar compra
              </h2>

              <form onSubmit={finalizarCompra} noValidate>
                <div className="mb-2">
                  <label className="form-label fw-bold small">
                    Nombre <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errores.nombre ? "is-invalid" : ""}`}
                    value={datos.nombre}
                    onChange={(e) => actualizar("nombre", e.target.value)}
                  />
                  {errores.nombre && (
                    <div className="invalid-feedback">{errores.nombre}</div>
                  )}
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold small">
                    Dirección <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errores.direccion ? "is-invalid" : ""}`}
                    value={datos.direccion}
                    onChange={(e) => actualizar("direccion", e.target.value)}
                    placeholder="Av. Los Leones 123, Depto 603"
                  />
                  {errores.direccion && (
                    <div className="invalid-feedback">{errores.direccion}</div>
                  )}
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold small">
                    Comuna <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errores.comuna ? "is-invalid" : ""}`}
                    value={datos.comuna}
                    onChange={(e) => actualizar("comuna", e.target.value)}
                    placeholder="Ej: Maipú"
                  />
                  {errores.comuna && (
                    <div className="invalid-feedback">{errores.comuna}</div>
                  )}
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold small">
                    Método de pago <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select form-select-sm ${errores.metodoPago ? "is-invalid" : ""}`}
                    value={datos.metodoPago}
                    onChange={(e) => actualizar("metodoPago", e.target.value)}
                  >
                    <option value="debito">Tarjeta de Débito</option>
                    <option value="credito">Tarjeta de Crédito</option>
                  </select>
                  {errores.metodoPago && (
                    <div className="invalid-feedback">{errores.metodoPago}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small">
                    Observaciones <span className="text-muted fw-normal">(opcional)</span>
                  </label>
                  <textarea
                    className="form-control form-control-sm"
                    rows={2}
                    value={datos.observaciones}
                    onChange={(e) => actualizar("observaciones", e.target.value)}
                    placeholder="Ej: Dejar en conserjería."
                  />
                </div>

                <button
                  type="submit"
                  className="btn boton w-100 py-2 fs-5"
                >
                  Pagar ${totalPrecio.toLocaleString("es-CL")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}