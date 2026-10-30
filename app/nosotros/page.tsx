import Link from "next/link";

export default function Nosotros() {
  return (
    <div>
      <article className="card shadow-sm border-0 p-4 p-md-5 bg-white mb-4">
        <h1 className="h2 fw-bold text-azul mb-4">Nuestra importadora</h1>

        <section aria-labelledby="historia" className="mb-4">
          <h2 id="historia" className="h4 fw-bold text-azul mb-3">
            Historia del negocio
          </h2>
          <p className="fs-5 text-secondary">
            Importadora Larraín nació de la necesidad de acercar productos
            tecnológicos de primera calidad al mercado chileno a precios justos.
            Fundada en Maipú, Región Metropolitana, comenzamos como un pequeño
            emprendimiento familiar con la convicción de que todos merecen
            acceso a tecnología de punta sin pagar costos intermediarios
            inflados.
          </p>
          <p className="fs-5 text-secondary">
            A lo largo de los años hemos forjado sólidas relaciones con
            proveedores en los principales polos tecnológicos del mundo,
            incluyendo Guangzhou y Shenzhen, China. Esta red nos permite
            realizar un control de calidad riguroso en origen antes de que
            cualquier producto llegue a nuestro almacén.
          </p>
        </section>

        <section aria-labelledby="motivacion" className="mb-4">
          <h2 id="motivacion" className="h4 fw-bold text-azul mb-3">
            Nuestra motivación
          </h2>
          <p className="fs-5 text-secondary">
            Nuestro modelo de negocio se basa en el trato personalizado y la
            confianza mutua bajo el concepto{" "}
            <strong className="text-azul">&quot;Yo lo importo por ti&quot;</strong>.
            Entendemos que cada cliente tiene requerimientos únicos, por lo que
            actuamos como aliado estratégico para buscar, negociar y traer
            exactamente lo que necesitas.
          </p>
          <p className="fs-5 text-secondary mb-0">
            Nos apoyamos en una moderna plataforma tecnológica que garantiza
            total transparencia: desde la gestión en bodega y los trámites
            aduaneros hasta el seguimiento en tiempo real y el despacho seguro
            a domicilio. Transformamos la importación en una experiencia
            sencilla y confiable.
          </p>
        </section>

        <section aria-labelledby="valores">
          <h2 id="valores" className="h4 fw-bold text-azul mb-3">
            Nuestros valores
          </h2>
          <div className="row g-3">
            {[
              {
                icon: "🤝",
                titulo: "Transparencia",
                texto:
                  "Precios claros, sin costos ocultos. Siempre sabes cuánto pagas y por qué.",
              },
              {
                icon: "⚡",
                titulo: "Eficiencia",
                texto:
                  "Procesos optimizados para que tu pedido llegue en el menor tiempo posible.",
              },
              {
                icon: "🔒",
                titulo: "Confianza",
                texto:
                  "Más de 5 años de experiencia importando y cientos de clientes satisfechos.",
              },
            ].map((v) => (
              <div key={v.titulo} className="col-12 col-md-4">
                <article className="beneficio p-4 h-100">
                  <p className="fs-2 mb-1">{v.icon}</p>
                  <h3 className="h6 fw-bold text-azul">{v.titulo}</h3>
                  <p className="mb-0 text-secondary small">{v.texto}</p>
                </article>
              </div>
            ))}
          </div>
        </section>
      </article>

      <div className="card border-0 shadow-sm p-4 bg-white text-center">
        <h2 className="h4 fw-bold text-azul mb-2">
          ¿Quieres ser parte de nuestra comunidad?
        </h2>
        <p className="text-secondary mb-3">
          Regístrate y accede a ofertas exclusivas, historial de pedidos y
          atención personalizada.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link href="/registro" className="btn boton px-4 py-2">
            Crear cuenta
          </Link>
          <Link href="/contacto" className="btn btn-outline-primary px-4 py-2">
            Contáctanos
          </Link>
        </div>
      </div>
    </div>
  );
}
