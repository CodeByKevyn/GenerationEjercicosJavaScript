//Parte 1 y 2
const Productos = ["Hamburguesa", "Papas", "Gaseosa"]
const nombre = "Camila"
const ciudad = "Bogota"
let RappiPrime = true

console.log(`Hola ${nombre}, tu pedido a domicilio en ${ciudad}`)
console.log(Productos)
console.log(Productos[0])

Productos.push("Postre")
console.log(Productos)

Productos.pop()
console.log(Productos)
console.log(Productos.length)

//Parte 3 y 4
const Pedido = {
    nombre: nombre,
    ciudad: ciudad,
    Productos: Productos,
    estado: "En Preparacion"
}

console.log(Pedido)
console.log(Pedido.nombre)
console.log(Pedido.estado = "En camino")
console.log(Pedido);

let Subtotal = "20000"; 
const domicilio = 3500;
const Propina = 0.10;

console.log("Resultado con trampa:", Subtotal + domicilio); 


const total = Number(Subtotal) + domicilio;
console.log(`Total a pagar por el pedido de ${Pedido.nombre}: $${total}`);
console.log(`Propina sugeridad: ${total * Propina}`)




