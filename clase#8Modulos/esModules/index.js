import CuentaBancaria from "./cuenta-bancaria.js";
import CuentaAhorros from "./cuenta-ahorros.js";

const ana = new CuentaBancaria("Ana", 100000);
const laura = new CuentaAhorros("Laura", 1000000, 5);

console.log(ana.consignar(50000));
console.log(ana.consignar(-2000));
console.log(laura.consignar(200000));
console.log(laura.calcularRendimiento());