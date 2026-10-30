export const DOMINIOS_PERMITIDOS_CONTACTO = [
  "@duoc.cl",
  "@profesor.duoc.cl",
  "@gmail.com",
];

export function validarCorreoContacto(correoIngresado: string): boolean {
  if (!correoIngresado) return false;
  const correo = correoIngresado.toLowerCase();
  if (correo.length === 0 || correo.length > 100) return false;

  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    formato.test(correo) &&
    DOMINIOS_PERMITIDOS_CONTACTO.some((dominio) => correo.endsWith(dominio))
  );
}

export function validarCorreoGeneral(correoIngresado: string): boolean {
  if (!correoIngresado) return false;
  const correo = correoIngresado.toLowerCase();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return correo.length > 0 && correo.length <= 100 && regex.test(correo);
}

export function calcularDv(rutSinDv: string): string {
  let suma = 0;
  let multiplicador = 2;

  for (let i = 1; i <= rutSinDv.length; i++) {
    suma += parseInt(rutSinDv.charAt(rutSinDv.length - i), 10) * multiplicador;
    multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
  }

  const resto = suma % 11;
  const dvCalculado = 11 - resto;

  if (dvCalculado === 11) return "0";
  if (dvCalculado === 10) return "k";
  return dvCalculado.toString();
}

export function validarRun(rutCompleto: string): boolean {
  if (!rutCompleto) return false;

  const limpio = rutCompleto.replace(/^0+|[\s.]+/g, "");

  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(limpio)) return false;

  const tmp = limpio.split(/[-|‐]/);
  let digv = tmp[1];
  const rut = tmp[0];

  if (digv === "K") digv = "k";

  return calcularDv(rut) === digv;
}

export function validarNombre(
  nombreIngresado: string,
  maxLargo: number = 50
): boolean {
  if (!nombreIngresado) return false;
  if (nombreIngresado.length === 0 || nombreIngresado.length >= maxLargo) {
    return false;
  }
  return isNaN(Number(nombreIngresado));
}

export function validarApellido(apellidoIngresado: string): boolean {
  if (!apellidoIngresado) return false;
  if (apellidoIngresado.length === 0 || apellidoIngresado.length >= 100) {
    return false;
  }
  return isNaN(Number(apellidoIngresado));
}

export function validarContrasena(contrasenaIngresada: string): boolean {
  if (!contrasenaIngresada) return false;
  return contrasenaIngresada.length >= 4 && contrasenaIngresada.length <= 10;
}

export function validarComentario(comentarioIngresado: string): boolean {
  if (!comentarioIngresado) return false;
  return comentarioIngresado.length > 0 && comentarioIngresado.length <= 500;
}

export interface ResultadoValidacionContacto {
  valido: boolean;
  errores: {
    nombre: string;
    correo: string;
    comentario: string;
  };
}

export function validarFormularioContacto(datos: {
  nombre: string;
  correo: string;
  comentario: string;
}): ResultadoValidacionContacto {
  const errores = { nombre: "", correo: "", comentario: "" };

  if (!validarNombre(datos.nombre, 101)) {
    errores.nombre = "Ingresa un nombre válido de hasta 100 caracteres.";
  }
  if (!validarCorreoContacto(datos.correo)) {
    errores.correo = "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }
  if (!validarComentario(datos.comentario)) {
    errores.comentario =
      "El comentario es obligatorio y debe tener hasta 500 caracteres.";
  }

  const valido = !errores.nombre && !errores.correo && !errores.comentario;
  return { valido, errores };
}
