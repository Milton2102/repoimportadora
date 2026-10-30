import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerProductoPorId } from "../../../datos/productos";
import AgregarAlCarrito from "../../../components/AgregarAlCarrito";

export const instant = false;

export default async function ProductoDetalle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const producto = obtenerProductoPorId(id);

  if (!producto) {
    notFound();
  }

  return (
    <div className="py-3">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-azul">
              Inicio
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/productos" className="text-decoration-none text-azul">
              Productos
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      <div className="card shadow-sm border-0 p-4 bg-white">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-5 text-center">
            <div className="position-relative d-inline-block">
              {producto.oferta && (
                <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 fs-6">
                  Oferta
                </span>
              )}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid rounded"
                style={{ maxHeight: "320px", objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="col-12 col-md-7">
            <span className="badge bg-primary mb-2">{producto.categoria}</span>
            <h1 className="h2 fw-bold text-azul mb-2">{producto.nombre}</h1>
            <p className="text-secondary fs-5 mb-3">{producto.descripcion}</p>
            <p className="fs-3 fw-bold text-naranjo mb-3">{producto.precio}</p>

            <AgregarAlCarrito producto={producto} />

            <div className="mt-3">
              <Link
                href="/productos"
                className="btn btn-outline-secondary px-4"
              >
                &larr; Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
