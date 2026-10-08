import CuentaBancaria from "./cuenta-bancaria.js";

export default class CuentaJuvenil extends CuentaBancaria {
  consignar(monto) {
    if (monto > 500000) {
      return "Las cuentas juveniles aceptan hasta $500.000 por consignación";
    }
    return super.consignar(monto);
  }
}