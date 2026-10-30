import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CarritoProvider } from "../components/CarritoContext";
import { ProductosProvider } from "../components/ProductosContext";
import { AuthProvider } from "../components/InicioSesion";

export const metadata: Metadata = {
  title: "Importadora Larraín | Tecnología importada para ti",
  description:
    "Tienda online de productos electrónicos importados. Proyecto académico DSY1104 · Desarrollo Fullstack II.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="d-flex flex-column min-vh-100">
        <AuthProvider>
          <ProductosProvider>
            <CarritoProvider>
              <Navbar />
              <main className="container my-4 flex-grow-1">{children}</main>
              <Footer />
            </CarritoProvider>
          </ProductosProvider>
        </AuthProvider>
      </body>
    </html>
  );
}