import FormularioContacto from "../../components/FormularioContacto";

export default function Contacto() {
  return (
    <div>
      <section
        aria-labelledby="titulo-contacto"
        className="text-center mb-4"
      >
        <h1 id="titulo-contacto" className="h2 fw-bold text-azul">
          Contáctanos
        </h1>
        <p className="text-secondary">
          Completa el formulario y te responderemos a través del correo
          indicado (@duoc.cl, @profesor.duoc.cl o @gmail.com).
        </p>
      </section>

      <section className="mb-5">
        <FormularioContacto />
      </section>

      <section className="row g-4" aria-label="Datos de contacto">
        <div className="col-12 col-md-4">
          <article className="dato p-4 h-100 shadow-sm">
            <h3 className="h5 fw-bold text-azul">Horario</h3>
            <p className="mb-0 text-secondary">
              Lunes a viernes, 09:00 a 18:00 horas.
            </p>
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="dato p-4 h-100 shadow-sm">
            <h3 className="h5 fw-bold text-azul">Correo</h3>
            <p className="mb-0 text-secondary">
              contacto@importadoralarrain.cl
            </p>
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="dato p-4 h-100 shadow-sm">
            <h3 className="h5 fw-bold text-azul">Ubicación</h3>
            <p className="mb-0 text-secondary">
              Maipú, Región Metropolitana de Santiago.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
