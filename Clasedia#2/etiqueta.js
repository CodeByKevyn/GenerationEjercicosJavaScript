function calcularPrecioFinal(precio) {
  const descuento = precio * 0.2;
  return precio - descuento;
}

function armarEtiqueta(nombre, precioOriginal, precioFinal) {
  return `${nombre} · antes $${precioOriginal} · ahora $${precioFinal}`;
}

function procesarPrenda(prenda) {
  const precioFinal = calcularPrecioFinal(prenda.precio);
  const etiqueta = armarEtiqueta(prenda.nombre, prenda.precio, precioFinal);
  console.log(etiqueta);
}

const catalogo = [
  { nombre: "Camiseta", precio: 45000 },
  { nombre: "Jean", precio: 120000 },
  { nombre: "Saco", precio: 89900 },
];

for (let i = 0; i < catalogo.length; i++) {
  procesarPrenda(catalogo[i]);
}