const inventario = ["Espada", "Poción", "Mapa"];

console.log(inventario);
console.log(inventario[0]);
console.log(inventario[2]);
console.log(inventario.length);

inventario.push("Llave");
console.log(inventario);

inventario.pop();
console.log(inventario);

inventario[1] = "Escudo";
console.log(inventario);

console.log(inventario[10]);