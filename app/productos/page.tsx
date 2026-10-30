import ItemProducto from "../../components/ItemProducto";
import { productos } from "../../datos/productos";

export default function Productos() {
  return (
    <section className="py-2">
      <h1 className="h2 fw-bold text-azul mb-4">Catálogo de productos</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {productos.map((producto) => (
          <ItemProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
}
