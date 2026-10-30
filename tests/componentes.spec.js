import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemProducto from "../components/ItemProducto";
import AgregarAlCarrito from "../components/AgregarAlCarrito";
import FormularioContacto from "../components/FormularioContacto";
import FormularioLogin from "../components/FormularioLogin";
import FormularioRegistro from "../components/FormularioRegistro";
import PaginaProductos from "../app/productos/page";
import { AuthProvider } from "../components/InicioSesion";
import { CarritoProvider, useCarrito } from "../components/CarritoContext";
import { ProductosProvider, useProductos } from "../components/ProductosContext";
import { productos } from "../datos/productos";
import { routerMock } from "./mocks/nextNavigationMock";

const televisor = productos.find((p) => p.id === "1");
const sinStock = productos.find((p) => p.id === "5");
const camara = productos.find((p) => p.id === "11");

function renderizar(ui) {
  return render(
    <AuthProvider>
      <ProductosProvider>
        <CarritoProvider>{ui}</CarritoProvider>
      </ProductosProvider>
    </AuthProvider>
  );
}

function TotalCarrito() {
  const { totalUnidades } = useCarrito();
  return <span data-testid="total">{totalUnidades}</span>;
}

function PanelCarrito({ producto }) {
  const {
    agregarAlCarrito,
    actualizarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
    totalUnidades,
    totalPrecio,
  } = useCarrito();

  return (
    <div>
      <button onClick={() => agregarAlCarrito(producto, 2)}>agregar</button>
      <button onClick={() => actualizarCantidad(producto.id, 5)}>actualizar</button>
      <button onClick={() => quitarDelCarrito(producto.id)}>quitar</button>
      <button onClick={vaciarCarrito}>vaciar</button>
      <span data-testid="unidades">{totalUnidades}</span>
      <span data-testid="precio">{totalPrecio}</span>
    </div>
  );
}

function PanelStock({ producto }) {
  const { descontarStock, productoActual } = useProductos();
  const actual = productoActual(producto);

  return (
    <div>
      <button onClick={() => descontarStock([{ producto, cantidad: 3 }])}>comprar</button>
      <span data-testid="stock">{actual.stock}</span>
      <span data-testid="disponible">{String(actual.enStock)}</span>
    </div>
  );
}

