"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCarrito } from "./CarritoContext";
import { useAuth } from "./InicioSesion";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const rutaActiva = usePathname();
  const { totalUnidades } = useCarrito();
  const { usuarioActual, cerrarSesion } = useAuth();

  const enlaces = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="header-institucional shadow-sm">
      <div className="container py-2 d-flex justify-content-between align-items-center">
        <Link
          href="/"
          className="navbar-brand fw-bold fs-4 text-white text-decoration-none"
        >
          Importadora Larraín
        </Link>
        <span className="badge bg-warning text-dark d-none d-md-inline-block">
          Yo lo importo por ti
        </span>
      </div>

      <nav
        className="navbar navbar-expand-lg navbar-dark nav-institucional py-1"
        aria-label="Navegación principal"
      >
        <div className="container">
          <button
            className="navbar-toggler my-1"
            type="button"
            onClick={() => setMenuAbierto((p) => !p)}
            aria-expanded={menuAbierto}
            aria-label="Alternar navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-wrap">
              {enlaces.map((item) => (
                <li className="nav-item" key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link px-3 py-2 text-white ${
                      rutaActiva === item.href ? "activo fw-bold" : ""
                    }`}
                    onClick={() => setMenuAbierto(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-2">
              {usuarioActual ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link px-2 py-2 text-white fw-bold">
                      Hola, {usuarioActual.nombre}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-outline-light btn-sm px-3 py-1 mx-1"
                      onClick={() => {
                        cerrarSesion();
                        setMenuAbierto(false);
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      href="/login"
                      className={`nav-link px-3 py-2 text-white ${
                        rutaActiva === "/login" ? "activo fw-bold" : ""
                      }`}
                      onClick={() => setMenuAbierto(false)}
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/registro"
                      className="btn btn-outline-light btn-sm px-3 py-1 mx-1"
                      onClick={() => setMenuAbierto(false)}
                    >
                      Registro
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link
                  href="/carrito"
                  className="btn boton btn-sm px-3 py-1 position-relative"
                  onClick={() => setMenuAbierto(false)}
                  aria-label={`Carrito con ${totalUnidades} productos`}
                >
                  🛒 Carrito
                  {totalUnidades > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalUnidades}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}