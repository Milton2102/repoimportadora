import Link from "next/link";
import { productos } from "../datos/productos";
import ItemProducto from "../components/ItemProducto";

export default function Home() {
  const destacados = productos.filter((p) => p.destacado).slice(0, 3);

  return (
    <div>
      <section
        className="hero p-4 p-md-5 mb-5 shadow-sm"
        aria-labelledby="titulo-principal"
      >
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-7">
            <h1
              id="titulo-principal"
              className="display-5 fw-bold text-white mb-3"
            >
              Tecnología importada para disfrutar cada día
            </h1>
            <p className="lead text-light mb-4">
              Encuentra productos electrónicos seleccionados bajo el modelo
              &quot;Yo lo importo por ti&quot;. Compra simple, directa y a
              precio de importación.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link className="btn boton px-4 py-2" href="/productos">
                Ver catálogo
              </Link>
              <Link
                className="btn btn-outline-light px-4 py-2 fw-bold"
                href="/nosotros"
              >
                Conocer más
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-5 text-center">
            <img
              src="/imagenes/televisor.webp"
              alt="Televisor inteligente disponible en la tienda"
              className="img-fluid p-2 shadow"
              style={{ maxHeight: "290px", objectFit: "contain" }}
            />
          </div>
        </div>
      </section>

      <section className="mb-5" aria-labelledby="destacados">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 id="destacados" className="h3 fw-bold text-azul mb-0">
            Productos destacados
          </h2>
          <Link
            href="/productos"
            className="fw-bold text-azul text-decoration-none"
          >
            Ver catálogo completo &rarr;
          </Link>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {destacados.map((prod) => (
            <ItemProducto key={prod.id} producto={prod} />
          ))}
        </div>
      </section>

      <section className="mb-5" aria-label="Beneficios de la tienda">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <article className="beneficio p-4 h-100 shadow-sm">
              <h3 className="h5 fw-bold text-azul">Compra informada</h3>
              <p className="mb-0 text-secondary">
                Revisa las características técnicas de cada producto antes de
                solicitar tu importación. Sin sorpresas.
              </p>
            </article>
          </div>
          <div className="col-12 col-md-4">
            <article className="beneficio p-4 h-100 shadow-sm">
              <h3 className="h5 fw-bold text-azul">Atención cercana</h3>
              <p className="mb-0 text-secondary">
                Usa nuestro formulario de contacto validado para resolver dudas
                directamente con nuestros especialistas.
              </p>
            </article>
          </div>
          <div className="col-12 col-md-4">
            <article className="beneficio p-4 h-100 shadow-sm">
              <h3 className="h5 fw-bold text-azul">Precio justo</h3>
              <p className="mb-0 text-secondary">
                Al importar directamente eliminamos intermediarios y te
                ofrecemos el mejor precio disponible en el mercado.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="card border-0 shadow-sm p-4 bg-white mb-3"
        aria-labelledby="cta-registro"
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h2 id="cta-registro" className="h4 fw-bold text-azul mb-1">
              ¿Primera vez en la tienda?
            </h2>
            <p className="mb-0 text-secondary">
              Crea tu cuenta para guardar tus pedidos y recibir ofertas
              exclusivas de importación.
            </p>
          </div>
          <Link className="btn boton px-4 py-2" href="/registro">
            Crear cuenta
          </Link>
        </div>
      </section>
    </div>
  );
}
