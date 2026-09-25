const jugador = {
  nombre: "Kira",
  nivel: 3,
  vidas: 2,
  tieneLlave: false,
  companero: null,
  inventario: ["Espada", "Poción"],
};

console.log(jugador.nombre);
console.log(jugador.nivel);

jugador.tieneLlave = true;
jugador.vidas = jugador.vidas - 1;
jugador.monedas = 50;
console.log(jugador);

console.log(jugador.inventario[0]);
jugador.inventario.push("Mapa");
console.log(`${jugador.nombre} tiene ${jugador.inventario.length} objetos`);

console.log(jugador.puntos);
console.log(jugador.companero);