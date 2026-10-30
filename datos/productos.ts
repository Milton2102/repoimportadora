export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: string;
  precioNumerico: number;
  imagen: string;
  stock: number;
  enStock: boolean;
  oferta: boolean;
  destacado: boolean;
}

export const productos: Producto[] = [
  {
    id: "1",
    nombre: 'Televisor LED 55" Samsung 4K',
    categoria: "Televisores",
    descripcion:
      "Smart TV QLED 43 pulgadas con resolución 4K UHD, HDR10+ y acceso directo a todas las apps de streaming.",
    precio: "$389.990",
    precioNumerico: 389990,
    imagen: "/imagenes/televisor.webp",
    stock: 10,
    enStock: true,
    oferta: true,
    destacado: true,
  },
  {
    id: "2",
    nombre: "Audífonos Sony WH-1000XM5",
    categoria: "Audio",
    descripcion:
      "Audífonos inalámbricos Bluetooth con cancelación activa de ruido de última generación y autonomía de 30 horas.",
    precio: "$129.990",
    precioNumerico: 129990,
    imagen: "/imagenes/audifono.webp",
    stock: 8,
    enStock: true,
    oferta: true,
    destacado: true,
  },
  {
    id: "3",
    nombre: "Parlante JBL Flip 6",
    categoria: "Audio",
    descripcion:
      "Parlante Bluetooth resistente al agua IP67, sonido potente 360° y batería de 12 horas de duración.",
    precio: "$69.990",
    precioNumerico: 69990,
    imagen: "/imagenes/producto3.webp",
    stock: 15,
    enStock: true,
    oferta: false,
    destacado: false,
  },
  {
    id: "4",
    nombre: "roku 11",
    categoria: "Television",
    descripcion:
      'roku de Television con todos los canales',
    precio: "$259.990",
    precioNumerico: 259990,
    imagen: "/imagenes/producto4.webp",
    stock: 6,
    enStock: true,
    oferta: false,
    destacado: true,
  },
  {
    id: "5",
    nombre: 'Televisor 32 pulgadas"',
    categoria: "Computación",
    descripcion:
      "Smart TV QLED 32 pulgadas con resolución 4K UHD, HDR10+ y acceso directo a todas las apps de streaming.",
    precio: "$449.990",
    precioNumerico: 449990,
    imagen: "/imagenes/producto5.webp",
    stock: 0,
    enStock: false,
    oferta: false,
    destacado: false,
  },
  {
    id: "6",
    nombre: "Proyector Epson Home Cinema",
    categoria: "Proyección",
    descripcion:
      "Proyector compacto Full HD 3300 lúmenes, HDMI y WiFi integrado para cine en casa o presentaciones profesionales.",
    precio: "$299.990",
    precioNumerico: 299990,
    imagen: "/imagenes/producto6.webp",
    stock: 5,
    enStock: true,
    oferta: true,
    destacado: true,
  },
  {
    id: "7",
    nombre: "Tablet iPad Air 10.9",
    categoria: "Tablets",
    descripcion:
      "iPad Air con chip M1, pantalla Liquid Retina 10.9 pulgadas, 64 GB de almacenamiento y compatibilidad con Apple Pencil.",
    precio: "$499.990",
    precioNumerico: 499990,
    imagen: "/imagenes/producto7.webp",
    stock: 9,
    enStock: true,
    oferta: false,
    destacado: false,
  },
  {
    id: "8",
    nombre: "iphone",
    categoria: "telefonos",
    descripcion:
      "iphone 60 hz",
    precio: "$499.000",
    precioNumerico: 499000,
    imagen: "/imagenes/producto8.webp",
    stock: 20,
    enStock: true,
    oferta: true,
    destacado: false,
  },
  {
    id: "9",
    nombre: "parlante",
    categoria: "parlantes",
    descripcion:
      "Parlante de alta definicion",
    precio: "$49.990",
    precioNumerico: 49990,
    imagen: "/imagenes/producto9.webp",
    stock: 14,
    enStock: true,
    oferta: false,
    destacado: false,
  },
  {
    id: "10",
    nombre: "audifonos bose",
    categoria: "auriculares",
    descripcion:
      "audifonos bose, sonido envolvente",
    precio: "$329.990",
    precioNumerico: 329990,
    imagen: "/imagenes/producto10.webp",
    stock: 0,
    enStock: false,
    oferta: false,
    destacado: false,
  },
  {
    id: "11",
    nombre: "Cámara Canon EOS R50",
    categoria: "Fotografía",
    descripcion:
      "Cámara mirrorless 24.2 MP, grabación 4K 30fps, pantalla táctil abatible y conectividad WiFi/Bluetooth integrada.",
    precio: "$549.990",
    precioNumerico: 549990,
    imagen: "/imagenes/camara.webp",
    stock: 3,
    enStock: true,
    oferta: false,
    destacado: false,
  },
  {
    id: "12",
    nombre: "Teclado Mecánico Redragon K552",
    categoria: "Periféricos",
    descripcion:
      "Teclado mecánico compacto con switches Blue, retroiluminación RGB, construcción metálica resistente y antifantasma.",
    precio: "$29.990",
    precioNumerico: 29990,
    imagen: "/imagenes/teclado.webp",
    stock: 25,
    enStock: true,
    oferta: true,
    destacado: true,
  },
];

export function obtenerProductoPorId(id: string): Producto | undefined {
  return productos.find((p) => p.id === id);
}
