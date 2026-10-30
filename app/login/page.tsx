import Link from "next/link";
import FormularioLogin from "../../components/FormularioLogin";

export default function LoginPage() {
  return (
    <div className="py-3">
      <section
        aria-labelledby="titulo-login"
        className="text-center mb-4"
      >
        <h1 id="titulo-login" className="h2 fw-bold text-azul">
          Iniciar Sesión
        </h1>
        <p className="text-secondary">
          Accede a tu cuenta para ver tus pedidos y finalizar compras.
        </p>
      </section>

      <FormularioLogin />

      <p className="text-center mt-4 text-secondary small">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="fw-bold text-azul">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
