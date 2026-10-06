const plataforma = "EduColombia";
const descuento = 0.1;

function precioConIva(precio) {
  const impuesto = precio * 0.19;
  return precio + impuesto;
}

function precioCampana(precio) {
  const descuento = 0.2;
  return precio - precio * descuento;
}

function bienvenida(nombre) {
  if (nombre !== "") {
    const mensaje = `Hola, ${nombre}. Bienvenida a ${plataforma}.`;
    console.log(mensaje);
  }
}

console.log(precioConIva(100000));
console.log(precioCampana(100000));
console.log(`Descuento general: ${descuento}`);
bienvenida("Laura");