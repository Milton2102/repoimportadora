# Documento de Cobertura de Testing — Importadora Larraín (Evaluación Parcial N° 2)

**Asignatura:** Desarrollo Fullstack II (`DSY1104`)  
**Integrantes:** Milton Espinoza · Felipe Zapata · Jeremi Macaya  
**Herramientas de Testing:** Karma `v6.4.4`, Jasmine `v7.0.2`, ChromeHeadless (`karma-chrome-launcher`), Webpack 5 + Babel (`babel-plugin-istanbul`), React Testing Library (`@testing-library/react`) y `karma-coverage`.

---

## 1. Configuración del Entorno de Pruebas (`karma.conf.js`)

El entorno de pruebas unitarias se configuró en el archivo [`karma.conf.js`](../karma.conf.js) en la raíz del proyecto:
- **Frameworks:** `jasmine` y `webpack`.
- **Navegador de ejecución:** `ChromeHeadless` (ejecución automatizada sobre el motor real de Chromium).
- **Preprocesadores:** `webpack` y `sourcemap` para transpilar archivos TypeScript y React (`.ts` y `.tsx`) e instrumentar el código fuente con `babel-plugin-istanbul`.
- **Mocks de infraestructura:** Alias de `next/link` hacia [`tests/mocks/nextLinkMock.tsx`](../tests/mocks/nextLinkMock.tsx) y espías (`jasmine.createSpy`) para simular peticiones `fetch` a la API y callbacks de eventos en componentes.
- **Reporteros:** `spec` (detalle de cada caso de prueba en consola) y `coverage` (generación de resumen estadístico en consola y reporte visual en `coverage/html/index.html`).

---

## 2. Resumen de Resultados y Métricas de Cobertura (`npm test`)

Al ejecutar `npm test` (`karma start karma.conf.js --single-run`), se obtienen los siguientes resultados:

- **Total de Pruebas Unitarias Ejecutadas:** **20 de 20 aprobadas (`20 SUCCESS / 0 FAILED`)** *(superando el mínimo de 10/10 exigido por la pauta para el 100% de logro en IE2.2.1 e IE2.2.2)*.

| Métrica de Cobertura (Istanbul / Karma Coverage) | Porcentaje Logrado | Elementos Cubiertos | Estado |
| :--- | :---: | :---: | :---: |
| **Statements (Sentencias)** | **95.65%** | 242 / 253 | Destacado |
| **Branches (Ramas condicionales `if/else`)** | **85.71%** | 144 / 168 | Destacado |
| **Functions (Funciones y componentes)** | **91.52%** | 54 / 59 | Destacado |
| **Lines (Líneas de código ejecutable)** | **96.98%** | 225 / 232 | Destacado |

---

## 3. Detalle de las 20 Pruebas Unitarias Implementadas

### A. Suite 1: Pruebas de Lógica de Negocio, Validaciones y API con Mocks (`tests/validaciones.spec.ts` — 11 pruebas)

| N° | Caso de Prueba (`it`) | Elemento / Función Evaluada | Uso de Mocks / Verificación | Resultado |
| :---: | :--- | :--- | :--- | :---: |
| **1** | Debe aceptar correos con dominio `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com` | `validarCorreoContacto()` | Verifica dominios institucionales permitidos | PASS |
| **2** | Debe rechazar correos vacíos, sin `@` o de dominios no permitidos | `validarCorreoContacto()` | Verifica rechazo de `@hotmail.com`, `@yahoo.cl` y exceso de largo | PASS |
| **3** | Debe calcular correctamente el dígito verificador (`0`, `k` y numérico) | `calcularDv()` | Verifica algoritmo chileno Módulo 11 | PASS |
| **4** | Debe validar RUN chilenos correctos con o sin puntos y con `K` mayúscula/minúscula | `validarRun()` | Verifica limpieza de formato y coincidencia de DV | PASS |
| **5** | Debe rechazar RUN inválidos, sin guion o vacíos | `validarRun()` | Verifica rechazo de dígitos verificadores erróneos | PASS |
| **6** | Debe validar correctamente nombres y apellidos no numéricos | `validarNombre()`, `validarApellido()` | Verifica longitud y que no sean números | PASS |
| **7** | Debe validar correo general y longitud de contraseña (4 a 10 caracteres) | `validarCorreoGeneral()`, `validarContrasena()` | Verifica límites inferiores y superiores de contraseña | PASS |
| **8** | Debe validar comentarios y el objeto completo del formulario de contacto | `validarComentario()`, `validarFormularioContacto()` | Verifica estructura `{ valido, errores }` | PASS |
| **9** | Debe obtener la lista de productos desde un mock de `fetch` exitoso | `obtenerProductos()` | **Mock (`jasmine.createSpy`)** simulando respuesta HTTP 200 de `json-server` | PASS |
| **10** | Debe retornar el catálogo local de respaldo cuando el `fetch` falla o `json-server` está apagado | `obtenerProductos()` | **Mock (`jasmine.createSpy`)** rechazando la promesa (`rejectWith`) | PASS |
| **11** | Debe obtener un producto por su ID usando mock o respaldo local | `obtenerProductoPorId()` | **Mock (`jasmine.createSpy`)** para HTTP 200, HTTP 404 y modo offline | PASS |

---

### B. Suite 2: Pruebas de Componentes React, Props, Estados y DOM (`tests/componentes.spec.tsx` — 9 pruebas)

| N° | Caso de Prueba (`it`) | Componente React Evaluado | Props, State y Manipulación del DOM Verificados | Resultado |
| :---: | :--- | :--- | :--- | :---: |
| **12** | Debe renderizar la marca recibida por `props` y alternar el menú colapsable móvil | `<Navbar />` | Prop `marca`, prop `rutaActiva` y cambio de estado `menuAbierto` (`aria-expanded`) al hacer clic | PASS |
| **13** | Debe renderizar el `Footer` con las propiedades personalizadas | `<Footer />` | Props `empresa` y `asignatura` en el DOM | PASS |
| **14** | Debe mostrar nombre, precio, enlace de detalle y permitir incrementar/decrementar cantidad | `<ItemProducto />` | Prop `producto`, estado `cantidad` (`+` / `-`), alerta en DOM y **Spy (`onAgregarSpy`)** | PASS |
| **15** | Debe deshabilitar el botón de compra cuando el producto está agotado (`stocked = false`) | `<ItemProducto />` | Estado `disabled` del botón y verificación de que `onAgregarSpy` no sea llamado | PASS |
| **16** | Debe renderizar los productos, filtrar por texto/categoría/stock y actualizar el carrito | `<ListaProductos />` | Estados `busqueda`, `soloConStock`, `carrito` (añadir y vaciar) y **Spy (`onProductoAgregadoSpy`)** | PASS |
| **17** | Debe mostrar errores de validación si los campos están vacíos o el dominio no es válido | `<FormularioContacto />` | Estados de error en el DOM y bloqueo de envío | PASS |
| **18** | Debe enviar correctamente cuando los datos cumplen las reglas de negocio | `<FormularioContacto />` | Limpieza de estados, mensaje de éxito en DOM y **Spy (`onEnviarExitoso`)** | PASS |
| **19** | Debe validar el RUN chileno y demás campos en el Formulario de Registro | `<FormularioRegistro />` | Validación de RUN (`12345678-5`), botón `Limpiar` y **Spy (`onRegistroExitoso`)** | PASS |
| **20** | Debe validar credenciales en `FormularioLogin` y ejecutar el callback al iniciar sesión | `<FormularioLogin />` | Validación de correo/contraseña, mensaje de bienvenida y **Spy (`onLoginExitoso`)** | PASS |
