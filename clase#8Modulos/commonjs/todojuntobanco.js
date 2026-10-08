function formatearPesos(valor) {
  return `$${valor.toLocaleString("es-CO")}`;
}

class CuentaBancaria {
  constructor(titular, saldo) {
    this.titular = titular;
    this.saldo = saldo;
  }

  consignar(monto) {
    this.saldo += monto;
    return `${this.titular} consignó ${formatearPesos(monto)}. Saldo: ${formatearPesos(this.saldo)}`;
  }
}

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

const ana = new CuentaBancaria("Ana", 100000);
const laura = new CuentaAhorros("Laura", 1000000, 5);

console.log(ana.consignar(50000));
console.log(laura.consignar(200000));
console.log(laura.calcularRendimiento());