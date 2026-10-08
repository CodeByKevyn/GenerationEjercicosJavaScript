const CuentaBancaria = require("./cuenta-bancaria.js");
const { formatearPesos } = require("./utilidades.js");

class CuentaAhorros extends CuentaBancaria {
  constructor(titular, saldo, tasaInteres) {
    super(titular, saldo);
    this.tasaInteres = tasaInteres;
  }

  calcularRendimiento() {
    const rendimiento = this.saldo * (this.tasaInteres / 100);
    return `${this.titular} gana ${formatearPesos(rendimiento)} de interés.`;
  }
}

module.exports = CuentaAhorros;