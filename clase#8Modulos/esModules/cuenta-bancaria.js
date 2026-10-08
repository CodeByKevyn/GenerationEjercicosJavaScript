import { formatearPesos, esMontoValido } from "./utilidades.js";

export default class CuentaBancaria {
  constructor(titular, saldo) {
    this.titular = titular;
    this.saldo = saldo;
  }

  consignar(monto) {
    if (!esMontoValido(monto)) {
      return "El monto debe ser mayor que cero";
    }
    this.saldo += monto;
    return `${this.titular} consignó ${formatearPesos(monto)}. Saldo: ${formatearPesos(this.saldo)}`;
  }
}