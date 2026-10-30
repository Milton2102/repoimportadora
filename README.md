# Importadora Larraín

Tienda online de productos electrónicos importados, bajo el modelo "Yo lo importo por ti". Proyecto académico de **Desarrollo Fullstack II (DSY1104)**.

## Integrantes

- Milton Espinoza
- Felipe Zapata
- Jeremi Macaya

## Tecnologías

- Next.js 16 (App Router), React 19 y TypeScript
- Bootstrap 5 para el diseño responsivo
- Jasmine y Karma para las pruebas unitarias
- `json-server` como API de prueba opcional

## Páginas

| Ruta | Descripción |
| --- | --- |
| `/` | Inicio con productos destacados, beneficios y llamado a registrarse |
| `/productos` | Catálogo completo de productos |
| `/productos/[id]` | Detalle del producto, selector de cantidad y botón de compra |
| `/carrito` | Carrito y formulario de compra (requiere sesión iniciada) |
| `/contacto` | Formulario de contacto validado |
| `/login` | Inicio de sesión |
| `/registro` | Registro de usuarios |
| `/nosotros` | Historia, motivación y valores de la empresa |

## Funcionamiento

- El catálogo se carga desde `datos/productos.ts` y muestra todos los productos. Los que no tienen stock aparecen con el badge "Agotado" y el botón deshabilitado.
- En el catálogo, cada tarjeta agrega 1 unidad al carrito. En el detalle del producto se puede elegir la cantidad, sin superar el stock disponible.
- Al finalizar la compra se descuenta el stock y se vacía el carrito.
- Los usuarios y la sesión se guardan en `localStorage`. Si no hay sesión, `/carrito` redirige a `/login`.
- El formulario de contacto solo acepta correos `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.

## Estructura

```
app/
  page.tsx                  inicio
  layout.tsx                diseño global y proveedores
  productos/page.tsx        catálogo
  productos/[id]/page.tsx   detalle
  carrito/page.tsx
  contacto/page.tsx
  login/page.tsx
  registro/page.tsx
  nosotros/page.tsx
components/
  Navbar.tsx
  Footer.tsx
  ItemProducto.tsx          tarjeta del catálogo
  AgregarAlCarrito.tsx      cantidad y compra en el detalle
  CarritoContext.tsx        estado del carrito
  ProductosContext.tsx      estado del stock
  InicioSesion.tsx          estado de sesión y usuarios
  FormularioContacto.tsx
  FormularioLogin.tsx
  FormularioRegistro.tsx
datos/productos.ts          catálogo de 12 productos
utils/validaciones.ts       reglas de validación
utils/productosApi.ts       cliente de la API de prueba
public/imagenes/            imágenes de los productos
tests/                      pruebas Jasmine y mocks
```



## Cómo ejecutar

Instalar dependencias:

```bash
npm install
```

Iniciar la aplicación en `http://localhost:3000`:

```bash
npm run dev
```

Iniciar la API de prueba en `http://localhost:4000/products` (opcional):

```bash
npm run api
```

## Pruebas unitarias

```bash
npm test
```

Ejecuta Karma con Jasmine en ChromeHeadless. Muestra el detalle de cada prueba en consola y genera el reporte de cobertura en `coverage/html/index.html`.

| Archivo | Qué prueba |
| --- | --- |
| `tests/validaciones.spec.js` | Validaciones de correo, RUN, nombre, contraseña y formulario de contacto; servicio `productosApi` con mocks de `fetch` |
| `tests/componentes.spec.js` | `Navbar`, `Footer`, `ItemProducto`, `AgregarAlCarrito`, contextos de carrito y stock, página de productos, y los formularios de contacto, login y registro |
| `tests/mocks/` | Mocks de `next/link` y `next/navigation` |