describe("Componentes React", () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe("Navbar y Footer", () => {
    it("muestra la marca, los enlaces de sesión y alterna el menú móvil", () => {
      renderizar(<Navbar />);

      expect(screen.getByText("Importadora Larraín")).toBeTruthy();
      expect(screen.getByText("Iniciar sesión")).toBeTruthy();
      expect(screen.getByText("Registro")).toBeTruthy();
      expect(screen.getByLabelText("Carrito con 0 productos")).toBeTruthy();

      const botonMenu = screen.getByLabelText("Alternar navegación");
      expect(botonMenu.getAttribute("aria-expanded")).toBe("false");
      fireEvent.click(botonMenu);
      expect(botonMenu.getAttribute("aria-expanded")).toBe("true");
    });

    it("muestra el nombre del usuario con sesión activa y permite cerrar sesión", async () => {
      localStorage.setItem(
        "sesion_usuario",
        JSON.stringify({ nombre: "Ana", correo: "ana@duoc.cl", contrasena: "1234" })
      );
      renderizar(<Navbar />);

      expect(await screen.findByText("Hola, Ana")).toBeTruthy();

      fireEvent.click(screen.getByText("Cerrar sesión"));
      expect(screen.queryByText("Hola, Ana")).toBeNull();
      expect(screen.getByText("Iniciar sesión")).toBeTruthy();
    });

    it("muestra el texto del Footer", () => {
      render(<Footer />);

      expect(
        screen.getByText("Importadora Larraín · Tecnología importada para ti")
      ).toBeTruthy();
      expect(
        screen.getByText("Proyecto académico Desarrollo Fullstack II (DSY1104)")
      ).toBeTruthy();
    });
  });

  describe("Contextos de carrito y stock", () => {
    it("agrega, actualiza, quita y vacía productos del carrito", () => {
      renderizar(<PanelCarrito producto={televisor} />);

      fireEvent.click(screen.getByText("agregar"));
      expect(screen.getByTestId("unidades").textContent).toBe("2");
      expect(screen.getByTestId("precio").textContent).toBe(String(televisor.precioNumerico * 2));

      fireEvent.click(screen.getByText("actualizar"));
      expect(screen.getByTestId("unidades").textContent).toBe("5");

      fireEvent.click(screen.getByText("quitar"));
      expect(screen.getByTestId("unidades").textContent).toBe("0");

      fireEvent.click(screen.getByText("agregar"));
      fireEvent.click(screen.getByText("vaciar"));
      expect(screen.getByTestId("unidades").textContent).toBe("0");
    });

    it("no permite agregar más unidades que el stock disponible", () => {
      renderizar(<PanelCarrito producto={camara} />);

      fireEvent.click(screen.getByText("agregar"));
      fireEvent.click(screen.getByText("agregar"));

      expect(screen.getByTestId("unidades").textContent).toBe(String(camara.stock));
    });

    it("descuenta el stock y marca el producto como agotado", () => {
      renderizar(<PanelStock producto={camara} />);

      expect(screen.getByTestId("stock").textContent).toBe("3");
      expect(screen.getByTestId("disponible").textContent).toBe("true");

      fireEvent.click(screen.getByText("comprar"));

      expect(screen.getByTestId("stock").textContent).toBe("0");
      expect(screen.getByTestId("disponible").textContent).toBe("false");
    });
  });

  describe("ItemProducto", () => {
    it("muestra los datos del producto, el enlace al detalle y lo agrega al carrito", () => {
      renderizar(
        <>
          <ItemProducto producto={televisor} />
          <TotalCarrito />
        </>
      );

      expect(screen.getByText(televisor.nombre)).toBeTruthy();
      expect(screen.getByText(televisor.precio)).toBeTruthy();
      expect(screen.getByText("En stock")).toBeTruthy();
      expect(screen.getByText("Ver detalles").getAttribute("href")).toBe("/productos/1");

      fireEvent.click(screen.getByText("Añadir"));

      expect(screen.getByText("¡Añadido al carrito!")).toBeTruthy();
      expect(screen.getByTestId("total").textContent).toBe("1");
    });

    it("deshabilita el botón cuando el producto está agotado", () => {
      renderizar(
        <>
          <ItemProducto producto={sinStock} />
          <TotalCarrito />
        </>
      );

      const boton = screen.getByText("Sin stock");
      expect(boton.disabled).toBeTrue();
      expect(screen.getByText("Agotado")).toBeTruthy();

      fireEvent.click(boton);
      expect(screen.getByTestId("total").textContent).toBe("0");
    });
  });

  describe("AgregarAlCarrito", () => {
    it("permite elegir la cantidad y agregar al carrito", () => {
      renderizar(
        <>
          <AgregarAlCarrito producto={televisor} />
          <TotalCarrito />
        </>
      );

      expect(screen.getByText(/En stock \(10 unidades\)/)).toBeTruthy();

      fireEvent.click(screen.getByLabelText("Aumentar cantidad"));
      fireEvent.click(screen.getByLabelText("Aumentar cantidad"));
      expect(screen.getByText("3")).toBeTruthy();

      fireEvent.click(screen.getByLabelText("Disminuir cantidad"));
      expect(screen.getByText("2")).toBeTruthy();

      fireEvent.click(screen.getByText("Añadir al carrito"));
      expect(screen.getByText(/¡Producto añadido al carrito!/)).toBeTruthy();
      expect(screen.getByTestId("total").textContent).toBe("2");
    });

    it("no deja superar el stock disponible", () => {
      renderizar(<AgregarAlCarrito producto={camara} />);

      const botonMas = screen.getByLabelText("Aumentar cantidad");
      fireEvent.click(botonMas);
      fireEvent.click(botonMas);
      fireEvent.click(botonMas);

      expect(screen.getByText("3")).toBeTruthy();
      expect(botonMas.disabled).toBeTrue();
    });

    it("ofrece consultar disponibilidad cuando el producto está agotado", () => {
      renderizar(<AgregarAlCarrito producto={sinStock} />);

      expect(screen.getByText("Sin stock").disabled).toBeTrue();
      expect(screen.getByText("Consultar disponibilidad").getAttribute("href")).toBe("/contacto");
    });
  });

  describe("Página de productos", () => {
    it("muestra todo el catálogo sin buscador ni filtros", () => {
      renderizar(<PaginaProductos />);

      expect(screen.getByText("Catálogo de productos")).toBeTruthy();
      expect(screen.getAllByRole("article").length).toBe(productos.length);
      expect(screen.queryByLabelText("Buscar producto")).toBeNull();
      expect(screen.queryByLabelText("Solo productos en stock")).toBeNull();
    });
  });

  describe("FormularioContacto", () => {
    it("muestra los errores cuando el formulario está vacío", () => {
      const { container } = render(<FormularioContacto />);

      fireEvent.submit(container.querySelector("form"));

      expect(screen.getByText("Ingresa un nombre válido de hasta 100 caracteres.")).toBeTruthy();
      expect(screen.getByText("Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.")).toBeTruthy();
      expect(
        screen.getByText("El comentario es obligatorio y debe tener hasta 500 caracteres.")
      ).toBeTruthy();
    });

    it("rechaza un correo con dominio no permitido", () => {
      const { container } = render(<FormularioContacto />);

      fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Milton" } });
      fireEvent.change(screen.getByLabelText("Correo electrónico"), {
        target: { value: "milton@hotmail.com" },
      });
      fireEvent.change(screen.getByLabelText("Comentario"), { target: { value: "Hola" } });
      fireEvent.submit(container.querySelector("form"));

      expect(screen.getByText("Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.")).toBeTruthy();
      expect(screen.queryByRole("alert")).toBeNull();
    });

    it("envía la consulta y limpia el formulario cuando los datos son válidos", () => {
      const { container } = render(<FormularioContacto />);

      fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Milton Espinoza" } });
      fireEvent.change(screen.getByLabelText("Correo electrónico"), {
        target: { value: "milton@duoc.cl" },
      });
      fireEvent.change(screen.getByLabelText("Comentario"), {
        target: { value: "Consulta sobre stock de proyectores." },
      });
      fireEvent.submit(container.querySelector("form"));

      expect(
        screen.getByText("Consulta enviada correctamente. Te responderemos a la brevedad.")
      ).toBeTruthy();
      expect(screen.getByLabelText("Nombre").value).toBe("");
    });
  });

  describe("FormularioLogin", () => {
    it("valida el correo y la contraseña antes de iniciar sesión", () => {
      const { container } = renderizar(<FormularioLogin />);
      const form = container.querySelector("form");

      fireEvent.submit(form);
      expect(screen.getByText("Ingresa un correo electrónico válido.")).toBeTruthy();

      fireEvent.change(screen.getByLabelText("Correo electrónico"), {
        target: { value: "felipe@duoc.cl" },
      });
      fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "12" } });
      fireEvent.submit(form);
      expect(screen.getByText("La contraseña debe tener entre 4 y 10 caracteres.")).toBeTruthy();

      fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "123456" } });
      fireEvent.submit(form);
      expect(screen.getByText("Correo o contraseña incorrectos.")).toBeTruthy();
    });

    it("inicia sesión con un usuario registrado y redirige al inicio", () => {
      localStorage.setItem(
        "usuarios_db",
        JSON.stringify([{ nombre: "Felipe", correo: "felipe@duoc.cl", contrasena: "123456" }])
      );
      spyOn(routerMock, "push");
      const { container } = renderizar(<FormularioLogin />);

      fireEvent.change(screen.getByLabelText("Correo electrónico"), {
        target: { value: "felipe@duoc.cl" },
      });
      fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "123456" } });
      fireEvent.submit(container.querySelector("form"));

      expect(routerMock.push).toHaveBeenCalledOnceWith("/");
      expect(localStorage.getItem("sesion_usuario")).not.toBeNull();
    });
  });

  describe("FormularioRegistro", () => {
    it("muestra el primer error de validación que encuentra", () => {
      const { container } = renderizar(<FormularioRegistro />);
      const form = container.querySelector("form");

      fireEvent.submit(form);
      expect(screen.getByText("Ingresa un nombre válido.")).toBeTruthy();

      fireEvent.change(screen.getByLabelText("Nombre *"), { target: { value: "Jeremi" } });
      fireEvent.submit(form);
      expect(screen.getByText("Ingresa un apellido válido.")).toBeTruthy();

      fireEvent.change(screen.getByLabelText("Apellido *"), { target: { value: "Macaya" } });
      fireEvent.submit(form);
      expect(screen.getByText("Ingresa un correo electrónico válido.")).toBeTruthy();

      fireEvent.change(screen.getByLabelText("Correo *"), { target: { value: "jeremi@duoc.cl" } });
      fireEvent.change(screen.getByLabelText("Contraseña *"), { target: { value: "ab" } });
      fireEvent.submit(form);
      expect(screen.getByText("La contraseña debe tener entre 4 y 10 caracteres.")).toBeTruthy();
    });

    it("registra al usuario y redirige al login", () => {
      spyOn(routerMock, "push");
      const { container } = renderizar(<FormularioRegistro />);

      fireEvent.change(screen.getByLabelText("Nombre *"), { target: { value: "Jeremi" } });
      fireEvent.change(screen.getByLabelText("Apellido *"), { target: { value: "Macaya" } });
      fireEvent.change(screen.getByLabelText("Correo *"), { target: { value: "jeremi@duoc.cl" } });
      fireEvent.change(screen.getByLabelText("Contraseña *"), { target: { value: "clave123" } });
      fireEvent.submit(container.querySelector("form"));

      expect(routerMock.push).toHaveBeenCalledOnceWith("/login");
      expect(JSON.parse(localStorage.getItem("usuarios_db"))[0].correo).toBe("jeremi@duoc.cl");
    });

    it("no permite registrar dos veces el mismo correo", () => {
      localStorage.setItem(
        "usuarios_db",
        JSON.stringify([{ nombre: "Jeremi", correo: "jeremi@duoc.cl", contrasena: "clave123" }])
      );
      spyOn(routerMock, "push");
      const { container } = renderizar(<FormularioRegistro />);

      fireEvent.change(screen.getByLabelText("Nombre *"), { target: { value: "Otro" } });
      fireEvent.change(screen.getByLabelText("Apellido *"), { target: { value: "Usuario" } });
      fireEvent.change(screen.getByLabelText("Correo *"), { target: { value: "JEREMI@duoc.cl" } });
      fireEvent.change(screen.getByLabelText("Contraseña *"), { target: { value: "clave123" } });
      fireEvent.submit(container.querySelector("form"));

      expect(screen.getByText("El correo ya está registrado.")).toBeTruthy();
      expect(routerMock.push).not.toHaveBeenCalled();
    });
  });
});
