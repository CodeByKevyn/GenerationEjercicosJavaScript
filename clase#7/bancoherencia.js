class CuentaBancaria {
  constructor(titular, saldo) {
    this.titular = titular;
    this.saldo = saldo;
  }

  consignar(monto) {
    this.saldo += monto;
    return `${this.titular} consignó $${monto}. Saldo: $${this.saldo}`;
  }

  retirar(monto) {
    if (monto > this.saldo) {
      return "Fondos insuficientes";
    }
    this.saldo -= monto;
    return `${this.titular} retiró $${monto}. Saldo: $${this.saldo}`;
  }
}

class CuentaAhorros extends CuentaBancaria {
  constructor(titular, saldo, tasaInteres) {
    super(titular, saldo);
    this.tasaInteres = tasaInteres;
  }

  calcularRendimiento() {
    const rendimiento = this.saldo * (this.tasaInteres / 100);
    return `${this.titular} gana $${rendimiento} de interés.`;
  }
}

const laura = new CuentaAhorros("Laura", 1000000, 5);
console.log(laura.consignar(200000));
console.log(laura.retirar(100000));
console.log(laura.calcularRendimiento());

const ana = new CuentaBancaria("Ana", 100000);
console.log(ana.tasaInteres);