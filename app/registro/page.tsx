import FormularioRegistro from "../../components/FormularioRegistro";

export default function RegistroPage() {
  return (
    <div className="py-2">
      <section aria-labelledby="titulo-registro" className="text-center mb-4">
        <h1 id="titulo-registro" className="h2 fw-bold text-azul">
          Registro de usuarios
        </h1>
        <p className="text-secondary">
          Crea tu cuenta ingresando tus datos personales.
        </p>
      </section>

      <FormularioRegistro />
    </div>
  );
}
