import {
  validarCorreoContacto,
  validarCorreoGeneral,
  calcularDv,
  validarRun,
  validarNombre,
  validarApellido,
  validarContrasena,
  validarComentario,
  validarFormularioContacto,
} from "../utils/validaciones";
import { obtenerProductos, obtenerProductoPorId } from "../utils/productosApi";

describe("Validaciones y servicio de productos", () => {
  describe("Correo de contacto", () => {
    it("acepta los dominios @duoc.cl, @profesor.duoc.cl y @gmail.com", () => {
      expect(validarCorreoContacto("milton@duoc.cl")).toBeTrue();
      expect(validarCorreoContacto("docente@profesor.duoc.cl")).toBeTrue();
      expect(validarCorreoContacto("cliente@gmail.com")).toBeTrue();
    });

    it("rechaza correos vacíos, sin formato o de otros dominios", () => {
      expect(validarCorreoContacto("")).toBeFalse();
      expect(validarCorreoContacto("usuario@hotmail.com")).toBeFalse();
      expect(validarCorreoContacto("correosinformato")).toBeFalse();
      expect(validarCorreoContacto("a".repeat(95) + "@duoc.cl")).toBeFalse();
    });
  });

  describe("RUN chileno", () => {
    it("calcula el dígito verificador", () => {
      expect(calcularDv("11111111")).toBe("1");
      expect(calcularDv("12345678")).toBe("5");
      expect(calcularDv("24967107")).toBe("k");
      expect(calcularDv("24967101")).toBe("0");
    });

    it("valida RUN correctos con o sin puntos", () => {
      expect(validarRun("11.111.111-1")).toBeTrue();
      expect(validarRun("12345678-5")).toBeTrue();
      expect(validarRun("24967107-K")).toBeTrue();
      expect(validarRun("24.967.101-0")).toBeTrue();
    });

    it("rechaza RUN inválidos", () => {
      expect(validarRun("")).toBeFalse();
      expect(validarRun("12345678-9")).toBeFalse();
      expect(validarRun("123456785")).toBeFalse();
      expect(validarRun("abcdef-1")).toBeFalse();
    });
  });

  describe("Nombre, apellido, correo, contraseña y comentario", () => {
    it("valida nombres y apellidos no numéricos", () => {
      expect(validarNombre("Milton")).toBeTrue();
      expect(validarNombre("")).toBeFalse();
      expect(validarNombre("12345")).toBeFalse();
      expect(validarApellido("Espinoza")).toBeTrue();
      expect(validarApellido("")).toBeFalse();
      expect(validarApellido("9999")).toBeFalse();
    });

    it("valida el correo general y el largo de la contraseña", () => {
      expect(validarCorreoGeneral("cliente@empresa.cl")).toBeTrue();
      expect(validarCorreoGeneral("")).toBeFalse();
      expect(validarCorreoGeneral("invalido")).toBeFalse();
      expect(validarContrasena("1234")).toBeTrue();
      expect(validarContrasena("1234567890")).toBeTrue();
      expect(validarContrasena("123")).toBeFalse();
      expect(validarContrasena("12345678901")).toBeFalse();
    });

    it("valida el comentario y el formulario de contacto completo", () => {
      expect(validarComentario("Excelente servicio")).toBeTrue();
      expect(validarComentario("")).toBeFalse();
      expect(validarComentario("a".repeat(501))).toBeFalse();

      const valido = validarFormularioContacto({
        nombre: "Felipe Zapata",
        correo: "felipe@duoc.cl",
        comentario: "Necesito cotizar un proyector.",
      });
      expect(valido.valido).toBeTrue();

      const invalido = validarFormularioContacto({
        nombre: "",
        correo: "felipe@outlook.com",
        comentario: "",
      });
      expect(invalido.valido).toBeFalse();
      expect(invalido.errores.nombre).not.toBe("");
      expect(invalido.errores.correo).not.toBe("");
      expect(invalido.errores.comentario).not.toBe("");
    });
  });

  describe("Servicio de productos con mocks", () => {
    it("obtiene la lista desde un fetch exitoso", async () => {
      const fetchMock = jasmine.createSpy("fetch").and.resolveTo({
        ok: true,
        status: 200,
        json: async () => [{ id: "99", name: "Audífono Mock" }],
      });

      const resultado = await obtenerProductos(fetchMock);

      expect(fetchMock).toHaveBeenCalledWith("http://localhost:4000/products/", {
        cache: "no-store",
      });
      expect(resultado.length).toBe(1);
      expect(resultado[0].name).toBe("Audífono Mock");
    });

    it("usa el catálogo local cuando el fetch falla", async () => {
      const fetchFallido = jasmine
        .createSpy("fetchError")
        .and.rejectWith(new Error("Servidor apagado"));

      const resultado = await obtenerProductos(fetchFallido);

      expect(fetchFallido).toHaveBeenCalled();
      expect(resultado.length).toBeGreaterThanOrEqual(10);
      expect(resultado[0].name).toBe("Televisor mundial");
    });

    it("obtiene un producto por id, devuelve null si no existe y usa respaldo sin conexión", async () => {
      const fetchOk = jasmine.createSpy("fetchOk").and.resolveTo({
        ok: true,
        status: 200,
        json: async () => ({ id: "1", name: "Televisor mundial" }),
      });
      const producto = await obtenerProductoPorId("1", fetchOk);
      expect(producto.name).toBe("Televisor mundial");

      const fetch404 = jasmine.createSpy("fetch404").and.resolveTo({
        ok: false,
        status: 404,
        json: async () => ({}),
      });
      expect(await obtenerProductoPorId("999", fetch404)).toBeNull();

      const fetchOffline = jasmine
        .createSpy("fetchOffline")
        .and.rejectWith(new Error("Offline"));
      const respaldo = await obtenerProductoPorId("2", fetchOffline);
      expect(respaldo.name).toBe("Audífonos inalámbricos");
    });
  });
});
